<template>
	<view class="list">
		<view class="cu-list menu-avatar">
				<!-- 这是背景图片 -->
				<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
				<view class="cu-item" v-for="(item,index) in list" :key="index" @tap="linkDetails(item.good_id?item.good_id:item.goods_id)">
					<view class="cu-item-left">
						<!--为什么这么写 因为组件是相互引用的  再加上后台 返回的数据值可能不一样只能用三目去判断哪个有值 goods_image -->
						<view class="cu-avatar round lg" :style="{'background-image':'url('+'http://hbk.huiboke.com'+(item.good_pic?item.good_pic:item.goods_image)+')'}"></view>
					</view>
					<view class="cu-item-right">
						<view class="content">
							<!-- goods_name这个值和上面的值一样的返回的不一样 -->
							<view class="text-grey">{{item.good_title?item.good_title:item.goods_name}}</view>
							<view class="price">
								￥{{item.good_price?item.good_price:(item.fav_price?item.fav_price:item.track_price)}}
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
