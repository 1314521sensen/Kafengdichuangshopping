<template>
	<view class="smslogin">
		<logobg></logobg>
		<view class="sms">
			<form @submit="smslogin">
				<view class="cu-form-group">
					<view class="title">+86</view>
					<input placeholder="请输入手机号" v-model="phone" @change="validationphone" name="phone"></input>
				</view>
				<view class="cu-form-group">
					<input placeholder="请输入验证码" name="sms"></input>
					<button class='cu-btn bg-green shadow' @tap="countdown"  :disabled="bool">{{countdowntext}}</button>
				</view>
				<!-- #ifdef APP-PLUS -->
					<view class="sms-and-registration">
						<text @tap="registration">免费注册</text>
					</view>
				<!-- #endif -->
				<view class="loginButton">
					<button class="cu-btn block bg-orange margin-tb-sm lg" form-type="submit">
						<text class="cuIcon-loading2 cuIconfont-spin"></text>短信登录
					</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	//引入图标组件
	import logobg from "@/components/login/loginbg.vue";
	const app = getApp()
	export default {
		data() {//这是短信登录
			return {
				countdowntext:"验证码",
				wait:60,
				bool:true,
				phone:"",
				times:null
			}
		},
		methods: {
			//点击验证码时
			countdown(){//
				this.regphone()
				//这个发起请求获取验证码
				let json = {
					mobile:this.phone,
					type:1
				}
				app.globalData.VerificationCode(json)
				this.time()
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
				// console.log(countdowntext,wait)
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
					//获取缓存中的微信code码换取后台的openid
					uni.getStorage({
						key:"wxcodekey",
						success(res){
							jsons.opened = res.data
							bingjson.openid = res.data
						}
					})
				if(phone.match(userphone) && sms!==""){//验证通过 就进行请求登录
					uni.request({
						url:"http://hbk.huiboke.com/api/login_and_register/userLogin",
						method:"POST",
						data:jsons,
						success(res){
							let token =  res.data.data.token
							// console.log(token)
							//当用户登录成功以后 将token存到缓存当中 为以后方便使用
							uni.setStorage({
								key:"usertokey",
								data:res.data.data.token
							})
							if(res.data.code==0){
								uni.request({
									url:`http://hbk.huiboke.com/api/user/getUserDetail`,
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
											// #ifdef APP-PLUS || H5
												uni.switchTab({
													url:"/pages/index/index"
												})
											// #endif
										}
									},
									fail(err){
										console.log(err)
									}
								})
								
							}else{
								uni.showToast({
									title:"验证码错误",
									icon:"none"
								})
							}
						},
						fail(err){
							uni.showToast({
								title:"手机号或验证码不正确",
								icon:"none"
							})
						}
					})
				}else{
					uni.showToast({
						title:"手机号或验证码不正确",
						icon:"none"
					})
				}
			},
			registration(){
				uni.navigateTo({
					url:"/pages/Freeregistration/Freeregistration"
				})
			}
		},
		components:{
			logobg
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #fff;
	}
	.smslogin{
		.sms{
			padding:0 25rpx;
			form{
				.cu-form-group{
					border-bottom:2rpx solid #ff5000;
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
		color:#fff;
		background-color:#39b54a;
	}
	.cu-btn[disabled]{
		opacity: 1;
	}
</style>
