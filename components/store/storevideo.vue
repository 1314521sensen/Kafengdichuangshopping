<template>
	<view class="storevideo">
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="storerecommended-title">
				<text>更多精彩</text>
			</view>
			<view class="videolist" @click="videojump">
				<view class="video">
					<video src="/static/video/01.mp4"></video>
				</view>
				<view class="Describeprice">
					<text class="describe">X特步男鞋纯黑运动鞋夏季透气特步男鞋纯黑运动鞋夏季透气</text>
					<view class="Describeprice-price">
						<text>¥179.00</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		methods:{
			//这里要跳转携带参数
			videojump(){
				uni.navigateTo({
					url:"/pages/Details/Details"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.storevideo{
		.storerecommended-title{
			color:#000;
			padding-left:16rpx;
			margin:28rpx 0;
			text{
				font-size: 33rpx;
				color:#565656;
				font-weight: bold;
			}
		}
		.scroll-view{
			height:80vh;
			.videolist{
				background-color:#fff;
				.video{
					height:500rpx;
					// background-color: red;
					video{
						width: 100%;
						height:100%;
					}
				}
				.Describeprice{
					display:flex;
					justify-content: space-between;
					padding:0 15rpx 10rpx;
					line-height:92rpx;
					text{
						display:block;
					}
					.describe{
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						width: 60%;
						font-size: 30rpx;
						font-weight: bold;
					}
					.Describeprice-price{
						display:flex;
						
					}
				}
			}
		}
	}
</style>
