<template>
	<!-- 品牌专场 -->
	<scroll-view class="brand" :style="{'padding-top':statusBar+20+'rpx'}" :scroll-y="true" @scrolltolower="scrolltolower">
		<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
		<!-- 导航 -->
		<view class="brand_nav">
			<view class="Specialspecial">品牌专场</view>
			<!-- <view class="searchBox">
				<view class="search" >
					<view class="lg text-black cuIcon-search"></view>
				</view>
			</view> -->
		</view>
		<!-- 精品推荐 -->
		<view class="recommendation" :style="{'background-image':'url('+this.$store.state.httpUrl+'brand/recommendation.png'+')'}">
			<!-- 标题 -->
			<view class="mend_tltBox">
				<view class="mend_tlt">精品推荐</view>
				<view class="mend_text">QUALLTY RECOMMENDATIONS</view>
			</view>
			<!-- 商品盒子 -->	
			<view class="GoodsListbox">
				<!-- 单个商品的盒子  -->
				<view 
					class="singleGoods" 
					v-for="(item,index) in heeledpumpsListBox" 
					:key='index'
					:data-g_id="item.good_id"
					:data-s_id="item.store_id"
					@tap="singleGoodshopdefault"
				>
					<!-- 装展示图片的盒子 -->
					<view class="heeledpumpsBox">
						<image class="" :src="imgpath+item.good_pic" mode=""></image>
					</view>
					<view class="particular">
						<view class="genre">{{item.good_title}}</view>
						<view class="Howmany">{{'¥'+item.good_promotion_price}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 特卖，数码榜单 -->
		<digitallist></digitallist>
	</scroll-view>
</template>

<script>  
	import digitallist from "@/components/brand/digitallist.vue"
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				// 精品推荐
				heeledpumpsListBox:[],
				statusBar:0,
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			//点击品牌的精品推荐的商品 跳转到商品详情
			singleGoodshopdefault(e){
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
				})
			},
			//滚动到底部的时候触发
			scrolltolower(){
				this.$store.commit("scrolltolower",{Brandloadbools:false})
			}
		},
		components:{
			digitallist,
			defaultbgblackcolorwhitebar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			//获取品牌上面的精品推荐
			uni.request({
				url:`${app.globalData.Requestpath}brand/getBERDBrandGoodList`,
				data:{
					limit:4
				},
				success(res) {
					// console.log(res,'')
					if(res.data.code==0){
						_this.heeledpumpsListBox = res.data.data.list
					}
				}
			})
		},
		destroyed(){
		   this.$store.state.Brandpage = 1
		  }
	}
</script>

<style lang="less" scoped>
   .brand{
	   height: 100vh;
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
						  display: -webkit-box;
						  -webkit-box-orient: vertical;
						  -webkit-line-clamp: 2;
						  overflow: hidden;
						  padding:0 8rpx;
					  }
					  .Howmany{
						  font-size: 24rpx;
						  color: #ef8920;
						  text-align: center;
					  }
				  }
			   }
		   }
	   }
   }
</style>
