<template>
	<view class="securitiesbottom">
		<!-- v-for="(item,index) in couponslist" :key="index" -->

		<!-- {{item}} -->
		<!-- <view class="couponstitle">
				
				<view 
					class="couponstitletext" 
					v-for="(item,index) in couponstitlelist" 
					:key="index"
					:class="couponstindex==index?'couponstitletextactive':''"
					:data-indexs="index"
					@tap="CouponClassification"
				>{{item}}</view>
			</view> -->
		<view class="discount_coupon">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="tolower">
				<view class="demo_fa" v-for="(item,index) in this.$store.state.couponslist" :key="index">

					<view class="discount_coupon_demo" :class="item.status == 1 ? 'demoOne':'demoTwo'">
						<!-- <view class="status" v-if="item.status == 1">
								<text>未使用</text>
							</view> -->
						<view class="status" v-if="item.status == 2">
							<text>已使用</text>
						</view>
						<view class="status" v-if="item.status == 3">
							<text>已过期</text>
						</view>
						<view class="demo_left">

							<view class="demo_left_price">
								<text class="price_left" v-text="item.money"></text>
								<text class="price_right">元</text>
							</view>

							<view class="demo_left_time">
								<!-- <view class="left_indate ">
											<text>有效期至:</text>
											<text>{{item.stop_time}}</text>
										</view> -->

								<view class="right_bottom">
									<!-- 这里在判断是0元还是必须满多少钱使用 如果是0元===无限制 -->
									<text v-text="item.at_full!=='0.00'?'满'+item.at_full+'使用':'无门槛使用'"></text>
								</view>
								<view class="arrows">
									<text class="arrows-text" @tap="particularsClick" :data-indexs="index">▼</text>
								</view>
							</view>


						</view>
						<view class="demo_right" @tap="couponsUse" :data-s_id='item.store_id'>
							<text class="right_center">
								立即使用
							</text>
						</view>
					</view>
					<view class="particulars" v-if="index==tabcurindex">
						<view><text>有效期:</text><text>{{item.stop_time}}</text></view>
						<!-- <p><text>优惠券号：</text><text>asdfaasdf</text></p> -->
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	const app = getApp()
	export default {
		//这是卷的下面
		data() {
			return {
				couponstitlelist: [
					"店铺优惠券",
					"平台优惠券"
				],
				couponstindex: 0,
				show: false,
				tabcurindex: -1,
				pages: 1
			}
		},
		methods: {
			CouponClassification(e) {
				this.pages = 1
				//判断点击的店铺的  还是平台的
				// console.log(e)
				this.$store.state.couponslist = []
				let {
					indexs
				} = e.currentTarget.dataset
				this.couponstindex = indexs
				this.$emit("storeIsStillAndPlatform", indexs)
			},
			couponsUse(e) {
				let {
					s_id
				} = e.currentTarget.dataset
				if (parseInt(s_id)) {
					uni.navigateTo({
						url: `/pages/Store/store?storeid=${s_id}`
					})
				} else {
					uni.redirectTo({
						url: `/pages/index/index`
					})
				}
			},
			particularsClick(e) {
				let {
					indexs,
					bool
				} = e.currentTarget.dataset
				if (indexs == this.tabcurindex) {
					this.tabcurindex = -1
				} else {
					this.tabcurindex = indexs
				}
			},
			tolower() {
				this.pages++
				// console.log(this.TabCur,this.bottomindex)
				this.$store.state.couponspages++
				this.$store.commit("getallcouponslist", {
					topindex: parseInt(this.TabCur)+1,
					bottomindex: parseInt(this.bottomindex),
					pages: this.$store.state.couponspages
				})
			},
		},
		props: ["TabCur", "bottomindex"]
	}
</script>

