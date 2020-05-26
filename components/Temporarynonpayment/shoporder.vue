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
							<!--  @tap.stop解决事件冒泡 目前H5端支持 后期在改 -->
							<button 
								class="cu-btn round line-red returnparagraphbtn" 
								@tap.stop="returnparagraphbtn"
								 v-if="orderobj.status==1 || orderobj.status==2"
								 data-target="returnparagraphl"
								 :disabled="disabled"
							>退款</button>
						</view>
					</view>
				</view>
				<view class="Deliverynote">
					<!-- 这重新写 -->
					<view class="commodityprice" v-for="(item,index) in list" :key="index">
						<text>{{orderobj.shoptitle}}</text>
						<text>{{orderobj.shoppic}}</text>
					</view>
					<view class="Orderdetailsfreight">
						<text>快递费</text>
						<text>{{orderobj.dispatch_price}}</text>
					</view>
					<!-- 实付款 -->
					<view class="Realpayment">
						<text>实付款</text>
						<text v-text="'¥'+(ordershopinglist.good_pay_price*ordershopinglist.good_num+parseFloat(Number(orderobj.dispatch_price)))"></text>
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
					<text>创建时间:</text>
					<text v-if="orderobj.status!==0">付款时间:</text>
				</view>
				<view class="serialsame serial-right">
					<text>{{orderobj.order_sn}}</text>
					<text>{{orderobj.swift_no}}</text>
					<text>{{orderobj.create_time}}</text>
					<text v-if="orderobj.status!==0">{{orderobj.pay_time}}</text>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='returnparagraphl'?'show':''">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in returnparagraphlist" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}}</view>
								<radio class="round" :class="radio=='returnparagraph' + index?'checked':''" :checked="radio=='returnparagraph' + index?true:false"
								 :value="'returnparagraph' + index"></radio>
							</label>
						</view>
						<view class="operation-btn">
							<button class="cu-btn round bg-gradual-red" @tap="hideModal">取消</button>
							<button class="cu-btn round bg-green" @tap="Cancelorderbtn">确认</button>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- 
			
			:balancetext="(orderNotpaydefault*orderNotpaynums).toFixed(2)"
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment" -->
		<passkeyborad
			:show="passwordzhifutanchuang"
			:isIphoneX="isIphoneX" 
			@close="close"
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment"
			ordershow="1"
		></passkeyborad>
