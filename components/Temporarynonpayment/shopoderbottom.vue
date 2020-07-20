<template>
	<view class="shopoderbottom">
		<view class="shopoderbottomflex">
			<button 
				class="cu-btn round line-grey" 
				@tap="showModal" 
				data-target="RadioModal"
				v-if="orderstatus==0"
			>取消订单</button>
			<button 
				class="cu-btn round line-orange" 
				@tap="Notpayingdefaultpayment" 
				data-target="bottomModal"
				v-if="orderstatus==0"
			>付款</button>
			<button
				class="cu-btn round line-green" 
				v-if="orderstatus==1 || orderstatus==2"
				@tap="refundparagraph"
			>退款</button>
			<button 
				class="cu-btn round line-red"
				v-if="orderstatus==1 || orderstatus==2"
				@tap="Confirmgoods"
			>确认收货</button>
		</view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in radiolist" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}}</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio==item?true:false"
								 :value="item"></radio>
							</label>
						</view>
						<view class="btn">
							<button class="cu-btn round bg-yellow" @tap="hideModal">暂不取消</button>
							<button class="cu-btn round bg-orange" @tap="Confirmcancel(radio)">确认取消</button>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- 底部弹出框 框里面嵌套单选-->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消支付</view>
					<view class="action text-green" @tap="Determinepayment">确定支付</view>
				</view>
				<view class="padding-xl">
					<radio-group class="block" @change="RadioChanges">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in list" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item}}</view>
									<radio class="round" :class="radioname=='radio' + index?'checked':''" :checked="radioname=='radio' + index?true:false"
									 :value="'radioname' + index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
		<paymoney 
			:show="passwordzhifutanchuang" 
			:isIphoneX="isIphoneX" 
			:balancetext="price"
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment"
			@close="close"
		></paymoney>
	</view>
</template>

<script>
	const app = getApp()
	import paymoney from "@/components/yzc-paykeyboard/yzc-paykeyboard.vue"
	export default{//这是付款的组件***
		data(){
			return {
				modalName: null,
				radio: '我不想买了',
				radioname: 'radio0',
				radiolist:[
					"我不想买了",
					"信息填写错误,重新拍",
					"卖家缺货",
					"同城见面交易",
					"其他原因"
				],
				list:[
					"微信",
					"余额"
				],
				passwordzhifutanchuang:false,//是否弹出输入支付密码弹窗
				isIphoneX:false,//Iphone全面屏系列底部适配
				zhifumimatext:"",
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
				// console.log(e.detail.value)
			},
			//这是付款时的单选
			RadioChanges(e) {
				this.radioname = e.detail.value
			},
			//这是取消订单
			Confirmcancel(radiovalue){
				const _this = this
				//这是为什么要取消的内容
				console.log(radiovalue)
				_this.$store.commit("Confirmcancel",{order_sn:_this.order_sn})
				//并关闭弹出框
				this.modalName = null
			},
			//这是点击付款的按钮
			Notpayingdefaultpayment(e){
				// console.log( e.currentTarget.dataset.target)
				this.modalName = e.currentTarget.dataset.target
			},
			//这是点击确定支付的时候
			Determinepayment(){
				//将选择支付的的弹窗关闭
				this.modalName = null
				if(this.radioname=='radio0'){//微信支付
					this.getOrderInfo()
				}else if(this.radioname=='radioname5'){//支付宝支付
					
				}else{//余额支付
					// console.log()
					this.passwordzhifutanchuang = true
					this.isIphoneX = true
				}
			},
			//退款
			refundparagraph(){
				this.passwordzhifutanchuang = true
				this.isIphoneX = true
				
			},
			//当用户输入完密码会将密码传到这里
			Enterpasswordcompletepayment(e){
				const _this = this
				if(_this.orderstatus>=1){
					//这里退货的逻辑
					_this.zhifumimatext = e
					// console.log(_this.order_sn)
					// console.log(_this.price)
					// console.log(_this.zhifumimatext)
					this.$store.commit("refundparagraph",{o_sn:_this.order_sn,af_price:_this.price,pay_pwd:_this.zhifumimatext})
				}else{
					//这里付款的逻辑
					uni.getStorage({
						key:"bindtokey",
						success(res){
							uni.request({
								url:`${app.globalData.Requestpath}balance_pay/payOrdersNew`,
								method:"POST",
								data:{
									token:res.data,
									o_sns:[_this.order_sn],
									pay_password:e
								},
								success(res) {
									if(res.data.code==0){
										app.globalData.showtoastsame(res.data.msg)
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							})
						}
					})
				}
				this.passwordzhifutanchuang = false
				this.isIphoneX = false
			},
			close(e){
				this.passwordzhifutanchuang = e
				this.isIphoneX = e
			},
			Confirmgoods(){
				this.$store.commit("Confirmgoods",{order_sn:this.order_sn})
			},
			//封装微信支付请求
			getOrderInfo() {
				const _this = this
				let appid = 'wx0f9236b57d357dbb';
				let url = `${app.globalData.Requestpath}pay/wechatpay`;
				uni.request({
					url,
					method:"POST",
					data:{
						payid:"wxpay",
						appid,
						swift_id:_this.swift_no
					},
					success(res) {
						if(res.statusCode==200){
							uni.requestPayment({
								provider:'wxpay',
								orderInfo:res.data,
								success: (e) => {
									console.log("success",e);
									uni.showToast({
										title:"支付完成"
									})
								},
								fail: (e) => {
									console.log('fail',e);
									uni.showModal({
										content:"支付失败:" + JSON.stringify(e),
										showCancel:false
									})
								}
							})
						}
					}
				})
			}
		},
		components:{
			paymoney
		},
		props:["price","order_sn","orderstatus","swift_no"]
	}
</script>

<style lang="less" scoped>
	.shopoderbottom{
		position:fixed;
		bottom:0;
		left:0;
		width: 100%;
		background-color: #fff;
		padding:10rpx 0;
		.shopoderbottomflex{
			display:flex;
			justify-content: flex-end;
			padding-right:20rpx;
			button{
				&:first-child{
					margin-right:24rpx;
				}
			}
		}
		.btn{
			display:flex;
			// background-color:yellow;
			margin-top:10rpx;
			padding:10rpx;
			button{
				width: 50%;
			}
		}
	}
</style>
