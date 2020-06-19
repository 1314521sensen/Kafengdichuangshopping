<script>
	export default {
		globalData:{
			statusBar:0,
			Requestpath:"http://hbk.huiboke.com/api/",
			imgyuming:"http://hbk.huiboke.com",
			logintokeybool:false,
			Guidepagebool:false,//这是用于判断 用户的引导页
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
			},
		},
		//此生命周期只会app打开时 只会触发一次
		onLaunch: function() {
			const _this = this
			//这里为了设置状态栏的高 ----开始
			uni.getSystemInfo({
				success(e){
					_this.globalData.statusBar = e.statusBarHeight
					// console.log(e.statusBarHeight)
				}
			})
			////这里为了设置状态栏的高 ----结束
			// #ifdef APP-PLUS
				// console.log(plus.runtime.version)//这是版本号
				// console.log(plus.runtime.appid)//这是appid
				// console.log(plus.os.name)//这是Android
			// #endif
			//接下来启动页---开始
				//通过缓存来控制是否显示启动页
				// #ifdef APP-PLUS
				uni.setStorage({
					key:"Startpagebool",
					data:true
				})
				// #endif
			//启动页结束
			//app热更新---开始
			// #ifdef APP-PLUS
			// console.log(plus.runtime.version)//这是版本名称号
			// console.log(plus.runtime.versionCode)
			// let Applicationnum = plus.runtime.version.split('.').join('')
			// console.log(Applicationnum)
			// console.log(plus.runtime.appid)//这是appid
			// console.log(plus.os.name)//这是Android
			// #endif
			//app热跟新---结束
			//引导页---开始
			// #ifdef APP-PLUS
				
				uni.getStorage({
					key:"Guidepagebool",
					success(res){
						console.log(res)
						_this.globalData.Guidepagebool = true
						uni.redirectTo({
							url:"/pages/Startpage/Startpage"
						})
					},
					fail(err){
						console.log(err)
						_this.globalData.Guidepagebool = false
						uni.redirectTo({
							url:"/pages/Guidepage/Guidepage"
						})
						uni.setStorage({
							key:"Guidepagebool",
							data:true,
						})
					}
				})
			// #endif
			//引导页---结束
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
	/* #ifndef APP-PLUS-NVUE*/
		@import "colorui/main.css";
		@import "colorui/icon.css";
		page {
			background-color: #DDDDDD;
		}
	/* #endif */
	@import "/static/stylenvue/stylenvue.css";
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
