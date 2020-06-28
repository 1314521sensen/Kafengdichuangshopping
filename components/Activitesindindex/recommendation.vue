<template>
	<view class="recommendation">
		<view class="recommendationCenter" style="background-image: url(../../static/Activirsindex/titlebg-2.png);">
			<text>精品推荐</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
	
	}
</script>

<style lang="less" scoped>
	.recommendation{
		// height: 100rpx;
		margin: 26rpx 0  18rpx 0;
		display:flex;
		justify-content: center;
		align-items: center;
		// margin-bottom:0rpx;
		.recommendationCenter{
			width: 50%;
			height:100rpx;
			// background-color:green;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			line-height:90rpx;
			text-align: center;
			color: #2a58ce;
			font-size: 40rpx;
			font-weight: bold;
		}
	}
</style>
