<template>
	<view class="historyofgoods">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message='历史商品' :Jumpchoose="true" url="/pages/headearnings/headearnings"></actionbar>
		<!-- 总商品 -->
		<scroll-view :scroll-y="true" :style="{'height':100+'vh'}">
			<view class="totalgoods">
				<!-- 单个 -->
				<view class="single" v-for="(item,index) in 10" :key="index">
					<view class="pattern">
						<image src="/static/index/07bf120962cc87433cbc06fafe009ad.png" mode=""></image>
					</view>
					<!-- 介绍 -->
					<view class="particular">
						<view class="particular_text">[即插即听]汽车车载U盘16G/32G抖音最新款流行音乐优盘</view>
						<view class="particular_num">存库10件,总销量1件</view>
						<view class="particular_price">
							<text class="price_txt">￥120.00</text>
							<text class="brokerage">
								<text class="bro_fee">用金</text>:
								<text class="bro_txt">5元</text> 
							</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 导航
	const app= getApp()
	import actionbar from '@/components/actionbar/actionbar'
	export default {
		data() {
			return {
				statusBar:0
			}
		},
		methods: {
			
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	// 总商品
	.historyofgoods{
		// min-height: 1335rpx;
		height:100vh;
		background-color: #f2f2f2;
	
		.totalgoods{
			  display: flex;
			  flex-wrap: wrap;
			  margin-top: 50rpx;
			  // 单个商品  
			  .single{
				  margin-bottom:20rpx;
				  display: flex;
				  padding: 18rpx 40rpx 10rpx 30rpx;
				  box-shadow: 5rpx 5rpx 10rpx #C0C0C0;
				  background-color: #fff;
				  .pattern{
					  image{
						  width: 200rpx;
						  height: 200rpx;
					  }
				  }
				  // 详细
				  .particular{
					  padding-left:20rpx;
					  .particular_text{
						line-height: 42rpx;
					  }
					 .particular_num{
						color: #666666;
						font-size: 24rpx;
						margin: 20rpx 0 20rpx;
					 }  
					 .particular_price{
						  display: flex;
						  align-items: center;
						  justify-content:space-between;
						 .price_txt{
							 font-size: 36rpx;
							 color: red;
						 }
						 .brokerage{
							 margin-right: 30rpx;
							 .bro_fee{
								 color: #666;
								 margin-right: 5rpx;
							 }
							 .bro_txt{
								 color: red;
								 margin-left: 10rpx;
							 }
						 }
					 }
				  } 
			  }
			}
	 }
</style>
