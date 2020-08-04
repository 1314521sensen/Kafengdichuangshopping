<template>
	<view class="autotrophy">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="自营" url="/pages/index/index"></actionbar>
		<!-- 种类 -->
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" style="height: 80rpx;">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navtabSelect" :key="index" @tap="tabSelect" :data-id="index">
				 {{item}}
			</view>
		</scroll-view>
		<!-- 展示图 -->
		<view class="patternmaking" :style="{'background-image':'url(/static/index/autotrophy/Thefruitstore.png)'}"></view>
		<!-- 查看更多 -->
		<view class="more">
			<view class="flashSale">限时拼购</view>
			<view class="dataBox">
				<text class="data">24</text>:
				<text class="data">00</text>:
				<text class="data">00</text>
			</view>
			<view class="search">
				查看全部
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<!-- 限时抢购 -->
		<view class="flashSaleBoxS">
			<scroll-view scroll-x="true" style="width: 100%;">
				<view class="flashrollBox" :style="{width:230*10+'rpx'}">
					<view class="singleCommoditiesBox" v-for="(item,index) in 10" :key="index">
						<!-- 展示图 -->
						<view  class="purchaseUrl"></view>
						<!-- 描述 -->
						<view class="describe">【超级盒子】猫王收音机MW-2...</view>
						<view class="num">
							<!-- 现价 -->
							<text class="currentPrice">￥399</text>
							<!-- 原价 -->
							<text class="originalPrice">￥499</text>
							<!-- 抢购 -->
							<text class="PanicBuying">+</text>
						</view>
					</view>
			</view>
			</scroll-view>
		</view>
		<!--  -->
		<view class="recommend_box">
			<!-- 热门推荐 -->
			<view class="recommend">
				<!-- 推荐 -->
				<view class="recommend_left" style="background:url(/static/index/autotrophy/newProducts.png) no-repeat;background-size: 100% 100%;">
					<view class="newProduct">新品推荐</view>
					<view class="nicePresent">
						<text class="boundary"></text>
						<text class="nicePresent_text">天天有好礼</text>
						<text class="boundary"></text>
					</view>
					<view>
						<text class="purchase">立即抢购</text>
					</view>
					<view class="lipstick_bg">
						<image src="/static/index/autotrophy/lipstick.png" mode=""></image>
					</view>
				</view>
				<!-- 产品 -->
				<view class="recommend_right">
				<view class="recommend_thing" style="background: url(/static/index/autotrophy/purple_bg.png) no-repeat;background-size: 100% 100%;">
						<view class="Box">
							<view class="likeHotCakes_text">热销产品</view>
							<image class="likeHotCakes_bg" src="/static/index/autotrophy/clothing.png" mode=""></image>
						</view>
					</view>
					<view class="recommend_thing" style="background: url(/static/index/autotrophy/purchase.png) no-repeat;background-size: 100% 100%;">
						<view class="Box">
							<view class="likeHotCakes_text">超值好物</view>
							<image class="likeHotCakes_bg" src="/static/index/autotrophy/clothing.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 活动图 -->
		<bgbanner :swiperList='swiperList' :isRounddot="swiperList.length>1?true:false"></bgbanner>
		<!-- 推荐 -->
		<view class="recommendBox">
			<text></text>
			<view class="recommendBox_name">推荐</view>
			<text></text>
		</view>
		
		<!-- 推荐产品 -->	
		<view class="recommendProduct">
			<!-- 单个产品 -->
			<view class="singleCommodities" v-for="(item,index) in 10" :key="index">
				<!-- 展示图 :style="{'background-image':'url(/static/index/autotrophy/electronic.png)'}"-->
				<view  class="purchaseUrl" ></view>
				<!-- 描述 -->
				<view class="describe">【超级盒子】猫王收音机MW-2...</view>
				<view class="num">
					<!-- 现价 -->
					<text class="currentPrice">￥399</text>
					<!-- 原价 -->
					<text class="originalPrice">￥499</text>
					<!-- 抢购 -->
					<text class="PanicBuying">+</text>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<view class="bar_bot">
			<view class="cu-bar tabbar margin-bottom-xl bg-white " >
				<view class="action text-green">
					<view class="cuIcon-homefill"></view> 首页
				</view>
				<view class="action text-gray">
					<view class="cuIcon-similar"></view> 分类
				</view>
				<view class="action text-gray add-action">
					<button class="cu-btn cuIcon-add bg-green shadow"></button>
					发布
				</view>
				<view class="action text-gray">
					<view class="cuIcon-cart">
					</view>
					购物车
				</view>
				<view class="action text-gray">
					<view class="cuIcon-my">
					</view>
					我的
				</view>
			</view>
		</view>
	<!--  -->
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	import bgbanner from "@/components/indexcomponents/menswearaaner.vue"
	export default {
		data() {
			return {
				scrollTop: 0,
				scrollLeft: 0,
				TabCur: 0,
				old: {
					scrollTop: 0
				},
				 navtabSelect:['首页','手机','数码','家电','生鲜','家装','食品'],
				 statusBar:0,
				 swiperList: [{
				      id: 0,
				      type: 'image',
				      url: '/static/index/indexDailygood/activitybanner.gif'
				 }]
			}
		},
		methods: {
		 scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		components:{
			actionbar,
			bgbanner
		}
	}
</script>

<style lang="less" scoped>
	  .nav{
		  background-color: #f2f2f2;
		  height: 65rpx;
			  
		  .cu-item{
			  line-height: 65rpx;
		  }
	  }
	  // 展示图
	  .patternmaking{
		  height: 310rpx;
		  // background:url(/static/autotrophy/Thefruitstore.png) ;
		  background-repeat:no-repeat ;
		  background-size: cover;
	  }
	  // 查看更多
	  .more{
		  display: flex;
		  flex-wrap:wrap;
		  align-items: center;
		  line-height: 90rpx;
		  margin-left: 20rpx;
		  .flashSale{
			  font-size: 32rpx;
			  font-weight: bold;
		  }
		  .dataBox{
			  margin-left: 40rpx;
		  }
		  .data{
			 background-color: #fff;
			 padding: 6rpx 5rpx;
			 margin-left: 5rpx;
			 margin-right: 5rpx;
			 color: #F43F3B;	
		  }
		  .search{
			  margin-left: 240rpx;
			  color: #666666;
		  }
		
	  }
	  // 限时抢购
	  .flashSaleBoxS{
		  display: flex;
		  margin-left: 4rpx;
		  .flashrollBox{
			  display: flex;
			  width: 920rpx;
		  }
		  
		  // 单个商品盒子
		  .singleCommoditiesBox{
			  width: 230rpx;
			  height: 370rpx;
			  background-color: #fff;
			  overflow: hidden;
			  margin-left: 12rpx;
			  
			  .purchaseUrl{
				  width: 192rpx;
				  height: 98rpx;
				  background-repeat: no-repeat;
				  background-size: 100% 100%;
				  margin: 66rpx auto 0;
			  } 
			  .num{
				  display: flex;
				  align-items: center;
			  }
			 // 描述
			 .describe{
				 display: -webkit-box;
				 -webkit-box-orient: vertical;
				 -webkit-line-clamp: 2;
				 overflow: hidden;
				 margin-top: 64rpx;
			 }
			 .currentPrice{
			 	 color: red;
				 font-size: 34rpx;
				 margin-left: 2rpx;
				 margin-top: 6rpx;
			 }
			 .originalPrice{
				 color: #CCCCCC;
				 font-size: 24rpx;
				 margin-top: 10rpx;
				 margin-left: 6rpx;
				 text-decoration:line-through;
			 }
			 .PanicBuying{
				 width: 40rpx;
				 height: 40rpx;
				 background-color: #f2f2f2;
				 border-radius: 50%;
				 margin-left: 15rpx;
				 margin-top: 8rpx;
				 line-height: 40rpx;
				 text-align: center;
				 color: #21bd00;
				 font-size: 36rpx;
			 }
		  }
	  }
	 .recommend_box{
		 display: flex;
		 justify-content: center;
		 margin: 30rpx 0;
		 // 推荐  产品等
		 .recommend{
			 padding: 0 10rpx;
		 	width: 715rpx;
			display: flex;
			justify-content: space-between;
			// 左边活动部分
			.recommend_left{
				width: 340rpx;
				height: 345rpx;
				font-size: 36rpx;
				text-align: center;
				padding: 20rpx 0;
				// 好礼
				.newProduct{
					font-weight: 700;
				}
				.nicePresent{
					font-size: 24rpx;
					color: #99999a;
					margin: 4rpx 5rpx 14rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					.boundary{
						display: inline-block;
						width: 60rpx;
						height: 2rpx;
						background-color: #99999a;
					}
					.nicePresent_text{
						margin: 0 12rpx;
					}
				}
				// 抢购
				.purchase{
					display: inline-block;
					padding: 4rpx 10rpx;
					border-radius: 30rpx;
					text-align: center;
					color: #FFFFFF;
					font-size: 30rpx;
					background-image: linear-gradient(#fe8300, #fdaf00);
					width: 155rpx;
				}
				// 口红
				.lipstick_bg{
					image{
					  width: 200rpx;
					  height: 146rpx;
					  margin-top: 10rpx;
					}
				}
			}
			.recommend_right{
				width: 330rpx;
				height: 345rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				// 热销产品
				.recommend_product{
					width: 334rpx;
					height: 160rpx;
					.Box{
						display: flex;
						justify-content: space-around;
						padding-top: 10rpx;
						.likeHotCakes_text{
							padding-top: 20rpx;
							font-weight: bold;
							font-size: 32rpx;
						}
						.likeHotCakes_bg{
							width: 106rpx;
							height: 135rpx;
						}
					}
				}
				// 超值好物
				.recommend_thing{
					width: 334rpx;
					height: 160rpx;
					.Box{
						display: flex;
						justify-content: space-around;
						padding-top: 10rpx;
						.likeHotCakes_text{
							padding-top: 20rpx;
							font-weight: bold;
							font-size: 32rpx;
						}
						.likeHotCakes_bg{
							width: 106rpx;
							height: 135rpx;
						}
					}
				}
			}
		 }
	 }
	.recommendBox{
		display: flex;
		height:100rpx;
		// line-height: 100rpx;
		justify-content: center;
		align-items: center;
		
		text{
			background-color: #000000;
			width: 60rpx;
			height: 2rpx;
		}
		.recommendBox_name{
			margin: 0 12rpx;
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	// 推荐产品
	.recommendProduct{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 25rpx 120rpx 25rpx;
		
		// 单个商品盒子
		.singleCommodities{
			  margin-bottom:20rpx;
			  width: 340rpx;
			  height: 555rpx;
			  background-color: #fff;
			  overflow: hidden;
			  
			  .purchaseUrl{
				  width: 292rpx;
				  height: 150rpx;
				  // background: url(/static/autotrophy/electronic.png) no-repeat;
				  background-size: 100% 100%;
				  margin: 100rpx auto 0;
			  }
			  .num{
				  margin-top: 40rpx;
				  display: flex;
				  align-items: center;
			  }
			 // 描述
			 .describe{
				 font-size: 32rpx;
				 margin-top: 85rpx;
				 display: -webkit-box;
				 -webkit-box-orient: vertical;
				 -webkit-line-clamp: 2;
				 overflow: hidden;
			 }
			 .currentPrice{
				 color: red;
				 font-size: 38rpx;
				 margin-left: 2rpx;
				 margin-top: 6rpx;
			 }
			 .originalPrice{
				 color: #CCCCCC;
				 font-size: 30rpx;
				 margin-top: 10rpx;
				 margin-left: 25rpx;
				 text-decoration:line-through;
			 }
			 .PanicBuying{
				 width: 50rpx;
				 height: 50rpx;
				 background-color: #f2f2f2;
				 border-radius: 50%;
				 margin: 8rpx 0 0 70rpx;
				 line-height: 50rpx;
				 text-align: center;
				 color: #21bd00;
				 font-size: 36rpx;
			 }
		}
	}
	.cu-item{
		line-height: 80rpx !important;
		height: 80rpx;
	}
	.bar_bot{
		width: 100%;
		left: 0;
		position: fixed;
		bottom: -50rpx;
	}
</style>
