<template>
	<view class="coupons">
		<!-- 这是优惠卷的信息 -->
		<scroll-view scroll-x="true">
			<view class="rows">
				<view class="coupons-for" v-for="(item,index) in list" :key="index">

					<view class="coupons-list" v-for="(citem,cindex) in item" :key="cindex">
						<view class="coupons-top">
							<text>￥</text>
							<text class="price">{{citem.price}}</text>
							<text class="quan">券</text>
						</view>
						<!-- 优惠券左右白色圆点 -->
						<view class="dot left"></view>
						<view class="dot right"></view>
						<view class="coupons-bottom">
							<text>满{{ citem.preferential }}可用</text>
							<view class="at-once">
								立即抢券
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	export default {
		//这是优惠卷的组件
		data() {
			return {
				list: [
					[{
							price: 3,
							preferential: 58
						},
						{
							price: 5,
							preferential: 88
						},
						{
							price: 10,
							preferential: 168
						}
					],
					[{
							price: 18,
							preferential: 68
						},
						{
							price: 20,
							preferential: 78
						},
						{
							price: 10,
							preferential: 168
						}
					],
					[{
							price: 30,
							preferential: 98
						},
						{
							price: 11,
							preferential: 108
						},
						{
							price: 13,
							preferential: 208
						}
					]
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.coupons {
		width: 100%;
		height: 112rpx;

		.rows {
			width: 300%;
			display: flex;

			.coupons-for {
				width: 100%;
				display: flex;
				justify-content: space-around;
				width: 95%;
				height: 120rpx;
				background-color: #fff;

				.coupons-list {
					position: relative;
					align-items: center;
					width: 204rpx;
					height: 100rpx;
					background-image: linear-gradient(to right, #e60578, #e62d28);
					box-shadow: 5rpx 20rpx 20rpx #ccc;
					color: #fff;
					border: 1px solid #fee03c;
					.coupons-top {
						// border: 2px solid blue;
						border-bottom: 4rpx dashed #fff;
						overflow: hidden;

						font-weight: 700;
						font-size: 40rpx;
						padding-left: 10rpx;
						height: 50rpx;
						line-height: 50rpx;
						position: relative;
						width: 100%;
						margin: 0 auto;

						.price {
							margin-left: 25rpx;
						}

						.quan {
							position: absolute;
							border: 2px solid #fee03c;
							border-radius: 50%;
							width: 40rpx;
							height: 40rpx;
							text-align: center;
							line-height: 40rpx;
							transform: rotateZ(-30deg);
							top: -10rpx;
							right: -10rpx;
							font-size: 20rpx;
						}
					}
					.dot {
						position: absolute;
						width: 22rpx;
						height: 22rpx;
						background-color: #fff;
						border-radius: 50%;
						&.left {
							left: -8rpx;
						}
						top: 42rpx;
						&.right {
							right: -8rpx;
							
						}
					}
					
					.coupons-bottom {
						text-align: center;
						width: 100%;

						.at-once {
							position: absolute;
							width: 120rpx;
							left: calc(50% - 60rpx);
							bottom: -20rpx;
							height: 30rpx;
							margin-top: -20rpx;
							border-radius: 20rpx;
							background-color: #fff;
							color: #f00;
							border: 4rpx solid #fae053;
							font-size: 10rpx;
							line-height: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
