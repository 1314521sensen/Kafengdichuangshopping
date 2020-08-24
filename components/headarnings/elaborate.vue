<template>
	<view>
		<!-- 商品  详细 提现等 -->
		<div class='flex_merchandiseBox'>
			<!-- 装商品的盒子 -->
			<view class="merchandiseBox">
				<!-- 单个商品  -->
				<view class="particularCom" v-for="(item,index) in particularComS" :key='index' @tap="grouplongshopinfo" :data-index="index">
					<view class="par_left">
						<image class="parImg" :src="item.urls" mode=""></image>
						<view class="operable">{{item.parText}}</view>
					</view>
					<view class="lg text-gray cuIcon-right"></view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				// 商品等
				particularComS:[
					{
						urls:`${this.$store.state.httpUrl}headearning/Canpush.png`,
						parText:"可推商品"
					},
					// {
					// 	urls:`${this.$store.state.httpUrl}headearning/historyshop.png`,
					// 	parText:"历史产品"
					// },
					// {
					// 	urls:`${this.$store.state.httpUrl}headearning/shopdetails.png`,
					// 	parText:"商品详细"
					// },
					{
						urls:`${this.$store.state.httpUrl}headearning/withdrawal.png`,
						parText:"提现"
					}	
				]
			}
		},
		methods: {
			grouplongshopinfo(e){
				let {index} = e.currentTarget.dataset
				let indexs = parseInt(index)
				if(indexs==0){
					uni.navigateTo({
						url:"/pages/commodityshop/commodityshop"
					})
				}else if(indexs==5){
					uni.navigateTo({
						url:"/pages/historyofgoods/historyofgoods"
					})
				}else if(indexs==6){
					uni.navigateTo({
						url:"/pages/commoditydetails/commoditydetails"
					})
				}else if(indexs==1){
					uni.navigateTo({
						url:"/pages/withdrawdeposit/withdrawdeposit"
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	// 商品提现，推广等
	.flex_merchandiseBox{
		display: flex;
		justify-content: center;
		.merchandiseBox{
			margin-top: 15rpx;
			width: 690rpx;
			// height: 400rpx;
			background-color: #FFFFFF;
			box-shadow: 5rpx 5rpx 15rpx #ccc;
			border-radius: 20rpx;
			// 单个商品  
			.particularCom{
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				border-bottom:2rpx solid #dcdcdc;
				padding: 0 40rpx;
				.par_left{
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					.parImg{
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					} 
					.operable{
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>
