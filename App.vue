<script>
	export default {
		globalData:{
			statusBar:0
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
