<template>
	<view class="shopoderbottom">
		<view class="shopoderbottomflex">
			<button class="cu-btn round line-grey" @tap="showModal" data-target="RadioModal">取消订单</button>
			<button class="cu-btn round line-orange" @tap="Notpayingdefaultpayment" data-target="bottomModal">付款</button>
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
		
		<passkeyborad
			:show="passwordzhifutanchuang"
			:isIphoneX="isIphoneX" 
			@close="close"
			:balancetext="(orderNotpaydefault*orderNotpaynums+Number(freightdata)).toFixed(2)"
			@Enterpasswordcompletepayment="Enterpasswordcompletepayment"
		></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue'
	const app = getApp()
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
					"支付宝",
					"余额"
				],
				passwordzhifutanchuang:false,//是否弹出输入支付密码弹窗
				isIphoneX:false,//Iphone全面屏系列底部适配
				zhifumimatext:""
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
				// console.log(e.detail.value)
				// console.log(this.radio)
			},
			//这是取消订单
			Confirmcancel(radiovalue){
				const _this = this
				console.log(radiovalue)
				//radiovalue获取到用户当前选择的
				//当用户选择完成 将用户选择的值发送给后台数据库
				//并通过子组件传值的方式 将上面的界面发生改变
				uni.request({
					url:`${app.globalData.Requestpath}order/unPayOrderToCancel`,
					method:"POST",
					data:{
						token:_this.tokey,
						o_sn:_this.ordersnSerialid
					},
					success(res) {
						if(res.data.code==0){
							//付款成功以后跳转到首页
								uni.reLaunch({
									url:"/pages/PersonalMy/PersonalMy"
								})
						}
					}
				})
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
				if(this.radioname=='radioname0'){//微信支付
					
				}else if(this.radioname=='radioname1'){//支付宝支付
					
				}else{//余额支付
					this.passwordzhifutanchuang = true
					this.isIphoneX = true
				}
			},
			close(e){//这是点击×以后
			console.log(e)
				this.passwordzhifutanchuang = e
				this.isIphoneX = e
			},
			//当用户输入密码的时候
			Enterpasswordcompletepayment(e){//这是用户输入的密码
				const _this = this
				this.zhifumimatext = e
				let arr = []
				//因为传过去的后台数据只能数组形式
				arr[0] = this.ordersnSerialid
				//当用户输入完执行下面的请求 密码正确
				uni.request({
					url:`${app.globalData.Requestpath}balance_pay/payOrdersNew`,
					method:"POST",
					data:{
						token:this.tokey,
						o_sns:arr,
						pay_password:e
					},
					success(res) {
						console.log(res)
						console.log(_this.ordersnSerialid)
						if(res.data.code==0){
							uni.reLaunch({
								url:"/pages/Paysuccess/Paysuccess"
							})
						}else{
							app.globalData.showtoastsame(res.data.msg)
						}
					}
				})
			},
		},
		props:["tokey","ordersnSerialid","orderNotpaydefault","orderNotpaynums","freightdata"],
		components:{
			passkeyborad,
		}
	}
</script>

<style lang="less" scoped>
	.shopoderbottom{
		position:fixed;
		bottom:0;
		left:0;
		width: 100%;
		background-color: #fff;
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
