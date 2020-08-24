<template>
	<view class="openlive" @tap="Entrancelivecommodities">
		<view class="openlive-text">
			<text>直播带货商品</text>
		</view>
		<view class="openlive_icon">
			<text class="lg text-gray cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			Entrancelivecommodities(){
				//点击跳进直播商品列表
				uni.navigateTo({
					url:`/pages/liveaddshoplist/liveaddshoplist?storeid=""&type=storelive`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.openlive{
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		.openlive-text{
			font-size: 30rpx;
			font-weight: bold;
			line-height: 80rpx;
		}
		.openlive_icon{
			line-height: 80rpx;
		}
	}
</style>
