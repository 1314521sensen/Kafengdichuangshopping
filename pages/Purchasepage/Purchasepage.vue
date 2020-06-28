<template>
	<view class="Purchasepage">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="确认订单"></actionbar>
		<view class="Buycontent">
			<view class="Shippingaddress" @tap="Addressmodification">
				<view class="Shippingaddress-left">
					<view class="imgs">
						<image src="/static/dingwei/dingwei.png"></image>
					</view>
				</view>
				<view class="Shippingaddress-right">
					<view class="Shippingaddress-right-title">
						<text>{{Username}}</text>
						<text>{{Userphone}}</text>
					</view>
					<view class="Receivingaddress">
						<view class="address">
							{{Userselect}}
						</view>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="Buycontent purchase-order">
			<!-- 到时候循环这个order就可以 -->
			<view class="order" v-for="(item,index) in orderinfolist" :key="index">
				<view class="order-title">
					{{item.store_name}}
				</view>
				<view class="shopgoosorder">
					<view class="shopgoosorder-left">
						<image :src="'http://hbk.huiboke.com'+item.good_pic"></image>
					</view>
					<view class="shopgoosorder-right">
						<view class="shopgoosorder-title">
							{{item.good_name}}
						</view>
						<view class="shopgoosorder-pic">
							<text>¥{{item.good_price}}</text>
							<text>×{{item.good_num}}</text>
						</view>
					</view>
				</view>
				<view class="Deliverynote">
					<view class="distribution">
						<view class="distribution-left">
							<text>配送方式</text>
							<text>普通配送</text>
						</view>
						<view class="distribution-right">
							<!-- {{parseInt(item.good_freight)}} -->
							<text>{{parseInt(item.good_freight)?item.good_freight+'元':'包邮配送'}}</text>
						</view>
					</view>
					<!-- 这是优惠券的组件 -->
					<storecoupon 
						msg="使用" 
						titlemsg="使用优惠券" 
						:tokey="tokey" 
						:storeid="item.store_id" 
						Whatcoupon="1" 
						:Orderpaymentamount="item.good_price*item.good_num"
						@dingdancoupon="dingdancoupon"
						v-if="orderinfolist.length<=1"
					></storecoupon>
					<view class="distribution note">
						<view class="cu-form-group">
							<view class="title">订单备注</view>
							<input placeholder="选填,请先和商家协商一致" name="input" v-model="value"></input>
						</view>
					</view>
					<view class="Payprice">
						<text>共{{item.good_num}}件</text>
						<text>小计:</text>
						<!-- Favorablebalance优惠卷的面额 有值的时候采用有值 没值的时候采用0 -->
						<!--  -->
						<text 
							class="text-yellow" 
							v-text="'¥'+(Number((item.good_price*item.good_num+Number(item.good_freight))-(Favorablebalance?Favorablebalance:0)).toFixed(2))">
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="detailscar">
			<view class="detailscar-pic">
				<text>共{{totalnumber}}件,</text>
				<text>合计</text>
				<!-- v-text="'¥'+((price*nums+freight)-(Favorablebalance?Favorablebalance:0)).toFixed(2)" -->
				<text>{{Number(totalprice-(Favorablebalance?Favorablebalance:0)).toFixed(2)}}</text>
				<!-- @tap="priceorder showModal" -->
				<button class="cu-btn round bg-orange" @tap="showModal" data-target="bottomModal">提交订单</button>
			</view>
		</view>
		<!-- 底部弹出框 框里面嵌套单选-->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white cu-modal-left-padding">
					<view class="action text-blue" @tap="hideModal">取消支付</view>
					<view class="action text-green" @tap="Determinepayment">确定支付</view>
				</view>
				<view class="padding-xl">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in list" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item}}</view>
									<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
									 :value="'radio' + index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
		<passkeyborad 
			:show="passwordzhifutanchuang" 
			:isIphoneX="isIphoneX" 
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment" 
			:balancetext="String(Number(totalprice-(Favorablebalance?Favorablebalance:0)).toFixed(2))"
			@close="close"
			></passkeyborad>
	</view>