</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	//这是退款的***
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
				imgyuming:"",
				modalName:null,
				radio: 'returnparagraphl',
				radiotext:"",
				returnparagraphlist:[
					"买错了",
					"不想要了",
					"未收到货，仅退款",
					"已收到货，退货退款"
				],
				passwordzhifutanchuang:false,//是否弹出输入支付密码弹窗
				isIphoneX:false,//Iphone全面屏系列底部适配
				zhifumimatext:"",
				disabled:false,
				tokey:"",
			}
		},
		methods:{
			Orderdetailsjumpdetails(storeid,goodid){
				// ?id=66&storeid=19
				uni.reLaunch({
					url:`/pages/Details/Details?id=${goodid}&storeid=${storeid}`
				})
			},
			//这是用户点击退款的按钮的时候
			returnparagraphbtn(e){
				this.modalName = e.currentTarget.dataset.target
			},
			//取消单选框
			hideModal() {
				this.modalName = null
			},
			//当用户点击选中的时候
			RadioChange(e) {
				this.radio = e.detail.value
				this.radiotext = e.detail.value.substring(e.detail.value.length-1)
				
			},
			//当用户点击确认的时候
			Cancelorderbtn(){
				this.hideModal()
				if(this.radio=='returnparagraph3'){//当用户选择退货退款的时候
					if(this.Couriercompanyvalue==""){
						app.globalData.showtoastsame("请输入快递单号")
						return 
					}
				}
				//下面的这两步 除了return 其他的不管执行不执行 都会往下执行
				this.passwordzhifutanchuang = true//是否弹出输入支付密码弹窗
				this.isIphoneX = true//Iphone全面屏系列底部适配
			},
			//当用户点击×的时候
			close(){
				this.passwordzhifutanchuang = false//是否弹出输入支付密码弹窗
				this.isIphoneX = false//Iphone全面屏系列底部适配
			},
			//封装个 用户输入完密码后的请求申请退货的请求
			//参数  password支付密码  returnordertype 退货的类型 Courierid 快递公司的id CourierSerialnumber 快递的编号
			returnCancelordersteps(password,returnordertype,Courierid,CourierSerialnumber){
				const _this = this
				console.log()
				uni.request({
					url:`${app.globalData.Requestpath}order/applyForRefundOrder`,
					method:"POST",
					data:{
						token:_this.tokey,
						o_sn:_this.ordersnSerialid,//退货的订单编号   ↓//退款的实际金额
						af_price:_this.ordershopinglist.good_pay_price*_this.ordershopinglist.good_num+parseFloat(_this.orderobj.dispatch_price),
						pay_pwd:password,//用户的输入密码
						r_text:_this.returnparagraphlist[_this.radiotext],//退款原因文字
						r_type:returnordertype,
						e_id:Courierid,
						e_sn:CourierSerialnumber
					},
					success(res) {
						if(res.data.code==0){//当退款成功
							console.log(res)
							_this.disabled = true
							_this.passwordzhifutanchuang = false//是否弹出输入支付密码弹窗
							_this.isIphoneX = false//Iphone全面屏系列底部适配
							app.globalData.showtoastsame("请等待退款")
							//就跳转到退货列表详情
							uni.reLaunch({
								url:`/pages/orderpageRouter/orderpageRouter?index=5`
							})
						}else{
							//这是极端的
							_this.passwordzhifutanchuang = false//是否弹出输入支付密码弹窗
							_this.isIphoneX = false//Iphone全面屏系列底部适配
							if(res.data.msg!=='令牌错误'){
								app.globalData.showtoastsame(res.data.msg)
							}
						}
						app.globalData.Requestmethod(_this.tokey,res.data.msg)
					}
				})
			},
			//当用户输入完密码的时候
			Enterpasswordcompletepayment(e){
				// console.log(this.Couriercompanyvalue)
				// console.log(this.Couriercompanyobj.express_id)
				//orderobj.express_sn 快递单号
				//orderobj.express_com 快递公司
				//e是密码
				// 后端要的退款类型 1退款 2退款退货
					if(this.radio=='returnparagraph3'){//当用户选择退货退款的时候执行该判断
						this.returnCancelordersteps(e,2,this.Couriercompanyobj.express_id,this.Couriercompanyvalue)
						return 
					}
					//当用户选择其他的时候 执行普通退款
					this.returnCancelordersteps(e,1,this.Couriercompanyobj.express_id,this.Couriercompanyvalue)
			},
			//封装一个获取订单信息的方法 由于app 无法获取到数据 只能在封装一个
			getOrderInfo(_this,tokeys,ordersnSerialids){
				uni.request({
					url:`${app.globalData.Requestpath}order/getOrderInfo`,
					method:"POST",
					data:{
						token:tokeys,
						sn:ordersnSerialids
					},
					success(res) {//获取到用户详情 
						if(res.data.code==0){
							_this.orderobj = res.data.data
							// console.log(res.data.data.address_id)
							//将订单的状态传到父组件
							_this.$emit("orderstatus",res.data.data.status)
							_this.$emit("ordertime",res.data.data.create_time)
							_this.$emit("orderfreight",res.data.data.dispatch_price)
							uni.request({
								url:`${app.globalData.Requestpath}order/getOrderGoodList`,
								method:"POST",
								data:{
									token:tokeys,
									order_sn:ordersnSerialids
								},
								success(ordershopinglist) {
									if(ordershopinglist.data.code==0){
										_this.ordershopinglist = ordershopinglist.data.data.list[0]
										_this.$emit("orderNotpayingdefault",_this.ordershopinglist.good_pay_price)
										_this.$emit("orderNotpayingnums",_this.ordershopinglist.good_num)
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							})
						}else{
							app.globalData.showtoastsame(res.data.msg)
						}
					}
				})
			}
		},
		props:["orderid","ordersnSerialid","Couriercompanyvalue","Couriercompanyobj"],
		components:{
			passkeyborad
		},
		created(){
			const _this = this
			_this.imgyuming = app.globalData.imgyuming
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					// #ifdef APP-PLUS
						_this.getOrderInfo(_this,_this.tokey,_this.ordersnSerialid)
					// #endif
				}
			})
			// console.log(_this.ordersnSerialid)
			// console.log(_this.tokey)
			//获取订单详情信息的请求
			// order/getOrderInfo
			// #ifdef H5
				_this.getOrderInfo(_this,_this.tokey,_this.ordersnSerialid)
			// #endif
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
							.returnparagraphbtn{
								width: 100rpx;
								height:48rpx;
								font-size: 24rpx;
								padding:0;
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
					.Orderdetailsfreight{
						display:flex;
						justify-content: space-between;
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
	.operation-btn{
		display:flex;
		justify-content: space-around;
		padding:15rpx 0;
		button{
			width: 45%;
		}
	}
</style>
