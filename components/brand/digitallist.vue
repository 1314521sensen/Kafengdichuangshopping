<template>
	<view>
		<!-- v-if="this.$store.state.Brandloadbool" -->
		<view v-if="this.$store.state.Brandloadbool">
		<view class="wrapBox" 
			v-for="(item,index) in this.$store.state.BrandList" 
			:key="index"
		>
			<view class="digitallist">
				<!-- 上面的标题 -->
				<view>
					<view class="special">
						<view class="speTltBox">
							<view class="speTlt">{{item.brand_name}}</view>
						</view>
					</view>
					<!-- 数码榜单的排名展示 -->	
					<view class="flex_Digitallistdisplay">
						<view class="Digitallistdisplay">
							<view class="headline"> 
								<view class="headline_text">热卖榜单</view>
							</view>
							<!-- 装所有商品的盒子 -->
							<view class="details">
								<!-- 每一个商品 -->
								<view class="Goody"
									v-for="(itemSales,indexSales) in item.Brandonlist" 
									:key='indexSales'
									:data-g_id="itemSales.good_id"
									:data-s_id="itemSales.store_id"
									@tap="Brandonlistshopdefault"
								>
									<!-- 展示图片 -->
									<view class="goodsImg" :style="{backgroundImage:'url('+imgpath+itemSales.good_pic+')'}">
										<!-- <image class="plate" :src="item.platImg" mode=""></image> -->
									</view>
									<!-- 详细介绍 -->
									<view class="minute">
										<view class="concept">{{itemSales.good_title}}</view>
										<view class="price">￥{{itemSales.good_promotion_price}}</view>
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
						<view class="goodsBox" 
							v-for="(itemlists,indexlists) in item.Brandonlists" 
							:key='indexlists'
							:data-g_id="itemlists.good_id"
							:data-s_id="itemlists.store_id"
							@tap="Brandonlistsshopdefault"
						>
							<image :src="imgpath+itemlists.good_pic" mode=""></image>
							<view class="Gootext">{{itemlists.good_title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
		<loading v-if="this.$store.state.Brandloadbool==false"></loading>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			//这是点击热卖榜单
			Brandonlistshopdefault(e){
				let {g_id,s_id} = e.currentTarget.dataset
				// console.log(g_id,s_id)
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
				})
			},
			//这是点击热卖榜单下面的6张图
			Brandonlistsshopdefault(e){
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
				})
			}
		},
		created() {
			this.$store.commit("getgetBrandList",{Brandloadbools:true})
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
					border: 2rpx solid #ff702f;
					border-radius:36rpx;
					padding: 4rpx 18rpx;
					background-color: #fff;
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
								font-size: 24rpx;
								margin: 18rpx 0 0rpx;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								padding:0 8rpx;
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
				// width: 710rpx;
				display: flex;
				// justify-content:center;
				flex-wrap: wrap;
				padding-left:64rpx;
				// 每个商品的盒子
				.goodsBox{
					width: 30%;
					// height: 290rpx;
					background-color: #fff;
					display: flex;
					flex-wrap: wrap;
					margin-top: 10rpx;
					border-radius: 10rpx;
					justify-content: center;
					padding-bottom:10rpx;
					margin-right:5rpx;
					&:nth-child(3n){
						margin-right:0;
					}
					image{
						width: 100%;
						height: 220rpx;
					}
					.Gootext{
						margin-top: 10rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						padding:0 10rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}

</style>
