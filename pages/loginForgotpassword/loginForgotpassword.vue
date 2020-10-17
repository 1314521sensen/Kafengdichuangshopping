<template>
	<view class="smslogin">
		<logobg></logobg>
		<logintitle msg="重置密码"></logintitle>
		<view class="sms">
			<form @submit="smslogin">
				<view class="cu-form-group">
					<!-- <view class=" verification title lg text-gray cuIcon-mobilefill cuIcon-people"></view> -->
					<input class="verification" placeholder="请输入用户名"  name="username"></input>
				</view>
				<view class="cu-form-group">
					<!-- <view class=" verification title lg text-gray cuIcon-mobilefill phone"></view> -->
					<input class="verification" placeholder="请输入6~16新密码" name="password" type="password"></input>
				</view>
				<view class="cu-form-group">
					<input class="verification" placeholder="请确认密码" name="confirmpassword" type="password"></input>
				</view>
				<view class="loginButton">
					<button 
						class="cu-btn block margin-tb-sm lg bg-gradual-red" 
						form-type="submit" 
						:disabled="disabledlogin"
						:class="disabledlogin?'disabledlogin':''"
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
	//引入登录的标题
	import logintitle from "@/components/login/logintitle.vue"
	//引入返回按钮
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	export default {
		data() {//这是短信登录
			return {
				disabledlogin:false
			}
		},
		methods: {
			smslogin(e){
				let reguserpassword = /^\w{6,16}$/;
				// console.log(e.target.value)
				let {username,password,confirmpassword} = e.target.value
				// console.log(password.match(reguserpassword))
				if(username!=='' && password.match(reguserpassword) && confirmpassword == password){
					uni.request({
						url:`${app.globalData.Requestpath}user/reset_password`,
						method:"POST",
						data:{
							user_username:username,
							password:password,
							confirm_password:confirmpassword
						},
						success(res) {
							if(res.data.code==0){
								app.globalData.showtoastsame(res.data.msg)
								// uni.reLaunch({
								// 	url:`/pages/login/login`
								// })
								uni.navigateBack({
									delta:2
								})
							}else{
								app.globalData.showtoastsame(res.data.msg)
							}
						}
					})
				}else{
					app.globalData.showtoastsame("信息填写错误")
				}
			}
		},
		components:{
			logobg,
			logintitle,
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
