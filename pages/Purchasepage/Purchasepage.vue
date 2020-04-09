<template>
	<view class="Purchasepage">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="确认订单"></actionbar>
		<view class="Buycontent">
			<view class="Shippingaddress">
				<view class="Shippingaddress-left">
					<view class="imgs">
						<image src="/static/dingwei/dingwei.png"></image>
					</view>
				</view>
				<view class="Shippingaddress-right">
					<view class="Shippingaddress-right-title">
						<text>刘伟森</text>
						<text>18769490209</text>
					</view>
					<view class="Receivingaddress">
						<view class="address">
							山东省德州市武城县广运街道德州市武城县广运街道齐鲁学院三楼学生处
						</view>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
			</view>
		</view>
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
					<view class="distribution">
						<view class="distribution-left">
							<text>配送方式</text>
							<text>普通配送</text>
						</view>
						<view class="distribution-right">
							<text>快递免邮</text>
						</view>
					</view>
					<view class="distribution note">
						<view class="cu-form-group">
							<view class="title">订单备注</view>
							<input placeholder="选填,请先和商家协商一致" name="input"></input>
						</view>
					</view>
					<view class="Payprice">
						<text>共1件</text>
						<text>小计:</text>
						<text class="text-yellow">¥70.00</text>
					</view>
				</view>
			</view>
		</view>
		<view class="detailscar">
			<view class="detailscar-pic">
				<text>共1件,</text>
				<text>合计</text>
				<text>¥70.00</text>
				<button class="cu-btn round bg-orange">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	//引入顶部导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//这是购买订单页面
	const app = getApp();
	export default {
		data() {
			return {
				//这是首页的高度
				statusBar:0,
			}
		},
		methods: {
			
		},
		onLoad(){
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
			
		},
		components:{
			actionbar,
		}
	}
</script>

<style lang="less" scoped>
	.Purchasepage{
		.Buycontent{
			padding:0 20rpx;
			.Shippingaddress{
				display: flex;
				// align-items:center;
				background-color: #fff;
				padding:30rpx 0;
				margin-top:40rpx;
				border-radius:16rpx;
				.Shippingaddress-left{
					display:flex;
					width: 20%;
					// height:50rpx;
					align-items:center;
					justify-content: center;
					// background-color:red;
					.imgs{
						width: 52%;
						height:66rpx;
						// background-color:green;
						image{
							width: 100%;
							height:100%;
							background-size: cover;
						}
					}
				}
				.Shippingaddress-right{
					width: 80%;
					// background-color:yellow;
					.Shippingaddress-right-title{
						display:flex;
						text{
							font-size: 32rpx;
							&:last-child{
								font-size: 28rpx;
								color:#ccc;
								margin-top:10rpx;
							}
						}
					}
					.Receivingaddress{
						display:flex;
						align-items: center;
						justify-content: space-around;
						margin-top:20rpx;
						.address{
							width: 90%;
							font-size: 28rpx;
						}
						text{
							font-size: 36rpx;
						}
					}
				}
			}
		}
		.purchase-order{
			.order{
				background-color: #fff;
				margin-top:44rpx;
				padding-left:20rpx;
				border-radius:16rpx;
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
					.distribution{
						display:flex;
						justify-content: space-around;
						font-size: 30rpx;
						line-height: 68rpx;
						.distribution-left{
							text{
								&:last-child{
									color:#999;
									margin-left:20rpx;
								}
							}
						}
						.distribution-right{
							//为后期改
						}
					}
					.note{
						//为后期改
					}
					.Payprice{
						display:flex;
						justify-content: flex-end;
						font-size: 28rpx;
						line-height:84rpx;
						text{
							display:block;
							text-align:right;
							margin-right:10rpx;
							&:first-child{
								color:#999;
							}
							&:last-child{
								// color:#
								font-size: 34rpx;
								margin-right:30rpx;
							}
						}
					}
				}
			}
		}
		.detailscar{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			left: 0;
			z-index: 1;
			background-color: #fff;
			.detailscar-pic{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				line-height:100rpx;
				text{
					font-size: 35rpx;
					
					&:first-child{
						color:#999;
						font-size: 30rpx;
					}
					&:nth-child(3){
						color:#ff4f00;
						margin-right:20rpx;
					}
				}
				button{
					margin-right:15rpx;
				}
			}
		}
	}
</style>
