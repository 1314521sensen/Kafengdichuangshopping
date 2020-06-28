<template>
	<view class="discountsList">
		<view class="list-left" style="background-image: url(/static/Activirsindex/img/woman.png);">
			<view class="left-text" style="background-image: url(/static/Activirsindex/img/0.png);">
				<view class="left-text-top" >夏日女装</view>
				<view class="left-text-bottom" >夏日小白裙低至33元</view>
			</view>
		</view>
		<view class="list-right">
			<view class="snacks" style="background-image: url(/static/Activirsindex/img/2.png);">
				<view class="left-text" style="background-image: url(/static/Activirsindex/img/8.png);">
					<view class="left-text-top" >夏日女装</view>
					<view class="left-text-bottom" >夏日小白裙低至33元</view>
				</view>
			</view>
			<view class="womanlist">
				<view class="list-bottom" style="background-image: url(/static/Activirsindex/img/3.png);" v-for="(item,index) in 2" :key='index'>
					<view class="left-text" style="background-image: url(/static/Activirsindex/img/9.png);">
						<view class="left-text-top" >夏日女装</view>
						<view class="left-text-bottom" >夏日小白裙低至33元</view>
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
				
			};
		}
	}
</script>

<style lang="less" scoped> 
	.discountsList{
		width: 100%;
		display: flex;
		justify-content: space-between;
		.list-left{
			height: 484rpx;
			width: 226rpx;
			border-radius: 15rpx;
			background-size: 100% 100%;
			background-color: yellow;
			color: #FFFFFF;
			display: flex;
			flex-direction:column-reverse;
			// display：table-cell+ vertical：bottom
			.left-text{
				background-size: 100% 100%;
				text-align: center;
				// margin-top: 416rpx;
				padding: 30rpx 0 20rpx;
				.left-text-top{
					font-size: 28rpx;
				}
				.left-text-bottom{
					font-size: 24rpx;
				}
			}
			
		}
		.list-right{
			width: 473rpx;
			height: 100%;
			// background-color: yellow;
			.snacks{
				width: 100%;
				height: 242rpx;
				background-size: 100% 100%;
				border-radius: 15rpx;
				display: flex;
				flex-direction:column-reverse;
				overflow: hidden;
				.left-text{
					color: #FFFFFF;
					background-size: 110% 100%;
					background-position: center;
					text-align: center;
					// margin-top: 416rpx;
					padding: 30rpx 0 20rpx;
					display: flex;
					justify-content: space-between;
					.left-text-top{
						font-size: 28rpx;
						margin-left: 70rpx ;
					}
					.left-text-bottom{
						font-size:24rpx;
						margin-right: 50rpx;
					}
				}
			}
			.womanlist{
				height: 230rpx;
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				.list-bottom{
					overflow: hidden;
					display: flex;
					flex-direction:column-reverse;
					height: 100%;
					width: 230rpx;
					background-size: 100% 100%;
					border-radius: 15rpx;
				}
			}
		}
		.left-text{
			color: #FFFFFF;
			background-size: 110% 100%;
			background-position: center;
			text-align: center;
			// margin-top: 416rpx;
			padding: 30rpx 0 20rpx;
			.left-text-top{
				font-size: 28rpx;
			}
			.left-text-bottom{
				font-size: 24rpx;
			}
		}
	}
</style>
