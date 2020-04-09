<template>
	<view class="coupons">
		<view class="coupons-midden">
			<text>省钱优惠券</text>
			<view class="coupons-icon" @click="Ledsecurities">
				<text>立即领优惠券</text>
				<text class="lg text-gray cuIcon-right" ></text>
			</view>
		</view>
	</view>
</template>

<script>
	
	//这是个人中心上面的优惠券
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			Ledsecurities(){
				//跳转到领劵未使用 已使用 已过期那个路由
				uni.navigateTo({
					url:"/pages/Allcoupons/allcoupons"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	// #fdefee
	.coupons{
		background-color: #fff;
		padding:0 20rpx;
		.coupons-midden{
			display:flex;
			justify-content: space-between;
			// height:70rpx;
			line-height: 70rpx;
			align-items: center;
			background-color: #fdefee;
			color:#f00;
			padding:0 30rpx;
			text{
				
			}
			.coupons-icon{
				display:flex;
				align-items: center;
				width: 28%;
				height:50rpx;
				border-radius:20rpx;
				background-color: #f00;
				line-height:44rpx;
				padding-left:10rpx;
				text{
					font-weight: bold;
					color:#fff;
					font-size: 25rpx;
				}
			}
		}
	}
</style>
