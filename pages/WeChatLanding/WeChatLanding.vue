<template>
	<view class="WeChatLanding" 
		:style="{'background-image':'url('+this.$store.state.httpUrl+'WeChatLanding/WeChatLanding.png'+')','padding-top':statusBar+'rpx'}"
		 @tap="WeChatbinding"
	>
	<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
	</view>
</template>

<script>
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0
			}
		},
		methods:{
			WeChatbinding(){
				// #ifdef APP-PLUS
					const _this = this
					uni.getStorage({
						key:"bindtokey",
						success(restokey) {
							var auths = null
							let appid = "wx0f9236b57d357dbb"
							let secret = "f32abb9c6bc9446b211d57b02feca44c"
							plus.oauth.getServices(function(servies){  
								auths = servies;
								var s = auths[0];
								// console.log(s)
								if( !s.authResult ){
									s.authorize(function(rescode){
										// console.log(rescode,"获取code码")
										uni.request({
											url:`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${rescode.code}&grant_type=authorization_code`,
											success(resopenid) {
												// console.log(resopenid,"获取到openid")
												uni.request({
													url:`${app.globalData.Requestpath}user/bindopenid`,
													method:"POST",
													data:{
														token:restokey.data,
														openid:resopenid.data.openid
													},
													success(bindopenid) {
														// console.log(bindopenid)
														if(bindopenid.data.code==0){
															app.globalData.showtoastsame("绑定成功")
															uni.setStorage({
																key:"bindopenid",
																data:resopenid.data.openid,
																success() {
																	// uni.redirectTo({
																	// 	url:`/components/setcenter/setcenter?title=设置&titlename=userset`
																	// })
																	uni.navigateBack()
																}
															})
														}else{
															app.globalData.showtoastsame(bindopenid.data.msg)
														}
													}
												})
											}
										})
										
									},function(errcode){
										// console.log(errcode,"获取失败")
									},)
								}else{  
									// console.log('已经登陆认证');
								}
							}, function(e){
								// console.log("获取服务列表失败："+JSON.stringify(e));
							})  
						}
					})
				// #endif
			}
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		components:{
			defaultbgblackcolorwhitebar
		}
	}
</script>

<style lang="less" scoped>
	.WeChatLanding{
		height:100vh;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
</style>
