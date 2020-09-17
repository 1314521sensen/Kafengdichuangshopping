<template>
	<view class="cu-item">
		<view class="item-left">
			<view class="userinfo">
				<text class="userinfoplice">祁纪磊</text>
				<text class="userinfoplice userplone">18769490209</text>
				<text class="addressdefault">默认</text>
			</view>
			<view class="useraddres">
				<text class="addrestext">山东省德州市德城区城区董子文化街卡风迪创</text>
			</view>
		</view>
		<view class="item-right">
			<view class="uploadaddres">
				<image 
					:src="this.$store.state.httpUrl+'address/uploadaddress.png'"
					class="uploadaddres_img"
				></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.cu-item{
		display:flex;
		// background-color:red;
		border-bottom:2rpx solid #f5f5f5;
		padding:20rpx 0 20rpx 15rpx;
		background-color: #fff;
		.item-left{
			flex:1;
			// height:100rpx;
			// background-color:green;
			.userinfo{
				.userinfoplice{
					font-weight: bold;
					font-size:30rpx;
				}
				.userplone{
					margin:0 15rpx 0 60rpx;
				}
				.addressdefault{
					padding:6rpx 10rpx;
					background-color:#fa2342;
					color:#fff;
					border-radius:14rpx;
					font-size: 24rpx;
				}
			}
			.useraddres{
				margin-top:20rpx;
				.addrestext{
					font-size: 24rpx;
					color:#ccc;
					
				}
			}
		}
		.item-right{
			display:flex;
			justify-content: center;
			align-items: center;
			width: 15%;
			// background-color:yellow;
			.uploadaddres{
				width: 45rpx;
				height:45rpx;
				// background-color:red;
				.uploadaddres_img{
					width: 100%;
					height:100%;
				}
			}
		}
	}
</style>
