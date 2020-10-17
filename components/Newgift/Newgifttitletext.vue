<template>
	
		<view class="exclusive">
			<text>{{NewgiftLeftTitle}}</text>
			<text class="color-red">新人专享</text>
			<text>{{GiftVouchers}}</text>
		</view>
	
</template>

<script>
	export default {
		props:["NewgiftLeftTitle","GiftVouchers"]
	}
</script>

<style lang="less">
	.exclusive{
		border-bottom: 2rpx solid #FF0000;
		width: 230rpx;
		margin: 40rpx auto 0 ;
		.color-red{
			color: red;
		}
	}
</style>
