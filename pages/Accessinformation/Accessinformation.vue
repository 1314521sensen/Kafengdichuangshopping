<template>
	<!-- 判断用户有没有登录 有的话就不在显示  没有的话就显示 -->
	<view class="Layerthickness">
			<button class="cu-btn block bg-orange margin-tb-sm lg btninformation" open-type="getUserInfo" @getuserinfo="clickgetUserInfo">
				<text class="cuIcon-loading2 cuIconfont-spin"></text>点击登录
			</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			clickgetUserInfo(){
				uni.getProvider({
					service:"oauth",
					success(res){//这里获取到是哪个平台
						// console.log(res)
						if (~res.provider.indexOf('weixin')){
							uni.login({
								provider:"weixin",
								success(loginRes){//这里获取到code码
									// console.log(JSON.stringify(loginRes))
									uni.getUserInfo({
										provider:"weixin",
										success(infoRes){
											console.log(infoRes) //这获取了用户的信息
											uni.switchTab({
												url:"/pages/index/index"
											})
										},
										fail(err){
											console.log(err)
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #fff;
	}
	.Layerthickness{
		position: relative;
		height:100vh;
		background-color:rgba(0,0,0,.5);
		// padding:0 20rpx;
		.btninformation{
			position: absolute;
			bottom:0rpx;
			left:5%;
			width: 90%;
		}
	}
</style>
