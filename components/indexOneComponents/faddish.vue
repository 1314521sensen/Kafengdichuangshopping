<template>
	<view>
		<view class="faddish-banner" style="background-image: url(../../static/indexOne/faddish/faddish-banner.png);">
			<view class="faddish-item">
				<view class="faddish-left">
					<image src="../../static/indexOne/faddish/3.png" class="img-rotate"></image>
					<view class="left-text">
						<text>新品到货</text>
					</view>
				</view>
				<view class="faddish-center">
					<image src="../../static/indexOne/faddish/2.png" class="img-rotate"></image>
					<view class="center-text">
						<text>美妆专场</text>
						<image src="../../static/indexOne/go.gif"></image>
					</view>
				</view>
				<view class="faddish-left">
					<image src="../../static/indexOne/faddish/1.png" class="img-rotate"></image>
					<view class="left-text">
						<text>优惠好货</text>
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
		methods:{
			
		},
		
	}
</script>

<style lang="less" scoped>
	.faddish-banner{
		width: 90%;
		overflow: hidden;
		margin: 30rpx auto 10rpx;
		background-size: 100% 100%;
		.faddish-item{
			overflow: hidden;
			height: 100%;
			width: 60%;
			// background-color: green;
			margin: 0 auto;
			display: flex;
			justify-content: space-around;
			color: #FFFFFF;
			font-size: 24rpx;
			.faddish-left{
				width: 127rpx;
				// height: 140rpx;
				// background-color: #CCCCCC;
				margin-top: 20rpx;
				text-align: center;
				image{
					width: 100rpx;
					height: 100rpx;
					border-top-left-radius: 15rpx;
					border-top-right-radius: 15rpx;
				}
				.left-text{
					height: 40rpx;
					line-height: 40rpx;
					width: 100%;
					margin-top: -8rpx;
					border: 1rpx solid #FFFFFF;
					background-image: linear-gradient(#ff8b9b, #fa4067);
					border-radius: 10rpx;
				}
			}
			.faddish-center{
				// height: 150rpx;
				width: 150rpx;
				// background-color: #FF3600;
				text-align: center;
				margin: 2rpx 6rpx 0 6rpx;
				padding: 12rpx 0 0 0 ;
				image{
					width: 110rpx;
					height: 110rpx;
					border-top-left-radius: 15rpx;
					border-top-right-radius: 15rpx;
				}
				.center-text{
					display: flex;
					justify-content: center;
					margin: 0 auto;
					margin-top: -10rpx;
					height: 40rpx;
					width: 100%;
					border: 1rpx solid #FFFFFF;
					line-height: 40rpx;
					background-image: linear-gradient(#ff8b9b, #fa4067);
					border-radius: 10rpx;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-top: 5rpx;
					}
				}
				
			}
		}
	}
	.img-rotate{
		transform-style: preserve-3d;
		// transform:rotateY(0deg);
		animation: mymove 5s infinite;
	}
	@keyframes mymove {
		0% {
			transform:rotateY(0deg);
		}
		50% {
			transform:rotateY(180deg);
		}
		100% {
			transform:rotateY(360deg);
		}
	}
</style>
