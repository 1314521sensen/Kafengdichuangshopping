<template>
	<view class="suspensionshopcart" @tap="shopcat">
		<text class="lg text-gray cuIcon-cart shopcarticon"></text>
	</view>
</template>

<script>
	export default{
		methods:{
			shopcat(){
				//进入到购物车
				uni.setStorage({
					key:"forwardcartbool",
					data:1,
				})
				uni.navigateTo({
					url:`/pages/shoppingCart/shoppingCart`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.suspensionshopcart{
		position:fixed;
		bottom:9%;
		right:20rpx;
		width: 70rpx;
		height:70rpx;
		background-color: rgba(0,0,0,0.5);
		border-radius:50%;
		text-align:center;
		line-height:70rpx;
		.shopcarticon{
			color:#fff;
			font-size: 40rpx;
		}
	}
</style>
