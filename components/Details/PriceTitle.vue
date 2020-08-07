<template>
	<view class="PriceTitle">
		<view class="PriceTitle-top">
			<view class="price">
				<!-- 商品的价格 -->
				<text>¥{{pic.good_promotion_price}}</text>
			</view>
			<view class="titleicon">
				<text class="Whethernew" v-if="couplebool=='npt'">新人</text>
				<!-- v-if这里判断时候为正常的商品 -->
				<text class="Whethernew"  v-if="parseInt(good_state)!==1 || parseInt(good_verify)!==1 || parseInt(good_delete)!==0">下架</text>
				<text class="Whethernew" v-if="liveshopstate=='liveshopstate'">直播商品</text>
			</view>
			<view class="CommodityTitle">
				<!-- 商品的标题 -->
				<view class="liveicon">
					<image :src="this.$store.state.httpUrl+'Details/broadcast.gif'"></image>
				</view>
				<text v-text="pic.good_title"></text>
			</view>
			<view class="sales">
				<text>快递:{{pic.good_freight?pic.good_freight:'免运费'}}</text>
				<text>月销{{pic.good_salenum?pic.good_salenum:0}}</text>
				<text>{{region[0]}}</text>
			</view>
		</view>
		<view v-if="this.$store.state.bannerbool">
			<storecoupon :tokey="tokey" :storeid="storeid" msg="领卷" Whatcoupon="0" titlemsg="领劵"></storecoupon>
			<service></service>
			<bottompopup parameter="参数" :storeid="storeid" :gid="gid"></bottompopup>
			<evaluation :gid="gid"></evaluation>
		</view>
	</view>
</template>

<script>
	import bottompopup from "@/components/Details/BottomPopup.vue";
	import storecoupon from "@/components/Details/storecoupon.vue"
	import evaluation from "@/components/Details/evaluation.vue"
	import service from "@/components/Details/service.vue"
	export default{
		// 这是详情页面参数
		data(){
			return {
				unitprice:78.8,
				title:"coconordic意大利 SC(Square circle)同款茶几简约现代北欧小茶桌",
				imgyuming:"http://hbk.huiboke.com/uploads/app/image/"
			}
		},
		methods:{
			
		},
		components:{
			bottompopup,
			evaluation,
			storecoupon,
			service
		},
		props:["pic","region","tokey","storeid","couplebool","good_state","good_verify","good_delete","gid","liveshopstate"],
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
			.liveicon{
				display: inline-block;
				vertical-align: middle;
				width: 120rpx;
				height:35rpx;
				background-color: red;
				image{
					width: 100%;
					height:100%;
				}
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
	.Whethernew{
		// display:block;
		// width: 90rpx;
		padding:2rpx 18rpx;
		background-color:red;
		text-align:center;
		color:#fff;
		border-radius:16rpx;
		font-size: 24rpx;
	}
</style>
