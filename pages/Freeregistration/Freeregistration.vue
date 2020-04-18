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
					<input placeholder="请输入您要注册的账号" v-model="username" name="username" type="text"></input>
				</view>
				<view class="cu-form-group margin-top inp inp-bottom">
					<view class="title">密码:</view>
					<input  placeholder="请设置您的密码" name="password" type="password"></input>
				</view>
				<view class="cu-form-group inp">
					<view class="title">+86</view>
					<input placeholder="请输入手机号" v-model="phone" @change="validationphone" name="phone"></input>
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
	const app = getApp()
	export default {
		//免费注册
		data() {
			return {
				countdowntext:"验证码",
				wait:60,
				disabled:true,
				username:"",
				phone:"",
				times:null
			}
		},
		methods: {
			//验证码
			countdown(){
				this.regphone()
				//在app.vue里面的globalData对象中封装了方法 用来请求信息 用户注册的时候传用户名
				let json = {
					mobile:this.phone,
					type:2,
					username:this.username
				}
				// console.log(json)
				//在app.vue中封装了函数 用来请求短信验证码
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
				//用户和手机不能为空
				if(this.username && this.phone.match(userphone)){
					this.disabled = false
					clearInterval(this.times)
				}else{
					this.disabled = true
					clearInterval(this.times)
					uni.showToast({
						title:"请输入正确的手机号或者用户名不能为空",
						icon:"none"
					})
				}
			},
			//验证码的秒数
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
			},
			//提交
			smslogin(e){
				// console.log(e)
				//获取里面的每一个值
				let {username,password,phone,phonecode} = e.detail.value
				//写两个正则
				//来匹配账号
				//账号必须为5到100位
				let regname = /^[\W|\w]{5,100}$/;
				//密码为6-16位 单词，数字加_
				let userpassword = /^\w{6,16}$/;
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				if(username.match(regname) && password.match(userpassword) && phone.match(userphone) && phonecode!==""){
					//如果都通过了 发起请求 就可以跳转到登录页面
					//这里是要传给后台的信息
					//这是app端的数据
					let registeredjson = {
						username:username,
						password:password,
						mobile_phone:phone,
						code:phonecode
					}
					//将用户微信与微信绑定的参数
					let bingjson = {
						login_type:"weixin",
						bind_type:"account",
						username:username
					}
					//这块来获取缓存中的微信的code码  拿code码去后端换取openid
					// #ifdef MP-WEIXIN
						//取缓存中值
						uni.getStorage({
							key:"wxcodekey",
							success(res){
								//成功了 就把code的码 给对象新增加了属性
								registeredjson.openid = res.data
								bingjson.openid = res.data
							}
						})
					// #endif
					//这里进行请求
					uni.request({
						url:"http://hbk.huiboke.com/api/login_and_register/userRegister",
						method:"POST",
						data:registeredjson,
						success(res){//请求成功的时候
							if(res.data.code==0){
								// #ifdef MP-WEIXIN
									console.log(bingjson)//明天这需要测试
									app.globalData.userbinding(bingjson)
								// #endif
								// #ifdef APP-PLUS
									//app直接跳转不用绑定
									uni.reLaunch({
										url:"/pages/login/login"
									})
								// #endif
							}else{
								uni.showToast({
									title:"该用户已经注册过了",
									icon:"none"
								})
							}
						},
						fail(){//请求失败的时候
							uni.showToast({
								title:"注册失败",
								icon:"none"
							})
						}
					})
				}else{
					uni.showToast({
						title:"您填写的信息不正确",
						icon:"none"
					})
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
	// button[disabled]:not([type])
	button[disabled]:not([type]){
		color:#fff;
		background-color:#39b54a;
	}
	.cu-btn[disabled]{
		opacity: 1;
	}
</style>
