<template>
	<view class="TheOrderDetails">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/orderpageRouter/orderpageRouter" :Jumpchoose="true" message="订单详情" bg="#fe7a00"></actionbar>
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="top">	
				<view class="bg-title">
					<text class="non-payment">等待买家付款</text>
					<text class="timeRemaining">剩余{{min}}分{{miao}}秒自动取消订单</text>
				</view>
			</view>
			<view class="contactWay">
				<view class="locationImg">
					<image src="/static/dingwei/dingwei.png" mode=""></image>
				</view>
				<view class="contactWaySite">
					<view class="contact">
						<text class="name-text">{{buyer_name}}</text>
						<text class="phone">{{buyer_mobile}}</text>
					</view>
					<view class="shippingAddress">
						<text>{{city}}&nbsp;{{rescitys}}&nbsp;{{area}}</text>
					</view>
				</view>
			</view>
			<Selectexpresscompany v-if="orderstatus==3"></Selectexpresscompany>
			<Deliveryaddressshow v-if="orderstatus>1"></Deliveryaddressshow>
			<view class="shoporder">
				<view class="shoporder-list" v-for="(item,index) in this.$store.state.orderlistshop" :key='index'>
					<view class="order-title">
						<text>{{s_title}}</text>
					</view>
					<view class="shopgoosorder">
						<view class="shop-img">
							<image :src="'http://hbk.huiboke.com'+item.good_pic" mode=""></image>
						</view>
						<view class="shopgoosorder-right">
							<view class="shopgoosorder-title">
								<text>{{item.good_name}}</text>
							</view>
							<view class="shopgoosorder-pic">
								<view class="pic-number">
									<text class="price" v-text="'￥'+item.good_pay_price"></text>
									<text class="number">×{{item.good_num}}</text>
								</view>
								<!-- @tap="refundparagraph" -->
								<!-- <view class="sales-return">
									
								</view> -->
							</view>
						</view>
					</view>
					<view class="Deliverynote">
						<view class="actual-payment">
							<text class="actual-payment-text">实付款</text>
							<text class="actual-payment-price" v-text="'￥'+item.good_pay_price*item.good_num"></text>
						</view>
					</view>
				</view>
				
			</view>
			<!-- <orderInformation></orderInformation> -->
			<view class="orderInformation">
				<view class="orderSerial-title">
					<text>订单信息</text>
				</view>
				<view class="serial">
					<view class="serial-left">
						<text>快递费：</text>
						<text>订单编号：</text>
						<text>订单流水号：</text>
						<text>创建时间：</text>
					</view>
					<view class="serial-right">
						<text>{{dispatch_price}}</text>
						<text>{{order_sn}}</text>
						<text>{{swift_no}}</text>
						<text>{{this.$store.state.ordercreatetime}}</text>
					</view>
				</view>
			</view>
			<shopoderbottom :orderstatus="orderstatus" :price="price" :order_sn="order_sn"></shopoderbottom>
		</scroll-view>
	</view>
</template>

