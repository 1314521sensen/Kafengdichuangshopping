<script>
	export default {
		globalData:{
			statusBar:0,
			Requestpath:"http://hbk.huiboke.com/api/",
			imgyuming:"http://hbk.huiboke.com",
			logintokeybool:false,
			VerificationCode(json){//封装一个方法来获取验证码
				console.log(json)
				uni.request({
					url:"http://hbk.huiboke.com/api/common/getSMSCaptcha",
					method:"POST",
					data:json,
					success(res){//成功的回调
						console.log(res)
					}
				})
			},
			emailreg(json){
				uni.request({
					url:"http://hbk.huiboke.com/api/common/getEmailCaptcha",
					method:"POST",
					data:json,
					success(res) {
						
					}
				})
			},
			showtoastsame(message){//封装一个弹窗
				uni.showToast({
					title:message,
					icon:'none'
				})
			},
			Logback(messagelogin){//封装个函数 用于重新登录
				if(messagelogin=='令牌错误'){
					uni.reLaunch({
						url:"/pages/login/login"
					})
				}
			},
			//封装一个检测tokey值更新tokey值
			Detectionupdatetokey(tokey){
				uni.request({
					url:"http://hbk.huiboke.com/api/common/refreshToken",
					method:"POST",
					data:{
						token:tokey
					},
					success(res) {
						if(res.data.code==1){
							uni.reLaunch({
								url:"/pages/login/login"
							})
							getApp().globalData.logintokeybool = false
						}else{
							getApp().globalData.logintokeybool = true
						}
					}
				})
			},
			//封装tokey过期了
			Requestmethod(codetokey,messagetokey){
				if(codetokey==1 && messagetokey=='令牌错误'){//说明tokey过期了 跳转到登录页面
					uni.reLaunch({
						url:"/pages/login/login"
					})
					getApp().globalData.logintokeybool = false
				}else{
					// console.log("tokey没过期")
				}
			}
		},
		onLaunch: function() {
			const _this = this
			uni.getSystemInfo({
				success(e){
					_this.globalData.statusBar = e.statusBarHeight
					// console.log(e.statusBarHeight)
				}
			})
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	page {
		background-color: #DDDDDD;
	}
	/* checkbox .uni-checkbox-input{
		border-radius:50%;
		width: 34rpx;
		height:34rpx;
	} */
	/* checkbox .uni-checkbox-input:hover{
		border-color:#ccc !important;
		background-color: #ee6c29;
		top:2rpx;
		right:8rpx;
	} */
	/* .checkboxs .uni-checkbox-input:hover{
		right:8rpx;
		top:0rpx !important;
	} */
</style>
