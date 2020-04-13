<template>
	<view class="freeregistration">
		<view class="freeregistration-title">
			<text>用户注册</text>
			<text>亲,欢迎注册账号</text>
		</view>
		<view class="form">
			<form @submit="smslogin">
				<view class="cu-form-group margin-top inp">
					<view class="title">账号:</view>
					<input placeholder="请输入您要注册的账号" name="input" type="text"></input>
				</view>
				<view class="cu-form-group margin-top inp inp-bottom">
					<view class="title">密码:</view>
					<input  placeholder="请设置您的密码" name="password" type="password"></input>
				</view>
				<view class="cu-form-group inp">
					<view class="title">+86</view>
					<input placeholder="请输入手机号" name="phone"></input>
				</view>
				<view class="cu-form-group inp">
					<input placeholder="请输入验证码" name="phonecode"></input>
					<button class='cu-btn bg-green shadow' @tap="countdown" :disabled="disabled">{{countdowntext}}</button>
				</view>
				<view class="loginButton">
					<button class="cu-btn block bg-orange margin-tb-sm lg" loading form-type="submit">
						注册
					</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		//免费注册
		data() {
			return {
				countdowntext:"验证码",
				wait:60,
				disabled:false
			}
		},
		methods: {
			//验证码
			countdown(){
				this.time()
			},
			//验证码的秒数
			time(){
				let times = null
				this.disabled = true
				//这块点击反复执行定时器
				// clearInterval(times)
				let {countdowntext,wait} = this.$data
				// console.log(countdowntext,wait)
					times = setInterval(()=>{
						wait--
						// console.log(wait)
						this.countdowntext = wait
						if(wait==0){
							this.disabled = false
							countdowntext = "重新获取验证码"
							clearInterval(times)
							this.countdowntext = countdowntext
							this.wait = 60
						}
						
					},1000)
			},
			//提交
			smslogin(e){
				let {input,password} = e.detail.value
				// console.log(input,password)
				if(input && password){
					//设置缓存
					uni.setStorage({
					    key: 'registered',
					    data: {
							"input":input,
							"password":password
						},
					    success(res){
							console.log(res)
						},
						fail(err){
							console.log(err)
						}
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #fff;
	}
	.freeregistration{
		padding:0 30rpx;
		.freeregistration-title{
			overflow:hidden;
			text{
				display:block;
				font-size: 40rpx;
				margin-top:28rpx;
				&:last-child{
					font-size: 30rpx;
					color:#999;
				}
			}
		}
		form{
			padding:0 30rpx;
			.inp{
				border-bottom:2rpx solid #ff5000;
				min-height:80rpx;
				margin-bottom:36rpx;
			}
			.inp-bottom{
				margin-bottom:25rpx;
			}
			.cu-form-group{
				border-bottom:2rpx solid #ff5000;
				margin-bottom:20rpx;
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
	.cu-form-group+.cu-form-group{
		border-top:0;
	}
</style>
