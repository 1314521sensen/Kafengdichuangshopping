<template>
	<view class="defaultbgblackcolorwhitebar" @tap="Navigationreturn">
		<text class="lg text-gray cuIcon-back right_arrow"></text>
	</view>
</template>

<script>
	export default{
		methods:{
			Navigationreturn(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.defaultbgblackcolorwhitebar{
		position:fixed;
		top:50rpx;
		left:20rpx;
		width: 70rpx;
		height:70rpx;
		background-color:rgba(0,0,0,0.6);
		border-radius:50%;
		text-align:center;
		line-height:70rpx;
		z-index:2;
		.right_arrow{
			color:#fff;
			font-size:34rpx;
		}
	}
</style>
