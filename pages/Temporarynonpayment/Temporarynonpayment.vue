<template>
	<view class="TheOrderDetails">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/orderpageRouter/orderpageRouter" :Jumpchoose="true" message="订单详情" bg="#fe7a00"></actionbar>
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="top">	
				<view class="bg-title">
					<!-- orderstatus -->
					<text class="non-payment" v-if="orderstatus==-1">订单已取消</text>
					<text class="non-payment" v-if="orderstatus==0 && this.$store.state.remainingTime>0">等待买家付款</text>
					<text class="non-payment" v-if="orderstatus==1">订单已付款</text>
					<text class="non-payment" v-if="orderstatus==2">订单已发货</text>
					<text class="non-payment" v-if="orderstatus==3">订单已完成</text>
					<text v-if="orderstatus==0 && this.$store.state.remainingTime>0">{{this.$store.state.remainingTime}}分钟内自动取消订单</text>
					<text v-if="orderstatus==0 && this.$store.state.remainingTime<=0" style="color: #FF0000;font-size: 40rpx;">订单已超时自动取消</text>
					<!-- <xqcountdown 
						:startTime="String(this.$store.state.Notcreated)" 
						:endTime="String(this.$store.state.Notpaying)"
						v-if="orderstatus==0"
						@Endcountdown="Endcountdown"
					></xqcountdown> -->
				</view>
			</view>
			<!-- 新修改的地址 -->
			<view class="TheordercolumnBox">
				<view class="Theordercolumn">
					<view class="Theordercolumn_left">
						<view class="message">
							<text class="buyname">{{buyer_name}}</text>
							<text class="dercophone">{{buyer_mobile}}</text>
						</view>
						<view class="dercolocationBox">
							<view class="dercolocation-left">
								<text>{{city}}&nbsp;{{rescitys}}&nbsp;{{area}}&nbsp;{{addressdetailed}}</text>
							</view>
						</view>
					</view>
					<!-- 底下的颜色 -->
					<view class="Theordercolumn_right">
						<!-- <view v-for="(item,index) in 5" class="violet active">13</view> -->
						 <view class="activeBox" v-for="(item,index) in 5" :key="index">
							 <view class="violet active"></view>
							<view class="white active"></view>
							<view class="red active"></view>
							<view class="white active"></view>
						 </view>
						 <view class="violet active"></view>
					</view>
				</view>	
			</view>
			
			<!-- <Selectexpresscompany v-if="orderstatus==3"></Selectexpresscompany> -->
			<deliveryaddressshow :order_sn="order_sn" :buyer_mobile="buyer_mobile" v-if="orderstatus>1"></deliveryaddressshow>
			<view class="shoporder">
				<view class="shoporder-list" v-for="(item,index) in this.$store.state.orderlistshop" :key='index'>
					<view class="order-title">
						<text 
							:data-s_id="s_id"
							@tap="linkstore"
						>
							{{s_title}}
						</text>
					</view>
					<view 
						class="shopgoosorder"
						  @tap="toDetails"
		                  :data-g_id="item.good_id"
		                  :data-s_id="item.store_id"
					>
						<view class="shop-img">
							<image :src="imgpath+item.good_pic" mode=""></image>
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
							<text class="actual-payment-text">小计</text>
							<text class="actual-payment-price" v-text="'￥'+((item.good_pay_price*item.good_num+Number(dispatch_price)).toFixed(2))"></text>
						</view>
					</view>
				</view>
				
			</view>
			<view class="total_price">
				<text class="total_price_title">实付款</text>
				<text class="total_price_text">{{total_price}}</text>
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
			<shopoderbottom 
				:orderstatus="orderstatus" 
				:price="total_price" 
				:order_sn="order_sn" 
				:swift_no="swift_no"
				:s_id='s_id' 
				:s_name='s_name'
				:addressCode="addressCode"
			></shopoderbottom>
		</scroll-view>
	</view>
</template>

