<template>
	<view class="openlive" @tap="openlivelink">
		<view class="openlive-text">
			<text>开启直播</text>
		</view>
		<view class="openlive_icon">
			<text class="lg text-gray cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			openlivelink(){
				uni.getStorage({
					key:"bindtokey",
					success(restokey) {
						app.globalData.Detectionupdatetokey(restokey.data)
						uni.navigateTo({
						    url: '/pages/Livecover/Livecover'
						})
					}
				})
				// console.log('进入开启直播页面')
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.openlive{
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		.openlive-text{
			font-size: 30rpx;
			font-weight: bold;
			line-height: 80rpx;
		}
		.openlive_icon{
			line-height: 80rpx;
		}
	}
</style>
