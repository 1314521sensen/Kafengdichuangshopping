<template>
	<view class="login">
		 <!-- #ifdef APP-PLUS -->
			<view class="app-login">
				<!-- 这是图标 -->
				<logobg></logobg>
				<view class="from">
					<view class="cu-form-group margin-top inp">
						<input v-model="value1" @blur="Losefocus" placeholder="请输入您的账号" name="input" type="text"></input>
					</view>
					<view class="cu-form-group margin-top inp inp-bottom">
						<input v-model="value2" placeholder="请输入您的密码" name="input" type="password"></input>
					</view>
					<view class="sms-and-registration">
						<text @click="smslogin('/pages/SMSlogin/SMSlogin')">短信验证码登录</text>
						<text @click="smslogin('/pages/Freeregistration/Freeregistration')">免费注册</text>
					</view>
					<view class="loginButton" v-if="bool">
						<button class="cu-btn block bg-orange margin-tb-sm lg" @click="Logsubmit">
							<text class="cuIcon-loading2 cuIconfont-spin"></text> 登录
						</button>
					</view>
				</view>
			</view>
		 <!-- #endif -->
		<!-- 这是微信的登录的 微信登录需要在页面刚加载的时候就获取用户 -->
	</view>
</template>

<script>
	//引入图标组件
	import logobg from "@/components/login/loginbg.vue"
	export default {
		data() {
			return {
				value1:"",
				value2:"",
				bool:false
			}
		},
		methods: {
			Losefocus(){
				this.bool = true
			},
			Logsubmit(){
				let value1 = this.value1;
				let value2 = this.value2
				if(value1=="" && value2==""){
					return false
				}else{
					//进行请求后台数据接口 进行匹配密码跳转首页 将用户名和密码应用到缓存里
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
			},
			smslogin(url){
				uni.navigateTo({
					url
				})
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
					margin-bottom:80rpx;
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
</style>
