<template>
	<view class="adlet">
		<view class="highlight">
			<view class="high_img">
				<image src="/static/store/directeme.png" mode=""></image>
			</view>
			<!-- 右边部分 -->
			<view class="pleasantSurprise">
				<view class="plaeas_left">
					<view class="broadcastImgBox">
						<image class="broadcastImg" src="/static/store/broadcast.gif" mode=""></image>
					</view>
					<view class="broad_text">福利不停发,惊喜不间断</view>
					<view class="broadcasImgS">
						<image src="/static/groupbooking/belle.png"></image>
						<image src="/static/groupbooking/belle.png"></image>
						<image src="/static/groupbooking/belle.png"></image>
						<image src="/static/groupbooking/belle.png"></image>
					</view>
				</view>
				<view class="plaeas_right">
					<view>立即观看</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.adlet{
		display: flex;
		justify-content: center;
		flex: 1;
		// margin-top: 30rpx;
		background-color: #f2f2f2;
		padding:30rpx 0;
		.highlight{
			display: flex;
			width: 690rpx;
			border-radius: 10rpx;
			background-color: #fff;
			box-shadow: 5rpx 5rpx 10rpx #ccc;
			.high_img{
				height: 200rpx; 
				image{
					height: 100%;
					width: 190rpx;
				}
			}
			// 右边部分  进入直播xx等
			.pleasantSurprise{
				display: flex;
				padding-top: 10rpx;
				.plaeas_left{
					.broadcastImgBox{
						image{
							width: 140rpx;
							height: 40rpx;
						}
					}
					.broad_text{
						margin: 8rpx 0 16rpx 12rpx;
					}
					.broadcasImgS{
						margin-left: 12rpx;
						image{
							width: 70rpx;
							height: 74rpx;
							margin-left: 5rpx;
						}
					}
				}
				.plaeas_right{  
					margin-left: 25rpx;
					view{
						color: #FFFFFF;
						border-radius: 20rpx;
						background-color: #7aae30;
						padding: 6rpx 22rpx;
					}
				}
			}
		}
	}
</style>
