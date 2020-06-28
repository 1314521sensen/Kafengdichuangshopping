<template>
	<view class="list-nav">
		<view class="list-item" v-for="(item,index) in 5" :class="index==TabCur?'nav-color ':''"  :key="index"  @tap="itemClick(index)">
			<view class="item-top">
				<text>精选</text>
			</view>
			<view class="item-bottom">
				<text>猜你喜欢</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				TabCur: 0,
				// scrollLeft: 0,
			};
		},
		methods:{
			itemClick(e){
				this.TabCur = e;
			}
		}
	}
</script>

<style lang="less" scoped>
	.list-nav{
		height: 130rpx;
		width: 95%;
		// background-color: #FFFFFF;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		
		.list-item{
			width: 20%;
			height: 100%;
			// background-color: red;
			padding: 10rpx;
			.item-top{
				width: 100%;
				font-size: 34rpx;
				text-align: center;
				font-weight: bold;
				border-right: 1px solid #CCCCCC;
			}
			.item-bottom{
				width: 100%;
				font-size: 24rpx;
				text-align: center;
				margin-top: 20rpx;
			}
		}
		
	}
	.nav-color{
		color: #FF0000;
		font-size: 36rpx;
		.item-bottom{
			color: #FFFFFF;
			text{
				padding: 4rpx 12rpx;
				background-color: #ff0006;
				border-radius: 15rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
