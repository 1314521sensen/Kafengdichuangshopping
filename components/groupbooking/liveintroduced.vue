<template>
	<!-- 列表 -->
	<view class="list">
		 <!-- 每个列表 -->
		 <view class="SpellGroupBuying">
			 <!-- 背景大图 -->
			 <view class="SpellGroupBuying_URL"> </view>
		   <!-- 图片之下盒子 -->	 
		<view class="SpellGroupBuying_box"> 
			 <!-- 直播中 -->
			 <view class="zhibozhong">直播中</view>
			 <!-- xx G 等品牌介绍 -->
			 <view class="synopsis">
				 [即插即可]汽车车载U盘16G/32G抖音款流行音乐优盘
			 </view>
			 <!-- 底部 -->
			 <view class="button">
				 <!-- 店铺  价格 -->
				 <view class="button_left">
					 <view class="huddle">
						 <view class="store_back">
							 <text class="lg text-gray cuIcon-shop"></text>
						 </view>
						<text class="store_text">五人团</text>
					 </view>
					 <!-- 价格 -->
					 <view class="GroupPurchaseprice">
						<text class="priceOne">￥54</text> 
						<text class="priceTwo">￥74 </text>	
						<text class="priceThree">还剩2万件</text>
					 </view>
				 </view>
				 <!-- 立即拼团 -->
				 <view class="button_right">
					 <button class="cu-btn bg-red margin-tb-sm lg btn_yes">立即拼团</button>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.list{
		padding: 0 10rpx;
	   // 每个列表
	   .SpellGroupBuying{
		   margin: 20rpx auto;
		   // width: 720rpx;
		   // height: 500rpx;
		   background-color: #FFFFFF;
		   
		   .SpellGroupBuying_box{
			   display: flex;
			   flex-wrap: wrap;
			   padding: 0 0 10rpx 30rpx;
		   }
		 .SpellGroupBuying_URL{
			height: 200rpx;
			// background: url(/static/indexbanner/banner5.jpg);
			background-size: 100% 100%; 
		   }
		   .zhibozhong{
			   width: 140rpx;
			   height: 40rpx;
			   margin-top: 15rpx;
			   background-color: #f62733;
			   color: #fff;
			   text-align: center;
		   }
		   .synopsis{
			   margin-top: 10rpx;
			   font-size:16px;
			}
			.button{
				padding: 20rpx 0 0;
				display: flex;
				flex-grow: 12;
				.button_left{
					flex-grow: 10;
				}
				.button_right{
					flex-grow: 2;
				}
				// 价格还有剩多少件
				.GroupPurchaseprice{
					// margin-top: 10rpx;
					text{
						margin-left: 5rpx;
					}
					.priceOne{
						font-size: 20px;
						color:red;
					}
					.priceThree{
						color:#ccc;
						margin-left: 25rpx;
					}
					.priceTwo{
						text-decoration: line-through;
						color: #ccc;
					}
				}
				.huddle{
					display: flex;
					line-height: 50rpx;
				}
				.store_back{
					width: 42rpx;
					height: 44rpx;
					background-color: red;
					border-radius: 50%;
					text{
						color: #fff;
						margin-left: 8rpx;
						line-height: 25rpx;
					}
				}
				.store_text{
					margin-left: 15rpx;
				}
				.btn_yes{
					width: 240rpx;
					background-color: #E72734;
					margin: 30rpx 0 0 0rpx;
					border-radius: 20rpx;
				}
			}
		 }
	  }
</style>
