<template>
	<view class="Dailygood-bottom">
		<view class="Dailygood-bottom_midden">
			<scroll-view>
				<view class="Dailygood-bottomitem" v-for="(item,index) in 10" :key="index">
				<view class="Dailygood-bottomitem-left">
					<image src="/static/dailygood/goodtop.png"></image>
				</view>
				<view class="Dailygood-bottomitem-right">
					<view class="Dailygood-bottom-title">
						<text>纯棉体现运动背心</text>
					</view>
					<text class="Dailygood-bottom-num">1.5万人购买</text>
					<text class="Dailygood-bottom-region">浙江杭州</text>
					<view class="Dailygood-bottom-price">
						<text class="text-red Activityprice">¥105</text>
						<text class="originalprice">¥122</text>
					</view>
				</view>
			</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
</script>

<style lang="less" scoped>
	.Dailygood-bottom{
		padding:0 20rpx;
		margin-top:-88rpx;
		.Dailygood-bottom_midden{
			// height:100rpx;
			background-color: #fff;
			padding:30rpx 0px 48rpx 26px;
			.Dailygood-bottomitem{
				display:flex;
				margin-bottom:34rpx;
				// justify-content: space-between;
				.Dailygood-bottomitem-left{
					width:232rpx;
					height:256rpx;
					// background-color:red;
					image{
						width: 100%;
						height:100%;
					}
				}
				.Dailygood-bottomitem-right{
					flex:1;
					// background-color:green;
					margin-left:24rpx;
					.Dailygood-bottom-title{
						font-size: 32rpx;
						font-weight: bold;
					}
					text{
						display:block;
					}
					.Dailygood-bottom-num{
						color:#676767;
						font-size: 28rpx;
						margin:16rpx 0;
					}
					.Dailygood-bottom-region{
						color:#999;
						margin-bottom:20rpx;
					}
					.Dailygood-bottom-price{
						display: flex;
						align-items: flex-end;
						.Activityprice{
							font-size: 38rpx;
							margin-right:20rpx;
						}
						.originalprice{
							font-size: 28rpx;
							color:#ccc;
							text-decoration:line-through;
						}
					}
				}
			}
		}
	}
</style>
