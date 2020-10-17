<template>
	<view class="wxopenid">
		<view class="wxPopup">
			<view class="wxPopup-img">
				<image :src="httpUrl+'wxbind/wxbg.png'" class="wximg"></image>
			</view>
			<view class="wxPopuptext">
				为了您后续的操作请进行微信绑定
			</view>
			<view class="wxPopupbtn" @tap="WeChatbinding">
				<button class="btn">微信绑定</button>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				httpUrl:this.$store.state.httpUrl
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
		}
	}
</script>

<style lang="less" scoped>
	.wxopenid{
		display:flex;
		justify-content: center;
		align-items: center;
		position:absolute;
		top:0;
		left:0;
		width: 750rpx;
		height:100vh;
		background-color:rgba(0,0,0,.5);
		.wxPopup{
			width:80%;
			// height:300rpx;
			background-color:#fff;
			border-radius:15rpx 15rpx 0 0;
			.wxPopup-img{
				display:flex;
				justify-content: center;
				padding:10rpx 0;
				.wximg{
					width: 100rpx;
					height:100rpx;
				}
			}
			.wxPopuptext{
				font-size:30rpx;
				text-align:center;
				line-height:50rpx;
				padding:10rpx 0;
			}
			.wxPopupbtn{
				.btn{
					height:2;
				}
			}
		}
	}
</style>
