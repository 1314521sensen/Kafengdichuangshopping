<template>
	<!-- 为你推荐 -->
	<view class="recommend-wrapper">
		<text class="border"></text>
		<text class="recommend">{{ title }}</text>
		<text class="border"></text>
	</view>
</template>

<script>
	
	export default {
		props: ['title']
	}
</script>
<style lang="less" scoped>
	.recommend-wrapper {
		position: absolute;
		text-align: center;
		line-height: 72rpx;
		background-color: #f5f5f5;
		width: 100%;
		height: 72rpx;
		margin-top: 20rpx;
		.recommend {
			margin: 0 26rpx;
			vertical-align: middle;
			font-size: 30rpx;
			font-weight: bold;
		}
		.border {
			display: inline-block;
			vertical-align: middle;
			width: 42rpx;
			height: 4rpx;
			background-color: #ccc;
		}
	}
	
</style>