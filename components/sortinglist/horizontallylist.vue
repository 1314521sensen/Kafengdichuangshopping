<template>
	<view class="horizontallylist">
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom">
			<view class="horizontally">
				<view class="list" v-for="(item,index) in horizontallylist" :key="index" @tap="horizontallydetails(item.good_id)">
					<image :src="'http://hbk.huiboke.com'+item.good_pic"></image>
					<view class="list-titile">
						<text>{{item.good_title}}</text>
						<text class="horizontallyprice">¥{{item.good_price}}</text>
					</view>
				</view>
			</view>
			<view class="bottomline">
				<text>{{bottomlinetext}}</text>
			</view>
		</scroll-view>
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
			horizontallydetails(id){
				uni.navigateTo({
					url:`/pages/Details/Details?id=${id}`
				})
			},
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				
			},
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
				&:last-child{
					margin-bottom:0;
				}
				image{
					width: 100%;
					height:384rpx;
				}
				.list-titile{
					padding:0 10rpx;
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
			font-size:16rpx;
			line-height:50rpx;
		}
	}
</style>
