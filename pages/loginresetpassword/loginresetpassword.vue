<template>
	<view class="smslogin">
		<logobg></logobg>
		<view class="sms">
			<form @submit="smslogin">
				<view class="cu-form-group">
					<!-- <view class=" verification title lg text-gray cuIcon-mobilefill cuIcon-people"></view> -->
					<input class="verification" placeholder="请输入用户名" v-model="username"  name="username"></input>
				</view>
				<view class="cu-form-group">
					<!-- <view class=" verification title lg text-gray cuIcon-mobilefill phone"></view> -->
					<input class="verification" placeholder="请输入手机号" v-model="phone" @change="validationphone" name="phone"></input>
				</view>
				<view class="cu-form-group">
					<input class="verification" placeholder="请输入验证码" name="sms"></input>
					<button class='cu-btn bg-green shadow newcu-btn' @tap="countdown"  :disabled="bool">{{countdowntext}}</button>
				</view>
				<view class="loginButton">
					<button 
						class="cu-btn block margin-tb-sm lg bg-gradual-red" 
						form-type="submit" 
					>
						下一步
					</button>
				</view>
			</form>
		</view>
		<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
	</view>
</template>

<script>
	//引入图标组件
	import logobg from "@/components/login/loginbg.vue";
	//引入返回的按钮
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	//引入登录的标题
	const app = getApp()
	export default {
		data() {//这是短信登录
			return {
				countdowntext:"验证码",
				wait:60,
				bool:false,
				phone:"",
				times:null,
				username:"",
			}
		},
		methods: {
			//点击验证码时
			countdown(){//
				let userphone = /^[1][3,4,5,7,8,9][0-9]{9}$/
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
				let userphone = /^[1][3,4,5,7,8,9][0-9]{9}$/
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
				const _this = this
				let {phone,sms,username} = e.detail.value
				let userphone = /^[1][3,4,5,7,8,9][0-9]{9}$/
				//这是给后端穿的参
				if(phone.match(userphone) && sms!=="" && username!==""){
					uni.request({
						url:`${app.globalData.Requestpath}user/forget_password`,
						method:"POST",
						data:{
							user_username:username,
							user_phone:phone,
							code:sms
						},
						success(res) {
							if(res.data.code==0){
								app.globalData.showtoastsame(res.data.msg)
								uni.navigateTo({
									url:`/pages/loginForgotpassword/loginForgotpassword`
								})
							}else{
								app.globalData.showtoastsame(res.data.msg)
							}
						}
					})
				}else{
					app.globalData.showtoastsame("请输入完整信息")
				}
			}
		},
		components:{
			logobg,
			defaultbgblackcolorwhitebar
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
		 .disabledlogin{
			 color:#fff;
			 padding:30rpx 0;
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
</style>
