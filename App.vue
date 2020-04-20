<script>
	export default {
		globalData:{
			statusBar:0,
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
			//提示用户平台有多次登录让用户认真操作每一步
			uni.showToast({
				title:"平台为确保用户的信息安全,进行了多型登录",
				icon:"none",
				duration:3000
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
