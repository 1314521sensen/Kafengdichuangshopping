<template>
	<view class="orders">
		<view class="orders-box">
			<view class="orders-title-name">
				<text>全部订单</text>
				<view class="mintext" @tap="jumporder">
					<text>查看全部</text>
					<text class="lg text-gray cuIcon-right" ></text>
				</view>
			</view>
			<iconlist :iconList="iconList" align="space-between"></iconlist>
		</view>
	</view>
</template>

<script>
	import iconlist from "@/components/myPersonal/iconlist.vue"
	export default{
		//这是全部订单
		data(){
			return {
				iconList:[
					{
						images:"/static/my/Forpayment.png",
						textname:"待付款"
					},
					{
						images:"/static/my/sendgoods.png",
						textname:"待发货"
					},
					{
						images:"/static/my/beenshipped.png",
						textname:"已发货"
					},
					{
						images:"/static/my/evaluation.png",
						textname:"评价"
					},
					{
						images:"/static/my/refundafter.png",
						textname:"退款售后"
					}
				]
			}
		},
		components:{
			iconlist
		},
		methods:{
			jumporder(){
				uni.navigateTo({
					url:"/pages/orderpageRouter/orderpageRouter"
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.orders{
		// 
		// padding-bottom:30rpx;
		// margin-top:10rpx;
		display: flex;
		justify-content: center;
		.orders-box{
			width: 95%;
			box-shadow: 2rpx 0px 8rpx 6rpx #c6c6c6;
			padding:20rpx 4rpx;
			background-color: #fff;
			.orders-title-name{
			// width: ;
			display: flex;
			justify-content: space-between;
			line-height: 60rpx;
			padding:0 20rpx;
			// background-color:yellow;
				text{
					font-size: 28rpx;
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
	}
</style>