</template>

<script>
	//引入顶部导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//引入优惠券
	import storecoupon from "@/components/Details/storecoupon.vue"
	//引入插件密码弹窗页面
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	//这是购买订单页面
	const app = getApp();
	export default {
		data() {
			return {
				//这是首页的高度
				statusBar:0,
				modalName: null,
				radio: 'radio0',
				gid:"",
				img:"",
				nums:0,
				storename:"",
				price:0,
				goodtitle:"",
				data:[],
				way:0,
				o_from:0,
				value:"",
				storeid:"",
				list:[
					"微信",
					"支付宝",
					"余额"
				],
				Username:"",
				Userphone:"",
				Userselect:"",
				tokey:0,
				coupondetails:[],
				Favorablebalance:"",
				cids:"",
				address_id:"",//地址选中的id
				ctype:"",//优惠券的类型 平台的还是店铺的
				cid:"",
				passwordzhifutanchuang:false,//是否弹出输入支付密码弹窗
				isIphoneX:false,//Iphone全面屏系列底部适配
				zhifumimatext:"",
				orderSnArray:[],
				Orderserialnumber:"",//订单流水号 用于H5支付用
				freight:"",//商品的运费
				spec_id:0,
				orderinfolist:[],
				totalnumber:0,//总数量
				totalprice:0,//总价格
				ordergidlist:""//购物车过来的全部id
			}
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			Addressmodification(){
				//1是购物车过来的
				//2是详情过来的
				console.log(this.way)
				if(this.way==1){
					uni.navigateTo({
						url:`/pages/addressTo/addressTo?title=orderaddress&gid=${this.gid}&num=${this.nums}&way=${this.way}&img=${JSON.stringify(this.img)}&storename=${this.storename}&goodtitle=${this.goodtitle}&price=${this.price}&cids=${this.cids}&storeid=${this.storeid}&freight=${this.freight}`
					})
				}else{
					console.log(this.spec_id)
					uni.navigateTo({
						url:`/pages/addressTo/addressTo?title=orderaddress&gid=${this.gid}&specname=${JSON.stringify(this.data)}&num=${this.nums}&way=${this.way}&img=${JSON.stringify(this.img)}&storename=${this.storename}&goodtitle=${this.goodtitle}&price=${this.price}&storeid=${this.storeid}&freight=${this.freight}&spec_id=${this.spec_id}`
					})
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//当用户点击确定支付
			Determinepayment(){
				if(this.radio=='radio0'){//微信支付
					// console.log("微信支付")
					const _this = this
					//当用户选择支付时处理买家留言
					let Leavemessage = {}
					let Leavearr = []
					Leavemessage.sid = this.storeid
					Leavemessage.msg = this.value
					Leavearr[0] = Leavemessage
					console.log(Leavearr)
					if(this.address_id!==""){
						if(this.way==1){//购物车过来的时候发起的请求 购物车商品生成待付款订单
							
						}else{//订单详情过来的
							if(this.coupondetails.length<=0){
								this.cid = ""
								this.ctype = ""
							}else{
								this.cid = this.coupondetails[0].c_id
								this.ctype = this.coupondetails[0].c_type
							}
							console.log(this.tokey,this.gid,this.data,this.nums,this.o_from,this.address_id,this.value,this.cid,this.ctype)
							uni.request({
								url:`${app.globalData.Requestpath}order/createUnPayOrderInfo`,
								method:"POST",
								data:{
									token:this.tokey,
									gid:this.gid,//商品的id
									spec:this.data,
									quantity:this.nums,
									o_from:this.o_from,//根据用户哪一端进来的
									address_id:this.address_id,//地址对应的id
									p_msg:this.value,//用户的留言
									c_id:this.cid,//这是返回用户选择的那张优惠券
									c_type:this.ctype?'store':'platform'
								},
								success(res) {
									console.log("走到这1")
									// console.log(res)
									// console.log(res.data.data.orderSnArray)//订单编号
									console.log(res.data.data.swiftNo)//订单流水号
									//orderSnArray订单的编组 支付的时候用到
									if(res.data.code==0){//获取到支付前的数据
									console.log("走到这2")
										//获取订单流水号
										// _this.orderSnArray = res.data.data.swiftNo
										console.log(((_this.price*_this.nums+_this.freight)-(_this.Favorablebalance?_this.Favorablebalance:0)).toFixed(2))
										console.log(res.data.data.swiftNo)
										uni.request({
											url:`${app.globalData.Requestpath}directwxpay/getarrinfo`,
											header:{
												'Content-Type':'application/json'
											},
											method:"POST",
											data:{
												user_id:54,
												trade_type:"APP",
												price:((_this.price*_this.nums+_this.freight)-(_this.Favorablebalance?_this.Favorablebalance:0)).toFixed(2),
												sn:res.data.data.swiftNo
											},
											success(respaymentinformation) {
												console.log(respaymentinformation)
												if(respaymentinformation.data.code){
													let orderInfo = JSON.stringify(respaymentinformation.data.data)
													uni.requestPayment({
														provider:"wxpay",
														orderInfo:orderInfo,
														success(resreturn) {
															console.log(1)
															console.log(resreturn)
														},
														fail(err){
															console.log(2)
															console.log(err)
														}
													})
												}
											},
											fail(err){
												console.log(err)
											}
										})
									}else if(res.data.code==1 && res.data.msg=="无效的商品,返回上一步"){//当用户结算的时候 看看商品有没有问题
										console.log("走到这3")
										_this.hideModal()
										app.globalData.showtoastsame("此商品为无效商品,正在审核,请后期关注")
									}
								}
							})
						}
					}else{
						_this.hideModal()
						app.globalData.showtoastsame("请选择地址进行支付")
					}
					// app端微信支付---开始
					// let obj = {
					// 	appid:"wx0f9236b57d357dbb",
					// 	noncestr:"123456789abcdefgh",
					// 	package:'Sign=WXPay',
					// 	partnerid:'1565078781',
					// 	prepayid:'158831190101057374',
					// 	timestamp:'1591342764',
					// 	sign:'DEB45B3629C6E3464E9E753E4514B57B'
					// }
					// 
					// console.log(orderInfo)
							//app端 orderInfo支付的数据
						// uni.request({
						// 	url:`${app.globalData.Requestpath}directwxpay/pay`,
						// 	header:{
						// 		'Content-Type':'application/json'
						// 	},
						// 	data:{
						// 		user_id:54,
						// 		trade_type:"APP",
						// 		price:0.01,
						// 		sn:5448541664
						// 	},
						// 	success(res) {
						// 		console.log(res)
						// 	},
						// 	fail(err){
						// 		console.log(err)
						// 	}
						// })
						// uni.getProvider({
						// 	service:'payment',
						// 	success(res) {
						// 		console.log(res.provider[1])
						// 		uni.requestPayment({
						// 			provider:res.provider[1],
									
						// 		})
						// 	}
						// })
						

					//app端微信端---结束
					
					//H5端支付---开始
					//H5端支付---结束
				}else if(this.radio=='radio1'){//支付宝支付
					console.log("支付宝支付")
					uni.request({
						url:`${app.globalData.Requestpath}directalipay/getarrinfo`,
						header:{
							'Content-Type':'application/json'
						},
						method:"POST",
						data:{
							user_id:54,
							trade_type:"APP",
							price:0.01,
							sn:'343444456'
						},
						success(reszhifubao) {
							if(reszhifubao.data.code==0){
								
								let {app_id,biz_content,charse,method,out_trade_no,sign_type,subject,timestamp,total_amount,version,sign} = reszhifubao.data.msg
								//console.log(app_id,biz_content,charse,method,out_trade_no,sign_type,subject,timestamp,total_amount,version,sign)
								let orderInfo = `app_id=${app_id}&biz_content=${biz_content}&charset=utf-8&method=${method}&notify_url=''&out_trade_no=${out_trade_no}&sign_type=${sign_type}&subject=${subject}&timestamp=${timestamp}&total_amount=${total_amount}&version=${version}&sign=${sign}`
								uni.requestPayment({
									provider:'alipay',
									orderInfo:orderInfo,
									success(resdata){
										console.log(resdata)
									},
									fail(err){
										console.log(err)
									}
								})
							}
						},
					})
					//app端支付宝支付---开始&product_code='' &notify_url=''
					//app端支付宝支付---结束
				}else{
					// console.log(this.tokey)					
					this.GetorderdetailsData()
				}
				
			},
			//封装个根据购物车进来的还是订单进来的请求数据
			GetorderdetailsData(){
				// console.log(this.address_id)
				const _this = this
				//当用户选择支付时处理买家留言
				let Leavemessage = {}
				let Leavearr = []
				Leavemessage.sid = this.storeid
				Leavemessage.msg = this.value
				Leavearr[0] = Leavemessage
				//1是购物车过来的
				//2是详情过来的
				// console.log(this.way)
				if(this.address_id!==""){//判断新用户有没有地址
					if(this.way==1){//购物车过来的时候发起的请求 购物车商品生成待付款订单
					let str = _this.ordergidlist.substr(0,_this.ordergidlist.length-1)
						uni.request({
							url:`${app.globalData.Requestpath}order/createCartUnPayOrderInfo`,
							method:"POST",
							data:{
								token:this.tokey,
								c_ids:str,//购物车选中的购物商品的id   _this.ordergidlist
								o_from:this.o_from,//根据用户哪一端进来的
								address_id:this.address_id,//地址对应的id
								coupon_ids:this.coupondetails,//这是返回用户选择的那张优惠券
								p_msg:Leavearr//用户的留言
							},
							success(res) {
								// console.log(res)
								if(res.data.code==0){
									//获取订单编号数组
									_this.orderSnArray = res.data.data.orderSnArray
									//选择支付的框隐藏
									_this.hideModal()
									_this.Detectionpaymentpassword(_this)
								}else if(res.data.code==1 && res.data.msg=="无效的商品,返回上一步"){//当用户结算的时候 看看商品有没有问题
									_this.hideModal()
									app.globalData.showtoastsame("此商品为无效商品,正在审核,请后期关注")
								}else{
									
								}
							}
						})
					}else{//订单详情过来的
					// console.log(this.orderinfolist)
						if(this.coupondetails.length<=0){
							this.cid = ""
							this.ctype = ""
						}else{
							this.cid = this.coupondetails[0].c_id
							this.ctype = this.coupondetails[0].c_type
						}
						uni.request({
							url:`${app.globalData.Requestpath}order/createUnPayOrderInfo`,
							method:"POST",
							data:{
								token:this.tokey,
								gid:_this.orderinfolist[0].good_id,//商品的id
								spec_id:_this.orderinfolist[0].spec_id,
								quantity:_this.orderinfolist[0].good_num,
								o_from:this.o_from,//根据用户哪一端进来的
								address_id:this.address_id,//地址对应的id
								p_msg:this.value,//用户的留言
								c_id:this.cid,//这是返回用户选择的那张优惠券
								c_type:this.ctype?'store':'platform'
							},
							success(res) {
								// console.log(res)
								// console.log(res.data.data.orderSnArray)//订单编号
								// console.log(res.data.data.swiftNo)//订单流水号
								//orderSnArray订单的编组 支付的时候用到
								if(res.data.code==0){//获取到支付前的数据
									//获取订单编号数组
									_this.orderSnArray = res.data.data.orderSnArray
									//选择支付的框隐藏
									_this.hideModal()
									//检测是否设置了支付密码
										_this.Detectionpaymentpassword(_this)
										
								}else if(res.data.code==1 && res.data.msg=="无效的商品,返回上一步"){//当用户结算的时候 看看商品有没有问题
									_this.hideModal()
									app.globalData.showtoastsame("此商品为无效商品,正在审核,请后期关注")
								}
							}
						})
					}
				}else{
					_this.hideModal()
					app.globalData.showtoastsame("请选择地址进行支付")
				}
				
			},
			//封装一个检测用户是否设置支付密码的方法
			Detectionpaymentpassword(_this){
				uni.request({
					url:`${app.globalData.Requestpath}user/isSetPayPassword`,
					method:"POST",
					data:{
						token:_this.tokey
					},
					success(respaymentpassword) {
						if(respaymentpassword.data.code==1){
							// console.log("支付密码不存在")
							// 如果用户没设置支付密码就让用户跳到设置支付密码页面
							uni.showModal({
								title:"请设置支付密码",
								content:"设置平台的支付密码",
								showCancel:true,
								cancelColor:"#ff0000",
								confirmColor:"#green",
								success(res) {
									if(res.confirm){
										uni.navigateTo({
											url:"/components/setcenter/setcenter?title=userset&titlename=设置&business=pay"
										})
										return 
									}else{
										app.globalData.showtoastsame("您可以选择其他支付方式")
										return 
									}
								}
							})
						}else{
							//如果用户设置了支付密码 才能执行输入支付密码
							_this.Paywithbalance(_this)
						}
					}
				})
			},
			//这是用来接收子组件传过来的订单数据
			dingdancoupon(e){
				// console.log(e)
				//这是用户选择优惠券后 原价减去优惠卷的价格
				this.Favorablebalance = e[0].money
				this.coupondetails = e
			},
			//封装一个使用余额支付的方法
			Paywithbalance(_this){
				_this.passwordzhifutanchuang = true
				_this.isIphoneX = true
			},
			//用来接受子组件传过来的值
			Enterpasswordcompletepayment(e){//这是用户输入的密码
				const _this = this
				this.zhifumimatext = e
				//当用户输入完执行下面的请求 密码正确
				// console.log(this.orderSnArray)
				uni.request({
					url:`${app.globalData.Requestpath}balance_pay/payOrdersNew`,
					method:"POST",
					data:{
						token:this.tokey,
						o_sns:this.orderSnArray,
						pay_password:e
					},
					success(res) {
						if(res.data.code==0){
							uni.reLaunch({
								url:"/pages/Paysuccess/Paysuccess"
							})
						}else{
							app.globalData.showtoastsame(res.data.msg)
							_this.passwordzhifutanchuang = null
							_this.isIphoneX = null
							uni.reLaunch({
								url:`/pages/Temporarynonpayment/Temporarynonpayment?ordersnSerial=${btoa(_this.orderSnArray)}`
							})
						}
					}
				})
			},
			close(e){//这是点击×以后
				this.passwordzhifutanchuang = e
				this.isIphoneX = e
				console.log(this.orderSnArray)
				uni.reLaunch({
					url:`/pages/Temporarynonpayment/Temporarynonpayment?ordersnSerial=${btoa(this.orderSnArray)}`
				})
			},
			//封装个 进来订单的这个页面就开始加载的订单的页面
			Orderrender(){
			},
		},
		onLoad(opction){
			// console.log("onload先执行")
			// let {way} = opction
			// this.way = way//判断是从购物车来的 还是详情来的
			const _this = this
			if(opction.selectitem){
				let {consignee_name,consignee_phone,street_number,address_id} = JSON.parse(decodeURI(opction.selectitem))
				this.Username = consignee_name
				this.Userphone = consignee_phone
				this.Userselect = street_number
				this.address_id = address_id
			}else{
				// console.log(opction.selectitem)
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						uni.request({//这个是获取一条收货地址的详情
							url:`${app.globalData.Requestpath}user/getShippingAddressList`,
							method:"POST",
							data:{
								token:res.data,
								page:1,
								pageSize:1,
							},
							success(reslove) {
								// console.log(reslove.data.data[0])
								// consignee_name consignee_phone street_number
								if(reslove.data.code==0){
									_this.Username = reslove.data.data[0].consignee_name
									_this.Userphone = reslove.data.data[0].consignee_phone
									_this.Userselect = reslove.data.data[0].street_number
									_this.address_id = reslove.data.data[0].address_id
								}
							}
						})
					}
				})
			}
			uni.getStorage({
				key:"orderinfo",
				success(res) {
					// console.log(res)
					_this.orderinfolist = res.data
					_this.orderinfolist.forEach((item,index)=>{
						_this.totalnumber += item.good_num
						_this.totalprice += (item.good_price*item.good_num)+Number(item.good_freight)
						// console.log(item.way)
						if(item.way){
							_this.way = 2
						}else{
							_this.way = 1
							// console.log(item.good_id)
							_this.ordergidlist += item.cart_id+','
						}
					})
					let arr = String(_this.totalprice).split('.')
					if(Boolean(arr[1])){
						let strtow = arr[1].substr(0,2)
						_this.totalprice = arr[0]+'.'+strtow
					}else{
						_this.totalprice = _this.totalprice
					}
				}
			})
			// #ifdef H5
				this.o_from = 1,
			// #endif
			// #ifdef APP-PLUS
				this.o_from = 2
			// #endif
			// #ifdef MP-WEIXIN
				this.o_from = 3
			// #endif
			this.statusBar = app.globalData.statusBar
		},
		components:{
			actionbar,
			storecoupon,
			passkeyborad
		},
		onShow() {
			// console.log("onsho先执行")
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.Purchasepage{
		.Buycontent{
			padding:0 20rpx;
			.Shippingaddress{
				display: flex;
				// align-items:center;
				background-color: #fff;
				padding:30rpx 0;
				margin-top:40rpx;
				border-radius:16rpx;
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
							width: 90%;
							font-size: 28rpx;
						}
						text{
							font-size: 36rpx;
						}
					}
				}
			}
		}
		.purchase-order{
			.order{
				background-color: #fff;
				margin-top:44rpx;
				padding-left:20rpx;
				border-radius:16rpx;
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
							height:76rpx;
							font-size: 28rpx;
						}
						.shopgoosorder-pic{
							width: 30%;
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
					.distribution{
						display:flex;
						justify-content: space-around;
						font-size: 30rpx;
						line-height: 68rpx;
						.distribution-left{
							text{
								&:last-child{
									color:#999;
									margin-left:20rpx;
								}
							}
						}
						.distribution-right{
							//为后期改
						}
					}
					.note{
						//为后期改
					}
					.Payprice{
						display:flex;
						justify-content: flex-end;
						font-size: 28rpx;
						line-height:84rpx;
						text{
							display:block;
							text-align:right;
							margin-right:10rpx;
							&:first-child{
								color:#999;
							}
							&:last-child{
								// color:#
								font-size: 34rpx;
								margin-right:30rpx;
							}
						}
					}
				}
			}
		}
		.detailscar{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			left: 0;
			z-index: 1;
			background-color: #fff;
			.detailscar-pic{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				line-height:100rpx;
				text{
					font-size: 35rpx;
					
					&:first-child{
						color:#999;
						font-size: 30rpx;
					}
					&:nth-child(3){
						color:#ff4f00;
						margin-right:20rpx;
					}
				}
				button{
					margin-right:15rpx;
				}
			}
		}
	}
	.cu-modal-left-padding{
		padding:0 20rpx;
	}
</style>
