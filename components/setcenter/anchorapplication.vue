<template>
	<view class="Setpaymentpassword">
		<view class="orders">
			<view class="orders-title-name">
				<text>{{message}}</text>
				<view class="mintext"  @tap="shezhipasswrd" data-target="setphonetan">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//components/setcenter/SetChangeResetpassword   	
	export default{
		data(){
			return {
				message:"申请主播",
			}
		},
		methods:{
			shezhipasswrd(){
				//跳转   
				uni.navigateTo({ 
					url:`/components/setcenter/Applicationeaming`
				})
			
			}
		},
		created(){
			
		},
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
