<template>
	<!-- 限时抢购 -->
	<view class="flashSaleBoxS">
		<scroll-view scroll-x class="scrollview" >
		  	<view class="niubi_class" style="display: flex;">	
			   <view class="scrollview-item" v-for="(item,index) in disclosure" :key='index'>
					<view class="singleCommodities" style="width: 220rpx;">
						<!-- 展示图 -->
						<view  class="purchaseUrl" :style="{backgroundImage:'url('+item.imgurl+')'}"></view>
						<!-- 描述 -->
						<view class="describe">{{item.describe}}</view>
						<view class="num">
							<!-- 现价 -->
							<text class="currentPrice">￥{{item.Price}}</text>
							<!-- 抢购 -->
							<text class="PanicBuying">+</text>
						</view> 
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disclosure:[{
					imgurl:'/static/index/indexDailygood/Women.png',
					describe:'很仙的连衣裙2019春夏新款女名媛...',
					Price:398
				},
				{
					imgurl:'/static/index/indexDailygood/Women.png',
					describe:'很仙的连衣裙2019春夏新款女名媛...',
					Price:398
				},
				{
					imgurl:'/static/index/indexDailygood/Women.png',
					describe:'很仙的连衣裙2019春夏新款女名媛...',
					Price:398
				},
				{
					imgurl:'/static/index/indexDailygood/Women.png',
					describe:'很仙的连衣裙2019春夏新款女名媛...',
					Price:398
				},
				{
					imgurl:'/static/index/indexDailygood/Women.png',
					describe:'很仙的连衣裙2019春夏新款女名媛...',
					Price:398
				},
				]
			}
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
	// 限时抢购
	.flashSaleBoxS{
		  display: flex;
		  justify-content: space-between;
		  padding: 0 15rpx;
		  // 单个商品盒子
		  .scrollview{
			  width: 100%;
			  .scrollview-item{
				  padding-bottom:20rpx;
			  }
		  }
		  .singleCommodities{
			  // width: 185rpx;
			  // height: 320rpx;
			  background-color: #fff;
			  .purchaseUrl{
				  width:  194rpx;
				  height: 200rpx;
				  background-repeat: no-repeat;
				  background-size: 100% 100%;
			  }
			  .num{
				  display: flex;
				  align-items: center;
				  justify-content: space-between;
				  padding: 0 20rpx 0 0;
			  }
				 // 描述
				 .describe{
					 font-size: 24rpx;
					 display: -webkit-box;
					 -webkit-box-orient: vertical;
					 -webkit-line-clamp: 2;
					 overflow: hidden;
				 }
				 .currentPrice{
				 	 color: red;
					 font-size: 34rpx;
					 margin: 6px 0 0 2rpx;
				 }
				 .originalPrice{
					 color: #CCCCCC;
					 font-size: 24rpx;
					 text-decoration:line-through;
				 }
				 .PanicBuying{
					 width: 40rpx;
					 height: 40rpx;	 
					 background-color: #717171;
					 border-radius: 50%;
					 margin: 12rpx 0 0 25rpx;
					 line-height: 40rpx;
					 text-align: center;
					 color: #FFFFFF;
					 font-size: 36rpx;
				 }
			  }
	}
</style>
