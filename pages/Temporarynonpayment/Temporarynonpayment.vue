<template>
	<view class="temporarynonpayment">
		<view class="temporarynonpayment-top">
			<view class="temporarynonpayment-top-bg">
				<view :style="{'height':(statusBar*2)+'rpx'}"></view>
				<actionbar url="/pages/PersonalMy/PersonalMy" message="订单详情" bg="#fe7a00"></actionbar>
				<view class="bg-title">
					<text>等待买家付款</text>
					<text>剩余多少时间自动关闭</text>
				</view>
			</view>
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
						</view>
					</view>
				</view>
			</view>
			<shopoder></shopoder>
			<shopoderbottom></shopoderbottom>
			
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import shopoder from "@/components/Temporarynonpayment/shoporder.vue"
	import shopoderbottom from "@/components/Temporarynonpayment/shoporderbottom.vue"
	const app = getApp();
	export default {
		//暂时不支付页面
		data() {
			return {
				statusBar:0
			}
		},
		methods: {
			
		},
		components:{
			actionbar,
			shopoder,
			shopoderbottom
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.temporarynonpayment{
		overflow: hidden;
		.temporarynonpayment-top{
			.temporarynonpayment-top-bg{
				position: relative;
				height:300rpx;
				background-color:#fe7a00;
				.bg-title{
					position:absolute;
					bottom:14%;
					left:7%;
					width: 100%;
					text{
						display:block;
						color:#fff;
						font-size: 34rpx;
						&:last-child{
							font-size: 28rpx;
							margin-top:8rpx;
						}
					}
				}
			}
			.Buycontent{
				.Shippingaddress{
					display: flex;
					// align-items:center;
					background-color: #fff;
					padding:30rpx 0;
					// margin-top:40rpx;
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
								width: 100%;
								font-size: 28rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
