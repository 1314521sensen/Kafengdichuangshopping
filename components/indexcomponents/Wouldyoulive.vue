<template>
	<view class="wouldyoulive"> 
		<view class="streaming">
			<view class="tit">
				<text class="name">惠直播</text>
				<text class="entrance">LIVE ></text>
			</view>
			<view class="exhibition" :style="{'background-image':'url(/static/index/indexDailygood/cosmetics.png)'}"></view>
		</view>
		
		<view class="shanpin">
		<!-- 每日好货 -->
		<view class="dailyGood" v-for="(item,index) in dailyGoodlist" :key="index">
			<view class="tle">{{item.titlename}}</view>
			<view class="Box">
				<view v-for="(items,indexs) in item.imgs" :key="indexs">
					<image :src="items"></image>
				</view>
		   </view>
		 </view>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				dailyGoodlist:[
					{
						titlename:"每日好货",
						imgs:[
							'/static/index/indexDailygood/shoe.png',
							"/static/index/indexDailygood/shoe.png",
							"/static/index/indexDailygood/shoe.png"
						]
					},
					{
						titlename:"天天特卖",
						imgs:[
							'/static/index/indexDailygood/shoe.png',
							"/static/index/indexDailygood/shoe.png",
							"/static/index/indexDailygood/shoe.png"
						]
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.wouldyoulive{
		display: flex;
		border-bottom:1px solid rgba(0,0,0,.1);
		.shanpin{
			display: flex;
			flex-wrap: wrap;
		}
		.streaming{
			width: 320rpx;
			height: 280rpx;
			padding-left: 45rpx;
			.tit{
				display: flex;
				align-items: center;
				
				.name{
					font-size: 36rpx;
					color: red;
				}
				.entrance{
					color: #FFFFFF;
					background-color: red;
					font-size: 24rpx;
					padding: 2rpx 6rpx;
					margin-left: 20rpx;
					font-weight: bold;
				}
			}
			.exhibition{
				margin: 30rpx auto 0;
				width: 235rpx;
				height: 180rpx;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
		.dailyGood{ 
			margin-left: 20px;
			border-left:1px solid rgba(0,0,0,.1);
			padding-bottom:20rpx;
			.tle{
				line-height: 50rpx;
				text-indent: 20rpx;
			}
			image{
				height: 80rpx;
				width: 80rpx;
			}
			.Box{
				display: flex;
				 width: 375rpx;
			    view{
					width: 150rpx;
					height: 85rpx;
					background-color: #fce7f1;
					margin-left: 35rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}	
		}
	}
</style>
