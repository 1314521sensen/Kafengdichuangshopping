<template>
	<view class="cu-load load-modal">
		<!-- <view class="cuIcon-emojifill text-orange"></view> -->
		<image src="/static/logo.png" mode="aspectFit"></image>
		<view class="gray-text">加载中...</view>
	</view>
</template>

<style lang="less" scoped>
	.cu-load.load-modal::after{
		border-left:6rpx solid rgb(321,20,86);
	}
</style>
