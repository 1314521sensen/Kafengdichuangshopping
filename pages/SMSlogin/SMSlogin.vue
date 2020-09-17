<template>
	<view class="smslogin">
		<!-- <defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar> -->
		<logobg></logobg>
		<logintitle msg="验证码登录"></logintitle>
		<view class="sms">
			<form @submit="smslogin">
				<view class="cu-form-group">
					<view class=" verification title lg text-gray cuIcon-mobilefill phone"></view>
					<input class="verification" placeholder="请输入手机号" v-model="phone" @change="validationphone" name="phone"></input>
				</view>
				<view class="cu-form-group">
					<input class="verification" placeholder="请输入验证码" name="sms"></input>
					<button class='cu-btn bg-green shadow newcu-btn' @tap="countdown"  :disabled="bool">{{countdowntext}}</button>
				</view>
				<!-- #ifdef APP-PLUS -->
					<view class="loginBox">
						<view class="userslogin">
							<text @tap="nameLogin" >用户名登录</text>
						</view>
						<view class="sms-and-registration">
							<text @tap="registration">免费注册</text>
						</view>
					</view>
				<!-- #endif -->
				<view class="loginButton">
					<button class="cu-btn block margin-tb-sm lg bg-gradual-red" form-type="submit">
						<text class="cuIconfont-spin"></text>短信登录
					</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	//引入图标组件
	import logobg from "@/components/login/loginbg.vue";
	//引入登录的标题
	import logintitle from "@/components/login/logintitle.vue"
	// import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	export default {
		data() {//这是短信登录
			return {
				countdowntext:"验证码",
				wait:60,
				bool:false,
				phone:"",
				times:null
			}
		},
		methods: {
			nameLogin(){
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			//点击验证码时
			countdown(){//
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				this.regphone()
				//这个发起请求获取验证码
				if(this.phone.match(userphone)){
					// console.log("验证成功")
					
					let json = {
						mobile:this.phone,
						type:1
					}
					app.globalData.VerificationCode(json)
					this.time()
				}else{
					return 
				}
			},
			//验证手机号
			validationphone(){
				this.regphone()
			},
			//封装个匹配手机号的方法
			regphone(){
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				if(this.phone.match(userphone)){
					this.bool = false
					clearInterval(this.times)
				}else{
					this.bool = true
					clearInterval(this.times)
					this.wait = 60
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					})
				}
			},
			time(){
				this.bool = true
				let {countdowntext,wait} = this.$data
					this.times = setInterval(()=>{
						wait--
						// console.log(wait)
						this.countdowntext = wait
						if(wait==0){
							this.bool = false
							countdowntext = "重新获取验证码"
							clearInterval(this.times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
						
					},1000)
			},
			//点击button的时候 就进行登录验证
			smslogin(e){
				let {phone,sms} = e.detail.value
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				//这是给后端穿的参
				let jsons = {
					login_type:"mobile",
					user_phone:phone,
					code:sms
				}
					//获取缓存中的微信openid
				// #ifdef MP-WEIXIN
					uni.getStorage({
						key:"wxcodekey",
						success(res){
							jsons.opened = res.data
						}
					})
				// #endif
				if(phone.match(userphone) && sms!==""){//验证通过 就进行请求登录
					uni.request({
						url:`${app.globalData.Requestpath}login_and_register/userLogin`,
						method:"POST",
						data:jsons,
						success(res){
							if(res.data.code==0){
								let token =  res.data.data.token
									// console.log(token)
									//当用户登录成功以后 将token存到缓存当中 为以后方便使用
								// #ifdef APP-PLUS || H5 || MP-WEIXIN
									uni.setStorage({
										key:"bindtokey",
										data:res.data.data.token
									})
								// #endif
							
								//当用户登录成功设置用户登录的状态码 1
								// #ifdef MP-WEIXIN
									//如果登录成功了 就设置 用户登录状态码loginstate 为1
									uni.setStorage({
										key:"loginstate",
										data:1
									})
								// #endif
								uni.request({
									url:`${app.globalData.Requestpath}user/getUserDetail`,
									method:"POST",
									data:{
										token:token
									},
									success:(resinfo)=>{
										// console.log(resinfo)
										if(resinfo.data.code==0){
											//不管微信还是app都要加入缓存
											uni.setStorage({
												key:"userinfokey",
												data:resinfo.data.data
											})
											// #ifdef APP-PLUS || H5 || MP-WEIXIN
												uni.redirectTo({
													url:"/pages/index/index"
												})
											// #endif
										}
									},
									fail(err){
										// console.log(err)
									}
								})
								
							}else{
								// #ifdef MP-WEIXIN
									//如果登录成功了 就设置 用户登录状态码loginstate 为 0
									uni.setStorage({
										key:"loginstate",
										data:0
									})
								// #endif
								app.globalData.showtoastsame(res.data.msg)
							}
						},
						fail(err){
							app.globalData.showtoastsame("手机号或验证码不正确")
						}
					})
				}else{
					app.globalData.showtoastsame("手机号或验证码不正确")
				}
			},
			registration(){
				uni.navigateTo({
					url:"/pages/Freeregistration/Freeregistration"
				})
			}
		},
		components:{
			logobg,
			logintitle,
			// defaultbgblackcolorwhitebar
		}
	}
</script>

<style lang="less" scoped>
	// page{
	//   background-color: #fff;
	//  }
	 .smslogin{
		 height:100vh;
		 background-color: #fff;
	  .sms{
	   width: 90%;
	   margin: 0 auto;
	   padding:0 25rpx;
	   form{
	    .cu-form-group{
	     margin-bottom:20rpx;
	    }
	    .sms-and-registration{
	     font-size: 24rpx;
	     color:#999;
	     display: flex;
	     justify-content: space-between;
	    }
	    .loginButton{
	     margin-top:60rpx;
	     margin-bottom:0;
	     button{
	      border-radius:35rpx;
	     }
	    }
	   }
	  }
	 }
	 .cu-form-group+.cu-form-group{
	  border-top:0;
	 }
	 .cu-form-group+.cu-form-group{
	  border-top:0;
	 }
	 // button[disabled]:not([type])
	 button[disabled]:not([type]){
	  color:red;
	  border: 2rpx solid #FF0000;
	  border-radius: 20rpx;
	  height: 40rpx;
	 }
	 .cu-btn[disabled]{
	  opacity: 1;
	 }
	 .verification{
	  
	  border-bottom:2rpx solid #ff5000;
	  display: inline-block;
	  
	 }
	 .verification-btn{
	  display: inline-block;
	 }
	 
	 .phone{
	  margin-bottom: 18rpx;
	 }
	 .newcu-btn{
	 		 height:50rpx;
	 }
	 .bg-green{
	 		 border:2rpx solid red;
	 		 color:red;
	 		 background-color: #fff;
	 		 border-radius: 13px;
	 }
	  .loginBox{
	 		 display: flex;
	 		 flex-grow: 12;
	 		 .userslogin{
	 			 padding-left: 25rpx;
	 			 flex-grow: 3;
	 			 font-size: 24rpx;
	 			 color:#999;
	 		 }
	 	 }

</style>
