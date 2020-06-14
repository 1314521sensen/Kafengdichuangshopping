<template>
	<view class="wrapBox">
		<view class="digitallist">
			<!-- 上面的标题 -->
			<view>
				<view class="special">
					<view class="speTltBox">
						<view class="speTlt">手机数码</view>
					</view>
				</view>
				<!-- 数码榜单的排名展示 -->	
				<view class="flex_Digitallistdisplay">
					<view class="Digitallistdisplay">
						<view class="headline"> 
							<view class="headline_text">数码榜单</view>
						</view>
						<!-- 装所有商品的盒子 -->
						<view class="details">
							<!-- 每一个商品 -->
							<view class="Goody" v-for="(item,index) in Digital" :key='index'>
								<!-- 展示图片 -->
								<view class="goodsImg" :style="{backgroundImage:'url('+item.goodUrl+')'}">
									<image class="plate" :src="item.platImg" mode=""></image>
								</view>
								<!-- 详细介绍 -->
								<view class="minute">
									<view class="concept">{{item.concept}}</view>
									<view class="price">￥{{item.price}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wrap">
			<view class="productlist">
				<!-- 装商品的大盒子 -->
				<view class="produBox">
					<!-- 每个商品的盒子 -->
					<view class="goodsBox" v-for="(item,index) in produGooBox" :key='index'>
						<image :src="item.proImg" mode=""></image>
						<view class="Gootext">{{item.protText}}</view>
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
				 Digital:[{
					 goodUrl:"/static/brand/cellphone.png",
					 platImg:'/static/brand/goldmedal.png',
					 concept:'华为P40 Pro',
					 price:7344.00
				},
				{
					 goodUrl:"/static/brand/cellphone.png",
					 platImg:'/static/brand/silvermedal.png',
					 concept:'华为P40 Pro',
					 price:9000.00
				},
				{
					 goodUrl:"/static/brand/cellphone.png",
					 platImg:'/static/brand/coppermedal.png',
					 concept:'华为P40 Pro',
					 price:9541.00
				}],
				produGooBox:[
					{
						proImg:'/static/brand/phonedisplay.png',
						protText:'苹果'
					},
					{
						proImg:'/static/brand/phonedisplay.png',
						protText:'苹果'
					},
					{
						proImg:'/static/brand/phonedisplay.png',
						protText:'苹果'
					},
					{
						proImg:'/static/brand/phonedisplay.png',
						protText:'苹果'
					},
					{
						proImg:'/static/brand/phonedisplay.png',
						protText:'苹果'
					},
					{
						proImg:'/static/brand/phonedisplay.png',
						protText:'苹果'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.digitallist{
		.special{
			.speTltBox{
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.speTlt{
					color: #ff702f;
					font-size: 34rpx;
				}
			}
		}
		.flex_Digitallistdisplay{
			display: flex;
			justify-content: center;
			// 数码榜单
			.Digitallistdisplay{
				width: 722rpx;
				height: 340rpx;
				background-color: #f36b2d;
				border-radius: 12rpx;
				overflow: hidden;
				display: flex;
				.headline{
					font-size: 34rpx;
					width: 60rpx;
					height: 100%;
					padding-right: 10rpx;
					background-color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					.headline_text{
						width: 20rpx;
					}
				}
				// 右边的榜单列表
				.details{
					display:flex;
					flex: 1;
					justify-content: space-between;
					align-items: center;
					padding: 0 10rpx;
					border-top-left-radius: 12rpx;
					// 单个商品
					.Goody{
						width: 210rpx;
						background-color: #fff;
						// 背景手机图片
						.goodsImg{
							height: 220rpx;
							display: flex;
							flex: 1;
							background-size: 100% 100%;
							background-repeat: no-repeat;
							.plate{
								width: 50rpx;
								height: 50rpx;
							}
						}
						// 详细
						.minute{
							padding-bottom: 5rpx;
							display: flex;
							justify-content: center;
							flex-wrap: wrap;
							.concept{
								font-size: 32rpx;
								margin: 18rpx 0 0rpx;
							}
							.price{
								color: red;
							}
						}
					}
				}
			}
		}
	}
	.wrap{
		background-color: #399bfa;
		.productlist{
				padding-bottom: 30rpx;
				display: flex;
				justify-content: center;
				flex: 1;
			// 大盒子  
			.produBox{
				width: 710rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				// 每个商品的盒子
				.goodsBox{
					width: 235rpx;
					height: 290rpx;
					background-color: #fff;
					display: flex;
					flex-wrap: wrap;
					margin-top: 10rpx;
					border-radius: 10rpx;
					justify-content: center;
					image{
						width: 100%;
						height: 220rpx;
					}
					.Gootext{
						margin-top: 10rpx;
					}
				}
			}
		}
	}

</style>
