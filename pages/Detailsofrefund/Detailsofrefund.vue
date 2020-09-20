<template>
	<view class="">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="pages/orderpageRouter/orderpageRouter" :Jumpchoose="true" :message="refund_state == 1 ? '退款详情':'退款退货详情'" bg="#fe7a00"></actionbar>
		<!-- <view class="refundof">正在退款中</view> -->
		<view class="refundof" v-if="orderstatus == -1">拒绝退款</view>
		<view class="refundof" v-if="orderstatus == 0">申请中</view>
		<view class="refundof" v-if="orderstatus == 1">等待退货</view>
		<view class="refundof" v-if="orderstatus == 2">已退款</view>
		<!-- 详细地址 -->
		<!-- <view class="contactWay" v-for="(item,index) in shippingaddress" :key="index">
			<view class="locationImg">
				<image src="/static/dingwei/dingwei.png" mode=""></image>
			</view>
			<view class="contactWaySite">
				<view class="contact">
					<text class="name-text">{{item.consignee_name}}</text>
					<text class="phone">{{item.consignee_phone}}</text>
				</view>
				<view class="shippingAddress">
					<text>{{province}}&nbsp;{{city}}&nbsp;{{district}}</text>
				</view>
			</view>
		</view> -->
		<!-- 商品列表 -->
		<deliveryaddressshow :order_sn="reason_express_sn"  v-if="refund_state==2"></deliveryaddressshow>
		
		<!-- 订单详细 -->
		<view class="orderInformation">
			<view class="orderSerial-title">
				<text>退款信息</text>
			</view>
			<view class="serial">
				<view class="serial_number">
					<view class="title">
						<text>订单编号：</text>
					</view>
					<view class="content">
						<text>{{order_sn}}</text>
					</view>
				</view>
				<view class="serial_number">
					<view class="title">
						<text>订单流水号：</text>
					</view>
					<view class="content">
						<text>{{swift_no}}</text>
					</view>
				</view>
				<view class="serial_number">
					<view class="title">
						<text>创建时间：</text>
					</view>
					<view class="content">
						<text>{{createTime}}</text>
					</view>
				</view>
				<view class="serial_number" v-if="refund_state==2">
					<view class="title">
						<text>快递单号：</text>
					</view>
					<view class="content">
						<text>{{reason_express_sn}}</text>
					</view>
				</view>
				<view class="serial_number">
					<view class="title">
						<text>退款原因：</text>
					</view>
					<view 
						class="content"
						style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;"
					>
						<text>{{reason_text}}</text>
					</view>
				</view>
				<view class="serial_number">
					<view class="title">
						<text>申请退款金额：</text>
					</view>
					<view class="content">
						<text>{{reason_apply_amount}}</text>
					</view>
				</view>
				<view class="serial_number">
					<view class="title" style="font-weight: bold;color: #000000;">
						<text>实际退款金额：</text>
					</view>
					<view class="content" style="font-weight: bold;color: red;font-size: 34rpx;">
						<text>{{reason_amount}}</text>
					</view>
				</view>
				<view class="serial_number">
					<view class="title">
						<text>退款说明：</text>
					</view>
					<view 
						class="content" 
						style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;"
					>
						<text>{{refundInstructions}}</text>
					</view>
				</view>
				
				
				<!-- <view class="serial-left">
					<text>快递费：</text>
					<text>订单编号：</text>
					<text>订单流水号：</text>
					<text>创建时间：</text>
					<text>退款说明:</text>
					<text>实际退款金额</text>
				</view>
				<view class="serial-right">
					<text>{{dispatch_price}}</text>
					<text>{{order_sn}}</text>
					<text>{{swift_no}}</text>
					<text>{{createTime}}</text>
					<text>{{refundInstructions}}</text>
					<text>{{reason_amount}}</text>
				</view> -->
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="singleorderList">
			<view 
				class="singleorder" 
				v-for="(item,index) in productdetails" 
				:key="index"
				:data-g_id="item.good_id"
				@tap="linkDetails"
			>
				<view class="good_tlt">{{title}}</view>
				<view class="Goodsdetail">
					<image :src="imgpath + item.good_pic" mode=""></image>
					<view class="goodName">{{item.good_name}}</view>
					<view class="priceBox">
						<view>￥{{item.good_price}}</view>
						<view>x {{item.good_num}}</view>
						<view style="margin-top: 30rpx;" v-if="orderstatus == -1">拒绝退款</view>
						<view style="margin-top: 30rpx;" v-if="orderstatus == 0">申请中</view>
						<view style="margin-top: 30rpx;" v-if="orderstatus == 1">等待退货</view>
						<view style="margin-top: 30rpx;" v-if="orderstatus == 2">已退款</view>
					</view>
				</view>
				<view class="Payprice">
					<view class="payment">小计</view>
					<view class="singleprice">￥{{(item.good_price*item.good_num).toFixed(2)}}</view>
				</view>
			</view>
		</view>
		<!-- 申请退款取消 -->
		<!-- <view class="RefundCancellation">
			<view>
				取消退款
			</view>
	    </view> -->
	</view>
