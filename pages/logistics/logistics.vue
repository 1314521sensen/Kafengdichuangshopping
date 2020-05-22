<template>
	<view class="logistics">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="物流详情" bg="#e6525b" textcolor="#fff" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<view class="commodity" @tap="shopDetails">
			<view class="commodity-img">
				<img :src="shoplist[0].good_pic?yuming+shoplist[0].good_pic:''" alt="">
			</view>
			<view class="commodity-text">
				{{shoplist[0].good_name?shoplist[0].good_name:''}}
			</view>
			<view class="commodity-price">
				￥{{shoplist[0].good_pay_price?shoplist[0].good_pay_price:''}}
			</view>
		</view>
		<view class="cu-timeline">
		  <view class="cu-item text-red" v-for="(item,index) in Traceslist" :key="index">
		    <view>
				<text class="text-one">{{item.AcceptStation}}</text>
				<text class="text-two">{{item.AcceptTime}}</text>
				<text class="text-there"></text>
		    </view>
		  </view>
		</view>
		<loading v-if="display"></loading>
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
				Traceslist:[],
				display:true
			}
		},
		methods: {
			shopDetails(){
				//跳到商品详情页
				 uni.reLaunch({
					 url:`/pages/Details/Details?id=${this.shopgoodid}&storeid=${this.storeid}`
				 })
			}
		},
		components:{
			Recommend,
			shoppinglist
		},
		onLoad(opctiopn){
			const _this = this
			let tokey = atob(opctiopn.tokey)
			let ordernumber = atob(opctiopn.ordernumber)
			//获取订单详情
			uni.request({
				url:`${app.globalData.Requestpath}order/getOrderInfo`,
				method:"POST",
				data:{
					token:tokey,
					sn:ordernumber
				},
				success(resinfo) {
					if(resinfo.data.code==0){
						uni.request({
							url:`${app.globalData.Requestpath}order/getOrderGoodList`,
							method:"POST",
							data:{
								token:tokey,
								order_sn:ordernumber,
								page:1,
								pageSize:1
							},
							success(res) {
								if(res.data.code==0){//请求商品的信息
									_this.shoplist = res.data.data.list
									// console.log(res.data.data.list[0].good_id)
									//这是图片的域名
									_this.yuming = app.globalData.imgyuming
									_this.shopgoodid = res.data.data.list[0].good_id//商品id
								}
							}
						})
						//这是获取订单详情里的店铺id
						_this.storeid = resinfo.data.data.store_id
						console.log(resinfo.data.data.express_sn)//快递单号
						//根据单号查询快递公司的编码
						uni.request({
							url:`${app.globalData.Requestpath}order/getLogisticCompanyInfo`,
							method:"POST",
							data:{
								e_num:resinfo.data.data.express_sn,
								token:tokey
							},
							success(Couriercompanyinfo) {//快递公司的信息
								if(Couriercompanyinfo.data.code==0){
									uni.request({//这请求物流轨迹
										url:`${app.globalData.Requestpath}order/getLogisticsInfo`,
										method:"POST",
										data:{
											token:tokey,
											ec_code:Couriercompanyinfo.data.data.express_code,//快递公司的编码
											e_num:resinfo.data.data.express_sn
										},
										success(logistics) {
											if(logistics.data.code==0){
												_this.Traceslist = logistics.data.data.Traces
												//就让加载的图标隐藏
												_this.display = false
											}
										}
									})
								}
							}
						})
					}
				}
			})
			// console.log(expresscom,expresssn)
			this.statusBar = app.globalData.statusBar
			app.globalData.Detectionupdatetokey(tokey)
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