<style lang="less" scoped>
	.status {
		position: absolute;
		width: 95%;
		height: 175rpx;
		z-index: 999;
		line-height: 175rpx;
		text-align: center;
		background-color: rgba(0, 0, 0, .1);

		text {
			padding: 20rpx;
			border: 6rpx solid #CCCCCC;
			border-radius: 50%;
			font-size: 50rpx;
			font-weight: bold;
			color: #7e7e7e;
		}
	}

	.demoOne {
		background: linear-gradient(to left, #eb480e, #f1952b, #ec661c);
	}

	.demoTwo {
		background-color: #CCCCCC;
	}

	.securitiesbottom {
		background-color: white;
		width: 100%;

		// margin-top:15rpx;
		// padding-bottom:20rpx;
		.couponstitle {
			width: 100%;
			display: flex;
			justify-content: space-between;
			text-align: center;

			.couponstitletext {
				background-color: #EEEEEE;
				width: 50%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-weight: bold;
				font-size: 32rpx;
				color: #999;
			}

			.couponstitletextactive {
				color: #f9734d;
			}
		}

		.scroll-Y {
			height: 78vh;
		}

		.discount_coupon_demo {

			width: 95%;
			height: 175rpx;
			// background-color: red;
			margin: 20rpx auto 0;
			display: flex;
			justify-content: space-between;


			.demo_left {
				width: 80%;
				height: 175rpx;
				display: flex;
				justify-content: space-between;

				.demo_left_price {
					height: 100%;
					// width: 40%;
					flex: 1;
					line-height: 175rpx;
					text-align: center;
					color: white;
					font-weight: bold;

					.price_left {
						text-align: center;
						font-size: 80rpx;
					}
				}

				.demo_left_time {
					display: flex;
					align-items: center;
					justify-content: center;
					// flex-wrap: wrap;
					color: white;
					// width: 60%;
					height: 100%;
					margin-left: 10rpx;

					.left_indate {
						font-size: 24rpx;
						margin-top: 40rpx;
					}

					.right_top {
						font-size: 12rpx;
						height: 40%;
						line-height: 87rpx;
					}

					.right_bottom {
						font-size: 40rpx;
						font-weight: bold;
					}

					.arrows {
						width: 100%;
						text-align: center;
						margin-top: 10rpx;
					}
				}
			}

			.demo_right {
				width: 20%;
				height: 175rpx;
				border-left: 2rpx dashed #EEEEEE;
				text-align: center;

				.right_center {
					-webkit-writing-mode: vertical-rl;
					writing-mode: vertical-rl;
					margin-top: 26rpx;
					color: white;
					font-weight: bold;
					font-size: 30rpx;
				}

				// background: linear-gradient(to left,#ed6117,#eb480e);
			}
		}

		.particulars {
			// border: 1rpx solid #CCCCCC;
			// border-top: 1rpx dashed #CCCCCC;
			width: 95%;
			margin: 0 auto;
			padding: 4rpx;
			overflow: hidden;
			// animation: mymove .5s;
			/*Safari 和 Chrome:*/
			// -webkit-animation: mymove .5s;
		}

		@keyframes mymove {
			from {
				height: 0rpx;
			}

			to {
				height: 76rpx;
			}
		}

		p {
			font-size: 24rpx;
			color: #9c9c9c;
		}

		.securitiesbottomitem {

			margin: 0 auto;
			margin-top: 20rpx;
			background-color: #c41225;
			color: white;
			width: 95%;
			height: 160rpx;
		}

		.full-text {
			font-size: 10rpx;
		}

		.securities {
			display: flex;

			// background-color: #fff;
			// padding:15rpx 10rpx;
			.securities-left {
				display: flex;
				width: 80%;

				// height:50rpx;
				// background-color:red;
				.securities-left-imgs {
					width: 40%;
					height: 160rpx;

					// background-color:green;
					image {
						width: 100%;
						height: 100%;
					}
				}

				.securities-left-right {
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					width: 60%;
					// background-color:pink;
					padding-left: 20rpx;

					.securities-left-right-top {
						overflow: hidden;
						font-size: 30rpx;
						font-weight: bold;

						text {
							display: block;
							white-space: nowrap;

							// overflow:hidden;
							// text-overflow:ellipsis;
							&:last-child {
								font-size: 27rpx;
								// color:#FF5706;
								margin-top: 14rpx;
							}

							// #e02e24
						}
					}

					.securities-left-right-bottom {
						// color:#e02e24;
						display: flex;

						text {
							font-size: 24rpx;
							margin-top: 3rpx;

							&:last-child {
								font-size: 36rpx;
								font-weight: bold;
								margin: 0 0 0 10rpx;
							}
						}
					}
				}
			}

			.securities-right {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: center;
				width: 30%;
				// background-color:yellow;
				border-left: 2rpx dashed #ccc;
				text-align: center;

				// color:#e02e24;
				.securities-right-top {
					display: flex;
					justify-content: center;

					text {
						font-weight: bold;
						font-size: 25rpx;
						margin-top: 10rpx;

						&:last-child {
							font-size: 36rpx;
							margin-top: 0rpx;
						}
					}
				}

				button {
					width: 90%;
					height: 52rpx;
					font-size: 20rpx;
					padding: 0;
				}
			}
		}

	}
</style>
