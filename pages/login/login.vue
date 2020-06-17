<template>
	<view class="login">
			<view class="app-login">
				<!-- 这是图标 -->
				<logobg></logobg>
				<logintitle msg="用户名登录"></logintitle>
				<view class="from">
					<form @submit="ordinarylogin">
						<view class="cu-form-group margin-top inp">
							<view class="lg text-gray cuIcon-myfill title" ></view>
							<input placeholder="请输入您的用户名" v-model="username" name="username" type="text"></input>
						</view>
						<view class="cu-form-group margin-top inp inp-bottom">
							<view class="lg text-gray cuIcon-lock title"></view>
							<input  placeholder="请输入您的密码" name="password" type="password"></input>
						</view>
						<view class="sms-and-registration">
							<!-- 这里的app和微信显示暂时先注释 -->
							<!--#ifdef APP-PLUS || MP-WEIXIN || H5 -->
								<text @tap="smslogin('/pages/SMSlogin/SMSlogin')">短信验证码登录</text>
							<!-- #endif -->
						</view>
						<view class="loginButton">
							<button class="cu-btn bg-gradual-red round register" form-type="submit">登录</button>
							<!-- #ifdef APP-PLUS || H5 -->
								<button class="cu-btn  round login-one" @tap="smslogin('/pages/Freeregistration/Freeregistration')">注册</button>	
							<!--#endif -->
							<button class="cu-btn bg-gradual-green round login-one" @tap="returnindex">返回首页</button>
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
	//引入登录的标题
	import logintitle from "@/components/login/logintitle.vue"
	const app = getApp()
	export default {
		data() {
			return {
				bool:false,
				username:""
			}
		},
		methods: {
			//这是点击跳转到短信登录
			smslogin(url){
				uni.navigateTo({
					url
				})
			},
			//用户没有登录的情况下 返回首页
			returnindex(){
				uni.switchTab({
					url:"/pages/index/index"
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
					url:`${app.globalData.Requestpath}login_and_register/userLogin`,
					method:"POST",
					data,
					success:(res)=>{
						if(res.data.code==0){
							// #ifdef APP-PLUS || H5 || MP-WEIXIN
								uni.setStorage({//这个是把tokey存起来
									key:"bindtokey",
									data:res.data.data.token
								})
							// #endif
							// #ifdef MP-WEIXIN
								//如果登录成功了 就设置 用户登录状态码loginstate 为1
								uni.setStorage({
									key:"loginstate",
									data:1
								})
							// #endif
							// #ifdef APP-PLUS || H5
								this.toast("登录成功")
								uni.switchTab({
									url:"/pages/index/index"
								})
							// #endif
						}else{
							this.toast(res.data.msg)
							//否则就设置用户登录的状态的码 为0
								uni.setStorage({
									key:"loginstate",
									data:0
								})
						}
					},
					fail:(err)=>{
						this.toast("登录失败")
					}
				})
			},
			//当用户点击的button
			ordinarylogin(e){
				let {username,password} = e.detail.value
				//写两个正则
				//这是验证账号
				let regusername = /^[\W|\w]{2,20}$/;
				//这是验证密码
				let reguserpassword = /^\w{6,16}$/;
				// #ifdef APP-PLUS || H5
				//这是APP端
					if(username.match(regusername) && password.match(reguserpassword)){
						let data = {
							login_type:"normal",
							username:username,	
							password:password
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
			}
		},
		components:{
			logobg,
			logintitle
		}
	}
</script>

<style lang="less" scoped>
	.login{
		display:flex;
		justify-content: center;
		height:100vh;
		background-color: #fff;
	  .app-login{
	   width: 80%;
	   // height:70rpx;
	   // background-color: red;
	   .logo{
	    display:flex;
	    justify-content: center;
	    align-items: center;
	    height:300rpx;
	   }
	   .from{
	    .inp{
	     border-bottom:2rpx solid #CCCCCC;
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
	  color:red;
	  border: 2rpx solid #FF0000;
	  height: 40rpx;
	  
	 }
	 .cu-btn[disabled]{
	  opacity: 1;
	 }
	 .fa-verification{
	  border-bottom-color: #FFFFFF !important;
	  margin-top: 40rpx;
	  .verification{
	   border-bottom:2rpx solid #CCCCCC;
	   display: inline-block;
	   
	  }
	  .verify{
	   border-radius: 30rpx;
	  }
	 }
	 .register{
	  margin-top: 50rpx;
	  width: 100%;
	 }
	 .login-one{
	  margin-top: 50rpx;
	  width: 100%;
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
</style>
