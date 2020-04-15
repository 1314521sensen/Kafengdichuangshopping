<template>
	<view class="smslogin">
		<logobg></logobg>
		<view class="sms">
			<form @submit="smslogin">
				<view class="cu-form-group">
					<view class="title">+86</view>
					<input placeholder="请输入手机号" name="input"></input>
				</view>
				<view class="cu-form-group">
					<input placeholder="请输入验证码" name="sms"></input>
					<button class='cu-btn bg-green shadow' @click="countdown" :disabled="bool">{{countdowntext}}</button>
				</view>
				<!-- #ifdef APP-PLUS -->
					<view class="sms-and-registration">
						<text @click="registration">免费注册</text>
					</view>
				<!-- #endif -->
				<view class="loginButton">
					<button class="cu-btn block bg-orange margin-tb-sm lg" form-type="submit" :disabled="disabled">
						<text class="cuIcon-loading2 cuIconfont-spin"></text>短信登录
					</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	//引入图标组件
	import logobg from "@/components/login/loginbg.vue"
	export default {
		data() {//这是短信登录
			return {
				countdowntext:"验证码",
				wait:60,
				disabled:true,
				bool:false
			}
		},
		methods: {
			//点击验证码时
			countdown(){
				this.disabled = false
				//这是当前的时候
				// let date = new Date()
				// //这是1分钟后的时间
				// let latetime = new Date()
				this.time()
			},
			time(){
				let times = null
				this.bool = true
				//这块点击反复执行定时器
				// clearInterval(times)
				let {countdowntext,wait} = this.$data
				// console.log(countdowntext,wait)
					times = setInterval(()=>{
						wait--
						// console.log(wait)
						this.countdowntext = wait
						if(wait==0){
							this.bool = false
							countdowntext = "重新获取验证码"
							clearInterval(times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
						
					},1000)
			},
			//点击button的时候
			smslogin(e){
				console.log("点击按钮生效")
				console.log(e)
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
</style>
