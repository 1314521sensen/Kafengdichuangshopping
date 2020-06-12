<template>
	<view class="commoditydetails">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 头部导航 -->
		<actionbar message="商品详细" :Jumpchoose="true" url="/pages/headearnings/headearnings"></actionbar>
		<!-- 商品 -->
		<view class="productdetails_box">
			<!-- 每个商品 -->
			<view class="goodslot">
				<!-- 是哪个店铺 -->
				<view class="whichone">
					<view class="goodsPhon" style="background-image:url(/static/commoditydetails/camera.png);"></view>
					<view class="store_name">SDHKJAHDk旗舰店</view>
				</view>
				<!-- 图片展示 -->
				<view class="picturePresentation ">
					<!-- 推广提示 -->
					<view class="Underpromotion">正在推广中</view>
					<image class="pictureCamera" src="/static/commoditydetails/camera.png" mode=""></image>
				</view>
				<!-- 详细介绍 -->
				<view class="detailedIntroduction">
					<view class="camear_brand">
						<view class="brand_text">索尼相机 北京销售过百 镜头防抖科索尼相机</view>
						<view class="discounts">
							<text class="cialflagship">【官方旗舰点弄哦让内容弄哦让能工人蓉蓉好难哦呢人内容化</text>
							<text class="securities">领劵</text> 
							<text class="reduction">60满减2</text>
						</view>
					</view>
					<!-- 存库价格等 -->
					<view class="remainingBox">
						<view class="keepPrice">
							<view class="warehousing">存库10  剩余2</view>
							<view class="priceA">￥9999.00</view>
						</view>
						<view class="brokerage">
							<view class="predict_agency">预估获得佣金:200</view>
							<view class="acquire_agency">获得用金:200</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 每个商品 -->
			<view class="goodslot">
				<!-- 是哪个店铺 -->
				<view class="whichone">
					<view class="goodsPhon" style="background-image:url(/static/commoditydetails/camera.png);"></view>
					<view class="store_name">SDHKJAHDk旗舰店</view>
				</view>
				<!-- 图片展示 -->
				<view class="picturePresentation ">
					<!-- 推广提示 -->
					<view class="Underpromotion">正在推广中</view>
					<image class="pictureCamera" src="/static/commoditydetails/camera.png" mode=""></image>
				</view>
				<!-- 详细介绍 -->
				<view class="detailedIntroduction">
					<view class="camear_brand">
						<view class="brand_text">索尼相机 北京销售过百 镜头防抖科索尼相机</view>
						<view class="discounts">
							<text class="cialflagship">【官方旗舰点弄哦让内容弄哦让能工人蓉蓉好难哦呢人内容化</text>
							<text class="securities">领劵</text> 
							<text class="reduction">60满减2</text>
						</view>
					</view>
					<!-- 存库价格等 -->
					<view class="remainingBox">
						<view class="keepPrice">
							<view class="warehousing">存库10  剩余2</view>
							<view class="priceA">￥9999.00</view>
						</view>
						<view class="brokerage">
							<view class="predict_agency">预估获得佣金:200</view>
							<view class="acquire_agency">获得用金:200</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
			}
		},
		methods: {
			
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		components:{
			actionbar,
		}
	}
</script>

<style lang="less" scoped>
	.commoditydetails{
		background-color: #f2f2f2;
		padding-bottom: 40rpx;
		.productdetails_box{
			    display: flex;
				flex-wrap: wrap;
				justify-content: center;
				margin-top: 20rpx;
				/* 每个商品 */
			   .goodslot{
				   width: 690rpx;
				   background-color: #FFFFFF;
				   padding-bottom: 25rpx;
				   margin-bottom: 30rpx;
				   box-shadow: 6rpx 5rpx 20rpx #CCCCCC;
				   // 哪个店铺
				   .whichone{
					   display: flex;
					   padding: 20rpx 0;
					   align-items: center;
					   .goodsPhon{
						   width: 75rpx;
						   height: 75rpx;
						   border-radius: 50%;
						   background-repeat: no-repeat;
						   background-size: cover;
						   border: 1px solid rgb(226,236,230);
						   margin: 0 22rpx 0 15rpx;
					   }
					   .store_name{
						   color: #676767;
					   }
				   }
				   // 图片展示
				   .picturePresentation{
					   position: relative;
					   padding: 10rpx 0;
					   background-color: #dfdfdf;
					   display: flex;
					   justify-content: center;
					   align-items: center;
					   .Underpromotion{
						   position: absolute;
						   top: 0;
						   right: 0;
						   padding: 10rpx 2rpx;
						   text-align: center;
						   width: 157rpx;
						   background-color: #595959;
						   color: #FFFFFF;
					   }
					   .pictureCamera{
						   width: 280rpx;
						   height: 206rpx;
					   }
				   }
			   }
			}
			// 详细的介绍
			.detailedIntroduction{
				padding: 10rpx 20rpx 0 25rpx;
				display: flex;
				flex-wrap: wrap;
				.camear_brand{
					font-size: 30rpx;
					font-weight: 500;
					.brand_text{
						width: 620rpx;
						overflow: hidden;
						white-space: nowrap
					}
					.discounts{
						display: flex;
						flex-wrap:  wrap;
						align-items: center;
						.cialflagship{
							width: 350rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
						.securities{
							background-color: red;
							color: #fff;
							padding: 2rpx 8rpx;
						}
						.reduction{
							border: 1px solid red;
							color:red;
							margin-left: 10rpx;
							padding: 2rpx 4rpx;
						}
					}
				}
			}
			.remainingBox{
				display: flex;
				flex-grow: 12;
				// 左边部分
				.keepPrice{
					color: #969696;
					flex-grow: 10;
					.warehousing{
						margin: 12rpx 0;
					}
					.priceA{
						color: red;
						font-size: 36rpx;
					}
				}
				// 右边部分
				.brokerage{
					flex-grow: 1;
					.predict_agency{
						color: #969696;
						margin: 30rpx 0 4rpx 0;
					}
				}
			}
	}
   
</style>
