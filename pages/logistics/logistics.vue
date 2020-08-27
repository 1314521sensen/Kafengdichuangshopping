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
		<!--  -->
		<!-- <view class="cu-timeline">
		  <view class="cu-item text-red" v-for="(item,index) in this.$store.state.Traceslist" :key="index">
		    <view>
				<text class="text-one">{{item.AcceptStation}}</text>
				<text class="text-two">{{item.AcceptTime}}</text>
				<text class="text-there"></text>
		    </view>
		  </view>
		</view> -->
		<view class="cu-timeline" v-if="islocation">
			  <view class="cu-item text-red" v-for="(item,index) in Addressdata" :key="index">
				<view>
					<text class="text-one">{{item.AcceptStation}}</text>
					<text class="text-two">{{item.AcceptTime}}</text>
					<text class="text-there">{{item.Location}}</text>
				</view>
			  </view>
			</view>
		<view v-if="islocation==false">
		<view class="nodata">暂无数据</view>
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
				phone:0	,//手机号
				phoneAffour:0,//手机号后四位  
				Addressdata:[],//地址数据
				islocation:false,	 //判断是否有数据   
				statusBar:30,
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
		},
		onLoad(option) {
					
					this.phone = atob(option.mobile)
					this.phoneAffour = this.phone.substring(this.phone.length-4,this.phone.length)
					
					const _this = this
					_this.$store.commit("getLogisticsin")
					
					// 获取物流消息
					uni.getStorage({
						key:"bindtokey",
						success(toke){
							// console.log(toke.data,'本地')
							// console.log(option.order_sn,"订单编号")
							uni.request({
								url:`${app.globalData.Requestpath}order/getLogisticCompanyInfo`,
								method:"POST",
								data:{
									token:toke.data,
									e_num:option.order_sn
									 // e_num:"SF1040455120054"
								},
								success(res) {
									
									// console.log(res.data.data.express_code,'快递编号')
									// console.log(res,'ddd')
									if(res.data.code == 0){
									     uni.request({
									     	url:`${app.globalData.Requestpath}order/getLogisticsInfo`,
											method:"POST",
											data:{
												token:toke.data,
												ec_code:res.data.data.express_code,
												e_num:option.order_sn,  
												ec_name:_this.phoneAffour 
												// token:"63629d1019219856d3ee4e84f2fb0f0d",
												// ec_code:"SF",
												// e_num:"SF1040455120054",
												// ec_name:5012
											},
											success(res){	
												// console.log(toke.data,res.data.data.express_code,option.order_sn,_this.phoneAffour)
												if(res.data.code == 0){
													_this.islocation = true
													_this.Addressdata = res.data.data.Traces
													// this.islocation = true  
													// console.log(_this.Addressdata,666888)
													// console.log(res,'最终的')  
												}
											}
									     })
									}
									// console.log(res,'收货地址')  
								}
							})
						}
					})
				},
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
	.nodata{
		text-align: center;
		line-height: 100rpx;
	}
</style>