</template>

<script>
	const app = getApp()
	import deliveryaddressshow from "@/components/Temporarynonpayment/Deliveryaddressshow.vue"
	export default {
		data() {
			return {
				statusBar:0,
				productdetails:[],
				imgpath:this.$store.state.imgyuming,
				title:'',//标题
				order_sn:0, //订单编号
				swift_no:0,//订单流水号
				dispatch_price:"",//运费
				createTime:"",//创建时间
				address_id:0,//收货地址id
				shippingaddress:[]  ,//收货具体地址
				order_id:0  ,//订单id
				province:""  ,//省
				city:"" ,//市
				district:"" ,//区
				RefundDetails:[],//退款详情信息
				orderstatus:0,  //订单状态
				refundInstructions:"",//退款说明
				reason_amount:0  ,//实际退款金额
				reason_text:'',//退款原因
				reason_express_sn:'',//快递单号
				refund_state:1,
				reason_apply_amount:''//申请退款金额
			}
		},
		methods: {
			linkDetails(e){
				let g_id = e.currentTarget.dataset.g_id
				uni.navigateTo({
				    url: `/pages/Details/Details?id=${g_id}`
				});
			}
		},
		components:{
			deliveryaddressshow
		},
		beforeDestroy(){
			uni.removeStorage({
				key:"Detailsrefund"
			})
		},
		onLoad(opction) {
			this.statusBar = app.globalData.statusBar
			// uni.navigateBack(); 
			// console.log(opction) 
			// console.log('onLoad')
			this.order_sn = opction.order_sn
			this.swift_no = opction.swift_no
			this.dispatch_price = opction.dispatch_price
			this.createTime = opction.createTime
			this.address_id = opction.address_id
			this.order_id = opction.order_id
			
			const _this = this 
			this.title = opction.title 
			
			setInterval(function(){
				uni.getStorage({
					key:"Detailsrefund",//
					success(res){
						_this.productdetails = res.data.data.data.list
					}
				})
			},200)
			//订单详情商品
				
			
			
			uni.getStorage({
				key:"bindtokey",
				success(res){
					uni.request({
						url:`${app.globalData.Requestpath}user/getShippingAddress`,	
						method:"POST",
						data:{
							token:res.data,
							address_id:_this.address_id
						},
						success(res) {
							if(res.data.code == 0){
								_this.shippingaddress = [res.data.data]
							}
							// console.log(_this.shippingaddress)
						}
					})
				}
			})
			
			//获取地址
			uni.getStorage({
				key:"bindtokey",
				success(res){
					uni.request({
						url:`${app.globalData.Requestpath}order/getOrderInfo`,
						method:"POST",
						data:{
							token:res.data,
							id:_this.order_id,
							sn:_this.order_sn
						},
						success(res){
							if(res.data.code == 0){
								_this.province = res.data.data.address_info.province_name
								_this.city = res.data.data.address_info.area_name
								_this.city_name = res.data.data.address_info.city_namev
							}
						}
						
					})
				}
			})
			
			// 退款详情   	
			uni.getStorage({
				key:"bindtokey",
				success(res){
					uni.request({
						url:`${app.globalData.Requestpath}order/getOrderRefundInfo`,
						method:"POST",
						data:{
						   oid:_this.order_id,
						   token:res.data
						},
						success(res) {
							// console.log(res.data.data)
							if(res.data.code == 0){
							   _this.RefundDetails = [res.data.data]
							   _this.orderstatus = _this.RefundDetails[0].reason_status
							   _this.refundInstructions = res.data.data.reason_explain
							   _this.reason_amount = res.data.data.reason_actual_amount
							   _this.reason_text = res.data.data.reason_text
							   _this.reason_express_sn = res.data.data.reason_express_sn
							   _this.refund_state = res.data.data.refund_state
							   _this.reason_apply_amount = res.data.data.reason_apply_amount
							   uni.setStorage({
							   	key:"express_sn",
							   	data:[_this.reason_express_sn]
							   })
							}
						}
					})
				}
			})
			
			
		
		}
	}  
