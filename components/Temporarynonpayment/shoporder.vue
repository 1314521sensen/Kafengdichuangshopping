<template>
	<view class="shoporder">
		<view class="Buycontent purchase-order">
			<!-- 到时候循环这个order就可以 -->
			<view class="order">
				<view class="order-title">
					丽江雅韵茶行
				</view>
				<view class="shopgoosorder">
					<view class="shopgoosorder-left">
						<image src="/static/horizontally/1.jpg"></image>
					</view>
					<view class="shopgoosorder-right">
						<view class="shopgoosorder-title">
							丽江雪茶云南白雪毫雪山古茶雪山白露苦甘露古藤茶丽江雪茶云南白雪毫雪山古茶雪山白露苦甘露古藤茶
						</view>
						<view class="shopgoosorder-pic">
							<text>¥70.00</text>
							<text>×1</text>
						</view>
					</view>
				</view>
				<view class="Deliverynote">
					<!-- 这重新写 -->
					<view class="commodityprice" v-for="(item,index) in list" :key="index">
						<text>{{item.shoptitle}}</text>
						<text>{{item.shoppic}}</text>
					</view>
					<!-- 实付款 -->
					<view class="Realpayment">
						<text>实付款</text>
						<text>¥60.19</text>
					</view>
				</view>
			</view>
	</view>
		<view class="orderSerial">
			<view class="orderSerial-title">订单信息</view>
			<view class="serial">
				<view class="serialsame serial-left">
					<text>订单编号:</text>
					<text>支付宝交易号:</text>
				</view>
				<view class="serialsame serial-right">
					<text>8565465456489424</text>
					<text>205548552585558555885555544</text>
				</view>
			</view>
		</view>
		
</view>
</template>

<script>
	export default{
		//这是订单详情中的中间的商品的部分
		data(){
			return {
				list:[
					{
						shoptitle:"商品总价",
						shoppic:"¥60.19"
					},
					{
						shoptitle:"运费险",
						shoppic:"卖家赠送"
					},
					{
						shoptitle:"运费",
						shoppic:"¥0.00"
					}
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.shoporder{
		.purchase-order{
			.order{
				background-color: #fff;
				margin-top:44rpx;
				// padding-left:20rpx;
				padding:0 0 20rpx 20rpx;
				.order-title{
					font-size: 32rpx;
					padding:20rpx 0;
					font-weight: bold;
				}
				.shopgoosorder{
					display:flex;
					justify-content: space-around;
					margin-top:28rpx;
					.shopgoosorder-left{
						width: 30%;
						height:200rpx;
						// background-color:yellow;
						image{
							width: 100%;
							height:100%;
						}
					}
					.shopgoosorder-right{
						display:flex;
						justify-content: space-around;
						flex:1;
						// background-color:red;
						padding-top:10rpx;
						.shopgoosorder-title{
							overflow: hidden;
							width: 70%;
							height:80rpx;
							font-size: 28rpx;
						}
						.shopgoosorder-pic{
							width: 20%;
							text{
								display:block;
								text-align:right;
								font-size: 30rpx;
								&:first-child{
									font-weight: bold;
								}
								&:last-child{
									font-size: 24rpx;
								}
							}
						}
					}
				}
				.Deliverynote{
					margin-top:48rpx;
					padding:0 20rpx;
					.commodityprice{
						display: flex;
						justify-content: space-between;
						font-size: 32rpx;
						margin-top:10rpx;
					}
					.Realpayment{
						display:flex;
						justify-content: space-between;
						margin-top:20rpx;
						text{
							font-size: 35rpx;
							color:#999;
							&:last-child{
								color:#ff5300;
							}
						}
					}
				}
			}
		}
		.orderSerial{
			padding:64rpx 20rpx;
			background-color: #fff;
			margin-top:20rpx;
			.orderSerial-title{
				font-size: 32rpx;
			}
			.serial{
				display:flex;
				// font-size: 24rpx;
				// align-items: center;
				font-size: 28rpx;
				color:#999;
				.serialsame{
					
					text{
						display:block;
						margin-top:24rpx;	
					}
				}
				.serial-right{
					text{
						margin:30rpx 0 0 30rpx;
					}
				}
			}
		}
	}
</style>
