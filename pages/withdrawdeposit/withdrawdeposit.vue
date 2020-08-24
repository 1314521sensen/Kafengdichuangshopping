<template>
	<view>
		
		<!-- 提现 ，当前佣金等 -->
		<view class="witder" :style="{'background-image': 'url(/static/headearning/Headwithdrawal.png)','padding-top':statusBar+'rpx'}">
			<actionbar bg='false' message='提现' textcolor='#fff' url="/pages/headearnings/headearnings" :Jumpchoose="true"></actionbar>
			<view class="particular">
				<!-- 金额  -->
				<view class="par_price">{{user_commission}}</view>
				<view class="current_price">当前佣金</view>
				<view class="withdraw"  @tap="withdrawal">去提现</view>
			</view>
		</view>
		<!-- 提现明细 -->
		<!-- <view class="withdrawalSubsidiary">
			<view class="moneyBox">
				<scroll-view :scroll-y="true" :style="{'height':70+'vh'}">
					<view class="scroll-view-item">
						<view class="tit">提现明细</view>
							<view class="money" v-for="(item,index) in 30" :key="index">
								<text>2020.10.10 <text>20:20</text></text>
								<view>+2000.00</view>
							</view>
						</view>
				</scroll-view>
			</view>
		</view> -->
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from '@/components/actionbar/actionbar'
	export default {
		data() {  
			return {
				statusBar:0,
				user_commission:0
			}
		},
		methods: {
			withdrawal(){
				const _this = this
				if(parseInt(_this.user_commission)!==0){
					uni.getStorage({
						key:"bindtokey",
						success(res){
							uni.request({
								url:`${app.globalData.Requestpath}user/commission_withdrawal_balance`,
								method:"POST",
								data:{
									token:res.data
								},
								success(res){
									if(res.data.code==0){
										_this.user_commission = 0
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							})
						}
					})
				}else{
					app.globalData.showtoastsame("目前余额,无法提现")
				}
			}
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			 // this.indexshoplist(this.page)
			 uni.getStorage({
				 key:"user_commission",
				 success(res){
					 // _this.user_commission = res.data
					 _this.user_commission = res.data
				 }
			 })
		}
	}
</script>

<style lang="less" scoped>
	// 提现，佣金等
	.witder{
		height: 350rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.particular{
			display: flex;
			display: 1;
			flex-direction: column;	
			align-items: center;
			margin-top: 20rpx;
			color: #fff;
			.par_price{
				font-size: 42rpx;
			}
			.current_price{
				margin:15rpx 0 30rpx 0;
			}
			.withdraw{
				color: #fa964c;
				background-color: #fff;
				padding: 5rpx 50rpx;
				border-radius: 30rpx;
				font-size: 34rpx;
			}
		}
	}
	// 提现明细
	.withdrawalSubsidiary{
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		.moneyBox{
			overflow: hidden;
			min-height: 800rpx;
			border-radius: 15rpx;
			width: 690rpx;
			height:70vh;
			background-color: #fff;
			.tit{
				padding: 20rpx 20rpx;
				color: #b6b6b6;
				border-bottom: 1px solid #ebebeb;
			}
			.money{
				display: flex;
				justify-content: space-between;
				padding: 14rpx 20rpx;
				border-bottom: 1px solid #ebebeb;
			}
			
		}
	}
   
</style>
