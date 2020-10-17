<template>
	<view class="storenewArrival">
		<view>
			<!-- 招牌 -->
			<view class="titie_Logo">
				<view class="Logo_url" :style="{'background-image':'url('+this.$store.state.httpUrl+'store/signboard.png)'}" mode="">
					<view>新店开业  新品大筹</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="rushGoodsListBox" v-for="(item,index) in storenewArrivallist" :key="index" >
				<!-- 每个商品 -->
				<view class="rushGoods" 
					v-if="index%2<1"
					:data-g_id="item.good_id"
					:data-s_id="item.store_id"
					@tap="randomshopdefault"
				>
					<!-- 左边图片展示 -->
					<view class="exhibition">
						<image :src="imgpath+item.good_pic" mode=""></image>
					</view>
					<!-- 右边的详细内容  -->
					<view class="detailMatter" :style="{'background-image':'url('+httpUrl+'store/petal.png'+')'}">
						<view class="data_name">{{item.good_title}}</view>
						<view class="deta_text">{{'畅销:'+item.good_click}}</view>
						<view class="deta_price">{{'¥'+item.good_promotion_price}}</view>
						<view class="Snapped">
							<text class="spnTxt">立即抢购</text>
						</view>
					</view>
				</view>
				<!-- 每个商品 -->
				<view class="rushGoods" 
					v-if="index%2>=1"
					:data-g_id="item.good_id"
					:data-s_id="item.store_id"
					@tap="randomshopdefault"
				>
					<!-- 左边图片展示 -->
					<view class="detailMatter_right" :style="{'background-image':'url('+httpUrl+'store/petal.png'+')'}">
						<view class="data_name">{{item.good_title}}</view>
						<view class="deta_text">{{'畅销:'+item.good_click}}</view>
						<view class="deta_price">{{'¥'+item.good_promotion_price}}</view>
						<view class="Snapped">
							<text class="spnTxt">立即抢购</text>
						</view>
					</view>
					 <!-- 右边的详细内容 -->
					<view class="exhibition">
						<image :src="imgpath+item.good_pic" mode=""></image>
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
				httpUrl:this.$store.state.httpUrl,
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			randomshopdefault(e){
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
				})
			}
		},
		props:["storenewArrivallist"],
	}
</script>

<style lang="less" scoped>
  .storenewArrival{
	  flex:1;	
	  background-color: #fed9dc;
	  // 门店图片  
	  .titie_Logo{
		  margin-top: 30rpx;
		  display: flex;
		  justify-content: center;
		  flex: 1;
		  .Logo_url{
			width: 475rpx;
			height: 150rpx;
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top:30rpx;
			font-size: 32rpx;
			color: #fc6879;
			font-weight: bold;
		 }
	  }
  }
  // 商品列表  
  .rushGoodsListBox{
	  // 单个商品
	  .rushGoods{	
		  padding-top: 40rpx;
		  display: flex;
		  justify-content: center;
		  // 左部分
		  .exhibition{
		  		border-radius: 15rpx;
		  		overflow: hidden;
		  		image{
		  			width: 345rpx;
		  			height: 340rpx;
		  			vertical-align: middle;
		  		}
		  	}
		  //右部分 
		  .detailMatter{
			  padding-top: 20rpx;
			  padding-left: 20rpx;
			  width: 324rpx;
			  font-weight: bold;
		      background-repeat: no-repeat;
		      background-size: 100% 100%;
			  background-position: 50rpx 0;
			  .data_name{
				  color: #52a3d3;
				  font-size: 36rpx;
				  display: -webkit-box;
				  -webkit-box-orient: vertical;
				  -webkit-line-clamp: 2;
				  overflow: hidden;
			  }
			  .deta_text{
				  color: #fc6b79;
				  margin: 30rpx 0 45rpx;
			  }
			  .deta_price{
				  color:#fc6b79;
				  font-size: 40rpx;
			  }
			  .Snapped{
			  	padding: 4rpx 4rpx;
			  	display: flex;
			  	justify-content: center;
			  	align-items: center;
			  	 width: 158rpx;
			  	 background-color: #fc6b79;
			  	 color: #FFFFFF;
			  	 box-sizing: content-box;
			  	 .spnTxt{
			  	   border: 2rpx solid #fff;
			  	   padding: 4rpx 20rpx;
			  	   font-size: 29rpx;
			  	   font-weight: bold;
			  	 }
			  }
		  }
		  // 
		  .detailMatter_right{
			  width: 324rpx;
			   font-weight: bold;
			   text-align: right;
			   padding: 20rpx 20rpx 0 0 ;
			   background-repeat: no-repeat;
			   background-size: 100% 100%;
			   background-position: -40rpx 50rpx;
			  .data_name{
				  color: #52a3d3;
				  font-size: 36rpx;
				  display: -webkit-box;
				  -webkit-box-orient: vertical;
				  -webkit-line-clamp: 2;
				  overflow: hidden;
			  }
			  .deta_text{
				  color: #fc6b79;
				  margin: 30rpx 0 45rpx;
			  }
			  .deta_price{
				  color:#fc6b79;
				  font-size: 40rpx;
			  }
			 .Snapped{
			 	 width: 158rpx;
				 margin-left: auto;
			 	 background-color: #fc6b79;
			 	 color: #FFFFFF;
			 	 box-sizing: content-box;
				 padding: 4rpx 4rpx;
				 display: flex;
				 justify-content: center;
				 align-items: center;
			 	 .spnTxt{
			 	   border: 2rpx solid #fff;
			 	   padding: 4rpx 20rpx;
			 	   font-size: 29rpx;
			 	   font-weight: bold;
			 	 }
			 }
		  }
	  }
  }
</style>
