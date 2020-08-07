<template>
	<view class="liveuserSowing" :style="{'background-image':'url(/static/Liveplatformlist/jieshubg.jpg)'}">
		<view class="liveuserSowing-bg">
			<view class="liveuserSowing-text">
				<text>直播已结束</text>
			</view>
			<view class="liveuserSowing-btn">
				<button class="liveuserSowing-button" @tap="RetuernLiveplatformlist">返回直播间</button>
			</view>
		</view>
	</view>
</template>

<script>
	//这个用户观看主播下播的页面
	export default {
		data() {
			return {

			}
		},
		methods: {
			RetuernLiveplatformlist(){
				uni.switchTab({
					url:`/pages/Liveplatformlist/Liveplatformlist`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.liveuserSowing{
		// background-color:red;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.liveuserSowing-bg{
			display:flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: center;
			height:100vh;
			background-color:rgba(0,0,0,.7);
			color:#fff;
			font-size:50rpx;
			font-weight: bold;
			.liveuserSowing-text{
				width: 100%;
				text-align:center;
			}
			.liveuserSowing-btn{
				width:100%;
				.liveuserSowing-button{
					width: 40%;
					border-radius:44rpx;
					line-height:76rpx;
					background-color: rgba(0,0,0,.2);
					color:#fff;
					border:4rpx solid #de4a57;
				}
			}
		}
	}
</style>