</script>

<style lang="less" scoped>
	page{
		// background-color: #fff;
	}
	.refundof{
		height: 100rpx;
		font-size: 34rpx;
		color:#FFFFFF;
		padding: 10rpx 0 0 40rpx;
		background-color: #fe7a00;
		
	}
	.contactWay{
		background-color: #FFFFFF;
		padding: 30rpx 0;
		display: flex;
		justify-content: left;
		// margin-top: 30rpx;
		.locationImg{
			height: 100rpx;
			width: 20%;
			text-align: center;
			line-height: 100rpx;
			padding-top: 21rpx;
			image{
				width: 80rpx;
				height: 66rpx;
			}
		}
		.contactWaySite{
			display: flex;
			flex-direction:column;
			justify-content: space-between;
			.contact{
				.name-text{
					font-size: 34rpx;
				}
				.phone{
					color: #CCCCCC;
				}
			}
		}
	}
	.singleorderList{
		margin-top: 20rpx;
	}
	.singleorder{  
		padding: 10rpx 15rpx;
		background-color: #fff;
		// margin-top: 20rpx; 
		// border-bottom:2rpx solid #b5b5b5;
		margin-top: 20rpx;
		// height: 100rpx;
		.good_tlt{
			 font-weight: 400;
			 font-size: 34rpx;
		}
		.Goodsdetail{
			display: flex;
			image{
				width:200rpx;
				height: 200rpx;
			}
			.goodName{
				width:350rpx;
				// height: 80rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				// margin: 0 30rpx;
			}
			.priceBox{
				// margin-left: 40rpx;
				width:124rpx;
				font-weight: 600;
				font-size: 30rpx;
			}
		}
		.Payprice{
			display: flex;
			flex-grow: 10;
			line-height: 50rpx;
			padding: 20rpx 0 10rpx 20rpx;
			// padding-left: 20rpx;
			.payment{
				font-size: 34rpx;
				color: #999999;
				flex: 9;
			}
			.singleprice{
				color: #ff5300;
				flex: 2;
			}
		}
	}
	.orderInformation{
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 60rpx 20rpx;
		.orderSerial-title{
			font-size: 32rpx;
		}
		.serial{
			// display: flex;
			// justify-content: left;
			color: #999999;
			.serial_number{
				display: flex;
				justify-content: left;
				margin-top: 10rpx;
				.title{
					width: 250rpx;
				}
				.content{
					width: 	60%;
					flex-wrap: wrap;
					
					
				}
			}
			// .serial-left{
			// 	display: flex;
			// 	flex-direction: column;
			// 	justify-content: top;
			// 	line-height: 50rpx;
			// }
			// .serial-right{
			// 	padding-left: 20rpx;
			// 	display: flex;
			// 	flex-direction: column;
			// 	justify-content: top;
			// 	line-height: 50rpx;
			// }
		}
	}
	.RefundCancellation{
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		height: 120rpx;
		// padding-top: 30rpx;
		display: flex;
		align-items: center;
		view{
			margin-right: 10rpx;
			width: 180rpx;
			border: 2rpx solid #f37b1d;
			margin-left: auto;
			border-radius: 30rpx;
			padding: 10rpx 10rpx;
			text-align: center;
			color: #f37b1d;
		}
		
	}
</style>
