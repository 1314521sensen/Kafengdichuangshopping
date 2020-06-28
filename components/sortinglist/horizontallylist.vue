<template>
	<view class="horizontallylist">
			<view class="horizontally">
				<view class="list" v-for="(item,index) in horizontallylist" :key="index" @tap="horizontallydetails(item.good_id,item.store_id)">
					<image :src="'http://hbk.huiboke.com'+item.good_pic"></image>
					<view class="list-titile">
						<view class="item-title">{{item.good_title}}</view>
						<text class="horizontallyprice">¥{{item.good_price}}</text>
					</view>
				</view>
			</view>
			<view class="bottomline" v-if="horizontallylist.length>=10">
				<text>{{bottomlinetext}}</text>
			</view>
	</view>
</template>

<script>
	//横排显示列表
	export default{
		data(){
			return{
				limit:10,
				bottomlinetext:"我也是有底线的"
			}
		},
		methods:{
			horizontallydetails(id,storeid){
				uni.navigateTo({
					url:`/pages/Details/Details?id=${id}&storeid=${storeid}`
				})
			},
			//监控scroll-view 滚动标签是否滚动到底部
		},
		props:["horizontallylist"]
	}
</script>

<style lang="less" scoped>
	.horizontallylist{
		margin-top:20rpx;
		.scroll-view{
			overflow: hidden;
			height:100vh;	
		}
		.horizontally{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding:0 15rpx;
			.list{
				width: 49%;
				// height:100rpx;
				background-color: #fff;
				margin-bottom:10rpx;
				overflow: hidden;
				padding-bottom:20rpx;
				&:last-child{
					margin-bottom:0;
				}
				image{
					width: 100%;
					height:384rpx;
				}
				.list-titile{
					padding:0 10rpx;
					.item-title{
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						overflow: hidden;
						font-weight: bold;
						font-size: 30rpx;
						margin-top:8rpx;
					}
					text{
						display: block;
						font-size: 30rpx;
						color:#000;
						 white-space:nowrap;
						 font-weight: bold;
						 margin-top:8rpx;
						 &:last-child{
							 margin-top:30rpx;
						 }
					}
					.horizontallyprice{
						color:red;
					}
				}
			}
		}
	}
	.bottomline{
		background-color: #f2f2f2;
		display:flex;
		justify-content: center;
		text{
			display:block;
			color:#999;
			/* #ifdef H5 */
			font-size:16rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			font-size: 24rpx;
			/* #endif  */
			line-height:50rpx;
		}
	}
</style>
