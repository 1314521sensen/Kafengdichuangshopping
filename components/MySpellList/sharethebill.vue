<template>
		<!-- 我的拼单 -->
		<view class="MyspellList">
			<!--  每个商品  -->
			<view class="apieceOrder">
				<!-- 那个手机店 -->
				 <view class="store">
					<image src="/static/myspelllist/diningroompho.png" mode=""></image>
					<text class="store_name">腕上时缘手表店</text>
					<text class="success">拼单成功</text>
				 </view>
				 <!-- 商品介绍 -->
				 <view class="store_introduce">
					 <!-- 展示图  -->
					 <view class="exhibition">
						 <view></view>
					 </view>
					 <!-- 详细介绍 -->
					 <view class="detailed">
						 <!-- 商品 -->
						 <view class="productName">【官方正品】全自动机芯手表男士新款非机械钢带...</view>
						 <!-- 价格 -->
						 <view class="original">￥2999 x 1</view>
						 <view class="pocket">实付2500</view>
					 </view>
				 </view>
				 <!-- 订单操作 -->
				 <view class="operation">
					 <view class="operation_left">
						 <!-- 拼单人数的头像 -->
						<view class="cu-avatar-group">
							<view class="cu-avatar round lg group_pic" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<view class="severalPeople">4人团</view>
					 </view>
					 <view class="operation_right">
						 <view class="DeleteOrder">删除拼单</view>
						 <view class="buyAgain">再次购买</view>
					 </view>
				 </view>
			</view>
			
			<!--  每个商品  -->
			<view class="apieceOrder">
				<!-- 那个手机店 -->
				 <view class="store">
					<image src="/static/myspelllist/diningroompho.png" mode=""></image>
					<text class="store_name">腕上时缘手表店</text>
					<text class="success">拼单成功</text>
				 </view>
				 <!-- 商品介绍 -->
				 <view class="store_introduce">
					 <!-- 展示图  -->
					 <view class="exhibition">
						 <view></view>
					 </view>
					 <!-- 详细介绍 -->
					 <view class="detailed">
						 <!-- 商品 -->
						 <view class="productName">【官方正品】全自动机芯手表男士新款非机械钢带...</view>
						 <!-- 价格 -->
						 <view class="original">￥2999 x 1</view>
						 <view class="pocket">实付2500</view>
					 </view>
				 </view>
				 <!-- 订单操作 -->
				 <view class="operation">
					 <view class="operation_left">
						 <!-- 拼单人数的头像 -->
						<view class="cu-avatar-group">
							<view class="cu-avatar round lg group_pic" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<view class="severalPeople">4人团</view>
					 </view>
					 <view class="operation_right">
						 <view class="DeleteOrder">删除拼单</view>
						 <view class="buyAgain">再次购买</view>
					 </view>
				 </view>
			</view>
		</view>
</template>

<script>

	export default {
		data(){
			return {
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				]
			}
		},
		methods: {
		},
		components:{
		}
	}
</script>

<style lang="less" scoped>
	.MyspellList{
		// 每个商品
		.apieceOrder{
			padding-bottom: 15rpx;
			 background-color: #fff;
			 // 商品头部
			.store{
				padding: 5rpx 0 0 30rpx;
				line-height: 40rpx;
				height: 40rpx;
				display: flex;
				margin-top: 10rpx;
				image{
					width: 40rpx;
					height: 40rpx;
				}
				.store_name{
					margin-left: 8rpx;
					color: #ccc;
				}
				.success{
					margin-left: 330rpx;
					color: red;
				}
			}
			// 商品介绍
			.store_introduce{
				display: flex;
				.exhibition{
					width: 180rpx;
					margin: 35rpx 0 0 75rpx;
					padding-bottom: 20rpx;
					view{
						width: 110rpx;
						height: 150rpx;
						background-size: 100% 100%;
					}
				}
				// 商品的详细资料
				.detailed{
					margin-top: 30rpx;
					.productName{
						width: 460rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.original{
						color: #7e7e7e;
						margin-top: 7rpx;
					}
					.pocket{
						color: #7e7e7e;
						margin-top: 3rpx;
					}
				}
			}
			// 订单操作
			.operation{
				display: flex;
				flex-wrap: wrap;
				.operation_left{
					display: flex;
					align-items: center;
					margin-left: 40rpx;
					.severalPeople{
						margin-left: 10rpx;
						color: #666;
						font-size: 24rpx;
					}
				}
				.operation_right{
					display: flex;
					margin-left: auto;
					align-items: center;
					padding: 5rpx 0;
					color: #fff;
					view{
						width: 140rpx;
						text-align: center;
						background-color: #e72734;
						padding: 6rpx 12rpx;
						margin-right: 30rpx;
					}
					.DeleteOrder{
						background-color:#Eb6940;
					}
				}
				image{
					width: 50rpx;
					height: 50rpx;
					border-radius:50rpx;
				}
			}
			
		}
	}
	// 拼团的人物头像
	.group_pic{
		width: 50rpx;
		height: 50rpx;
	}
	.cu-avatar-group{
		padding:0 5px 0 10px
	}
</style>
