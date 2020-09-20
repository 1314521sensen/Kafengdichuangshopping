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
				@tap="refundlink"
			>退款/退款退货</button>
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
									 :value="'radio' + index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
		<!-- <view class="cu-modal" :class="modalName=='refundparagraph'?'show':''">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="refundparagraphChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in refundparagraphlist" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}}</view>
								<radio class="round" :class="refundindex=='refundindex' + index?'checked':''" :checked="refundindex=='refundindex' + index?true:false"
								 :value="'refundindex' + index"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<button class="cu-btn round bg-red refundbtn" @tap="hideModal">取消</button>
				<button class="cu-btn round bg-green refundbtn"  @tap="refundparagraph">确定</button>
			</view>
		</view> -->
		<paymoney 
			:show="passwordzhifutanchuang" 
			:isIphoneX="isIphoneX" 
			:balancetext="String(price)"
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
				Paypasswordnumber:0
				// refundparagraphlist:[//这一会注释
				// 	"不喜欢/不想要",
				// 	"空包裹",
				// 	"快递/物流一直未送到",
				// 	"快递/物流无跟踪记录",
				// 	"货物破损已拒签",
				// 	"退货退款"
				// ],
				// refundindex:'refundindex0'
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
			},
			//这是付款时的单选
			RadioChanges(e) {
				this.radioname = e.detail.value
				// console.log(this.radioname)
			},
			// refundparagraphChange(e){//这一会注释
			// 	this.refundindex = e.detail.value
			// },
			//这是取消订单
			Confirmcancel(radiovalue){
				const _this = this
				//这是为什么要取消的内容
				// console.log(radiovalue)
				_this.$store.commit("Confirmcancel",{order_sn:_this.order_sn})
				//并关闭弹出框
				this.modalName = null
			},
			//这是点击付款的按钮
			Notpayingdefaultpayment(e){
				// console.log( e.currentTarget.dataset.target)
				// this.modalName = e.currentTarget.dataset.target
				if(!(this.addressCode == 1) ){
					this.modalName = e.currentTarget.dataset.target
				}else{
					app.globalData.showtoastsame("未查询到收货地址，请重新购买")
				}
			},
			//这是点击确定支付的时候
			Determinepayment(){
				//将选择支付的的弹窗关闭
				this.modalName = null
				if(this.radioname=='radio0'){//微信支付
					this.getOrderInfo()
				}else if(this.radioname=='radio5'){//支付宝支付
					
				}else{//余额支付
					if(this.Paypasswordnumber<=2){
						this.passwordzhifutanchuang = true
						this.isIphoneX = true
					}else{
						app.globalData.showtoastsame("输入次数过多,请前往设置重置密码")
					}
					
				}
			},
			//封装个方法 判断用户有没有绑定openid
			getopenid(){
				//如果用户没有绑定openid的话 就让用户跳到绑定openid的页面
				uni.showModal({
					title:"请进行绑定微信",
					content:"为了您的正常提现",
					showCancel:true,
					cancelText:"取消",
					cancelColor:"#ff0000",
					confirmText:"确定绑定",
					confirmColor:"#00ff00",
					success(res) {
						if(res.confirm){
							uni.navigateTo({
								url:`/pages/WeChatLanding/WeChatLanding`
							})
						}
					}
				})
			},
			//退款
			refundlink(){
				// console.log(88888)
				const _this = this
				uni.navigateTo({
					url:`/pages/refund/refund?o_sn=${_this.order_sn}`
				})
			},
			refundparagraph(){
				const _this = this
				_this.modalName = null
				//取出openid bindopenid /pages/WeChatLanding/WeChatLanding
				//判断用户有没有绑定openid
				uni.getStorage({
					key:"bindopenid",
					success(res){
						if(res.data!==""){
							_this.passwordzhifutanchuang = true
							_this.isIphoneX = true
						}else{
							_this.getopenid()
						}
					},
					fail(err){
						_this.getopenid()
					}
				})
				
				
			},
			//当用户输入完密码会将密码传到这里
			Enterpasswordcompletepayment(e){
				const _this = this
				if(_this.orderstatus>=1){
					//这里退货的逻辑
					// _this.zhifumimatext = e
					// // console.log(_this.order_sn)
					// // console.log(_this.price)
					// // console.log(_this.zhifumimatext)
					// let str = _this.refundparagraphlist[parseInt(_this.refundindex.substr(_this.refundindex.length-1))]
					// this.$store.commit("refundparagraph",{o_sn:_this.order_sn,af_price:_this.price,pay_pwd:_this.zhifumimatext,r_text:str})
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
										//支付密码次数
										_this.Paypasswordnumber = 0
										app.globalData.showtoastsame(res.data.msg)
										// console.log(_this.$store.state.orderlistshop)
										if(_this.$store.state.orderlistshop[0].share_from!==null){
											_this.getorderconfiguration()
										}
										uni.redirectTo({
											url: `/pages/Temporarynonpayment/Temporarynonpayment`
										});
									}else{
										//支付密码的次数
										_this.Paypasswordnumber +=1
										
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
						pay_type:1,
						swift_id:_this.swift_no,
						order_sn:_this.order_sn
					},
					success(res) {
						if(res.statusCode==200){
							let {
								appid,
								noncestr,
								partnerid,
								prepayid,
								timestamp,
								sign
							} = res.data
							let pagesS = res.data.package
							let json = {
								appid:appid,
								noncestr:noncestr,
								partnerid:partnerid,
								prepayid:prepayid,
								timestamp:timestamp,
								sign:sign,
								package:pagesS
						   }
							uni.requestPayment({
								provider:'wxpay',
								orderInfo:res.data,
								success: (e) => {
									// console.log("success",e);
									uni.showToast({
										title:"支付完成"
									})
									//用户支付完成以后 就立马调用改变状态的方法
									uni.request({
										url:`${app.globalData.Requestpath}notify/wechatpay`,
										method:'POST',
										data:{
											pay_type: 1,
											swift_id: _this.swift_no,
										},
										success(res) {
											if(res.code==0){
												//关闭当前页面 强制刷新
												uni.redirectTo({
													url: `/pages/Temporarynonpayment/Temporarynonpayment`
												});
											}
										}
									})
									if(_this.$store.state.orderlistshop[0].share_from!==null){
										_this.getorderconfiguration()
									}
								},
								fail: (e) => {
								}
							})
						}
					}
				})
			},
			getorderconfiguration(){
				const _this = this
				let {order_sn,good_id,good_name,good_pic,good_price,good_num,share_from} = _this.$store.state.orderlistshop[0]
				// console.log(order_sn,_this.s_id,_this.s_name,good_id,good_name,good_pic,good_price,good_num,share_from)
				uni.getStorage({
					key: 'bindtokey',
					success(restokey) {
						uni.request({
							url:`${app.globalData.Requestpath}good/getCmsSettlementConfigInfo`,
							method:"POST",
							data:{
								token:restokey.data,
								type:share_from,
								gid:good_id
							},
							success(resconfiguration) {
								// console.log(resconfiguration)
								uni.request({
									url:`${app.globalData.Requestpath}CmsSettlement/CommissionSettlement`,
									method:"POST",
									data:{
										token:restokey.data,
										order_sn:order_sn,
										store_id:_this.s_id,
										store_name:_this.s_name,
										good_id:good_id,
										good_title:good_name,
										good_pic:good_pic,
										good_price:good_price,
										good_num:good_num,
										total_price:_this.price,
										cms_category: share_from,
										settlement_type:resconfiguration.data.data.cms_type,
										cms_rate:resconfiguration.data.data.cms_value,
										share_code:_this.$store.state.ordercode
									},
									success(resSettlement) {
										// console.log(resSettlement)
									}
								})
							}
						})
					}
				})
			}
		},
		components:{
			paymoney
		},
		props:["price","order_sn","orderstatus","swift_no","s_id","s_name","addressCode"]
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
	.refundbtn{
		// margin-top:20rpx;
		width: 40%;
		margin:20rpx;
	}
</style>
