<template>
	<view>
		<view class="shareCode" v-if="code!==''">
			<view class="orders">
				<view class="orders-title-name"  @tap="shezhipasswrd" >
					<text>{{code}}</text>
					<view class="mintext" data-target="setphonetan">
						<text class="lg text-gray cuIcon-right"></text>
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
				code:"用户协议"
			}
		},
		methods: {
			shezhipasswrd(){
				uni.navigateTo({
					url:"/pages/loginagreement/loginagreement"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	page{
		background-color: #f2f2f2;
	}
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
