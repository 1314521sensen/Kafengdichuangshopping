<template>
	<view class="nickname-box">
		<form @submit="btnsave">
			<view class="nickname" v-for="(item,index) in Personalinformationlist" :key="index">
				<view 
					class="cu-bar bg-white margin-top" 
					:style="{'min-height':'80rpx'}" 
					@tap="showModal" 
					:data-target="item.showname"
				>
					<view class="action">
						<text>{{item.title}}</text>
					</view>
					
					<view class="action">
						<!--  @tap="showModal" -->
						<input :style="{'margin-right': '44rpx'}" :name="item.name" :value="item.zhi!==null?item.zhi:''" :disabled="item.disabled"></input>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-modal" :class="modalName==item.showname?'show':''">
					<!-- <form @submit="formsubmit"> -->
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">{{item.dialogtitle}}</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<input v-model="item.value3" type="text" :placeholder="item.placeholdertext">
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action">
								<button class="cu-btn bg-green margin-left" @tap="Modify(item.value3,index)">确定</button>
							</view>
						</view>
					</view>
					<!-- </form> -->
				</view>
			</view>
			<!-- 地区选择 -->
			<selection @selectiondata="selectiondata" message="地址"></selection>
			<button data-v-287a241a="" class="cu-btn block bg-green margin-tb-sm lg" form-type="submit" :disabled="bool">{{text}}</button>
		</form>
	</view>
	
</template>

<script>
	import selection from "@/components/actionbar/areaselection.vue"
	const app = getApp()
	export default{ //注:这里的name 每个input 还位绑定
		data(){
			return {
				modalName: null,
				//这是表单的渲染列表
				Personalinformationlist:[
					{
						title:"昵称",
						zhi:"",
						showname:"1",
						dialogtitle:"您要修改的昵称",
						placeholdertext:"昵称至少五位最多10位",
						value3:"",
						name:"usernick",
						disabled:false
					},
					{
						title:"真实姓名",
						zhi:"",
						showname:"2",
						dialogtitle:"您要修改的真实姓名",
						placeholdertext:"请输入你的真实姓名",
						value3:"",
						name:"username",
						disabled:false
					},
					{
						title:"性别",
						zhi:"",
						showname:"3",
						dialogtitle:"您要修改的性别",
						placeholdertext:"性别男/女",
						value3:"",
						name:"usersex",
						disabled:false
					}
				],
				phonevalue:"",
				countdowntext:"验证码",
				wait:60,
				disabled:true,
				tokey:"",
				selectiondatalist:[],
				// defaultselectiondatalist:[[],[],[]]
			}
		},
		
		methods:{
			showModal(e,disabled) {
				this.modalName = e.currentTarget.dataset.target
				//拿道下标 当用户点击列表的时候弹出窗 后面的input不能编译
				let index = parseInt(this.modalName)
				this.Personalinformationlist[index-1].disabled= true
			},
			hideModal(e) {
				this.modalName = null
			},
			Modify(value4,index,bool){
				this.Personalinformationlist[index].disabled = false
				this.Personalinformationlist[index].zhi = value4
				this.$emit("changebool",false)
				this.$emit("changetext","确认修改")
				//当用户点击确定的时候 证明用户已经更改了信息 获取缓存中的值 进行比对
				this.modalName = null
			},
			toast(titletext){
				uni.showToast({
					title:titletext,
					icon:"none"
				})
			},
			selectiondata(e){
				this.selectiondatalist = e
			},
			//当用户点击了保存了以后
			btnsave(e){ //e是表单中的信息
				let {usernick,username,usersex,province,city,area} = e.mp.detail.value
				// console.log(usernick,username)
				// console.log(usersex)
			// 	// console.log(usernick,username,usersex,province,city,area)
				if(this.text=="确认修改"){
					// console.log("点击确认走过来了")
					if(usernick && username && usersex){
						// console.log("验证账号")
			// 			//这是验证账号
						let regusernick = /^[\W|\w]{5,20}$/;
			// 			//验证真实姓名
						let regusername = /^\W{2,10}$/;
			// 			//验证性别
						let regsex = /^[男|女]{1,1}$/
						let num = ""
						if(usersex=="男"){
							num = 0
						}else{
							num = 1
						}
						if(!(regusernick.test(usernick))){
							this.toast("请填写5到20个字符")
						}else if(!(regusername.test(username))){
							this.toast("请填写2到10个字符")
						}else if(!(regsex.test(usersex))){
							this.toast("亲！请选择正确的性别哦")
						}
						// console.log(num)
						if(regusernick.test(usernick) && regusername.test(username) && regsex.test(usersex)){
							// console.log(this.tokey,"已经获取到tokey")//获取到tokey
			// 				this.$emit("jsons",this.json)
							// console.log(this.json)//就拿到了父组件里面的值
							let {code} = this.json
							console.log(code,"已经获取到code码")
			// 				//如果code==0的时候代表tokey没过期 
							if(this.pathurl){
								if(code == 0){
									var src = this.json.data.src
								}else{
									var src = this.pathurl
								}
								// console.log(usernick,username,num,src)
								// console.log(this.selectiondatalist[0][0].area_id,this.selectiondatalist[1][0].area_id,this.selectiondatalist[2][0].area_id)
								// console.log(this.tokey)
			// 					//当全部的验证成功了  就发起请求
								uni.request({
									url:`${app.globalData.Requestpath}user/updateUserDetail`,
									method:"POST",
									data:{
										token:this.tokey,
										user_nick:usernick,
										real_name:username,
										user_sex:num,
										province:this.selectiondatalist[0][0].area_id,
										city:this.selectiondatalist[1][0].area_id,
										area:this.selectiondatalist[2][0].area_id,
										user_pic:src
									},
									success:(res)=>{
										// console.log(res,"已经请求用户信息成功")
										if(res.data.code==0){
											uni.switchTab({
												url:"/pages/PersonalMy/PersonalMy"
											})
										}
									},
									fail(err){
										// console.log("请求失败")
										// console.log(err)
									}
								})
								
							}else{
								this.toast("请上传你的头像")
							}
						}
					}
				}
			}
		},
		components:{
			selection
		},
		props:["bool","text","json","pathurl"],
		created() {
			const _this = this
			
			//当页面初始化的时候取出tokey
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					//获取到用户的tokey值以后去请求获取用户的信息 做到初始化
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:_this.tokey
						},
						success(res) {
							if(res.data.code==0){
								// console.log(res.data.data)
								let {user_nick,real_name,user_sex,user_pic,province,city,area} = res.data.data
								//    用户昵称   姓名      性别    头像      省市县
								_this.$emit("srcurl",user_pic)
								let sex = user_sex
								if(sex==0){
									sex = "男"
								}else{
									sex = "女"
								}
								_this.Personalinformationlist[0].zhi = user_nick
								_this.Personalinformationlist[1].zhi = real_name
								_this.Personalinformationlist[2].zhi = sex
								_this.Personalinformationlist[0].value3 = user_nick
								_this.Personalinformationlist[1].value3 = real_name!==null?real_name:''
								_this.Personalinformationlist[2].value3 = sex
							}
						}
					})
				}
			})
			// console.log(_this.defaultselectiondatalist)
		},
		beforeUpdate() {
			const _this = this
			// _this.userupdata()
		}
	}
</script>

<style>
</style>
