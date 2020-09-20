<template>
	<view>
		<view class="Purchasepage">
			<pageheight :statusBar="statusBar"></pageheight>
			<actionbar :url=" fromvalue==1 ? '/pages/shoppingCart/shoppingCart':'/pages/index/index'" message="确认订单" :isorder="isorder"></actionbar>
			<!-- <view class="Buycontent">
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
			</view> -->
			<!-- 新的订单地址 -->
			<view class="TheordercolumnBox">
				<view class="Theordercolumn">
					<view class="Theordercolumn_left">
						<view class="message">
							<text>{{Username}}</text>
							<text class="dercophone">{{Userphone}}</text>
						</view>
						<view class="dercolocationBox" @tap="Addressmodification">
							<view class="dercolocation-left">
								<text class="dercolocation">{{province_name+city_name+area_name+Userselect}}</text>
							</view>
							<view class="dercolocation-right">
								<text class="lg text-gray cuIcon-right"></text></view>
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
							<image :src="imgpath+item.good_pic"></image>
						</view>
						<view class="shopgoosorder-right">
							<view class="shopgoosorder-title">
								<text class="shopgoosorder-title_text">{{item.good_name}}</text>
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
								<text>{{Number(item.good_freight)?item.good_freight+'元':'包邮配送'}}</text>
							</view>
						</view>
						<!-- 这是优惠券的组件 -->
						<storecoupon msg="使用" titlemsg="使用优惠券" :tokey="tokey" :storeid="item.store_id" :couplebooltext="couplebooltext"
						 Whatcoupon="1" :Orderpaymentamount="item.good_price*item.good_num" @dingdancoupon="dingdancoupon" v-if="orderinfolist.length<=1 && good_type!=='nlt'"
						 :limit_gcategory="limit_gcategory" :limit_gids="limit_gids"></storecoupon>
						<view class="distribution note">
							<view class="cu-form-group">
								<view class="title">订单备注</view>
								<!-- <input placeholder="选填,请先和商家协商一致" name="input" v-model="value"></input> -->
								<textarea rows="5" cols="20" placeholder="选填,请先和商家协商一致" v-model="value"></textarea>
							</view>
						</view>
						<view class="Payprice">
							<text>共{{item.good_num}}件</text>
							<text>小计:</text>
							<!-- Favorablebalance优惠卷的面额 有值的时候采用有值 没值的时候采用0 -->
							<!--  -->
							<text class="text-yellow" v-text="'¥'+(Number((item.good_price*item.good_num+Number(item.good_freight?item.good_freight:0))-(Favorablebalance?Favorablebalance:0)).toFixed(2))">
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
					<button class="cu-btn round bg-orange" @tap="showModal" data-target="bottomModal" :data-total_price="String(Number(totalprice-(Favorablebalance?Favorablebalance:0)).toFixed(2))">提交订单</button>
				</view>
			</view>
			<!-- 底部弹出框 框里面嵌套单选-->
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white cu-modal-left-padding">
						<view class="action text-blue" @tap="Cancelpayment">取消支付</view>
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
			<passkeyborad :show="passwordzhifutanchuang" :isIphoneX="isIphoneX" @Enterpasswordcompletepayment="Enterpasswordcompletepayment"
			 :balancetext="String(Number(totalprice-(Favorablebalance?Favorablebalance:0)).toFixed(2))" @close="close"></passkeyborad>
			<loading v-show="loadingbool==false"></loading>
		</view>
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
	//引入微信绑定的页面
	import wxbindopen from "@/components/myPersonal/wxbindopnid.vue"
	const app = getApp();
	export default {
		data() {
			return {
				//这是首页的高度
				statusBar: 0,
				modalName: null,
				radio: 'radio0',
				gid: "",
				img: "",
				nums: 0,
				storename: "",
				price: 0,
				goodtitle: "",
				data: [],
				way: 0,
				o_from: 0,
				value: "",
				storeid: "",
				list: [
					"微信",
					"余额"
				],
				Username: "",
				Userphone: "",
				Userselect: "",
				province: "",
				city: "",
				area: "",
				province_name: "",
				city_name: "",
				area_name: "",
				tokey: 0,
				coupondetails: [],
				Favorablebalance: "",
				cids: "",
				address_id: "", //地址选中的id
				ctype: "", //优惠券的类型 平台的还是店铺的
				cid: "",
				passwordzhifutanchuang: false, //是否弹出输入支付密码弹窗
				isIphoneX: false, //Iphone全面屏系列底部适配
				zhifumimatext: "",
				orderSnArray: [],
				Orderserialnumber: "", //订单流水号 用于H5支付用
				freight: "", //商品的运费
				spec_id: 0,
				orderinfolist: [],
				totalnumber: 0, //总数量
				totalprice: 0, //总价格
				ordergidlist: "", //购物车过来的全部id
				couplebooltext: [], //判断是不是新人 新人只能使用新人优惠券
				c_ids: "", //判断余额支付的时候使用的哪张优惠券的id
				passwordindex: 0, //用于判断用户输入错几次密码
				share_code: "", //用于保存分享码
				share_from: "", // 用于保存分享的来源
				total_price: '',
				mali: 0, //运费
				code: 0,
				imgpath: this.$store.state.imgyuming,
				openidbool: true,
				good_type: "", //type类型看看优惠券显不显示
				isorder: true,
				loadingbool: true, //加载图标显示
				fromvalue: 0,
				limit_gcategory: [], //优惠券的gc_id
				limit_gids: [], //优惠券的商品id
			}
		},
		methods: {
			Cancelpayment() {
				const _this = this
				_this.hideModal()
				uni.showModal({
					title: "确定要放弃支付",
					content: "放弃支付无法生成待付款订单",
					showCancel: true,
					cancelText: "取消",
					cancelColor: "#ff0000",
					confirmText: "确定放弃",
					confirmColor: "#00ff00",
					success(res) {
						if (res.confirm) {
							uni.navigateBack()
						}
					}
				})
			},
			//封装个方法 如果用户点击微信绑定确定或者功能
			showtotal() {
				//如果用户没有绑定openid的话 就让用户跳到绑定openid的页面
				uni.showModal({
					title: "请进行绑定微信",
					content: "为了您的正常提现",
					showCancel: true,
					cancelText: "取消",
					cancelColor: "#ff0000",
					confirmText: "确定绑定",
					confirmColor: "#00ff00",
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: `/pages/WeChatLanding/WeChatLanding`
							})
						} else {
							uni.navigateBack()
						}
					}
				})
			},
			//封装个方法 判断用户有没有绑定微信的openid
			getopenid() {
				const _this = this
				uni.getStorage({
					key: "bindopenid",
					success(res) {
						if (res.data !== "") {
							_this.openidbool = true
						} else {
							_this.openidbool = false
							_this.showtotal()
						}
					},
					fail(err) {
						_this.openidbool = false
						_this.showtotal()
					}
				})
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			Addressmodification() {
				const _this = this
				//1是购物车过来的
				//2是详情过来的
				// console.log(this.way)
				if (_this.way == 1) {
					uni.navigateTo({
						url: `/pages/addressTo/addressTo?title=orderaddress&gid=${_this.gid}&num=${_this.nums}&way=${_this.way}&img=${JSON.stringify(_this.img)}&storename=${_this.storename}&goodtitle=${_this.goodtitle}&price=${_this.price}&cids=${_this.cids}&storeid=${_this.storeid}&freight=${_this.freight}`
					})
				} else {
					// console.log(this.spec_id)
					uni.navigateTo({
						url: `/pages/addressTo/addressTo?title=orderaddress&gid=${_this.gid}&specname=${JSON.stringify(_this.data)}&num=${_this.nums}&way=${_this.way}&img=${JSON.stringify(_this.img)}&storename=${_this.storename}&goodtitle=${_this.goodtitle}&price=${_this.price}&storeid=${_this.storeid}&freight=${_this.freight}&spec_id=${_this.spec_id}`
					})
				}
			},
			showModal(e) {

				const _this = this
				//取出缓存中的数据的地址的长度
				let addresslength = ""
				uni.getStorage({
					key: "addresslength",
					success(resaddress) {
						// console.log(resaddress)
						// console.log(123)
						addresslength = resaddress.data

						if (addresslength !== 0 && addresslength !== "") {
							let {
								total_price
							} = e.currentTarget.dataset

							_this.modalName = e.currentTarget.dataset.target
							_this.total_price = total_price
						} else {
							uni.showModal({
								title: "当前地址为空",
								content: "是否要新增地址",
								showCancel: true,
								cancelText: "取消新增",
								cancelColor: "#ff0000",
								confirmText: "确定新增",
								confirmColor: "#00ff00",
								success(resadd) {
									// console.log(resadd)
									if (resadd.confirm) {
										_this.Addressmodification()
									}
								},
							})
						}
					}
				})
			},
			hideModal(e) {
				this.modalName = null
			},
			//当用户点击确定支付
			Determinepayment() {
				const _this = this
				//处理买家留言

				let payid = ""; //给后端进行返回
				if (this.radio == 'radio0') { //微信支付
					if (this.address_id == "") {
						app.globalData.showtoastsame("请到地址栏中添加地址")
					} else {
						payid = "wxpay"
						this.GetorderdetailsData(payid)
						//当用户点击微信支付的时候 加载图标出来
						this.loadingbool = false
					}
					//app端微信端---结束

					//H5端支付---开始
					//H5端支付---结束
				} else if (this.radio == 'radio5') { //支付宝支付
					// console.log("支付宝支付")
					//app端支付宝支付---开始&product_code='' &notify_url=''
					//app端支付宝支付---结束
				} else {
					payid = "YUE"
					this.GetorderdetailsData(payid)
				}

			},
			//封装个根据购物车进来的还是订单进来的请求数据
			GetorderdetailsData(payid) {
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
				let addresslength = ""
				//取出缓存中的数据的地址的长度
				uni.getStorage({
					key: "addresslength",
					success(resaddress) {
						addresslength = resaddress.data
					}
				})
				//判断用户地址中有没有
				if (_this.code == 0) {
					//判断用户地址中有没有

					if (parseInt(addresslength) !== 0) {
						if (this.address_id !== "") { //判断新用户有没有地址
							if (this.way == 1) { //购物车过来的时候发起的请求 购物车商品生成待付款订单
								let str = _this.ordergidlist.substr(0, _this.ordergidlist.length - 1)
								uni.request({
									url: `${app.globalData.Requestpath}order/createCartUnPayOrderInfo`,
									method: "POST",
									data: {
										token: this.tokey,
										c_ids: str, //购物车选中的购物商品的id   _this.ordergidlist
										o_from: this.o_from, //根据用户哪一端进来的
										address_id: this.address_id, //地址对应的id
										coupon_ids: this.coupondetails, //这是返回用户选择的那张优惠券
										p_msg: Leavearr //用户的留言
									},
									success(res) {
										// console.log(res)
										if (res.data.code == 0) {
											//获取订单编号数组
											_this.orderSnArray = res.data.data.orderSnArray
											//选择支付的框隐藏
											if (payid == "wxpay") {
												//拿到订单流水号 用于微信支付 传给后台
												// console.log(res.data.data.swiftNo)
												_this.payweixin(res.data.data.swiftNo)
											} else if (payid == "YUE") {
												_this.hideModal()
												_this.Detectionpaymentpassword(_this)
											}
										} else if (res.data.code == 1 && res.data.msg == "无效的商品,返回上一步") { //当用户结算的时候 看看商品有没有问题
											_this.hideModal()
											app.globalData.showtoastsame("此商品为无效商品,正在审核,请后期关注")
										} else {

										}
									}
								})
							} else { //订单详情过来的
								// console.log(this.orderinfolist)
								if (this.coupondetails.length <= 0) {
									this.cid = ""
									this.ctype = ""
								} else {
									this.cid = this.coupondetails[0].c_id
									this.ctype = this.coupondetails[0].c_type
								}
								uni.request({
									url: `${app.globalData.Requestpath}order/createUnPayOrderInfo`,
									method: "POST",
									data: {
										token: this.tokey,
										gid: _this.orderinfolist[0].good_id, //商品的id
										spec_id: _this.orderinfolist[0].spec_id,
										quantity: _this.orderinfolist[0].good_num,
										o_from: this.o_from, //根据用户哪一端进来的
										address_id: this.address_id, //地址对应的id
										p_msg: this.value, //用户的留言
										c_id: this.c_ids, //这是返回用户选择的那张优惠券
										c_type: this.ctype ? 'store' : 'platform',
										share_code: this.share_code,
										share_from: this.share_from
									},
									success(res) {
										// console.log(res)
										// console.log(res.data.data.orderSnArray)//订单编号
										// console.log(res.data.data.swiftNo)//订单流水号
										//orderSnArray订单的编组 支付的时候用到
										if (res.data.code == 0) { //获取到支付前的数据
											//获取订单编号数组
											_this.orderSnArray = res.data.data.orderSnArray
											// console.log(payid)
											if (payid == "wxpay") {
												//拿到订单流水号 用于微信支付 传给后台
												// console.log(res.data.data.swiftNo)
												_this.payweixin(res.data.data.swiftNo)
											} else if (payid == "YUE") {
												//选择支付的框隐藏
												_this.hideModal()
												//检测是否设置了支付密码
												_this.Detectionpaymentpassword(_this)
											}
										} else if (res.data.code == 1 && res.data.msg == "无效的商品,返回上一步") { //当用户结算的时候 看看商品有没有问题
											_this.hideModal()
											app.globalData.showtoastsame("此商品为无效商品,正在审核,请后期关注")
										}
									}
								})
							}
						} else {
							_this.hideModal()
							app.globalData.showtoastsame("请选择地址进行支付")
						}
					} else {
						_this.hideModal()
						app.globalData.showtoastsame("请到地址栏中添加地址")
					}
				} else {
					_this.hideModal()
					app.globalData.showtoastsame("请到地址栏中添加地址")
				}
			},
			//封装一个检测用户是否设置支付密码的方法
			Detectionpaymentpassword(_this) {
				uni.request({
					url: `${app.globalData.Requestpath}user/isSetPayPassword`,
					method: "POST",
					data: {
						token: _this.tokey
					},
					success(respaymentpassword) {
						if (respaymentpassword.data.code == 1) {
							// console.log("支付密码不存在")
							// 如果用户没设置支付密码就让用户跳到设置支付密码页面
							uni.showModal({
								title: "请设置支付密码",
								content: "设置平台的支付密码",
								showCancel: true,
								cancelColor: "#ff0000",
								confirmColor: "#00ff00",
								success(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: "/components/setcenter/setcenter?title=userset&titlename=设置&business=pay"
										})
										return
									} else {
										app.globalData.showtoastsame("您可以选择其他支付方式")
										return
									}
								}
							})
						} else {
							//如果用户设置了支付密码 才能执行输入支付密码
							_this.Paywithbalance(_this)
						}
					}
				})
			},
			//这是用来接收子组件传过来的订单数据
			dingdancoupon(e) {
				const _this = this
				// console.log(e)
				//这是用户选择优惠券后 原价减去优惠卷的价格
				this.Favorablebalance = e[0].money
				this.coupondetails = e
				//为了商品详情过来的商品判断有没有使用优惠券有的话就赋值 没有的话 就为空
				if (this.coupondetails.length >= 1) {
					this.coupondetails.forEach((item, index) => {
						//c_ids
						_this.c_ids = item.c_id
					})
				} else {
					_this.c_ids = ""
				}
			},
			//封装一个使用余额支付的方法
			Paywithbalance(_this) {
				_this.passwordzhifutanchuang = true
				_this.isIphoneX = true
			},
			//用来接受子组件传过来的值
			Enterpasswordcompletepayment(e) { //这是用户输入的密码
				const _this = this
				this.zhifumimatext = e
				//当用户输入完执行下面的请求 密码正确
				// console.log(this.orderSnArray)
				uni.request({
					url: `${app.globalData.Requestpath}balance_pay/payOrdersNew`,
					method: "POST",
					data: {
						token: this.tokey,
						o_sns: this.orderSnArray,
						pay_password: e
					},
					success(res) {
						if (res.data.code == 0) {
							uni.reLaunch({
								url: "/pages/Paysuccess/Paysuccess"
							})
							if (_this.way == 2) {
								_this.getcommission()
							}
						} else {
							app.globalData.showtoastsame(res.data.msg)
							//如果用户输入密码错误 就让他跳到订单列表
							_this.passwordindex++
							//如果用户输错3次密码就跳到订单页面
							if (_this.passwordindex >= 3) {
								_this.passwordzhifutanchuang = null
								_this.isIphoneX = null
								uni.redirectTo({
									url: `/pages/orderpageRouter/orderpageRouter?is_order=isorder`
								})
							}
						}
					}
				})
			},
			close(e) { //这是点击×以后
				const _this = this
				this.passwordzhifutanchuang = e
				this.isIphoneX = e
				// console.log(this.orderSnArray[0])
				uni.reLaunch({
					url: `/pages/orderpageRouter/orderpageRouter?is_order=isorder`
				})
			},
			//封装个方法 用来处理活动佣金问题
			getcommission() {
				const _this = this
				// console.log(_this.share_from)
				if (_this.share_from !== '') {
					// console.log(1111,"走第一步")
					uni.getStorage({
						key: 'bindtokey',
						success(restokey) {
							let {
								store_id,
								store_name,
								good_id,
								good_name,
								good_pic,
								good_price,
								good_num,
								good_purchase_price
							} = _this.orderinfolist[0]
							// console.log(good_purchase_price, "这是订单的号")
							// console.log(22,"走第二部")
							uni.request({
								url: `${app.globalData.Requestpath}good/getCmsSettlementConfigInfo`,
								method: "POST",
								data: {
									token: restokey.data,
									type: _this.share_from,
									gid: good_id
								},
								success(rescommissionconfiguration) {
									// console.log(3333,"走第三部")
									if (rescommissionconfiguration.data.code == 0) {
										// console.log(444,"走第四步")
										// console.log(restokey.data,_this.orderSnArray[0],store_id,store_name,good_id,good_name,good_pic,good_price,good_purchase_price,good_num,_this.total_price,rescommissionconfiguration.data.data.good_type,rescommissionconfiguration.data.data.cms_type,rescommissionconfiguration.data.data.cms_value)
										uni.request({
											url: `${app.globalData.Requestpath}CmsSettlement/CommissionSettlement`,
											method: "POST",
											data: {
												token: restokey.data,
												order_sn: _this.orderSnArray[0],
												store_id: store_id,
												store_name: store_name,
												good_id: good_id,
												good_title: good_name,
												good_pic: good_pic,
												good_price: good_price,
												good_purchase_price: good_purchase_price,
												good_num: good_num,
												total_price: _this.total_price,
												cms_category: rescommissionconfiguration.data.data.good_type,
												settlement_type: rescommissionconfiguration.data.data.cms_type,
												cms_rate: rescommissionconfiguration.data.data.cms_value,
												share_code: _this.share_code,
											},
											success(rescommissioninfo) {
												// console.log(rescommissioninfo,"左后异步")
											}
										})
									}
								}
							})
						}
					})
				} else {
					return
				}
			},
			//封装个微信支付
			payweixin(swiftNo) {
				// console.log(1111)
				const _this = this
				let appid = 'wx0f9236b57d357dbb';
				let payId = "wxpay"
				uni.request({
					url: `${app.globalData.Requestpath}pay/wechatpay`,
					method: "POST",
					data: {
						pay_type: 1,
						swift_id: swiftNo
					},
					success(res) {
						// console.log(res)
						// console.log(_this.way)
						if (res.statusCode == 200) {
							//临时---开始
							let {
								appid,
								noncestr,
								partnerid,
								prepayid,
								timestamp,
								sign,
								out_trade_no
							} = res.data
							let packages = res.data.package
							let obj = {
								appid,
								noncestr,
								package: packages,
								partnerid,
								prepayid,
								timestamp,
								sign
							}
							// console.log(obj)
							let str = out_trade_no
							//临时---结束
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: obj,
								success(e) {
									// console.log("success", e);

									//微信支付 请求后端的接口进行更改订单状态
									// console.log(swiftNo)
									uni.request({
										url: `${app.globalData.Requestpath}notify/wechatpay`,
										method: 'POST',
										data: {
											pay_type: 1,
											swift_id: swiftNo
										},
										success(res) {
											_this.loadingbool = true
											// console.log(res)
											//只要支付成功以后就到订单页面
											if (res.data.code == 0) {
												uni.showToast({
													title: "支付完成"
												})
												setTimeout(() => {
													uni.redirectTo({
														url: `/pages/orderpageRouter/orderpageRouter?is_order=isorder`
													})
												}, 1000)
											} else {
												uni.showToast({
													title: `${res.data.msg}`
												})
												setTimeout(() => {
													uni.redirectTo({
														url: `/pages/orderpageRouter/orderpageRouter?is_order=isorder`
													})
												}, 1000)
											}
											_this.hideModal()
										},
										fail(err) {
											_this.loadingbool = true
											// console.log(err)
										}
									})
									if (_this.way == 2) {
										_this.loadingbool = true
										_this.getcommission()
									}
								},
								fail(err) {
									_this.loadingbool = true
									// console.log(err)
									setTimeout(() => {
										uni.redirectTo({
											url: `/pages/orderpageRouter/orderpageRouter?is_order=isorder`
										})
									}, 1000)
								}
							})
						}
					}
				})
			}
		},
		onLoad(opction) {
			// console.log("onload先执行")
			// let {way} = opction
			// this.way = way//判断是从购物车来的 还是详情来的
			const _this = this
			// console.log(JSON.parse(decodeURI(opction.selectitem)))
			// console.log(opction.selectitem)
			_this.fromvalue = opction.fromvalue
			if (opction.selectitem) {
				// console.log(2222)
				let {
					consignee_name,
					consignee_phone,
					street_number,
					address_id,
					province,
					city,
					area,
					province_name,
					s
				} = JSON.parse(decodeURI(opction.selectitem))
				this.Username = consignee_name
				this.Userphone = consignee_phone
				this.Userselect = street_number
				this.address_id = address_id
				this.province = province
				this.city = city
				this.area = area
				this.province_name = province_name
				this.city_name = city_name
				this.area_name = area_name
				uni.setStorage({
					key: "addresslength",
					data: 1
				})
			} else {
				// console.log(111)
				// console.log(opction.selectitem)
				uni.getStorage({
					key: "bindtokey",
					success(res) {
						uni.request({ //这个是获取一条收货地址的详情
							url: `${app.globalData.Requestpath}user/getShippingAddressList`,
							method: "POST",
							data: {
								token: res.data,
								page: 1,
								pageSize: 999,
							},
							success(reslove) {
								// console.log(reslove)
								// consignee_name consignee_phone street_number
								if (reslove.data.code == 0) {
									//如果有默认地址 就取默认地址 没有默认地址 就取第一个地址
									reslove.data.data.forEach((item, index) => {
										if (item.is_default) {
											_this.Username = item.consignee_name
											_this.Userphone = item.consignee_phone
											_this.Userselect = item.street_number
											_this.address_id = item.address_id
											_this.province_name = item.province_name
											_this.city_name = item.city_name
											_this.area_name = item.area_name
										} else if (_this.Username == '') {
											_this.Username = reslove.data.data[0].consignee_name
											_this.Userphone = reslove.data.data[0].consignee_phone
											_this.Userselect = reslove.data.data[0].street_number
											_this.address_id = reslove.data.data[0].address_id
											_this.province_name = reslove.data.data[0].province_name
											_this.city_name = reslove.data.data[0].city_name
											_this.area_name = reslove.data.data[0].area_name
										}
									})
									uni.setStorage({
										key: "addresslength",
										data: 1
									})

								} else {
									uni.setStorage({
										key: "addresslength",
										data: 0
									})
								}
							}
						})
					}
				})
			}
			//couplebooltext
			uni.getStorage({
				key: "orderinfo",
				success(res) {
					_this.orderinfolist = res.data
					let stoIdArr = [] //开始的数组
					let stoIdSet = [] //去重后的店铺ID
					let coupons_gc = [] //商品id
					_this.couplebooltext = []
					//limit_gids
					_this.orderinfolist.forEach((item, index) => {
						console.log(item.activityType)
						/*这里为了存放商品id ----开始*/
						coupons_gc.push(item.good_id)
						// console.log(coupons_gc)
						_this.limit_gids = coupons_gc
						/*这里为了存放商品id ----结束*/
						item.good_price = (item.good_price).replace(/,/g, '')
						stoIdArr.push(item.store_id)
						// console.log(item)
						_this.totalnumber += item.good_num
						// console.log(item.good_freight)
						if (item.good_freight !== undefined) {
							// console.log(111)
							_this.totalprice += (item.good_price * item.good_num)
						} else {
							// console.log(2222)
							// console.log(item.good_price,item.good_num)
							_this.totalprice += item.good_price * item.good_num
							// console.log(_this.totalprice)
						}
						// console.log(item.way)
						if (item.way) {
							_this.way = 2
						} else {
							_this.way = 1
							// console.log(item.good_id)
							_this.ordergidlist += item.cart_id + ','
						}
						//这块的判断是不是新人  新人的话 就是1 否则就是0
						if (item.good_type == 'npt' || item.good_type == 1 || item.good_type == 'nlt') {
							_this.couplebooltext[0] = 1
							_this.good_type = item.good_type
							// console.log(_this.good_type)
						} else {
							_this.couplebooltext[0] = 0
						}
						if (item.share_code && item.share_from == 1) {
							//这是直播
							_this.share_code = item.share_code
							_this.share_from = 1
						} else if (item.share_code && item.share_from == 2) {

							//这是团长
							_this.share_code = item.share_code
							_this.share_from = 2
							// console.log(_this.share_code,_this.share_from,"这是团长进来的")
						} else if (item.activityType == 'activity') {
							_this.couplebooltext[0] = 2
						} else {
							// console.log("这是普通商品")
							_this.share_code = ""
							_this.share_from = ""
							_this.couplebooltext[0] = 0
						}
					})
					stoIdSet = ([...new Set(stoIdArr)])
					// console.log(stoIdSet,"22333")
					for (var i = 0; i < stoIdSet.length; i++) {
						let arr = []
						_this.orderinfolist.forEach((item, index) => {
							if (item.store_id == stoIdSet[i]) {
								arr.push(item.good_freight)
								// console.log(item.good_freight,i)
								// item.good_freight.sort(a,b)
							}
						})
						// console.log(arr)
						let arrayMax = arr.sort()
						// console.log(arrayMax[arrayMax.length-1],"排序")
						_this.mali += Number(arrayMax[arrayMax.length - 1])

					}
					// console.log(  _this.mali.toFixed(2) ,'最终的价格')
					_this.totalprice += Number(_this.mali)
					let arr = String(_this.totalprice).split('.')
					// console.log(arr)
					if (Boolean(arr[1])) {
						let strtow = arr[1].substr(0, 2)
						_this.totalprice = arr[0] + '.' + strtow
						// console.log(_this.totalprice,1111)
					} else {
						_this.totalprice = _this.totalprice
						// console.log(_this.totalprice,2222)
					}
					//这里处理优惠券的id
					// console.log(res.data[0])
					_this.limit_gcategory = res.data[0].limit_gcategory
					// console.log(_this.limit_gcategory)
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
		components: {
			actionbar,
			storecoupon,
			passkeyborad,
			wxbindopen
		},
		onShow() {
			// console.log("onsho先执行")
			const _this = this
			uni.getStorage({
				key: "bindtokey",
				success(res) {
					_this.tokey = res.data
				}
			})
			//取出openid 如果用户没绑定openid 就让用户绑定 如果用户绑定了  就让其引藏
			// #ifdef APP-PLUS
			_this.getopenid()
			// #endif
			let addresslength = ""
			uni.getStorage({
				key: "bindtokey",
				success(res) {
					// console.log(res)
					app.globalData.Detectionupdatetokey(res.data)
					uni.request({ //这个是获取一条收货地址的详情
						url: `${app.globalData.Requestpath}user/getShippingAddressList`,
						method: "POST",
						data: {
							token: res.data,
							page: 1,
							pageSize: 1,
						},
						success(reslove) {
							// console.log(reslove)
							_this.code = reslove.data.code
							if (reslove.data.code !== 0) {
								// console.log(333)
								_this.Username = ""
								_this.Userphone = ""
								_this.Userselect = "+手动添加收货地址"
							}
						}
					})
				},
				fail(err) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			})
		},
		created() {
			// console.log(111)
			const _this = this
			uni.getStorage({
				key: "bindtokey",
				success(res) {
					// console.log(res)
					app.globalData.Detectionupdatetokey(res.data)
					uni.request({ //这个是获取一条收货地址的详情
						url: `${app.globalData.Requestpath}user/getShippingAddressList`,
						method: "POST",
						data: {
							token: res.data,
							page: 1,
							pageSize: 1,
						},
						success(reslove) {
							// console.log(reslove)
							_this.code = reslove.data.code
							if (reslove.data.code !== 0) {
								// console.log(333)
								_this.Username = ""
								_this.Userphone = ""
								_this.Userselect = "+手动添加收货地址"
							}
						}
					})
				},
				fail(err) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	.Purchasepage {
		.Buycontent {
			padding: 0 20rpx;

			.Shippingaddress {
				display: flex;
				// align-items:center;
				background-color: #fff;
				padding: 30rpx 0;
				margin-top: 40rpx;
				border-radius: 16rpx;

				.Shippingaddress-left {
					display: flex;
					width: 20%;
					// height:50rpx;
					align-items: center;
					justify-content: center;

					// background-color:red;
					.imgs {
						width: 52%;
						height: 66rpx;

						// background-color:green;
						image {
							width: 100%;
							height: 100%;
							background-size: cover;
						}
					}
				}

				.Shippingaddress-right {
					width: 80%;

					// background-color:yellow;
					.Shippingaddress-right-title {
						display: flex;

						text {
							font-size: 32rpx;

							&:last-child {
								font-size: 28rpx;
								color: #ccc;
								margin-top: 10rpx;
							}
						}
					}

					.Receivingaddress {
						display: flex;
						align-items: center;
						justify-content: space-around;
						margin-top: 20rpx;

						.address {
							width: 90%;
							font-size: 28rpx;
						}

						text {
							font-size: 36rpx;
						}
					}
				}
			}
		}

		.purchase-order {
			margin-bottom: 120rpx;

			.order {
				background-color: #fff;
				margin-top: 44rpx;
				padding-left: 20rpx;
				border-radius: 16rpx;

				.order-title {
					font-size: 32rpx;
					padding: 20rpx 0;
					font-weight: bold;
				}

				.shopgoosorder {
					display: flex;
					justify-content: space-around;
					margin-top: 28rpx;

					.shopgoosorder-left {
						width: 30%;
						height: 200rpx;

						// background-color:yellow;
						image {
							width: 100%;
							height: 100%;
						}
					}

					.shopgoosorder-right {
						display: flex;
						justify-content: space-around;
						flex: 1;
						// background-color:red;
						padding-top: 10rpx;

						.shopgoosorder-title {
							overflow: hidden;
							width: 70%;
							// height: 76rpx;
							font-size: 28rpx;

							.shopgoosorder-title_text {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
							}
						}

						.shopgoosorder-pic {
							width: 30%;

							text {
								display: block;
								text-align: right;
								font-size: 30rpx;

								&:first-child {
									font-weight: bold;
								}

								&:last-child {
									font-size: 24rpx;
								}
							}
						}
					}
				}

				.Deliverynote {
					margin-top: 48rpx;

					textarea {
						width: 400rpx;
					}

					.distribution {
						display: flex;
						justify-content: space-around;
						font-size: 30rpx;
						line-height: 68rpx;

						.distribution-left {
							text {
								&:last-child {
									color: #999;
									margin-left: 20rpx;
								}
							}
						}

						.distribution-right {
							//为后期改
						}
					}

					.note {
						//为后期改
					}

					.Payprice {
						display: flex;
						justify-content: flex-end;
						font-size: 28rpx;
						line-height: 84rpx;

						text {
							display: block;
							text-align: right;
							margin-right: 10rpx;

							&:first-child {
								color: #999;
							}

							&:last-child {
								// color:#
								font-size: 34rpx;
								margin-right: 30rpx;
							}
						}
					}
				}
			}
		}

		.detailscar {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			left: 0;
			z-index: 1;
			background-color: #fff;

			.detailscar-pic {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				line-height: 100rpx;

				text {
					font-size: 35rpx;

					&:first-child {
						color: #999;
						font-size: 30rpx;
					}

					&:nth-child(3) {
						color: #ff4f00;
						margin-right: 20rpx;
					}
				}

				button {
					margin-right: 15rpx;
				}
			}
		}
	}

	.cu-modal-left-padding {
		padding: 0 20rpx;
	}

	// 新地址
	.TheordercolumnBox {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;

		.Theordercolumn {
			position: relative;
			width: 710rpx;
			// height: 200rpx;
			background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;

			.Theordercolumn_left {
				padding: 30rpx 30rpx 50rpx 30rpx;

				.message {
					font-size: 32rpx;
					font-weight: 500;
				}

				.dercophone {
					margin-left: 20rpx;
				}

				.dercolocationBox {
					display: flex;
					flex-wrap: wrap;
					flex-grow: 1;
					margin-top: 25rpx;
					line-height: 50rpx;

					.dercolocation-left {
						flex: 1;

						.dercolocation {
							flex-grow: 5;
							font-size: 38rpx;
							font-weight: 600;
						}
					}

					.dercolocation-right {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 10%;

						.cuIcon-right {
							font-size: 36rpx;
						}
					}
				}
			}

			.Theordercolumn_right {
				position: absolute;
				bottom: 0;
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				// height: 16rpx;
				padding-left: 10rpx;

				// background-color: #7b6fe3;
				.activeBox {
					display: flex;
					flex-wrap: nowrap;
				}

				.active {
					transform: skewX(-10deg);
					width: 35rpx;
					height: 10rpx;
				}

				.violet {
					background-color: #7b6fe3;
				}

				.white {
					background-color: #fff;
				}

				.red {
					background-color: #ef2950;
				}
			}
		}
	}
</style>
