<template>
	<view class="productBox">
		<!-- 新品上市  -->
		<view class="productMarket">
			<image src="/static/index/NewArrival/NewArrival.png"></image>
			<text :style="{'font-size':28+'rpx','font-weight':'bold'}">:</text>
			<view class="recommend">推荐</view>
			<view class="introduce">全是狠货，Nike叫你换新鞋!</view>
			<view class="more">更多</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
   .productBox{
		 padding: 5rpx 0;
	   .productMarket{
		   display: flex;
		   flex-wrap: wrap;
		   margin-left: 45rpx;
		   align-items: center;
		   image{
			   width: 150rpx;
			   height: 55rpx;
		   }
		   .recommend{
			   width: 80rpx;
			   border: 1px solid #ff7201;
			   line-height: 30rpx;
			   border-radius: 10rpx;
			   text-align: center;
			   color: #ff7201;
			   margin: 0 8rpx 0 8rpx;
			   padding:4rpx 0;
		   }
			.introduce{
				font-size: 24rpx;
			}
		   .more{
			   margin-left: 40rpx;
			   border-left: 1px solid #000000;
			   padding-left: 10rpx;
		   }
	   }
	 
   }
</style>
