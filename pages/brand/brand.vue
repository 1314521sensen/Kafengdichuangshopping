<template>
	<!-- 品牌专场 -->
	<view class="brand" :style="{'padding-top':statusBar+20+'rpx'}">
		<!-- 导航 -->
		<view class="brand_nav">
			<view class="Specialspecial">品牌专场</view>
			<view class="searchBox">
				<view class="search" >
					<view class="lg text-black cuIcon-search"></view>
				</view>
			</view>
		</view>
		<!-- 精品推荐 -->
		<view class="recommendation" style="background-image: url(/static/brand/recommendation.png);">
			<!-- 标题 -->
			<view class="mend_tltBox">
				<view class="mend_tlt">精品推荐</view>
				<view class="mend_text">QUALLTY RECOMMENDATIONS</view>
			</view>
			<!-- 商品盒子 -->	
			<view class="GoodsListbox">
				<!-- 单个商品的盒子  -->
				<view class="singleGoods" v-for="(item,index) in heeledpumpsListBox" :key='index'>
					<!-- 装展示图片的盒子 -->
					<view class="heeledpumpsBox">
						<image class="" :src="item.image" mode=""></image>
					</view>
					<view class="particular">
						<view class="genre">{{item.genre}}</view>
						<view class="Howmany">{{item.Howmany}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 特卖，数码榜单 -->
		<digitallist></digitallist>
		<!-- 商品列表 -->
		<productlist></productlist>
	</view>
</template>

<script>  
	import digitallist from "@/components/brand/digitallist.vue"
	import productlist from "@/components/brand/productlist.vue" 
	const app = getApp()
	export default {
		data() {
			return {
				// 精品推荐
				heeledpumpsListBox:[
					{
						image:"/static/brand/heeledpumps.png",
						genre:'高跟长筒靴',
						Howmany:'一万人买过'
					},
					{
						image:"/static/brand/heeledpumps.png",
						genre:'高跟长筒靴',
						Howmany:'一万人买过'
					},
					{
						image:"/static/brand/heeledpumps.png",
						genre:'高跟长筒靴',
						Howmany:'一万人买过'
					},
					{
						image:"/static/brand/heeledpumps.png",
						genre:'高跟长筒靴',
						Howmany:'一万人买过'
					}
				],
				statusBar:0
			}
		},
		methods: {
			
		},
		components:{
			digitallist,
			productlist
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
   .brand{
	   // height: 100vh;
	   background-color: #399afb;
	   // 头部导航  
	   .brand_nav{
		   display: flex;
		   height: 95rpx;
		   margin-left: 75rpx;
		   justify-content: center;
		   align-items: center;
		  .Specialspecial{
			  font-size: 54rpx;
			  color: #FFFFFF;
			  flex: 1;
			  text-align: center;
			  text-shadow: 6rpx 6rpx 28rpx #000;
		  }
		  .searchBox{
			   padding: 0 15rpx 0 0rpx;
				.search{
				   width: 65rpx;
				   height: 65rpx;
				   background-color: #fff;
				   border-radius: 50%;
				   text-align: center;
				   line-height: 65rpx;
				   font-size: 36rpx;
			 }  
		  }
	   }
	   // 精品推荐
	   .recommendation{
		   width: 100%;
		   background-size: 100% 100%;
		   background-repeat: no-repeat;
 		   margin-top: 10rpx;
		   padding: 50rpx 0 25rpx;
		   .mend_tltBox{
			   display: flex;
			   flex-direction: column;
			   align-items:center;
			   color: #FFFFFF;
			   .mend_tlt{
				  font-size: 40rpx;
				  font-weight: bold;
			   }
			   .mend_text{
				   font-size: 24rpx;
				   margin-top: 8rpx;
			   }
		   }
		   // 商品总盒子
		   .GoodsListbox{
			   display: flex;
			   justify-content: space-between;
			   padding: 0 15rpx;
			   margin-top: 25rpx;
			   // 单个商品
			   .singleGoods{
				   background-color: #FFFFFF;
				   width: 175rpx;
				   display: flex;
				   flex-wrap: wrap;
				   justify-content: center;
				   border-radius: 10rpx;
				   padding: 24rpx 0;
				   // 展示的图片  
				   .heeledpumpsBox{
					   width: 155rpx;
					   height: 150rpx;
					   image{
						   width: 100%;
						   height: 100%;
					   }
				   }
				  // 详细的
				  .particular{
					  .genre{
						  font-size: 26rpx;
						  margin: 10rpx 0 5rpx 0;
					  }
					  .Howmany{
						  font-size: 24rpx;
						  color: #ef8920;
					  }
				  }
			   }
		   }
	   }
   }
</style>
