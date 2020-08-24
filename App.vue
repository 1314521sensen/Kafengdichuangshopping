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
		onLaunch() {
			//设置h5的title标题
			// #ifdef H5
			document.title = "惠播客"
			// #endif
			// console.log(111,"为了测试更新")
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
				
				uni.getSystemInfo({
					success(res){
						
						let version = plus.runtime.version
						let Applicationnum = version.split('.').join('')
						// console.log(Applicationnum,"这是手机的")
						//判断用户是安卓还是苹果
						if(res.platform=="android"){
							//获取网络状态
							uni.getNetworkType({
								success(resnetworkType) {
									if(resnetworkType.networkType=="wifi"){
										_this.$store.commit("Appwholeupdate",{version:Applicationnum,modelboll:true})
									}else if(resnetworkType.networkType=="unknown" || resnetworkType.networkType=="ethernet"){
										// console.log("你正在使用其他网络")
										_this.$store.commit("Appwholeupdate",{version:Applicationnum,modelboll:false})
									}else if(resnetworkType.networkType=="none"){
										// console.log("无网络")
									}else{
										_this.$store.commit("Appwholeupdate",{version:Applicationnum,modelboll:false})
										// setTimeout(()=>{
										// 	uni.showModal({
										// 		title:`您正在使用${resnetworkType.networkType}网络`,
										// 		content:"您确定要更新APP吗",
										// 		showCancel:true,
										// 		cancelText:"稍后更新",
										// 		confirmText:"立即更新",
										// 		success(resbtn) {
										// 			if(resbtn.confirm){
										// 				_this.$store.commit("Appwholeupdate",{version:Applicationnum,modelboll:false})
										// 			}
										// 		}
										// 	})
										// },10000)
									}
								}
							})
							_this.$store.commit("AppHotupdate",{version:Applicationnum})
						}
					},
					fail(err){
						console.log(err)
					}
				})
			// #endif
			//app热跟新---结束
			
			
			
			//引导页---开始
			// #ifdef APP-PLUS
				uni.getStorage({
					key:"Guidepagebool",
					success(res){
						// console.log(res)
						_this.globalData.Guidepagebool = true
						uni.redirectTo({
							url:"/pages/Startpage/Startpage"
						})
					},
					fail(err){
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
			//强制竖屏---开始
			// #ifdef APP-PLUS
				plus.screen.lockOrientation('portrait-primary');
			// #endif
			//轻质竖屏--结束
			//获取用户当前的位置---开始
			// #ifdef APP-PLUS
				plus.geolocation.getCurrentPosition(function(position){
					// console.log(position)
				},function(e){
					// console.log(e,'111')
				})
			// #endif
			//获取用户当前的位置----结束
			
			// push推送---开始
			// #ifdef APP-PLUS
				// console.log(222)
				//将消息添加到系统通知栏中
				// plus.push.createMessage("您有一条新消息");
				//当用户点击系统消息 监听
				plus.push.addEventListener('click',function(msg){
				},false);
			// #endif
			//push推送结束---结束
			/*****/
			//一元专区 设置开关缓存 当app一打开的时候 就显示
			uni.setStorage({
				key:"one_yuan_bool",
				data:true
			})
			//控制登录弹窗是否显示
			//如果 用户同意以后 就让弹窗隐藏 如果没有值的 就让弹窗显示
			uni.getStorage({
				key:'loginprop',
				success(res){
					console.log(res)
				},
				fail(err){
					// console.log(err)
					//如果没有值的情况下 就让login里面的弹窗显示
					uni.setStorage({
						key:"loginprop",
						data:0
					})
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
	/* #ifndef APP-PLUS-NVUE*/
		@import "colorui/main.css";
		@import "colorui/icon.css";
		page {
			background-color: #DDDDDD;
		}
	/* #endif */
	@import "/static/stylenvue/stylenvue.css";
	/* #ifndef APP-PLUS-NVUE*/
		/* 这是活动首页的背景颜色 */
		.activityindexbg{
			background-color:red;
		}
	/* #endif */
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
