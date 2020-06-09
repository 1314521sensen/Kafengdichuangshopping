<template>
	<view class="grouppurchase">
		<!-- 整个头部 #f55d31-->
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="header">
			<!-- 导航 -->
			<actionbar message="团购" bg="#f55d31" textcolor="#fff" url="/pages/index/index"></actionbar>
		    <scroll-view scroll-x class="bg-white nav bg-white_bc" scroll-with-animation :scroll-left="scrollLeft">
		    	<view class="cu-item navtext" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navlist" :key="index" @tap="tabSelect" :data-id="index">
		    		{{item}}
		    	</view>
		    </scroll-view>
			<!-- 新款上市  品质保证 -->
		  <view class="gradual_bg">
			<view class="newStyle">
				<!-- 左边的图 -->
				<image class="newStyle_back" src="/static/grouppurchase/store.png" mode=""></image>
				<!-- 优惠，质量保证等  -->
				<view>
					<!-- 展示图 -->
					<view class="flatPatternmaking">
						<image src="/static/grouppurchase/women.png" mode=""></image>
						<image class="flatPatternmaking_television" src="/static/grouppurchase/television.png" mode=""></image>
						<image src="/static/grouppurchase/women.png" mode=""></image>
					</view>
					<!-- 描述 -->
					<view class="textD-escription">
						<text>夏款上市</text>
						<text>领劵购买</text>
						<text>任选二件</text>
					</view>
					<!-- 品质保障   -->
					<view class="qualityGuarantee">
						<image class="" src="/static/grouppurchase/safeguard.png" mode=""></image>
						<text>品质保障</text>
						<text>假一赔十</text>
						<text>100%正品</text>
					</view>
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
			<view class="titText">精品大牌</view>
			<view class="BoutiqueBox">
				<view class="BoutiquImg">
					<scroll-view scroll-x="true" class="scrollview">
						<view class="scrollview-item" :style="{width:imgwidth*10+'rpx'}">
							<image
								class="partnerImg"  
								src="/static/grouppurchase/partner1.png"
								v-for="(item,index) in 10"
								:key="index"
								:style="{width:imgwidth+'rpx'}"
							></image>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		<!-- 活动专场 -->
		<view class="SpecialActivities" :style="{'background-image':'url('+'/static/grouppurchase/guarantee.png'+')'}"></view>
		<!-- 最下面展示的轮播图 -->
		<view class="screen-box">
			<view class="screen-wrap">
			    <!-- 转图片和文字的 -->
				<scroll-view>
					<view class="scroll-view-item">
						<view class="screen-xiangxi" v-for="(item,index) in 10" :key="index">
							<view class="ImgBox">
								<image src="/static/grouppurchase/123.jpg" mode=""></image>
							</view>
							<!-- 商品介绍 -->
							<view class="products">
								<view>AHA页电动车莫大是评价哦热奇偶个人穷穷</view>
							</view>
							<view class="xiangxi-list">
								<view>
									<text class="xianjia">￥66</text>
									<text class="yuanjia">￥199</text>
								</view>
								<text class="more">
									<text></text>
									<text></text>
									<text></text>
								</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import banner from "@/components/indexcomponents/banner.vue"
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app =getApp()
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				statusBar:0,
				swiperList:[
					{
						imgurl:'/static/Details/banner1.png',
					}
				],
				imgwidth:142,//中间滚动区域每一张图片的宽度
				navlist:[
					"精选",
					"男装",
					"女装",
					"箱包",
					"女鞋",
					"男鞋",
					"零食"
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
			banner
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	//头部一整块 
    .header{
		background-color: #f55d31;
		.bg-white_bc{
			background-color: #f55d31;
			color: #FFFFFF;
		}
		.text-green{
			height: 70rpx;
			color: #fff;
		}
		
		.gradual_bg{
			// height: 284rpx;
			padding-bottom:34rpx;
			background-image: linear-gradient(#f55d31, #f2b29d);
		}
		//新款
		.newStyle{
			margin: 20rpx auto;
			width: 720rpx;
			display: flex;
			// height: 230rpx;
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
					font-size: 24rpx;
				}
				image{
					width: 30rpx;
					height: 40rpx;
					margin:0 15rpx 0 30rpx;
					vertical-align: middle;
				}
			}
		}
	}
	.sp{
		margin-top: -10rpx;
	}
	// 精品
	.Boutique{
		// margin-top:30rpx;
		overflow: hidden;
		padding:14rpx 0;
		background-color:#fff;
		margin:20rpx 0;
		.titText{
			// margin-top: 20rpx;
			// padding: 0 0 0 30rpx;
			padding-left:30rpx;
			background-color: #fff;
			font-weight: bold;
		}
		.BoutiquImg{
			// height: 170rpx;
			background-color: #fff;
			// margin-bottom: 20rpx;
			overflow: hidden;
			margin-top:20rpx;
			.scrollview{
				// width:800rpx;
				.scrollview-item{
					display:flex;
					.partnerImg{
						margin-left: 20rpx;
						height: 142rpx;
					}
				}
			}
		}
	}
	  .SpecialActivities{
		  height: 100rpx;
		  // background:url();
		  background-repeat: no-repeat;
		  background-size: 100% 100%;
	  }
	  // 最下面的轮播图 ;
	  .screen-box{
		  background-color:#F0F0F0;
		  // width: 740rpx;
		  margin-top: 20rpx;
		  padding-bottom:20rpx;
		  .scroll-view-item{
			  display:flex;
			  justify-content: space-between;
			  flex-wrap: wrap;
		  }
		  .ImgBox{
			 image{
				 margin-left: 5rpx;
				 width: 335rpx;
				 height: 260rpx;
			 }
		  }
		  .screen-wrap{
			  display: flex;
			  flex-wrap: wrap;
			  justify-content: space-between;
			  padding: 0 20rpx;
			  
			  .screen-xiangxi{
				 background-color: #fff;
				 margin-bottom: 15rpx;
				 width: 345rpx;
				 // height: 420rpx;
				 padding-bottom:20rpx;
			  }
			  
			  // 商品介绍
			  .products{
				  // width: 345rpx;
				  display: -webkit-box;
				  -webkit-box-orient: vertical;
				  -webkit-line-clamp: 2;
				  overflow: hidden;
				  padding:0 8rpx;
				  margin:30rpx 0;
			  }
			  .xianjia{
			  	 font-size: 18px;
			  	 color: red;
			  }
			  .yuanjia{
				  font-size: 12px;
				  color: #CCCCCC;
				  margin-left: 12rpx;
				  text-decoration:line-through;
			  }
			  .more{
				  // margin-left: 120rpx;
				 text{
					 display: inline-block;
					 width: 10rpx;
					 height: 10rpx;
					 border-radius: 50%;
					 background-color: #7d7d7d;
					 margin-left: 10rpx;
				 }
			  }
		  }
	  }
	  .xiangxi-list{
	  	display:flex;
		justify-content: space-between;
		align-items: center;
		padding:0 10rpx;
	  }
	  .navtext{
		  font-size: 32rpx;
	  }
</style>
