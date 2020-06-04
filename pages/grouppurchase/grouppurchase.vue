<template>
	<view class="grouppurchase">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 整个头部 -->
		<view class="header">
			<!-- 导航 -->
			<actionbar message="团购" url="/pages/index/index"></actionbar>
		    <scroll-view scroll-x class="bg-white nav bg-white_bc" scroll-with-animation :scroll-left="scrollLeft">
		    	<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
		    		Tab{{index}}
		    	</view>
		    </scroll-view>
			<!-- 新款上市  品质保证 -->
			<view class="newStyle ">
				<!-- 左边的图 -->
				<image class="newStyle_back" src="/static/grouppurchase/5e588d66253ecaef795b68df2437c1a.png"></image>
				<!-- 优惠，质量保证等  -->
				<view>
					<!-- 展示图 -->
					<view class="flatPatternmaking">
						<image src="/static/grouppurchase/92956d936b7c1e9c694f867d2a18e04.png" mode=""></image>
						<image class="flatPatternmaking_television" src="/static/grouppurchase/46506b91641972dd8f220af68f34c8e.png" mode=""></image>
						<image src="/static/grouppurchase/92956d936b7c1e9c694f867d2a18e04.png" mode=""></image>
					</view>
					<!-- 描述 -->
					<view class="textD-escription">
						<text>夏款上市</text>
						<text>领劵购买</text>
						<text>任选二件</text>
					</view>
					<!-- 品质保障   -->
					<view class="qualityGuarantee">
						<image class="" src="/static/grouppurchase/15af2468db7ca07f930b141d6cb3c69.png" mode=""></image>
						<text>品质保障</text>
						<text>假一赔十</text>
						<text>100%正品</text>
					</view>
				</view>
			</view>
		</view>
		<view class="sp">
			<!-- 轮播图组件 -->
			<banner height="230" :swiperList="swiperList"></banner>
		</view>
		<!-- 精品大牌 -->
		<view class="Boutique">
			<view class="Boutique_name">精品大牌</view>
			<view class="ImaBox">
				<image src="/static/giftdetails/banner1.jpg" mode=""></image>
			</view>
		</view>
		<!-- 活动专场 -->
		<view class="SpecialActivities"></view>
		<!-- 最下面展示的轮播图 -->
		<view class="screen-box">
			<view class="screen-wrap">
			    <!-- 转图片和文字的 -->
				<view class="screen-xiangxi">
					<!-- 轮播图 -->
					<swiper class="screen-swiper"  :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperListBan" :key="index">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</swiper-item>
					</swiper>
					<!-- 商品介绍 -->
					<view class="products">
						<view>AHA页电动车莫大是评价哦热奇偶个人穷穷</view>
					</view>
					<view class="">
						<text class="xianjia">￥66</text>
						<text class="yuanjia">￥199</text>
					</view>
				</view>
				<view>
					<!-- 轮播图 -->
					<swiper class="screen-swiper"  :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperListBan" :key="index">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</swiper-item>
					</swiper>
					<!-- 商品介绍 -->
					<view class="products">
						<view>AHA页电动车莫大是评价哦热奇偶个人穷穷</view>
					</view>
					<!-- 价格 -->
					<view class="">
						<text class="xianjia">￥66</text>
						<text class="yuanjia">￥199</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import banner from "@/components/indexcomponents/banner.vue"
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				TabCur: 0,
				scrollLeft: 0,
				swiperList:[
					{
						imgurl:'/static/Details/banner1.png',
					}
				],
				// 最下面展示轮播图
				swiperListBan:[
					  {
					  	id: 0,
					  	type: 'image',
					  	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					  },
					  {
					  	id: 0,
					  	type: 'image',
					  	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
					  },
					  {
					  	id: 0,
					  	type: 'image',
					  	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					  }
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		components:{
			banner,
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	//头部一整块 
    .header{
		height: 495rpx;
		background-color: #f55d31;
		
		.header_nav{
			background-color: #f55d31;
			color: #fff;
		}
		.bg-white_bc{
			background-color: #f55d31;
			color: #FFFFFF;
		}
		.text-green{
			height: 70rpx;
			color: #fff;
		}
		
		//新款
		.newStyle{
			margin: 20rpx auto;
			width: 720rpx;
			display: flex;
			height: 230rpx;
			background-color: #fff;
			border-radius: 20rpx;
			
			.newStyle_back{
				width: 240rpx;
				height: 230rpx;
			}
			// 展示图片
			.flatPatternmaking{
				width: 405rpx;
				height: 100rpx;
				display: flex;
				margin-top: 40rpx;
				
				image{
					margin-left: 64rpx;
					width: 75rpx;
					height: 102rpx;
				}
				.flatPatternmaking_television{
					width: 89rpx;
					height: 70rpx;
				}
			}
			// 文字描述
			.textD-escription{
				text{
					margin-left: 30rpx;
				}
			}
			// 品质保障
			.qualityGuarantee{
				margin-top: 10rpx;
				
				text{
					margin-right: 24rpx;
					color: #656565;
					font-size: 12rpx;
				}
				image{
					width: 30rpx;
					height: 22rpx;
					margin-right: 15rpx;
					margin-left: 30rpx;
				}
			}
		}
	}
	.sp{
		margin-top: -10rpx;
	}
	// 精品
	.Boutique{
		height: 175rpx;
		margin-top: 20rpx;
		background-color: #fff;
		padding-top: 5px;
		
		.Boutique_name{
			text-indent: .5rem;
		}
		.ImaBox{
			margin-top: 8px;
			image{
				width: 100%;
				height: 90rpx;
		      }
	       }
      }//
	  .SpecialActivities{
		  height: 100rpx;
		  background:url(/static/grouppurchase/90613d1549ce312fc06947d43aada15.png);
		  background-size: 100% 100%;
	  }
	  // 最下面的轮播图 ;
	  .screen-box{
		  width: 740rpx;
		  margin-top: 20rpx;
		  
		  .screen-xiangxi{
			 border-right: 10rpx solid #ccc;
		  }
		  .screen-wrap{
			  display: flex;
			  background-color: #fff;
			  margin-left: 10rpx;
			  
			  .swiper{
			     width: 340rpx;
				 margin:0 auto;
			  }  
			  // 商品介绍
			  .products{
				  width: 350rpx;
				  margin-left: 10rpx;
			  }
			  .xianjia{
			  	 font-size: 18px;
			  	 color: red;
			  }
			  .yuanjia{
				  font-size: 12px;
				  color: #CCCCCC;
				  margin-left: 12rpx;
				  text-decoration:line-through ;
			  }
		  }
	  }
	  
</style>
