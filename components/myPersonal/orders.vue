<template>
	<view class="orders">
		<view class="orders-title-name">
			<text>全部订单</text>
			<view class="mintext" @click="jumporder">
				<text>查看全部</text>
				<text class="lg text-gray cuIcon-right" ></text>
			</view>
		</view>
		<iconlist :iconList="iconList" align="space-between"></iconlist>
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
						images:"/static/my/payment.png",
						textname:"待付款"
					},
					{
						images:"/static/my/sendgoods.png",
						textname:"待发货"
					},
					{
						images:"/static/my/Forgoods.png",
						textname:"已发货"
					},
					{
						images:"/static/my/beenshipped.png",
						textname:"评价"
					},
					{
						images:"/static/my/Returngoods.png",
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
		background-color: #fff;
		padding-bottom:30rpx;
		margin-top:10rpx;
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
</style>
