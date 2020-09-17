<template>
	<view class="boutiquebarley">
		   <view class="titie_Logo">
			 <view class="Logo_url" :style="{'background-image':'url('+this.$store.state.httpUrl+'store/signboard.png'+')'}" mode="">
				<view>{{msg}}</view> 
			 </view>
		   </view>
		   <!-- 商品列表 -->
		   <view class="productlist">
			   <!-- <scroll-view scroll-y="true"> -->
				  <view class="scrollBox">
					   <!-- 单个商品盒子 -->
					   <view class="goods" 
							v-for="(item,index) in horizontallylist" 
							:key='index'
							:data-g_id="item.good_id"
							:data-s_id="item.store_id"
							@tap="storeshopdefault"
						>
						   <view>
								<image class="shoPrice" :src="imgpath+item.good_pic"></image>
						   </view>
						   <!-- 详细介绍 -->
						   <view class="particularBox">
							   <view class="recom_text">{{item.good_title}}</view>
							   <!-- 下划线 -->
							   <view class="reHr"></view>
							   <view class="Material">{{item.good_title}}</view>
							   <view class="priceBox">
								  <text class="paprice">￥{{item.good_promotion_price}}</text> 
								  <view class="Snapped">
									  <text class="spnTxt">立即抢购</text>
								  </view>
								</view>
						   </view>
					   </view>
				    </view>
			   <!-- </scroll-view> -->
		   </view>
	   </view>
	</view>  
</template>

<script>
	export default {
		data() {
			return {
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			storeshopdefault(e){
				let {g_id,s_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
				})
			}
		},
		props:["msg","horizontallylist"]
	}
</script>

<style lang="less" scoped>
     .boutiquebarley{
		 width: 100%;
		 background-color:#fed9dc;
		 padding-bottom: 80rpx;
		  //门店图片   
		  .titie_Logo{
			  margin-top: 30rpx;
			  display: flex;
			  justify-content: center;
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
		   // 商品列表  
		  .productlist{
			  display: flex;
			  flex-wrap: wrap;
			  justify-content: space-between;
			  // height:60vh;
			  // 滚轮里面装的一个盒子
			  .scrollBox{
				  display: flex;
				  flex-wrap: wrap;
				  justify-content: space-between;
				  padding: 0 30rpx;
				  margin-top: 35rpx;
			  }
			  // 单个商品   
			  .goods{
				  width: 330rpx; 
				  padding-bottom: 30rpx;
				  // 展示图片   
				 .shoPrice{
					 width: 100%;
					 height: 372rpx;
				 }
				 .particularBox{
					 .recom_text{
						 font-weight: bold;
						 font-size: 32rpx;
						 color: #E1599e;
						 display: -webkit-box;
						 -webkit-box-orient: vertical;
						 -webkit-line-clamp: 2;
						 overflow: hidden;
					 }
					 // 下划线
					 .reHr{
						 height:4rpx;
						 background-color: #fc6b79;
						 margin: 10rpx auto 10rpx;
					 }
					 .Material{
						 overflow: hidden;
						 color: #969999;
						 font-size: 24rpx;
						 text-align: center;
						 white-space:nowrap;
						 text-overflow: ellipsis;
					 }
					 .priceBox{
						 display: flex;
						 justify-content: space-between;
						 margin-top: 10rpx;
						 .paprice{
							 font-weight: bold;
							 font-size:40rpx;
							 color: #fc6b79;
						 }
						 .Snapped{
							 width: 158rpx;
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
		  }   
	  }
</style>
