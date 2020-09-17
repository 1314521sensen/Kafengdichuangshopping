<template>
	<view class="shareCode">
		<view class="orders">
			<view class="orders-title-name" @tap="shezhipasswrd" data-target="setphonetan">
				<text>关于我们</text>
				<view class="mintext">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			shezhipasswrd(){
				//跳转   
				uni.navigateTo({
					url:'/pages/regards/regards'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.orders{
		background-color: #fff;
		// padding-bottom:30rpx; 
		margin-top:10rpx;
		.orders-title-name{
		// width: ;
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
			padding:0 20rpx;
			// background-color:yellow;
				text{
					font-size: 30rpx;
					font-weight: bold;
				}
				.mintext{
					display: flex;
					color:#999;
					text{
						font-size: 25rpx;
						font-weight: normal;
					}
				}
		}
	}
</style>
