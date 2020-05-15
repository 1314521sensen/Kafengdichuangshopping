<template>
	<view class="shoporder">
		<view class="Buycontent purchase-order">
			<view class="order">
				<view class="order-title">
					{{orderobj.store_name}}
				</view>
				<view class="shopgoosorder" @tap="Orderdetailsjumpdetails(orderobj.store_id,ordershopinglist.good_id)">
					<view class="shopgoosorder-left">
						<image :src="imgyuming+ordershopinglist.good_pic"></image>
					</view>
					<view class="shopgoosorder-right">
						<view class="shopgoosorder-title">
							{{ordershopinglist.good_name}}
						</view>
						<view class="shopgoosorder-pic">
							<text v-text="'¥'+ordershopinglist.good_price"></text>
							<text>×{{ordershopinglist.good_num}}</text>
						</view>
					</view>
				</view>
				<view class="Deliverynote">
					<!-- 这重新写 -->
					<view class="commodityprice" v-for="(item,index) in list" :key="index">
						<text>{{orderobj.shoptitle}}</text>
						<text>{{orderobj.shoppic}}</text>
					</view>
					<!-- 实付款 -->
					<view class="Realpayment">
						<text>实付款</text>
						<text v-text="'¥'+ordershopinglist.good_pay_price*ordershopinglist.good_num"></text>
					</view>
				</view>
			</view>
	</view>
		<view class="orderSerial">
			<view class="orderSerial-title">订单信息</view>
			<view class="serial">
				<view class="serialsame serial-left">
					<text>订单编号:</text>
					<text>订单流水号:</text>
				</view>
				<view class="serialsame serial-right">
					<text>{{orderobj.order_sn}}</text>
					<text>{{orderobj.swift_no}}</text>
				</view>
			</view>
		</view>
		
</view>
</template>

<script>
	const app = getApp()
	export default{
		//这是订单详情中的中间的商品的部分
		data(){
			return {
				list:[
					{
						shoptitle:"商品总价",
						shoppic:"¥60.19"
					},
					{
						shoptitle:"运费险",
						shoppic:"卖家赠送"
					},
					{
						shoptitle:"运费",
						shoppic:"¥0.00"
					}
				],
				orderobj:[{}],//用于接收订单详情的返回的对象 
				ordershopinglist:[],
				imgyuming:""
			}
		},
		methods:{
			Orderdetailsjumpdetails(storeid,goodid){
				// ?id=66&storeid=19
				console.log(storeid,goodid)
				uni.reLaunch({
					url:`/pages/Details/Details?id=${goodid}&storeid=${storeid}`
				})
			}
		},
		props:["orderid","ordersnSerialid","tokey"],
		created(){
			const _this = this
			_this.imgyuming = app.globalData.imgyuming
			//获取订单详情信息的请求
			// order/getOrderInfo
			uni.request({
				url:`${app.globalData.Requestpath}order/getOrderInfo`,
				method:"POST",
				data:{
					token:_this.tokey,
					sn:_this.ordersnSerialid
				},
				success(res) {//获取到用户详情 
					if(res.data.code==0){
						_this.orderobj = res.data.data
						//将订单的状态传到父组件
						_this.$emit("orderstatus",res.data.data.status)
						_this.$emit("ordertime",res.data.data.create_time)
						uni.request({
							url:`${app.globalData.Requestpath}order/getOrderGoodList`,
							method:"POST",
							data:{
								token:_this.tokey,
								order_sn:_this.ordersnSerialid
							},
							success(ordershopinglist) {
								if(ordershopinglist.data.code==0){
									_this.ordershopinglist = ordershopinglist.data.data.list[0]
									_this.$emit("orderNotpayingdefault",_this.ordershopinglist.good_pay_price)
									_this.$emit("orderNotpayingnums",_this.ordershopinglist.good_num)
								}
								
							}
						})
					}else{
						console.log("没获取到")
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.shoporder{
		.purchase-order{
			.order{
				background-color: #fff;
				margin-top:44rpx;
				// padding-left:20rpx;
				padding:0 0 20rpx 20rpx;
				.order-title{
					font-size: 32rpx;
					padding:20rpx 0;
					font-weight: bold;
				}
				.shopgoosorder{
					display:flex;
					justify-content: space-around;
					margin-top:28rpx;
					.shopgoosorder-left{
						width: 30%;
						height:200rpx;
						// background-color:yellow;
						image{
							width: 100%;
							height:100%;
						}
					}
					.shopgoosorder-right{
						display:flex;
						justify-content: space-around;
						flex:1;
						// background-color:red;
						padding-top:10rpx;
						.shopgoosorder-title{
							overflow: hidden;
							width: 70%;
							height:80rpx;
							font-size: 28rpx;
						}
						.shopgoosorder-pic{
							width: 20%;
							text{
								display:block;
								text-align:right;
								font-size: 30rpx;
								&:first-child{
									font-weight: bold;
								}
								&:last-child{
									font-size: 24rpx;
								}
							}
						}
					}
				}
				.Deliverynote{
					margin-top:48rpx;
					padding:0 20rpx;
					.commodityprice{
						display: flex;
						justify-content: space-between;
						font-size: 32rpx;
						margin-top:10rpx;
					}
					.Realpayment{
						display:flex;
						justify-content: space-between;
						margin-top:20rpx;
						text{
							font-size: 35rpx;
							color:#999;
							&:last-child{
								color:#ff5300;
							}
						}
					}
				}
			}
		}
		.orderSerial{
			padding:64rpx 20rpx;
			background-color: #fff;
			margin-top:20rpx;
			.orderSerial-title{
				font-size: 32rpx;
			}
			.serial{
				display:flex;
				// font-size: 24rpx;
				// align-items: center;
				font-size: 28rpx;
				color:#999;
				.serialsame{
					
					text{
						display:block;
						margin-top:24rpx;	
					}
				}
				.serial-right{
					text{
						margin:30rpx 0 0 30rpx;
					}
				}
			}
		}
	}
</style>
