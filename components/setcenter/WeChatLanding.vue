<template>
	<view class="WeChatLanding" @tap="WeChatlink">
		<view class="WeChat-text">
			<text>微信绑定</text>
		</view>
		<view class="WeChat_icon">
			<text class="lg text-gray cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			WeChatlink(){
				console.log(1111)
				uni.navigateTo({
				    url:'/pages/WeChatLanding/WeChatLanding'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.WeChatLanding{
		height: 80rpx;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 10rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		.WeChat-text{
			font-size: 30rpx;
			font-weight: bold;
			line-height: 80rpx;
		}
		.WeChat_icon{
			line-height: 80rpx;
		}
	}
</style>
