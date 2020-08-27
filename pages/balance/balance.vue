<template>
	<view class="detailBox">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="balance" :style="{'background-image':'url('+this.$store.state.httpUrl+'balance/balancebg.png'+')'}">
			<!-- <view class="my-balance">
				我的余额
			</view> -->
			<actionbar message="我的余额" bg="#c42c21" url="/pages/PersonalMy/PersonalMy" textcolor="#fff" :Jumpchoose="false"></actionbar>
			<view class="cny">
				<view class="cny-left">
					<text class="cny-one">总资产（CNY）</text>
					<text class="cny-two" >{{accounttext}}</text>
				</view>
				<view class="cny-right">
					<button 
						class="cu-btn bg-red margin-tb-sm lg" 
						@tap="showModal" 
						data-target="ChooseModal" 
						data-moneybool="1"
					>充值 </button>
					<button 
						class="cu-btn bg-red margin-tb-sm lg" 
						@tap="showModal" 
						data-target="ChooseModal"
						data-moneybool="0"
					>提现 </button>
				</view>
			</view>
		</view>
		<view class="detail">
			<view class="detail-top">
				余额明细
			</view>
			<scroll-view :scroll-y="true" class="scroll-view" @scrolltolower="scrolltolower">
				<view class="detail-bottom" v-for="(item,index) in accountlist" :key="index">
					<text class="dtail-text-left">{{item.create_time}}</text>
					<text class="dtail-text-right">{{Number(item.recharge).toFixed(2)}}</text>
				</view>
			</scroll-view>
			
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<!-- <view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="hideModal">确定</view>
				</view> -->
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
						<!-- :class="item.checked?'bg-orange':'line-orange'"   :data-value="item.value"-->
						<button 
							class="cu-btn orange lg block" 
							@tap="ChooseCheckbox" 
							:data-indexs="index"
							:class="radio==index?'bg-orange':'line-orange'"
						> 
							{{item.name+'元'}}
							<!-- <view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view> -->
						</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	//引顶部返回组件
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				rechargeamount:null,  //充值金额
				statusBar:"",
				accounttext:"",
				accountlist:[],
				page:1,
				// CustomBar: this.CustomBar,
				modalName: null,
				radio: '-1',
				checkbox: [{
					value: 0,
					name: '10',
					checked: false,
					hot: false,
				}, {
					value: 1,
					name: '20',
					checked: true,
					hot: false,
				}, {
					value: 2,
					name: '30',
					checked: true,
					hot: true,
				}, {
					value: 3,
					name: '60',
					checked: false,
					hot: true,
				}, {
					value: 4,
					name: '80',
					checked: false,
					hot: false,
				}, {
					value: 5,
					name: '100',
					checked: false,
					hot: false,
				}],
				money:false
			}
		},
		methods:{
			showModal(e) {
				// console.log(e)
				this.modalName = e.currentTarget.dataset.target
				let {moneybool} = e.currentTarget.dataset
				if(parseInt(moneybool)){
					this.moneybool = true
				}else{
					this.moneybool = false
				}
				
			},
			hideModal(e) {
				this.modalName = null  
			},
			ChooseCheckbox(e){
				const _this = this
					//这是微信充值
					uni.getStorage({
						key:"bindtokey",
						success(restokey) {
							_this.modalName = null  
							let {indexs} = e.currentTarget.dataset
							_this.radio = indexs
							// console.log(parseFloat(_this.checkbox[indexs].name).toFixed(2))
							//当用户点击的时候 请求后台的支付接口进行请求
							if(_this.moneybool){
								uni.request({
									url:`${app.globalData.Requestpath}pay/wechatpay`,
									method:"POST",
									data:{
										pay_type:2,
										total:parseFloat(_this.checkbox[indexs].name).toFixed(2)
									},
									success(resget) {
										// console.log(resget.data)
										if(resget.statusCode==200){
											// package
											let  {appid,noncestr,partnerid,prepayid,timestamp,sign,order_sn,bill} = resget.data
											let packages = resget.data.package
											let Beforepayment = {
												appid,
												noncestr,
												package:packages,
												partnerid,
												prepayid,
												timestamp,
												sign
											}
											// console.log(Beforepayment)
											uni.requestPayment({
												provider:"wxpay",
												orderInfo:Beforepayment,
												success(res) {
													// console.log(res,"这是微信支付")
													uni.request({
														url:`${app.globalData.Requestpath}pay/insertlog`,
														method:"POST",
														data:{
															order_sn,
															bill,
															price:parseFloat(_this.checkbox[indexs].name).toFixed(2),
															token:restokey.data
														},
														success(respay) {
															// console.log(respay)
														}
													})
												},
												fail(err){
													// console.log(err)
												}
											})
										}
									}
								})
							}else{
								if(_this.accounttext >= parseFloat(_this.checkbox[indexs].name).toFixed(2)){
									uni.request({
										url:`${app.globalData.Requestpath}user/withdraw`,
										method:"POST",
										data:{
											token:restokey.data,
											price:parseFloat(_this.checkbox[indexs].name).toFixed(2),
											user_type:1
										},
										success(reswithdrawal) {
											// console.log(reswithdrawal)
											if(reswithdrawal.data.code==0){
												app.globalData.showtoastsame("已提交申请,请耐心等候")
											}else{
												app.globalData.showtoastsame(reswithdrawal.data.msg)
											}
										}
									})
								}else{
									app.globalData.showtoastsame("当前总收入小于提现金额")
								}
							}
						}
					})
			},
			scrolltolower(){
				// console.log(111)
				const _this = this
				_this.page++
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						_this.getBalanceLogList(res.data,_this.page)
					}
				})
				
			},
			getBalanceLogList(token,page){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}user/getBalanceLogList`,
					method:"POST",
					data:{
						token:token,
						page:page,
						pageSize:10
					},
					success(resbalance) {
						if(resbalance.data.code==0){
							if(_this.page>1){
								_this.accountlist = _this.accountlist.concat(resbalance.data.data.list)
							}else{
								_this.accountlist = resbalance.data.data.list
							}
						}
					}
				})
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res) {
					// console.log(res.data)
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:res.data
						},
						success(resaccount) {//获取账户详情
							if(resaccount.data.code==0){
								_this.accounttext = resaccount.data.data.user_amount
							}
						}
					})
					_this.getBalanceLogList(res.data,1)
				}
			})
		},
		components:{
			actionbar
		},
	}
</script>

<style lang="less" scoped>
	.detailBox{
		background-color: #f8f8f8;
	}
	.balance{
		width: 100%;
		height: 400rpx;
		background-size:100% 100%; 
		.my-balance{
			font-size: 38rpx;
			color: white;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
		}
		.cny{
			height: 246rpx;
			width: 95%;
			background-color:#FFFFFF;
			margin: 20rpx auto 0;
			border-radius: 20rpx;
			box-shadow: 2px 2px 5px #888888;
			display: flex;
			justify-content: space-between;
			padding: 30rpx 30rpx;
			.cny-one{
				font-size: 30rpx;
			}
			.cny-two{
				font-size: 56rpx;
				margin-top: 30rpx;
			}
			.cny-left>text{
				display: block;
			}
			.cny-right>button{
				display: block;
				width: 160rpx;
				height: 50rpx;
				line-height: 50rpx;
			}
		}
	}
	.detail{
		background-color: #FFFFFF;
		height: 900rpx;
		width: 95%;
		margin:20rpx auto 0;
		border-radius: 20rpx;
		.detail-top{
			width: 100%;
			height: 74rpx;
			line-height: 74rpx;
			border-bottom: 2rpx solid #CCCCCC;
			font-size: 34rpx;
			padding-left: 20rpx;
		}
		.detail-bottom{
			width: 90%;
			height: 74rpx;
			border-bottom: 2rpx solid #CCCCCC;
			margin: 0 auto;
			padding: 0 10rpx;
			display:flex;
			justify-content: space-between;
			line-height: 74rpx;
			.dtail-text-left{
				font-size: 28rpx;
				font-weight: bold;
			}
			.dtail-text-right{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.scroll-view{
			height:720rpx;
		}
	}
</style>
