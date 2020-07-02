<template>
	<view class="logistics">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="物流详情" bg="#e6525b" textcolor="#fff" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<!-- <view class="commodity" @tap="shopDetails">
			<view class="commodity-img">
				<img :src="shoplist[0].good_pic?yuming+shoplist[0].good_pic:''" alt="">
			</view>
			<view class="commodity-text">
				{{shoplist[0].good_name?shoplist[0].good_name:''}}
			</view>
			<view class="commodity-price">
				￥{{shoplist[0].good_pay_price?shoplist[0].good_pay_price:''}}
			</view>
		</view> -->
		<view class="cu-timeline">
		  <view class="cu-item text-red" v-for="(item,index) in this.$store.state.Traceslist" :key="index">
		    <view>
				<text class="text-one">{{item.AcceptStation}}</text>
				<text class="text-two">{{item.AcceptTime}}</text>
				<text class="text-there"></text>
		    </view>
		  </view>
		</view>
		<!-- <loading v-if="display"></loading> -->
		<Recommend title="推荐"></Recommend>
		<shoppinglist></shoppinglist>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import Recommend from '@/components/indexcomponents/Recommend.vue'
	import shoppinglist from "@/components/indexcomponents/shoppinglist.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:"",
				shoplist:[{good_pic:"",good_name:"",good_pay_price:""}],//为了避免报错这样写
				yuming:"",
				shopgoodid:"",
				storeid:"",
				expresscom:"",//订单详细信息里的快递公司
				expresssn:"",//订单详细信息里的快递单号
				display:true
			}
		},
		methods: {
			// shopDetails(){
			// 	//跳到商品详情页
			// 	 uni.reLaunch({
			// 		 url:`/pages/Details/Details?id=${this.shopgoodid}&storeid=${this.storeid}`
			// 	 })
			// }
		},
		components:{
			Recommend,
			shoppinglist
		},
		created() {
			this.$store.commit("getLogisticsin")
		}
	}
</script>

<style lang="less" scoped>
	.logistics{
		 background-color: white;
		 background-image: linear-gradient(#e64a52, #ffffff);
		 background-size: 100% 500rpx;
		 background-repeat: no-repeat;
	}
	.commodity{
		overflow: hidden;
		width: 94%;
		height: 130rpx;
		background-color: white;
		margin: 0 auto;
		margin-top: 40rpx;
		border-radius: 15rpx;
		padding-top: 10rpx;
		display: flex;
		justify-content: space-around;
		.commodity-img{
			display: inline-block;
			width: 110rpx;
			height: 110rpx;
			// background-color: red;
			img{
				width: 100%;
				height:100%
			}
		}
		.commodity-text{
			display: inline-block;
			width: 50%;
			font-size: 24rpx;
			font-weight: bold;
		}
	}
	
	
	.commodity-price{
		display: inline-block;
	}
	.cu-timeline{
		width: 94%;
		margin: 40rpx auto 0;
		border-radius: 15rpx;
	}
	.text-one{
		display: block;
		font-size: 26rpx;
		color: black;
	}
	.text-two{
		display: block;
		font-size: 16rpx;
		color: #ccc;
		margin-top: 20rpx;
	}
	.cu-timeline>.cu-item::after{
		background-color:#FF0000;
	}
</style>