<script>
	// import actionbar from "@/components/actionbar/actionbar.vue"
	import shopoderbottom from "@/components/Temporarynonpayment/shopoderbottom.vue"
	//引入查询物流的快递
	// import Selectexpresscompany from "@/components/Commoditycomponent/Selectexpresscompany.vue"
	//引入跳到物流的页面
	import deliveryaddressshow from "@/components/Temporarynonpayment/Deliveryaddressshow.vue"
	//引入倒计时的插件
	import xqcountdown from "@/components/xq-countdown/xq-countdown.vue"
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
				price:"",
				startTime:"",//订单的创建时间
				endTime:"",//订单的发货时间
				Completiontime:"",//订单的完成时间
				s_id:0,
				s_name:'',
				imgpath:this.$store.state.imgyuming,
				addressCode:0,
				addressdetailed:"",
				total_price:"",//订单总价
			}
		},
		components:{
			// actionbar,
			shopoderbottom,
			// Selectexpresscompany,
			deliveryaddressshow,
			xqcountdown
		},
		methods:{
			toDetails(e){
				 let {g_id,s_id} = e.currentTarget.dataset
				  uni.navigateTo({
                   		url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
                  })
			},
			linkstore(e){
				uni.navigateTo({
					url:`/pages/Store/store?storeid=${e.currentTarget.dataset.s_id}`
				})
			}
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
					_this.swift_no = res.data.swift_no
					_this.price = res.data.price
					_this.startTime = res.data.create_time //这是创建时间
					_this.endTime = res.data.send_time //这是发货时间
					_this.Completiontime = res.data.finish_time //这是完成时间
					_this.cancel_time = res.data.cancel_time
					//拿到创建时间 转换成时间戳 弄个倒计时
					 let date = new Date(_this.startTime.replace(/-/g, '/'))
					let createdTime = date.getTime()
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
									
									_this.s_id = resinfo.data.data.store_id
									_this.s_name = resinfo.data.data.store_name
									_this.total_price = resinfo.data.data.price
									// console.log(restokey.data)
									// console.log(res.data.order_sn)
									if(resinfo.data.code==0){
										//获取快递的编码
										if(resinfo.data.data.express_sn){
											uni.setStorage({
												key:"express_sn",
												data:[resinfo.data.data.express_sn]
											})
										}
										_this.orderstatus = resinfo.data.data.status
										_this.$store.commit("getendTime",{startTime:createdTime,endTime:_this.endTime,Completiontime:_this.Completiontime,orderstatus:_this.orderstatus,order_sn:_this.order_sn})
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
												_this.addressCode = resaddinfo.data.code
												// console.log(resaddinfo,"收货地址详情")
												if(resaddinfo.data.code==0){
													
													//这是收货人的名称
													_this.buyer_name = resaddinfo.data.data.consignee_name
													//这是收货人的手机号
													_this.buyer_mobile = resaddinfo.data.data.consignee_phone
													//这是详细地址
													_this.addressdetailed = resaddinfo.data.data.street_number
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
								// font-weight: bold;
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
						color:#000 ;
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
	
	
	// 新地址
		.TheordercolumnBox{
				margin: 40rpx 0;
				display: flex;
				justify-content: center;
				.Theordercolumn{
					position: relative;
					width:100%;
					// height: 200rpx;
					background-color: #fff;
					border-radius: 20rpx;
					overflow: hidden;
					.Theordercolumn_left{
						padding: 30rpx 30rpx 50rpx 30rpx;
						.message{
							font-size: 32rpx;
							line-height: 50rpx;
							font-weight: 500;
						}
						
						.dercophone{
							// margin-left: 20rpx;
						}
						.dercolocationBox{
							display: flex;
							flex-wrap: wrap;
							flex-grow: 1;
							margin-top: 25rpx;
							line-height: 50rpx;
							.dercolocation-left{
								flex:1;
								.dercolocation{
									flex-grow: 5;
									font-size: 38rpx;
									font-weight: 600;	
								}
							}
							.dercolocation-right{
								display: flex;
								justify-content: center;
								align-items: center;
								width: 10%;
								.cuIcon-right{
									font-size: 36rpx;
								}
							}
						}
					}
					.Theordercolumn_right{
						position:absolute;
						bottom: 0;
						display: flex;
						flex-wrap: wrap;
						width: 100%;
						// height: 16rpx;
						padding-left: 10rpx;
						// background-color: #7b6fe3;
						.activeBox{
							display: flex;
							flex-wrap: nowrap;
						}
						.active{
							transform:skewX(-10deg);
							width: 35rpx;
							height: 10rpx;
						}
						.violet{
							background-color: #7b6fe3;
						}
						.white{
							background-color: #fff;
						}
						.red{
							background-color: #ef2950;
						}
					}
				}
			}
			.total_price{
				display:flex;
				justify-content: space-between;
				background-color:#fff;
				padding:30rpx 20rpx;
				margin-top: 20rpx;
				font-weight: bold;
				font-size: 30rpx;
				color:#ff5300;
				.total_price_text{
					font-size: 35rpx;
				}
			}
</style>
