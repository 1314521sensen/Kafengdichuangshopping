<template>
	<view class="PriceTitle">
		<view class="PriceTitle-top">
			<view class="price">
				<!-- 商品的价格 -->
				<text>¥{{pic.unitprice}}</text>
			</view>
			<view class="CommodityTitle">
				<!-- 商品的标题 -->
				<text v-text="pic.title"></text>
			</view>
			<view class="sales">
				<text>快递:免运费</text>
				<text>月销12</text>
				<text>浙江温州</text>
			</view>
		</view>
		
		<bottompopup parameter="参数"></bottompopup>
		<evaluation></evaluation>
	</view>
</template>

<script>
	import bottompopup from "@/components/Details/BottomPopup.vue";
	import evaluation from "@/components/Details/evaluation.vue"
	export default{
		// 这是详情页面参数
		data(){
			return {
				unitprice:78.8,
				title:"coconordic意大利 SC(Square circle)同款茶几简约现代北欧小茶桌"
			}
		},
		methods:{
			
		},
		components:{
			bottompopup,
			evaluation
		},
		props:["pic"]
	}
</script>

<style lang="less" scoped>
	.PriceTitle{
		.PriceTitle-top{
			background-color: #fff;
			padding:28rpx 10rpx 14rpx;
		}
		.price{
			margin-bottom:10rpx;
			text{
				font-size: 44rpx;
				color:#ff5000;
			}
		}
		.CommodityTitle{
			text{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.sales{
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color:#999;
			margin-top:14rpx;
		}
	}
</style>