<script>
	// import actionbar from "@/components/actionbar/actionbar.vue"
	import shopoderbottom from "@/components/Temporarynonpayment/shopoderbottom.vue"
	//引入查询物流的快递
	import Selectexpresscompany from "@/components/Commoditycomponent/Selectexpresscompany.vue"
	//引入跳到物流的页面
	import Deliveryaddressshow from "@/components/Temporarynonpayment/Deliveryaddressshow.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				min:30,
				miao:35,
				s_title:"",
				dispatch_price:"",
				order_sn:"",
				swift_no:"",
				buyer_name:"",
				buyer_mobile:"",
				city:"",//这是省份
				rescitys:"",//这是市
				area:"",//这是县
				orderstatus:"",
				price:""
			}
		},
		components:{
			// actionbar,
			shopoderbottom,
			Selectexpresscompany,
			Deliveryaddressshow
		},
		//后期说
		onLoad(opction) {
			// console.log(opction.ordersnSerial)
			// let ordersn = atob(opction.ordersnSerial)
			// this.$store.commit("getorderOloadlist",{order_sn:ordersn})
			this.statusBar = app.globalData.statusBar
		},
		created(){
			const _this = this
			this.$store.commit("getorderlist")
			
			uni.getStorage({
				key:"ordertitle",
				success(res){
					_this.s_title = res.data.title
					_this.dispatch_price = res.data.dispatch_price
					_this.order_sn = res.data.order_sn
					_this.swift_no = res.data.swift_no,
					_this.price = res.data.price
					//请求订单详情信息
					uni.getStorage({
						key:"bindtokey",
						success(restokey){
							uni.request({
								url:`${app.globalData.Requestpath}order/getOrderInfo`,
								method:"POST",
								data:{
									token:restokey.data,
									sn:res.data.order_sn
								},
								success(resinfo) {
									if(resinfo.data.code==0){
										//获取快递的编码
										if(resinfo.data.data.express_sn){
											
											uni.setStorage({
												key:"express_sn",
												data:[resinfo.data.data.express_sn]
											})
										}
										_this.orderstatus = resinfo.data.data.status
										//通过订单详情的信息获取收货地址的详情
										uni.request({
											url:`${app.globalData.Requestpath}user/getShippingAddress`,
											method:"POST",
											data:{
												token:restokey.data,
												address_id:resinfo.data.data.address_id,
											},
											success(resaddinfo) {
												// console.log(resaddinfo)
												if(resaddinfo.data.code==0){
													//这是收货人的名称
													_this.buyer_name = resaddinfo.data.data.street_number
													//这是收货人的手机号
													_this.buyer_mobile = resaddinfo.data.data.consignee_phone
													//通过收货地址的详情返回市区的id 分别取调用市区县
													//这是市
													uni.request({
														url:`${app.globalData.Requestpath}common/getOneAreaInfo`,
														data:{
															aid:resaddinfo.data.data.province
														},
														success(rescity) {
															if(rescity.data.code==0){
																_this.city = rescity.data.data.area_name
															}
														}
													})
													//请求市的id
													uni.request({
														url:`${app.globalData.Requestpath}common/getOneAreaInfo`,
														data:{
															aid:resaddinfo.data.data.city
														},
														success(rescitys) {
															if(rescitys.data.code==0){
																_this.rescitys = rescitys.data.data.area_name
															}
														}
													})
													//请求县的id
													uni.request({
														url:`${app.globalData.Requestpath}common/getOneAreaInfo`,
														data:{
															aid:resaddinfo.data.data.area
														},
														success(resarea) {
															if(resarea.data.code==0){
																_this.area = resarea.data.data.area_name
															}
														}
													})
												}
											}
										})
									}
								}
							})
						}
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.TheOrderDetails{
		.top{
			background-color: #fe7a00;
			.bg-title{
				width: 100%;
				padding: 60rpx 0 40rpx 60rpx;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: top;
				.non-payment{
					font-size: 34rpx;
				}
				.timeRemaining{
					font-size: 28rpx;
				}
			}
		}
		.contactWay{
			background-color: #FFFFFF;
			padding: 30rpx 0;
			display: flex;
			justify-content: left;
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
		.scroll-view{
			height: 93vh;
			padding-bottom: 80rpx;
		}
	}
	.shoporder{
		.shoporder-list{
			padding: 0 20rpx;
			background-color: #FFFFFF;
			margin-top: 40rpx;
			.order-title{
				padding: 20rpx 0;
				text{
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.shopgoosorder{
				margin-top: 10rpx;
				width: 100%;
				height: 200rpx;
				display: flex;
				justify-content: space-between;
				.shop-img{
					width: 30%;
					image{
						width: 200rpx;
						height: 200rpx;
					}
				}
				.shopgoosorder-right{
					
					width: 70%;
					display: flex;
					justify-content: space-between;
					.shopgoosorder-title{
						width: 70%;
						text{
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
					.shopgoosorder-pic{
						display: flex;
						flex-direction: column;
						justify-content: top;
						text-align: right;
						.pic-number{
							display: flex;
							flex-direction: column;
							justify-content: top;
							text-align: right;
							.price{
								font-size: 30rpx;
								font-weight: bold;
							}
							
						}
						.sales-return{
							margin-top: 30rpx;
						}
						
					}
				}
			}
			.Deliverynote{
				margin-top: 30rpx;
				padding: 0 20rpx;
				width: 100%;
				.express-fee{
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
				.actual-payment{
					padding: 10rpx 0;
					display: flex;
					justify-content: space-between;
					.actual-payment-text{
						font-size: 34rpx;
						color: #999999;
						
					}
					.actual-payment-price{
						color:#ff5300 ;
					}
				}
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
			display: flex;
			justify-content: left;
			color: #999999;
			.serial-left{
				display: flex;
				flex-direction: column;
				justify-content: top;
				line-height: 50rpx;
			}
			.serial-right{
				padding-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: top;
				line-height: 50rpx;
			}
		}
	}
</style>
