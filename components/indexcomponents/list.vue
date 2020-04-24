<template>
	<view class="list">
		<view class="cu-list menu-avatar">
				<!-- 这是背景图片 -->
				<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
				<view class="cu-item" v-for="(item,index) in list" :key="index" @click="linkDetails(item.good_id)">
					<view class="cu-item-left">
						<view class="cu-avatar round lg" :style="{'background-image':'url('+'http://hbk.huiboke.com'+item.good_pic+')'}"></view>
					</view>
					<view class="cu-item-right">
						<view class="content">
							<view class="text-grey">{{item.good_title}}</view>
							<view class="price">
								￥{{item.good_price}}
							</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			linkDetails(id){
				//当点击的时候跳转到详情页
				//根据index和我的组件中传过来的url 判断跳到哪里
				uni.navigateTo({
					url:`/pages/Details/Details?id=${id}`
				})
			}
		},
		props:["list"]
		
	}
</script>

<style lang="less" scoped>
	.list{
		.shopping-title{
			//由于背景图片没高度 给来一个高度
			height:70rpx;
			background-color:deeppink ;//背景图片没有 先用颜色替代
			// background-image:url() //这里背景图片到时候有图片在渲染  先把图片的其他属性写上
			// background:no-repeat 0 0;
			// background-size: 100% 100%;
			
		}
		.cu-list.menu-avatar>.cu-item{
			height:200rpx;
			align-items: center;
			margin-bottom:20rpx;
			&:last-child{
				margin-bottom:0;
			}
			.cu-avatar{
				position: static !important;
			}
			.cu-item-left{
				
			}
			.cu-item-right{
					width: calc(100% - 20px - 30px - 60px - 10px) !important;
				 .content{
				 	position: static !important;
				 	width: 100% !important;
				 	left:0 !important;
					display: flex;
					flex-wrap: wrap;
					align-items: stretch !important;
				 	.text-grey{
				 		line-height:28rpx;
				 		color:#000;
				 		font-size: 28rpx;
				 	}
				 	.price{
				 		color:red;
				 		font-weight: bold;
				 		font-size: 30rpx;
						margin-top:60rpx;
				 	}
				 }
			}
		}
		.cu-avatar.lg{
			width: 200rpx;
			height:190rpx;
			border-radius:8rpx;
		}
		
	}
</style>
