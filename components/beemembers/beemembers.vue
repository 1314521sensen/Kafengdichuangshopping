<template>
	<view class="LittlebeeWindow" v-if="vipbool==0">
		<view class="Window_top">
			<view class="close">
				<text class="lg text-gray cuIcon-close" @tap="close"></text>
			</view>
		</view>
		<view class="Window_bottom">
			<button 
				class="cu-btn bg-yellow round" 
				v-for="(item,index) in viplist"
				:key="index"
				:data-indexs="index"
				@tap="VipPay"
			>{{item.name}}</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				viplist:[
					{
						name:'充值VIP',
						value:369
					},
					{
						name:'充值年费VIP',
						value:3690
					}
				],
				vipbool:0,
				indexs:0,
				// bool:true
			}
		},
		methods:{
			VipPay(e){
				let {indexs} = e.currentTarget.dataset
				// console.log(indexs)
				let total = this.viplist[indexs].value.toFixed(2)
				console.log(total)
				if(indexs==0){
					//点击了vip
					this.getwxplay(total,1)
				}else{
					//点击了svip
					this.getwxplay(total,2)
				}
			},
			//封装个支付
			getwxplay(total,num){
				uni.request({
					url:`${app.globalData.Requestpath}pay/wechatpay`,
					method:"POST",
					data:{
						pay_type:2,
						total:total
					},
					success(resgetpay) {
						
						if(resgetpay.statusCode==200){
							// console.log(resgetpay)
							let {appid,noncestr,partnerid,prepayid,timestamp,sign,order_sn,bill} = resgetpay.data
							let packages = resgetpay.data.package
							let payobj = {
								appid,
								noncestr,
								package:packages,
								partnerid,
								prepayid,
								timestamp,
								sign
							}
							// console.log(payobj)
							uni.requestPayment({
								provider:'wxpay',
								orderInfo:payobj,
								success(res) {
									console.log("支付成功")
									//只要支付成功的时候  就申请团长
									uni.getStorage({
										key:"bindtokey",
										success(restokey) {
											uni.request({
												url:`${app.globalData.Requestpath}user/isCommander`,
												method:"POST",
												data:{
													token:restokey.data
												},
												success(res) {
													if(res.code==0){
														//当用户支付成功了  判断用户是点击了年费还是终身 年费---1  终身----2
														uni.setStorage({
															key:"beesVip",
															data:num
														})
													}
												}
											})
											
										}
									})
								},
								fail(err){
									console.log(err)
								}
							})
						}
					}
				})
			},
			close(){
				// this.bool = false
				uni.switchTab({
					url: '/pages/PersonalMy/PersonalMy'
				});
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:'beesVip',
				success(resVip) {
					_this.vipbool = resVip.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.LittlebeeWindow{
		width: 100%;
		height: 100%;
		padding: 200rpx 80rpx;
		position: absolute;
		top: 0;
		z-index: 999;
		background-color:rgba(0,0,0,.5);
		.Window_top{
			height: 80%;
			width: 100%;
			background-color: yellow;
			.close{
				display: flex;
				flex-direction: row-reverse;
				text{
					font-size: 60rpx;
					color:#fff;
				}
			}
		}
		.Window_bottom{
			height: 20%;
			width: 100%;
			line-height: 160rpx;
			background-color: blue;
			display: flex;
			justify-content: space-around;
			button{
				margin-top: 48rpx;
			}
		}
	}
</style>
