<template>
	<view class="member">
		<text>开通VIP、预计可省17862元/年 分享赚钱</text>
		<button @tap="linkmember" class="cu-btn round sm">立即开通</button>
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
			linkmember(){
				app.globalData.Detectionupdatetokey(this.tokey)
				uni.navigateTo({
					 url: '/pages/applygroup/applygroup?title=分享赚钱&titlename=Promotedistribution'
				})
			}
		},
		props:["tokey"]
	}
</script>

<style lang="less" scoped>
	.member{
		height: 70rpx;
		line-height: 70rpx;
		margin-top: 10rpx;
		// background-color: #FFFFFF;
		background-image: linear-gradient(to right,#f4e8bd,#cbb973);
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		text{
			color: #624e20;
		}
		button{
			font-size: 24rpx;
			height: 50rpx;	
			margin-top: 10rpx;
			background-color: #de261e;
			color: #fad6b4;
			font-weight: bold;
			box-shadow: 4rpx 4rpx 4rpx 4rpx #d5c794;
		}
	}
</style>
