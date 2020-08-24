<template>
	<view class="feature">
		<view class="feature-img" :style="{'background-image':'url('+imgyuming+'feature.png'+')'}">
			<text>惠购物</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgyuming:`${this.$store.state.imgyuming}/uploads/app/image/index/indexone/`,
			}
		}
	}
</script>

<style lang="less" scoped>
	.feature{
		height: 76rpx;
		
		
		margin: 40rpx auto;
		
		
		.feature-img{
			text-align: center;
			line-height: 50rpx;
			font-weight: bold;
			width: 50%;
			height: 50rpx;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin: 0 auto;
		}
		text{
			font-size: 40rpx;
			color: #FFFFFF;
		}
	}
</style>
