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
							<!-- 收货人的姓名 -->
							<text>{{consigneename}}</text>
							<!-- 收货人的电话 -->
							<text>{{consigneephone}}</text>
						</view>
						<view class="Receivingaddress" >
						   <view class="address" >
								{{resprovince}}
								{{rescity}}
								{{resarea}}
						   </view>
						</view>
					</view>
				</view>
			</view>
			<!-- 这是快递快递的组件@Courierinformation和@Queryasinglenumber是子组件传递够来的值 -->
			<Selectexpresscompany 
				@Queryasinglenumber="Queryasinglenumber" 
				:tokey="tokey" 
				@Courierinformation="Courierinformation"
				v-if="orderStatus==2"
			></Selectexpresscompany>
			<!-- 这是快递到哪了 只要状态 不是 0待付款 -1取消 就显示 -->
			<Deliveryaddressshow 
				v-if="orderStatus!==0" 
				:tokey="tokey"
				:ordersnSerialid="ordersnSerialid"
			></Deliveryaddressshow>
			<!-- 这是退款的组件 -->
			<shopoder 
				:orderid="orderid" 
				:ordersnSerialid="ordersnSerialid" 
				:tokey="tokey" 
				@orderstatus="orderstatus" 
				@ordertime="ordertime"
				@orderNotpayingdefault="orderNotpayingdefault"
				@orderNotpayingnums="orderNotpayingnums"
				@orderfreight="orderfreight"
				:Couriercompanyvalue="Couriercompanyvalue"
				:Couriercompanyobj="Couriercompanyobj"
				></shopoder>
				<!-- 这是底部付款 和取消订单的组件 -->
			<shopoderbottom 
				:tokey="tokey" 
				:ordersnSerialid="ordersnSerialid"  
				v-if="orderStatus==0" 
				:orderNotpaynums="orderNotpaynums"
				:orderNotpaydefault="orderNotpaydefault"
				:freightdata="freightdata"
				></shopoderbottom>
				<!-- 这是底部确认收货组件 2是已发货的状态 -->
			<Confirmgoods 
				v-if="orderStatus==2"
				:tokey="tokey"
				:ordersnSerialid="ordersnSerialid"
			></Confirmgoods>
		</view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	//引入选择快递的组件
	import Selectexpresscompany from "@/components/Commoditycomponent/Selectexpresscompany.vue"
	//引入订单商品的组件
	import shopoder from "@/components/Temporarynonpayment/shoporder.vue"
	//引入商品到哪了的收货地址
	import Deliveryaddressshow from "@/components/Temporarynonpayment/Deliveryaddressshow.vue"
	//引入底部两个button的组件
	import shopoderbottom from "@/components/Temporarynonpayment/shoporderbottom.vue"
	// 引入 底部确认收货的组件
	import Confirmgoods from "@/components/Temporarynonpayment/Confirmgoods.vue"
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
				orderNotpaydefault:"",
				Couriercompanyvalue:"",//快递公司的value
				Couriercompanyobj:{},//快递公司的信息
				freightdata:"",
				consigneename:"",
				consigneephone:"",
				resprovince:"",//这是保存省的id
				rescity:"",//这是市的id
				resarea:""//这是县的id
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
			//封装个请求省市区的方法
			   Requestprovincialdistrict(diquid){
			    const _this = this
			    uni.request({//这是请求省市区
			     url:`${app.globalData.Requestpath}user/getShippingAddress`,
			     method:"POST",
			     data:{
			      token:_this.tokey,
			      address_id:diquid
			     },
			     success(resinfo) {
			      if(resinfo.data.code==0){
			       // console.log(resinfo)
			       //收货人姓名
			       _this.consigneename = resinfo.data.data.consignee_name
			       //这是收货人的电话
			       _this.consigneephone = resinfo.data.data.consignee_phone
			       uni.request({
			        url:`${app.globalData.Requestpath}common/getOneAreaInfo`,
			        data:{
			         aid:resinfo.data.data.province
			        },
			        success(resprovince) {//这是市
			         //把数组的第0项保存起来
			         _this.resprovince = resprovince.data.data.area_name
			         uni.request({
			          url:`${app.globalData.Requestpath}common/getOneAreaInfo`,
			          data:{
			           aid:resinfo.data.data.city
			          },
			          success(rescity) {//这是区
			           _this.rescity = rescity.data.data.area_name
			           uni.request({
			            url:`${app.globalData.Requestpath}common/getOneAreaInfo`,
			            data:{
			             aid:resinfo.data.data.area
			            },
			            success(resarea) {
			             _this.resarea = resarea.data.data.area_name
			            }
			           })
			          }
			         })
			        }
			       })
			      }
			     }
			    })
			   },
			//接收父组件的值
			orderstatus(e){//这是订单的状态
				this.orderStatus = e
				console.log(e)
			},
			ordertime(e){//这里是订单的时间
				
			},
			//商品单价
			//orderNotpaynums:"",
				// orderNotpaydefault:""
			orderNotpayingdefault(e){
				// console.log(e)
				this.orderNotpaydefault = e
			},
			orderNotpayingnums(e){
				this.orderNotpaynums = e
			},
			//这是快递传过来数据
			// Couriercompanyvalue:"",//快递公司的value
			// Couriercompanyobj:{},//快递公司的信息
			Queryasinglenumber(e){
				this.Couriercompanyvalue = e
			},
			Courierinformation(e){
				this.Couriercompanyobj = e
			},
			orderfreight(e){//这是快递数据
				this.freightdata = e
			},
			//封装一个方法 用于请求订单数据 由于app上获取不到 只能这么去写
			getueserorderMobilephone(_this,tokeys,ordersnSerialids){
				uni.request({
					url:`${app.globalData.Requestpath}order/getOrderInfo`,
					method:"POST",
					data:{
						token:tokeys,
						sn:ordersnSerialids
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							_this.Requestprovincialdistrict(res.data.data.address_id)
						}
						// res.data.data.address_id
						
					}
				})
			},
		},
		components:{
			actionbar,
			shopoder,
			Deliveryaddressshow,
			shopoderbottom,
			Selectexpresscompany,
			Confirmgoods
		},
		onLoad(opction){
			const _this = this
			// console.log(opction)
			if(opction.order){
				_this.orderid = atob(opction.order)
			}
			_this.ordersnSerialid = atob(opction.ordersnSerial)
			_this.gettokey(_this)
			//获取订单详情 因为子组件传值 存在异步问题
			//由于App上无法获取toukey值
			// #ifdef APP-PLUS
				uni.getStorage({
					key:"bindtokey",
					success:(res)=>{
						_this.tokey = res.data
						_this.getueserorderMobilephone(_this,_this.tokey,_this.ordersnSerialid)
					}
				})
			// #endif
			// console.log(_this.tokey)
			// #ifdef H5
				_this.getueserorderMobilephone(_this,_this.tokey,_this.ordersnSerialid)
			// #endif
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
