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
			<view class="order">
				<view class="order-title">
					{{storename}}
				</view>
				<view class="shopgoosorder">
					<view class="shopgoosorder-left">
						<image :src="'http://hbk.huiboke.com'+img"></image>
					</view>
					<view class="shopgoosorder-right">
						<view class="shopgoosorder-title">
							{{goodtitle}}
						</view>
						<view class="shopgoosorder-pic">
							<text>¥{{price}}</text>
							<text>×{{nums}}</text>
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
							<text>快递免邮</text>
						</view>
					</view>
					<!-- 这是优惠券的组件 -->
					<storecoupon 
						msg="使用" 
						titlemsg="使用优惠券" 
						:tokey="tokey" 
						:storeid="storeid" 
						Whatcoupon="1" 
						:Orderpaymentamount="this.price*this.nums"
						@dingdancoupon="dingdancoupon"
					></storecoupon>
					<view class="distribution note">
						<view class="cu-form-group">
							<view class="title">订单备注</view>
							<input placeholder="选填,请先和商家协商一致" name="input" v-model="value"></input>
						</view>
					</view>
					<view class="Payprice">
						<text>共{{nums}}件</text>
						<text>小计:</text>
						<!-- Favorablebalance优惠卷的面额 有值的时候采用有值 没值的时候采用0 -->
						<text class="text-yellow" v-text="'¥'+((price*nums)-(Favorablebalance?Favorablebalance:0))"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="detailscar">
			<view class="detailscar-pic">
				<text>共{{nums}}件,</text>
				<text>合计</text>
				<text v-text="'¥'+((price*nums)-(Favorablebalance?Favorablebalance:0)).toFixed(2)"></text>
				<!-- @tap="priceorder" -->
				<button class="cu-btn round bg-orange" @tap="showModal" data-target="bottomModal">提交订单</button>
			</view>
		</view>
		<!-- 底部弹出框 框里面嵌套单选-->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="Determinepayment">确定支付</view>
					<view class="action text-blue" @tap="hideModal">取消支付</view>
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
	</view>
</template>

<script>
	//引入顶部导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//引入优惠券
	import storecoupon from "@/components/Details/storecoupon.vue"
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
				Userphone:0,
				Userselect:"",
				tokey:0,
				coupondetails:[],
				Favorablebalance:""
			}
		},
		methods: {
			priceorder(){
				//为了小程序考虑只能这样写了
				uni.getStorage({
					key:"bindtokey",
					success:(res)=>{
						 // console.log(res.data,this.gid,this.nums,this.data,this.o_from,this.value)
						if(this.way==1){
							console.log("从pc")
							uni.request({
								url:"http://hbk.huiboke.com/api/order/createUnPayOrderInfo",
								method:"POST",
								data:{
									token:res.data,
									gid:this.gid,
									spec:this.data,
									quantity:this.nums,
									o_from:this.o_from,
									address_id:52,
									p_msg:this.value
								},
								success(reslove) {
									// console.log(reslove.data.code)
									if(reslove.data.code==0){
										console.log(reslove)
									}else{//如果成功以后弹出提示框
										console.log(111)
									}
								}
							})
						}else if(this.way==2){
							console.log("从手机过来的过来的")
						}else{
							console.log("从小程序过来的")
						}
					}
				})
			},
			RadioChange(e) {
				this.radio = e.detail.value
				// console.log(e.detail.value)
				// console.log(this.radio)
			},
			Addressmodification(){
				uni.navigateTo({
					url:`/pages/addressTo/addressTo?title=orderaddress&gid=${this.gid}&specname=${JSON.stringify(this.data)}&num=${this.nums}&way=1&img=${JSON.stringify(this.img)}&storename=${this.storename}&goodtitle=${this.goodtitle}&price=${this.price}&storeid=${this.storeid}`
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Determinepayment(){
				console.log(this.radio)
				
			},
			//这是用来接收子组件传过来的订单数据
			dingdancoupon(e){
				// console.log(e)
				this.Favorablebalance = e.money
				this.coupondetails[0] = e
			}
		},
		onLoad(opction){
			if(opction.selectitem){
				let {consignee_name,consignee_phone,street_number} = JSON.parse(opction.selectitem)
				this.Username = consignee_name
				this.Userphone = consignee_phone
				this.Userselect = street_number
			}else{
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						uni.request({
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
								}
							}
						})
					}
				})
			}
			let {gid,num,way,img,storename,price,goodtitle,storeid} = opction
			// console.log(storeid)
			this.gid = gid
			this.way = way
			this.img = JSON.parse(img)
			this.nums = num
			this.storename = storename
			this.price = price
			this.goodtitle = goodtitle
			this.storeid = storeid
			//使用eval方法 将字符串数组 转换为 真数组
			this.data = eval(opction.specname)
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
			storecoupon
		},
		onShow() {
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
</style>
