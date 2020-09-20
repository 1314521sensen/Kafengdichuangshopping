<template>
	<view class="address">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar :message="messageTit"></actionbar>
		<view class="from">
			<view class="cu-form-group">
				<view class="title">收货人</view>
				<input 
					v-model="value1" 
					placeholder="收货人姓名" 
					name="input"
					class="inputdetection"
				></input>
			</view>
			<view class="cu-form-group borderadd">
				<view class="title">手机号码</view>
				<input 
					v-model="value2" 
					placeholder="收货人手机号" 
					name="input" 
					class="inputdetection"
					@blur="phoneinp"
					:class="phoneblur?'':'inputdetection_active'"
				></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<!-- <view class="cu-form-group" @tap="Addressselection"> -->
			<areaselection 
				@selectiondata="selectiondata" 
				message="所在地区" 
				style="margin-top:0;border-bottom:2rpx solid #f2f2f2;"
				:Haschosenlist="Haschosenlist"
			></areaselection>
			<!-- </view> -->
			<view class="cu-form-group borderadd">
				<view class="title">详细地址</view>
				<input v-model="value4" placeholder="街道、楼牌号等" name="input"></input>
			</view>
			<view class="cu-form-group addresdefault">
				<view class="addresdefault-left">
					<view class="title addres-title">设置默认地址</view>
					<view class="addres-remind">提醒:每次下单会默认推荐使用该地址</view>
				</view>
				<view class="addresdefault-right">
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
			</view>
		</view>
		<view class="confirm-box">
			<view class="confirm">
				<view class="cu-bar btn-group">
					<button 
						class="cu-btn bg-green shadow-blur round" 
						@tap="submits"
						style="max-width:90%;background-color: #fa2342;"
					>保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import areaselection from "@/components/actionbar/areaselection.vue"
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp();
	export default{
		data(){
			return {
				messageTit:'新增收货人',
				show: false,
				value1:"",
				value2:"",
				value3:"",
				value4:"",
				value6:"",
				statusBar:0,
				selectiondatalist:[],
				Haschosenlist:[],
				tokey:0,
				Addressoption:"",
				address:"",
				returntitleparameter:"",
				way:"",
				gid:"",
				cids:"",
				specname:"",
				num:"",
				img:"",
				storename:"",
				price:"",
				goodtitle:"",
				storeid:"",
				freight:"",
				spec_id:0,
				switchA: false,
				phoneblur:true
			}
		},
		methods:{
			SwitchA(e) {
				
				this.switchA = e.detail.value
			},
			phoneinp(){
				//当用户输入手机号牌失去焦点的时候
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				if(this.value2!==undefined){
					if(this.value2.match(userphone)!==null){
						this.phoneblur = true
					}else{
						this.phoneblur = false
						app.globalData.showtoastsame("请输入正确的手机号")
					}
				}
			},
			// Addressselection(){
			// 	this.show = true
			// },
			submits(){
				const _this = this
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				if(this.value2==undefined){
					return app.globalData.showtoastsame("手机号不能为空")
				}
				let bool = this.selectiondatalist[0][0].area_id
				let province = this.selectiondatalist[0]
				let city = this.selectiondatalist[1]
				let area = this.selectiondatalist[2]
				// console.log(this.value2.match(userphone))
				// console.log(this.value1,this.value2,this.value3,this.value4)
				if(this.value1 && this.value2.match(userphone)!==null && this.value4 && this.selectiondatalist.length>=3){
					//这是跳转上页
					// console.log(this.tokey)
					// console.log(this.selectiondatalist[0][0].area_id+1)
					if(this.Addressoption=="newaddress"){
							uni.request({
							url:`${app.globalData.Requestpath}user/addShippingAddress`,
							method:"POST",
							data:{
								token:this.tokey,
								province:bool?this.selectiondatalist[0][0].area_id+1:province,
								city:bool?this.selectiondatalist[1][0].area_id+1:city,
								area:bool?this.selectiondatalist[2][0].area_id+1:area,
								street_number:this.value4,
								postal_code:"",//这到明天需要改
								consignee_name:this.value1,
								consignee_phone:this.value2,
								is_default:this.switchA?1:0
							},
							success(res) {
								// console.log(res)
								if(res.data.code==0){
									
									//pages/addressTo/addressTo?title=收货地址
									// console.log(_this.way)
									if(_this.way==1){
										uni.redirectTo({
											url:`/pages/addressTo/addressTo?title=${_this.returntitleparameter}&gid=${_this.gid}&num=${_this.num}&way=${_this.way}&img=${_this.img}&storename=${_this.storename}&price=${_this.price}&goodtitle=${_this.goodtitle}&cids=${_this.cids}&storeid=${_this.storeid}&freight=${_this.freight}`
										})
									}else if(_this.way==2){
										uni.redirectTo({
											url:`/pages/addressTo/addressTo?title=${_this.returntitleparameter}&gid=${_this.gid}&specname=${_this.specname}&num=${_this.num}&way=${_this.way}&img=${_this.img}&storename=${_this.storename}&price=${_this.price}&goodtitle=${_this.goodtitle}&storeid=${_this.storeid}&freight=${_this.freight}&spec_id=${_this.spec_id}`
										})
									}else{
										uni.redirectTo({
											url:`/pages/addressTo/addressTo?title=${_this.returntitleparameter}`
										})
									}
								}
							}
						})
					}else{
						uni.request({
							url:`${app.globalData.Requestpath}user/editShippingAddress`,
							method:"POST",
							data:{
								token:this.tokey,
								address_id:this.address,
								province:bool?this.selectiondatalist[0][0].area_id+1:province,
								city:bool?this.selectiondatalist[1][0].area_id+1:city,
								area:bool?this.selectiondatalist[2][0].area_id+1:area,
								street_number:this.value4,
								postal_code:"",//这到明天需要改
								consignee_name:this.value1,
								consignee_phone:this.value2,
								is_default:this.switchA?1:0
							},
							success(res) {
								if(res.data.code==0){
									if(_this.way==1){
										uni.redirectTo({
											url:`/pages/addressTo/addressTo?title=${_this.returntitleparameter}&gid=${_this.gid}&num=${_this.num}&way=${_this.way}&img=${_this.img}&storename=${_this.storename}&price=${_this.price}&goodtitle=${_this.goodtitle}&cids=${_this.cids}&storeid=${_this.storeid}&freight=${_this.freight}`
										})
									}else if(_this.way==2){
										uni.redirectTo({
											url:`/pages/addressTo/addressTo?title=${_this.returntitleparameter}&gid=${_this.gid}&specname=${_this.specname}&num=${_this.num}&way=${_this.way}&img=${_this.img}&storename=${_this.storename}&price=${_this.price}&goodtitle=${_this.goodtitle}&storeid=${_this.storeid}&freight=${_this.freight}&spec_id=${_this.spec_id}`
										})
									}else{
										uni.redirectTo({
											url:`/pages/addressTo/addressTo?title=${_this.returntitleparameter}`
										})
									}
								}else{
									app.globalData.showtoastsame("修改失败")
								}
							}
						})
					}
					//当点击的时候把值加入到把数据提交到数据库当中 在另一个页面进行数据的请求 渲染
				}else{
					if(_this.value1=="" || _this.value1==undefined){
						return app.globalData.showtoastsame("请填写收货人")
					}else if(_this.value2=="" || _this.value2==undefined){
						if(_this.value2!==undefined){
							
							if(_this.value2.match(userphone)==null){
								return app.globalData.showtoastsame("请填写正确的手机号")
							}
						}else{
							
							return app.globalData.showtoastsame("手机号不能为空")
						}
					}else if(_this.value4=="" || _this.value4==undefined){
						return app.globalData.showtoastsame("请填写详细地址,快递更准确配送")
					}else if(_this.selectiondatalist.length<3){
						return app.globalData.showtoastsame("请选择地址")
					}
				}
				
			},
			//这是取消的
			Addresscancel(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//这是用来接受子组件传过来的值---弹出地址的组件
			selectiondata(e){
				// console.log(e)
				this.selectiondatalist = e
			}
		},
		components:{
			areaselection,
		},
		onLoad(opction){
			if(opction.amend == 1){
				this.messageTit = "编辑收货人"
			}

			
			this.returntitleparameter = opction.titleparameter
			this.Addressoption = opction.title
			this.address = opction.address
			this.statusBar = app.globalData.statusBar
			 this.value1 = opction.value1;
			 this.value2 = opction.value2;
			 this.value4 = opction.value4
			 this.value6 = opction.value6
			 this.selectiondatalist[0] = opction.province
			this.selectiondatalist[1] = opction.city
			this.selectiondatalist[2] = opction.area
			this.Haschosenlist[0] = opction.province_name
			this.Haschosenlist[1] = opction.city_name
			this.Haschosenlist[2] = opction.area_name
			 if(parseInt(this.value6)){
				 this.switchA = true
			 }else{
				 this.switchA = false
			 }
			//1是购物车过来的
			//2是详情过来的
			// console.log(opction.titleparameter)
			if(opction.titleparameter=='orderaddress'){
				let {way,gid,img,num,storename,price,goodtitle,storeid,freight,spec_id} = opction
				// console.log(spec_id)
				this.way = way
				if(this.way==1){//这是购物车过来的
					let {cids} = opction
					this.cids = cids
				}else{//这是详情过来的
					let {specname} = opction
					this.specname = specname
				}
				this.spec_id = spec_id
				this.gid = gid
				this.num = num
				this.img = img
				this.storename = storename
				this.price = price
				this.goodtitle = goodtitle
				this.storeid = storeid
				this.freight = freight
			}
		},
		
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					// console.log(res.data)
					_this.tokey = res.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>

	
	.address{
		height:100vh;
		background-color: #fff;
		.confirm-box{
			.confirm{
				position: fixed;
				width: 100%;
				// height:70rpx;
				left:0;
				bottom:0;
				.cu-btn{
					height:80rpx;
				}
			}	
		}
	}
	//插件的css
	.cu-bar{
		min-height:86rpx;
	}
	.cu-bar.btn-group uni-button{
		margin:0;
	}
	.borderadd{
		border-bottom:2rpx solid #f2f2f2;
	}
	.addresdefault{
		border-top:0;
		border-bottom:2rpx solid #f2f2f2;
		padding:20rpx 30rpx;
		.addresdefault-left{
			.addres-title{
				font-size: 28rpx;
				font-weight: bold;
			}
			.addres-remind{
				font-size: 24rpx;
			}
		}
	}
	.inputdetection{
		color:#000
	}
	.inputdetection_active{
		color:red;
	}
</style>
