<template>
	<view class="login">
			<view class="app-login">
				<!-- 这是图标 -->
				<logobg></logobg>
				<view class="from">
					<form @submit="ordinarylogin">
						<view class="cu-form-group margin-top inp">
							<input  @blur="Losefocus" placeholder="请输入您的账号" v-model="username" name="username" type="text"></input>
						</view>
						<view class="cu-form-group margin-top inp inp-bottom">
							<input  placeholder="请输入您的密码" name="password" type="password"></input>
						</view>
						<!--#ifdef APP-PLUS || H5 -->
							<view class="cu-form-group margin-top inp">
								<view class="title">+86</view>
								<input placeholder="请输入手机号" @change="validationphone" v-model="phone" name="phone"></input>
							</view>
							<view class="cu-form-group margin-top inp">
								<input placeholder="请输入验证码" name="sms"></input>
								<button class='cu-btn bg-green shadow' @tap="countdown" :disabled="disabled">{{countdowntext}}</button>
							</view>
						<!-- #endif -->
						<view class="sms-and-registration">
							<!-- 这里的app和微信显示暂时先注释 -->
							<!--#ifdef APP-PLUS || MP-WEIXIN || H5 -->
								<text @tap="smslogin('/pages/SMSlogin/SMSlogin')">短信验证码登录</text>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS || H5 -->
								<text @tap="smslogin('/pages/Freeregistration/Freeregistration')">免费注册</text>
							<!--#endif -->
						</view>
						<view class="loginButton" v-if="bool">
							<button class="cu-btn block bg-orange margin-tb-sm lg" form-type="submit">
								<text class="cuIcon-loading2 cuIconfont-spin"></text> 登录
							</button>
						</view>
					</form>
				</view>
			</view>
		 
		<!-- 这是微信的登录的 微信登录需要在页面刚加载的时候就获取用户 -->
	</view>
</template>

<script>
	//引入图标组件
	import logobg from "@/components/login/loginbg.vue"
	const app = getApp()
	export default {
		data() {
			return {
				bool:false,
				countdowntext:"验证码",
				wait:60,
				disabled:true,
				username:"",
				phone:"",
				times:null
			}
		},
		methods: {
			//当失去焦点的时候
			Losefocus(){
				this.bool = true
			},
		// #ifdef APP-PLUS || H5
			//点击验证码时
			countdown(){
				this.regphone()
				//在这里发起验证码的请求  //注：微信的话没有手机号登录  没有验证码
				uni.request({
					url:"http://hbk.huiboke.com/api/common/getSMSCaptcha",
					method:"POST",
					data:{
						mobile:this.phone,
						type:1,
						username:this.username
					},
					success(res){
						console.log(res)
					},
					fail(err){
						console.log(err)
					}
				})
				this.time()
			},
			
			//这是当输入手机号失去焦点的时候
			validationphone(){
				this.regphone()
			},
			//封装个方法来验证手机号
			regphone(){
				let regusername = /^[\W|\w]{5,100}$/;
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				if(this.username.match(regusername) && this.phone.match(userphone)){
					this.disabled = false
					clearInterval(this.times)
				}else{
					this.disabled = true
					clearInterval(this.times)
					this.wait = 60
					uni.showToast({
						title:"请输入正确的手机号或者用户名不能为空",
						icon:"none"
					})
				}
			},
		// #endif
			//这是点击跳转到短信登录
			smslogin(url){
				uni.navigateTo({
					url
				})
			},
			//封装一个提示框的方法
			toast(message){
				uni.showToast({
					title:message,
					icon:"none"
				})
			},
			//封装一个app和微信端 不同的登录请求方法
			Ordinarydifferentlogin(data,username,password,bingjson){
				uni.request({
					url:"http://hbk.huiboke.com/api/login_and_register/userLogin",
					method:"POST",
					data,
					success:(res)=>{
						uni.setStorage({
							key:"usertokey",
							data:res.data.data.token
						})
						if(res.data.code==0){
							console.log("已经走过来了")
							uni.request({
								url:"http://hbk.huiboke.com/api/user/getUserDetail",
								method:"POST",
								data:{
									token:res.data.data.token
								},
								success:(resinfo)=>{
									if(resinfo.data.code==0){
										// #ifdef APP-PLUS || H5
											this.toast("登录成功")
											uni.setStorage({
												key:"userinfokey",
												data:resinfo.data.data
											})
											uni.switchTab({
												url:"/pages/index/index"
											})
										//#endif
									}
								},
								fail:(err)=>{
									this.toast("登录失败")
								}
							})
						}else{
							this.toast("验证码错误")
						}
					},
					fail:(err)=>{
						this.toast("登录失败")
					}
				})
			},
			//当用户点击的button
			ordinarylogin(e){
				let {username,password,phone,sms} = e.detail.value
				//写两个正则
				//这是验证账号
				let regusername = /^[\W|\w]{5,100}$/;
				//这是验证密码
				let reguserpassword = /^\w{6,16}$/;
				// #ifdef APP-PLUS || H5
				//这是APP端
					let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
					username.match(regusername)
					if(username.match(regusername) && password.match(reguserpassword) && phone.match(userphone) && sms!==""){
						let data = {
							login_type:"normal",
							username:username,	
							password:password,
							user_phone:phone,
							code:sms
						}
						this.Ordinarydifferentlogin(data,username,password)
					}else{
						this.toast("请填写完整信息")
					}
				// #endif
				// #ifdef MP-WEIXIN
					//这是微信端
					uni.getStorage({
						key:"wxcodekey",
						success:(res)=>{
							if(username.match(regusername) && password.match(reguserpassword)){
								let data = {
									login_type:"weixin",
									username:username,
									password:password,
									opened:res.data
								}
								//将微信和app绑定
								let bingjson = {
									login_type:"weixin",
									bind_type:"account",
									openid:res.data,
									username:username
								}
								this.Ordinarydifferentlogin(data,username,password,bingjson)
							}else{
								this.toast("请填写完整信息")
							}
						}
					})
				// #endif
			},
			//这是封装点击验证码的倒计时
			time(){
				this.disabled = true
				//这块点击反复执行定时器
				// clearInterval(times)
				let {countdowntext,wait} = this.$data
				// console.log(countdowntext,wait)
					this.times = setInterval(()=>{
						wait--
						// console.log(wait)
						this.countdowntext = wait
						if(wait==0){
							this.disabled = false
							countdowntext = "重新获取验证码"
							clearInterval(this.times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
						
					},1000)
			}
		},
		components:{
			logobg
		}
	}
</script>

<style lang="less" scoped>
	.login{
		height:100vh;
		background-color: #fff;
		.app-login{
			width: 100%;
			// height:70rpx;
			// background-color: red;
			.logo{
				display:flex;
				justify-content: center;
				align-items: center;
				height:300rpx;
			}
			.from{
				padding:0 30rpx;
				.inp{
					border-bottom:2rpx solid #ff5000;
					min-height:60rpx;
					margin-bottom:46rpx;
				}
				.inp-bottom{
					margin-bottom:25rpx;
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
