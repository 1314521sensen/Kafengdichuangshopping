<template>
	<view class="temporarynonpayment">
		<view class="temporarynonpayment-top">
			<view class="temporarynonpayment-top-bg">
				<view :style="{'height':(statusBar*2)+'rpx'}"></view>
				<actionbar url="/pages/PersonalMy/PersonalMy" message="订单详情" bg="#fe7a00"></actionbar>
				<view class="bg-title" v-if="orderStatus==0">
					<text>等待买家付款</text>
					<text>剩余{{min}}分{{miao}}自动取消订单</text>
				</view>
			</view>
			<view class="Buycontent">
				<view class="Shippingaddress">
					<view class="Shippingaddress-left">
						<view class="imgs">
							<image src="/static/dingwei/dingwei.png"></image>
						</view>
					</view>
					<view class="Shippingaddress-right">
						<view class="Shippingaddress-right-title">
							<text>刘伟森</text>
							<text>18769490209</text>
						</view>
						<view class="Receivingaddress">
							<view class="address">
								山东省德州市武城县广运街道德州市武城县广运街道齐鲁学院三楼学生处
							</view>
						</view>
					</view>
				</view>
			</view>
			<shopoder 
				:orderid="orderid" 
				:ordersnSerialid="ordersnSerialid" 
				:tokey="tokey" 
				@orderstatus="orderstatus" 
				@ordertime="ordertime"
				@orderNotpayingdefault="orderNotpayingdefault"
				@orderNotpayingnums="orderNotpayingnums"
				></shopoder>
			<shopoderbottom 
				:tokey="tokey" 
				:ordersnSerialid="ordersnSerialid"  
				v-if="orderStatus==0" 
				:orderNotpaynums="orderNotpaynums"
				:orderNotpaydefault="orderNotpaydefault"
				></shopoderbottom>
			
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import shopoder from "@/components/Temporarynonpayment/shoporder.vue"
	import shopoderbottom from "@/components/Temporarynonpayment/shoporderbottom.vue"
	const app = getApp();
	export default {
		//暂时不支付页面
		data() {
			return {
				statusBar:0,
				tokey:"",
				orderid:"",//订单id
				ordersnSerialid:"",//订单编号
				orderStatus:"",
				provinceregion:[],
				min:"",
				miao:"",
				orderNotpaynums:"",
				orderNotpaydefault:""
			}
		},
		methods: {
			//封装个获取tokey
			gettokey(_this){
				uni.getStorage({
					key:"bindtokey",
					success(res){
						_this.tokey = res.data
					}
				})
			},
			//接收父组件的值
			orderstatus(e){//这是订单的状态
				this.orderStatus = e
				// if(e==0){//等于0的时候代表没有付款 开始倒计时
					
				// }
			},
			ordertime(e){//这里是订单的时间
				// const _this = this
				// // 
				// 		let kaishi = new Date(e)
				// 		// console.log(kaishi)
				// 		let kaishiHours = kaishi.getHours()//开始的小时
				// 		let kaishiMinutes = kaishi.getMinutes()//开始的分钟
				// 		let kaishiSeconds = kaishi.getSeconds()//开始的秒数
				// 		let kaishiYear = kaishi.getFullYear()//这是开始的年
				// 		let kaishiMonth = kaishi.getMonth()//这是开始的月
				// 		let kaishiDay = kaishi.getDate()//这是开始的日
				// 		let end = new Date(kaishiYear,kaishiMonth,kaishiDay,kaishiHours,kaishiMinutes+30,kaishiSeconds)//这是结束的时间
				// 		// setInterval(function(){
				// 			let shenhaomiao = end.getTime()-kaishi.getTime()//这是结束的毫秒数减去开始的毫秒的数
				// 			let shenmin = Math.floor(shenhaomiao/(1000*60)%60)
				// 			let shenmiao = Math.floor(shenhaomiao/1000%60)
				// 			// if(shenmiao==0 && shenmin){
				// 			// 	shenmiao = 59
				// 			// 	shenmin-1
				// 			// }
				// 			// shenmiao = shenmiao--
				// 			_this.min = shenmin
				// 			_this.miao = shenmiao
				// 			console.log(shenmin,shenmiao)
					// },1000)
				// console.log(end)
			},
			//商品单价
			//orderNotpaynums:"",
				// orderNotpaydefault:""
			orderNotpayingdefault(e){
				console.log(e)
				this.orderNotpaydefault = e
			},
			orderNotpayingnums(e){
				
				this.orderNotpaynums = e
			}
		},
		components:{
			actionbar,
			shopoder,
			shopoderbottom
		},
		onLoad(opction){
			const _this = this
			if(opction.order){
				_this.orderid = atob(opction.order)
			}
			_this.ordersnSerialid = atob(opction.ordersnSerial)
			_this.gettokey(_this)
			
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			_this.gettokey(_this)
		}
	}
</script>

<style lang="less" scoped>
	.temporarynonpayment{
		overflow: hidden;
		.temporarynonpayment-top{
			.temporarynonpayment-top-bg{
				position: relative;
				height:300rpx;
				background-color:#fe7a00;
				.bg-title{
					position:absolute;
					bottom:14%;
					left:7%;
					width: 100%;
					text{
						display:block;
						color:#fff;
						font-size: 34rpx;
						&:last-child{
							font-size: 28rpx;
							margin-top:8rpx;
						}
					}
				}
			}
			.Buycontent{
				.Shippingaddress{
					display: flex;
					// align-items:center;
					background-color: #fff;
					padding:30rpx 0;
					// margin-top:40rpx;
					.Shippingaddress-left{
						display:flex;
						width: 20%;
						// height:50rpx;
						align-items:center;
						justify-content: center;
						// background-color:red;
						.imgs{
							width: 52%;
							height:66rpx;
							// background-color:green;
							image{
								width: 100%;
								height:100%;
								background-size: cover;
							}
						}
					}
					.Shippingaddress-right{
						width: 80%;
						// background-color:yellow;
						.Shippingaddress-right-title{
							display:flex;
							text{
								font-size: 32rpx;
								&:last-child{
									font-size: 28rpx;
									color:#ccc;
									margin-top:10rpx;
								}
							}
						}
						.Receivingaddress{
							display:flex;
							align-items: center;
							justify-content: space-around;
							margin-top:20rpx;
							.address{
								width: 100%;
								font-size: 28rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
