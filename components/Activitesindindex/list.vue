<template>
	<view class="list">
		<view class="list-img" style="background-image: url(/static/Activirsindex/img/4.png);" v-for="(item,index) in 8" :key='index'>
			<view class="left-text" style="background-image: url(/static/Activirsindex/img/11.png);">
				<view class="left-text-top" >极致护肤</view>
				<view class="left-text-bottom" >低至33元</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	.list{
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.list-img{
			width: 170rpx;
			height: 200rpx;
			margin-bottom: 20rpx;
			background-size: 100% 100%;
			border-radius: 15rpx;
			display: flex;
			flex-direction:column-reverse;
			overflow: hidden;
		}
		.left-text{
			color: #FFFFFF;
			background-size: 100% 100%;
			text-align: center;
			// margin-top: 416rpx;
			padding: 6rpx 0 4rpx;
			.left-text-top{
				font-size: 28rpx;
			}
			.left-text-bottom{
				font-size: 24rpx;
			}
		}
	}
</style>
