<template>
	<view class="freeregistration">
		<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
		<view class="newfreeregistration">
			<view class="freeregistration-title">
				<view class="register-img" :style="{'background-image':'url('+this.$store.state.httpUrl+'logo.png'+')'}"></view>
				<view>
					<view class="Back_index">
						<text class="text_title">亲,欢迎注册账号</text>
						<text @tap="Back_index">返回首页</text>
					</view>
				</view>
			</view>
			<view class="form">
				<form @submit="smslogin">
					<view class="cu-form-group margin-top inp">
						<view class="title">账号:</view>
						<input placeholder="注册账号至少2位最多20位" v-model="username" name="username" type="text"></input>
					</view>
					<view class="cu-form-group margin-top inp inp-bottom">
						<view class="title">密码:</view>
						<input  placeholder="最小设置6位,包含单词数字下划线" name="password" type="password" v-model="password"></input>
					</view>
					<view class="cu-form-group margin-top inp inp-bottom">
						<view class="title">确认密码:</view>
						<input  placeholder="请输入确认密码" name="Confirmpassword" type="password" v-model="Confirmpassword"></input>
					</view>
					<view class="cu-form-group inp">
						<view class="title">+86</view>
						<input placeholder="请输入手机号" v-model="phone" @change="validationphone" name="phone"></input>
					</view>
					<view class=" fa-verification cu-form-group inp">
						<input class="verification" placeholder="请输入验证码" name="phonecode"></input>
						<button class='cu-btn bg-green shadow newcu-btn' @tap="countdown" :disabled="disabled">{{countdowntext}}</button>
					</view>
					<view class="fa_referrer_mobile cu-form-group" v-if="bool">
						<input type="text" placeholder="推荐人手机号(选填)" name="referrer_mobile" v-model="referrer_mobile"/>
					</view>
					
					<view class="loginButton">
						<button class="bg-gradual-red cu-btn block bg-orange margin-tb-sm lg" form-type="submit">
							注册
						</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	export default {
		//免费注册
		data() {
			return {
				countdowntext:"验证码",
				wait:60,
				disabled:false,
				username:"",
				phone:"",
				times:null,
				password:"",
				Confirmpassword:"",
				referrer_sc: '',
				referrer_mobile:'',
				bool:false,
				code:0,//分享人的code码
			}
		},
		methods: {
			Back_index(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			//验证码
			countdown(){
				let userphone = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if (this.password == this.Confirmpassword) {
					this.regphone()
					if(this.phone.match(userphone)){
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
					}else{
						return 
					}
				}else{
					app.globalData.showtoastsame("两次密码不一致")
				}
			},
			//验证手机号
			validationphone(){
				this.regphone()
			},
			//封装个匹配手机号的方法
			regphone(){
				let userphone = /^[1][3,4,5,7,8,9][0-9]{9}$/
				this.phone =this.phone.replace(/(^\s*)|(\s*$)/g, "");
				//用户和手机不能为空
				if (this.username && this.phone.match(userphone)) {
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
				// console.log(this.code)
				//获取里面的每一个值
				let {username,password,Confirmpassword,phone,phonecode,referrer_mobile} = e.detail.value
				//写两个正则
				//来匹配账号
				//账号必须为5到100位
				let regname = /^[\W|\w]{2,20}$/;
				//密码为6-16位 单词，数字加_
				let userpassword = /^\w{6,16}$/;
				let userphone = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if (!(username.match(regname))) {
					app.globalData.showtoastsame("注册账号至少2位最多20位")
				}else if(!(password.match(userpassword))){
					app.globalData.showtoastsame("密码最小设置6位,最大16位，包含单词数字下划线")
				}else if(password!==Confirmpassword){
					app.globalData.showtoastsame("请保持和前面的密码一致")
				}else if(!(phone.match(userphone))){
					app.globalData.showtoastsame("请输入正确的手机号")
				}else if(phonecode ==""){
					app.globalData.showtoastsame("请输入验证码")
				}
				if(password==Confirmpassword){
					if(username.match(regname) && password.match(userpassword) && phone.match(userphone) && phonecode!=="" ){
						// console.log("验证通过")
						// console.log()
						//如果都通过了 发起请求 就可以跳转到登录页面
						//这里是要传给后台的信息
						//这是app端的数据
						// console.log(myDate)
						let registeredjson = {
							username:username,
							password:password,
							mobile_phone:phone,
							user_phone_uuid:this.$store.state.uuid,
							code:phonecode,
							referrer_mobile:referrer_mobile,
							referrer_sc:this.code
						}
						//将用户微信与微信绑定的参数
						let bingjson = {
							login_type:"weixin",
							bind_type:"account",
							username:username,
							password:password
						}
						//这块来获取缓存中的微信的code码  拿code码去后端换取openid
						// #ifdef MP-WEIXIN
							//取缓存中值
							uni.getStorage({
								key:"wxcodekey",
								success(res){
									// console.log(res.data)
									//成功了 就把openid的码 给对象新增加了属性
									registeredjson.openid = res.data
									bingjson.opened = res.data
									// console.log(bingjson)
									uni.request({
										url:`${app.globalData.Requestpath}login_and_register/userRegister`,
										method:"POST",
										data:registeredjson,
										success(ress){//请求成功的时候
											// console.log(ress)
											if(ress.data.code==0){
													uni.request({
														url:`${app.globalData.Requestpath}login_and_register/userLogin`,
														method:"POST",
														data:bingjson,
														success(resquicklogin) {
															// console.log(resquicklogin)//当用户注册和绑定成功了 把tokey值存一下 把状态存一下
															if(resquicklogin.data.code==0){
																//设置用户绑定的tokey
															// #ifdef APP-PLUS || H5 || MP-WEIXIN
																uni.setStorage({
																	key:"bindtokey",
																	data:resquicklogin.data.data.token
																})
															// #endif
																//这里设置用户的登录状态码 为1
																uni.setStorage({
																	key:"loginstate",
																	data:1
																})
																uni.setStorage({
																	key:"userbindstate",
																	data:1,
																	success() {
																		uni.redirectTo({
																			url:"/pages/index/index"
																		})
																	}
																})
															}else{
																uni.setStorage({
																	key:"loginstate",
																	data:0
																})
															}
														}
													})
											}else{
												app.globalData.showtoastsame(ress.data.msg)
											}
										},
										fail(){//请求失败的时候
											uni.showToast({
												title:"注册失败",
												icon:"none"
											})
										}
									})
								}
							})
						// #endif
						//这里进行请求
						// #ifdef APP-PLUS || H5
						// console.log(registeredjson)
						uni.request({
							url:`${app.globalData.Requestpath}login_and_register/userRegister`,
							method:"POST",
							data:registeredjson,
							success(res){//请求成功的时候
							// console.log(res)
								if(res.data.code==0){
									// #ifdef APP-PLUS || H5
										//app直接跳转不用绑定
										//这里设置用户的登录状态码 为1loginstate
										uni.setStorage({
											key:"loginstate",
											data:1
										})
										uni.setStorage({//这个是把tokey存起来
											key:"bindtokey",
											data:res.data.data.token
										})
										uni.setStorage({
											key:"userbindstate",
											data:1,
											success() {
												uni.reLaunch({
													url:"/pages/index/index"
												})
											}
										})
									// #endif
								}else{
									uni.showToast({
										title:res.data.msg,
										icon:"none",
										success() {
											uni.showModal({
												title:res.data.msg,
												content:"是否前往登录页面",
												showCancel:true,
												cancelText:"取消",
												cancelColor:"#ff0000",
												confirmText:"确认前往",
												confirmColor:"#00ff00",
												success(res) {
													if(res.confirm){
														uni.navigateBack()
													}
												}
											})
										}
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
						// #endif
					}
					// else{
					// 	uni.showToast({
					// 		title:"您填写的信息不正确",
					// 		icon:"none"
					// 	})
					// }
				}
				// else{
				// 	app.globalData.showtoastsame("请保持和前面的密码一致")
				// }
			}
		},
		onLoad(opction) {
			// console.log(opction)
			const _this = this
			if(opction.type==1){
				_this.bool = false
			}
			//这是扫码进来的-----开始
			let {code} = opction
			
			if(code){
				_this.bool = false
				_this.code = code
			}else{
				_this.bool = true
			}
			//这是扫码进来的---结束
		},
		components:{
			defaultbgblackcolorwhitebar
		}
	}
</script>

<style lang="less" scoped>
	 .freeregistration{
	  display:flex;
	  justify-content: center;
	  height:100vh;
	  overflow: hidden;
	  background-color: #fff;
	  .newfreeregistration{
		  width: 80%;
	  }
	  .freeregistration-title{
	   .register-img{
	    height: 130rpx;
	    width: 130rpx;
		background-size: 100% 100%;
	    // background-color: red;
	    border-radius: 10rpx;
	    margin: 100rpx auto 100rpx;
	    
	   }
	   overflow:hidden;
	   .text_title{
	    display:block;
	    font-size:30rpx;
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
	    border-bottom:2rpx solid #CCCCCC;
	    margin-bottom:20rpx;
		padding:1rpx 8rpx;
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
	  height: 40rpx;
	  color:red;
	  border-radius: 30rpx;
	  border:2rpx solid red;
	  // background-color:#39b54a;
	 }
	 .cu-btn[disabled]{
	  opacity: 1;
	 }
	 
	 .fa-verification{
	  // border-bottom-color: #FFFFFF !important;
	  margin-top: 40rpx;
	  border-bottom:2rpx solid #ccc;
	  .verification{
	   // border-bottom:2rpx solid #CCCCCC;
	   display: inline-block;
	   
	  }
	  .verify{
	   border-radius: 30rpx;
	  }
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
	 .Back_index{
		 display:flex;
		 justify-content: space-between;
		 align-items:flex-end;
		 font-size: 24rpx;
		 color:#999;
	 }
</style>
