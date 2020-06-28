<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="balance" style="background-image: url(/static/balance/1.png);">
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
					<button class="cu-btn bg-red margin-tb-sm lg">充值 </button>
					<button class="cu-btn bg-red margin-tb-sm lg">提现 </button>
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
	</view>
</template>

<script>
	//引顶部返回组件
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:"",
				accounttext:"",
				accountlist:[],
				page:1
			}
		},
		methods:{
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
		components:[
			actionbar
		],
	}
</script>

<style lang="less">
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
				font-size: 18rpx;
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
