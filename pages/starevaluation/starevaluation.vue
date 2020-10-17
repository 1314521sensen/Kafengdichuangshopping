<template>
	<view class="star-evaluation">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="commodity">
			<view class="father-one">
				<view class="commodity-img">
					<image :src="yuming+img" mode=""></image>
				</view>
				<view class="commodity-name">
					<text class="name-one">{{goodname}}</text>
					<text class="name-two">好评率99%</text>
					<!-- 这是星星的组件 -->
					<Star class="star" active-color="#ca234e"  :value="topvalue" @change="change"></Star>
				</view>
			</view>
		</view>
		
		<view class="user-evaluation">
			<form>
				<view class="fa-textarea">
					<textarea class="textarea" v-model="neirongtext" maxlength="-1" placeholder="请填写您的评论"></textarea>
				</view>
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						图片上传
					</view>
					<view class="action">
						<!-- {{imgList.length}}/4  -->
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<view class="bg">
								
							</view>
							<view class="bg-text">
								<text>相册/照片</text>
							</view>
						</view>
					</view>
				</view>
				<checkbox-group class="block" @change="CheckboxChange">
					<view class="cu-form-group margin-top">
						<checkbox 
							class='round red checkbok-mini' 
							:class="checkbox[0].checked?'checked':''" 
							:checked="checkbox[0].checked?true:false"
						>						
						</checkbox>
						<view class="title anonymous">匿名评价</view>
					</view>
				</checkbox-group>
			</form>
		</view>
		
		<view class="service-evaluation ">
			<view class="service-top">
				<text class="top-text-left">其他服务评价</text>
				<text class="top-text-right">满意请给五星哦</text>
			</view>
			<!-- 这里是星星 -->
			<view class="service-bottom">
				<text>快递速度</text>
				<Star class="star"  active-color="#ca234e"  :value="Number(Couriervalue)" @change="Couriertiselect"></Star>
			</view>
			<view class="service-bottom">
				<text>物流服务</text>
				<Star class="star"  active-color="#ca234e"  :value="Number(Logisticsvalue)" @change="Logisticsvalueselect"></Star>
			</view>
			<view class="service-bottom">
				<text>店家服务</text>
				<Star class="star"  active-color="#ca234e"  :value="Number(attitudevaluevalue)" @change="attitudevaluevalueselect"></Star>
			</view>
		</view>
		<view class="Submitcommentsbtn">
			<view class="cu-btn bg-gradual-red margin-tb-sm lg Submitcomments" @tap="submitevaluation">提交评价</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import Star from "@/components/uni-rate/uni-rate.vue"
	export default {
		data() {
			return {
				statusBar:0,
				tokey:"",
				imgList: [],
				topvalue:0,
				Couriervalue:0,
				Logisticsvalue:0,
				attitudevaluevalue:0,
				checkbox: [{
					value: 'A',
					checked: false
				}],
				bianhao:"",
				gid:"",
				img:"",
				goodname:"",
				yuming:"",
				neirongtext:"",
				imgreturnlist:[],//后台返回的图片数组
				arraylastimages:[],
				pages:1,
				num:0
			}
		},
		components:{
			Star
		},
		methods:{
			ViewImage(){
				
			},
			ChooseImage() {
				const _this = this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
							this.imgreturnlist = this.imgList
							// console.log(this.imgreturnlist)
							// console.log(this.imgList,"多张")
							// let str = ""
							// let arr = []
							// this.imgList.forEach((item,index)=>{
							// 	str += item+','
							// })
							// str = str.substring(str.length-1,1)
							// arr.push(str)
							// this.imgreturnlist = arr
						} else {
							this.imgList = res.tempFilePaths
							_this.imgreturnlist = this.imgList
						}
					}
				});
			},
			//这是选中匿名评价
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
					if(items[0].checked){
						items[0].checked = false
					}else{
						items[0].checked = true
					}
			},
			// 这是星星顶部的子组件传过来的事件/
			change(e){
				this.topvalue = e.value
			},
			// 这是星星底部子组件穿过来的数据
			Couriertiselect(e){
				this.Couriervalue = e.value
			},
			Logisticsvalueselect(e){
				this.Logisticsvalue = e.value
			},
			attitudevaluevalueselect(e){
				this.attitudevaluevalue = e.value
			},
			//这选择相册中的图片然后删除
			DelImg(e) {
				uni.showModal({
					title: '亲',
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//封装一个共用的提交评价
			plicestarevaluation(getimglist){
				const _this = this
				//  开始对商品评价
					uni.request({
						url:`${app.globalData.Requestpath}order/orderGoodEvaluation`,
						method:"POST",
						data:{
							token:_this.tokey,
							o_sn:_this.bianhao,
							gid:_this.gid,
							desccredit:_this.topvalue?_this.topvalue:5,
							servicecredit:_this.attitudevaluevalue?_this.attitudevaluevalue:5,
							deliverycredit:_this.Logisticsvalue?_this.Logisticsvalue:5,
							e_content:_this.neirongtext?_this.neirongtext:'该用户没有评价',
							e_pic:getimglist
						},
						success(res) {
							if(res.data.code==0){
								//请求成功跳到评价的页面
								_this.$store.commit("getevaluationlist",{url:'order/getConfirmPayOrderList',pages:1})
								uni.redirectTo({
									url:`/pages/evaluate/evaluate`
								})
							}else{
								if(res.data.code==1 && res.data.msg=="无效的商品"){
									app.globalData.showtoastsame(res.data.msg)
									uni.redirectTo({
										url:`/pages/evaluate/evaluate`
									})
									return
								}
								app.globalData.Requestmethod(res.data.code,res.data.msg)
							}
						}
					})
			},
			// 封装了一个上传图片的方法
			uploadFile(index){
				const _this = this
				let imgreturnlistarr = []
				let {topvalue,imgreturnlist,neirongtext,Logisticsvalue,attitudevaluevalue} = _this.$data
				uni.uploadFile({
					url:`${app.globalData.Requestpath}common/uploadImage?type=order`,
					filePath:imgreturnlist[index],	
					name:"file",
					fileType:"image",
					success(res){
						//JSON  转字符串
						  console.log(index)
						if(JSON.parse(res.data).code==0){
							//把每张图片追加到一个自定义数组当中
							_this.arraylastimages.push(JSON.parse(res.data).data.src)
							if(_this.num == _this.$data.imgreturnlist.length-1){
								console.log(_this.arraylastimages)
								_this.num = 0
								_this.plicestarevaluation(_this.arraylastimages)
								_this.arraylastimages = []
							}else{
								_this.num++
							}
						}
					}
				})
			},
			//将评价提交到后台
			submitevaluation(){
				const _this = this
				let imgreturnlistarr = []
				let {topvalue,imgreturnlist,neirongtext,Logisticsvalue,attitudevaluevalue} = _this.$data
				// console.log(imgreturnlist,"这是要上传的而图片")
				// console.log(imgreturnlist.length)  
				if(parseInt(imgreturnlist.length)>0){
					// console.log("执行有图片")
					//每次上传图片都渲染
					for(var i = 0 ; i < imgreturnlist.length ; i++){
						// console.log(imgreturnlist[i],11111)
						console.log(i)
						_this.uploadFile(i)
						
					}
				}else{
					// console.log(imgreturnlistarr)
					_this.plicestarevaluation(_this.arraylastimages)
				}
			}
		},
		onLoad(oipction) {
			const _this = this
			this.bianhao = atob(oipction.ordersnbianhao)//这是定单编号
			this.gid = oipction.shopgooid//这是商品id shopgooid
			this.img = oipction.img
			this.goodname = oipction.goodname
			this.yuming = app.globalData.imgyuming
			this.statusBar = app.globalData.statusBar
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					app.globalData.Detectionupdatetokey(res.data)
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.star-evaluation{
		background-color: #FFFFFF;
		// height: 100vh;
		overflow: hidden;
	}
	.commodity{
		width: 90%;
		height: 160rpx;
		// background-color: #FFFFFF;
		margin: 40rpx auto 0;
		.father-one{
			// width: 420rpx;
			display: flex;
			// justify-content: space-between;
		}
		.commodity-img{
			width: 160rpx;
			height: 160rpx;
			background-color: #CCCCCC;
			border-radius: 20rpx;
			image{
				width: 160rpx;
				height: 160rpx;
			}
		}
		.commodity-name{
			height: 160rpx;
			// margin-top: 10rpx;
			overflow: hidden;
			margin:10rpx 0 0 20rpx;
			text{
				display: block;
			}
			.name-one{
				font-size: 30rpx;
				width: 90%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.name-two{
				color: #CCCCCC;
				margin-top:20rpx;
			}
		}
		.star{
			margin-top: 20rpx;
		}
	}
	.user-evaluation{
		box-shadow: 2rpx 2rpx 10rpx 4rpx #EEEEEE;
		width: 95%;
		background-color: white;
		margin: 40rpx auto 0;
		border-radius: 20rpx;
		overflow: hidden;
		.margin-top{
			display: flex;
			justify-content: flex-start;
		}
		.fa-textarea{
			width: 100%;
			.textarea{
			width: 95%;
			margin: 0 auto;
			height: 250rpx;
			}
		}
	}
	.service-evaluation{
		overflow: hidden;
		margin: 40rpx auto 0;
		width: 95%;
		height: 270rpx;
		border-radius: 20rpx;
		background-color: white;
		box-shadow: 2rpx 2rpx 10rpx 4rpx #EEEEEE;
		.service-top{
			width: 95%;
			margin: 40rpx auto 0;
			height: 50rpx;
			display: flex;
			justify-content:space-between;
			margin-top: 10rpx;
			.top-text-left{
				font-size: 34rpx;
			}
			.top-text-right{
				font-size: 12rpx;
				color: #CCCCCC;
				margin-top: 14rpx;
			}
		}
		.service-bottom{
			width: 95%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			margin-top: 15rpx;
			.star{
				margin-top: 20rpx;
			}
		}
	}
	.solids{
		padding-top:10rpx;
			.bg{
				height:90rpx;
				// background-color:yellow;
				background:url('/static/starevaluation/camerabg.png') no-repeat 20rpx 0rpx;
				background-size:72% 90%;
			}
			.bg-text{
				text-align:center;
				font-size: 28rpx;
				color:#999;
			}
		}
		.Submitcommentsbtn{
			display:flex;
			justify-content: center;
			.Submitcomments{
				width: 90%;
				border-radius:30rpx;
				height:70rpx;
			}
		}
		.anonymous{
			margin-left:20rpx;
		}
</style>
