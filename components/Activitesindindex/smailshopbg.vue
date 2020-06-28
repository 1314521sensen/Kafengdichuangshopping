<template>
	<view class="smailshopbg" >
		<view class="smailshopbg-list" style="background-image: url(/static/Activirsindex/go.gif);background-size: 100% 100%">
			<view class="smail-list-box">
				<view class="smail-list" v-for="(item,index) in 3 " :key='index'>
					<view class="list-top">
						<image src="/static/Activirsindex/img/7.png" mode=""></image>
					</view>
					<view class="list-bottom">
						<text class="Surprise">惊喜价</text>
						<text class="price">￥59</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.smailshopbg{
		height: 472rpx;
		width: 100%;
		margin-top: 30rpx;
		overflow: hidden;
		padding: 10rpx;
		.smail-list-box{
			overflow: hidden;
			height: 260rpx;
			width: 100%;
			display: flex;
			justify-content: space-around;
			.smail-list{
				overflow: hidden;
				width: 220rpx;
				height: 100%;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				.list-top{
					height: 220rpx;
					width: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list-bottom{
					height: 40rpx;
					width: 100%;
					line-height: 40rpx;
					display: flex;
					justify-content: space-around;
					.Surprise{
						margin-top: 6rpx;
						border-radius: 30rpx;
						height: 30rpx;
						padding: 0 6rpx;
						font-size: 24rpx;
						line-height: 30rpx;
						background-image: linear-gradient(to right,#e53e9b,#d56ad5);
						color: #FFFFFF;
					}
				}
			}
		}
	}
	.smailshopbg-list{
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction:column-reverse;
		padding-bottom: 10rpx;
	}
</style>
