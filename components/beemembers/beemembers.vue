<template>
	<view>
		<!--  -->
		<view class="LittlebeeWindow" v-if="vipbool==0 && loadbool==true">
			<view class="Window_top" :style="{'background-image':'url('+this.$store.state.httpUrl+'littlebee/mifengbg.png'+')'}">
				<view class="close">
					<text class="lg text-gray cuIcon-close" @tap="close"></text>
				</view>
			</view>
			<view class="Window_bottom">
				<button 
					class="cu-btn bg-red round" 
					v-for="(item,index) in viplist"
					:key="index"
					:data-indexs="index"
					@tap="VipPay"
				>{{item.name}}</button>
			</view>
		</view>
		<loading v-if="loadbool==false"></loading>
	</view>
	
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				viplist:[
					{
						name:'年VIP',
						value:369
					},
					{
						name:'终身VIP',
						value:3690
					}
				], 
				vipbool:0,
				indexs:0,
				// bool:true 
				loadbool:false
			}
		},
		methods:{
			VipPay(e){
				let {indexs} = e.currentTarget.dataset
				// console.log(indexs)
				let total = this.viplist[indexs].value.toFixed(2)
				// console.log(total)
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
				// console.log(this.field)
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}pay/wechatpay`,
					method:"POST",
					data:{
						pay_type:2,
						total:total
					},
					success(resgetpay) {
						// console.log(resgetpay)
						if(resgetpay.statusCode==200){
							let {appid,noncestr,partnerid,prepayid,timestamp,sign,order_sn,bill,out_trade_no} = resgetpay.data
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
									// console.log("支付成功")
									
									//只要支付成功的时候  就申请团长
									uni.getStorage({
										key:"bindtokey",
										success(restokey) {
											// console.log(out_trade_no,restokey.data,1111)
											uni.request({
												url:`${app.globalData.Requestpath}notify/wechatpaymember`,
												method:"POST",
												data:{
													out_trade_no:out_trade_no,
													token:restokey.data,
													type:num
												},
												success(respaymember) {
													// console.log(respaymember,222222)
													if(respaymember.data.code==0){
														//开通会员
														uni.request({
															url:`${app.globalData.Requestpath}user/setstatus`,
															method:"POST",
															data:{
																token:restokey.data,
																type:num
															},
															success(res){
																// console.log(res)
																if(res.data.code==0){
																	uni.getStorage({
																		key:"bindtokey",
																		success(restokeys) {
																			// console.log(restokeys.data)
																			uni.request({
																				url:`${app.globalData.Requestpath}CmsSettlement/getcommission`,
																				method:"POST",
																				data:{
																					token:restokeys.data
																				},
																				success(res) {
																					// console.log(restokey.data,"token")
																					// console.log(res,99999)
																				},
																			})
																			}
																		})
																	//这是申请团长
																	if(_this.field=="groupinformation"){
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
																						data:num,
																						success(resVip) {
																							_this.vipbool = num
																							
																						}
																					})
																				}
																			}
																		})
																	}else{
																		uni.setStorage({
																			key:"beesVip",
																			data:num,
																			success(resVip) {
																				// _this.$watch('num',)
																				_this.vipbool = num
																				
																			}
																		})
																	}
																	//接着 分配佣金接口
																	// console.log(restokey.data,5555)
																	
																}
															}
														})
													}
												}
											})
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
			},
			close(){
				// this.bool = false
				// uni.redirectTo({
				// 	url: '/pages/PersonalMy/PersonalMy'
				// });
				uni.navigateBack()
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:'beesVip',
				success(resVip) {
					// _this.vipbool = resVip.data
					_this.loadbool = true
				}
			})
		},
		props:['field',"vipbool"]
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
			height: 100%;
			width: 100%;
			background-size: 100% 100%;
			// background-color: yellow;
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
			height: 13%;
			width: 100%;
			line-height: 160rpx;
			background-color: #fd4c54;
			display: flex;
			justify-content: space-around;
			button{
				margin-top: 48rpx;
			}
		}
	}
</style>
