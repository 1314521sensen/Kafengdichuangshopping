<template>
	<view class="PriceTitle">
		<view class="PriceTitle-top">
			<view class="price">
				<!-- 商品的价格 -->
				<text>¥{{pic.good_price}}</text>
			</view>
			<view class="CommodityTitle">
				<!-- 商品的标题 -->
				<text v-text="pic.good_title"></text>
			</view>
			<view class="sales">
				<text>快递:{{pic.good_freight?pic.good_freight:'免运费'}}</text>
				<text>月销{{pic.good_salenum?pic.good_price:0}}</text>
				<text>{{region[0]}}</text>
			</view>
		</view>
		<storecoupon :tokey="tokey" :storeid="storeid" msg="领卷" Whatcoupon="0" titlemsg="领劵"></storecoupon>
		<bottompopup parameter="参数"></bottompopup>
		<evaluation></evaluation>
	</view>
</template>

<script>
	import bottompopup from "@/components/Details/BottomPopup.vue";
	import storecoupon from "@/components/Details/storecoupon.vue"
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
			evaluation,
			storecoupon
		},
		props:["pic","region","tokey","storeid"],
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
