<template>
	<view class="exchangecoupons">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="兑换优惠券"></actionbar>
		<view class="exchangecoupons_title">
			<view class="exchangecoupons_text">
				可消耗金币{{gold}}个
			</view>
		</view>
		<view class="">
			<view class="coupons_item" v-for="(item,index) in couponslist" :key="index">
				<view class="coupons_top">
					<view class="coupons_items">
						<view class="coupons_left" :style="{'background-image':'url('+imgpath+'fission/coupons_bg.png'+')'}">
							<text class="moneyicon">¥</text>
							<text class="money">{{item.money}}</text>
						</view>
						<view class="coupons_right">
							<view class="coupons_title">
								<text v-show="item.at_full!==0">满</text>
								<text class="coupons_title-money">{{item.at_full!==0?item.at_full:'无门槛使用'}}</text>
								<text v-show="item.at_full!==0">使用</text>
							</view>
							<!-- <view class="coupons_time">
								使用时间:8.17-8.23
							</view> -->
						</view>
					</view>
					<view 
						class="btnexchang"
						@tap="receiveCoupons"
						:data-cid="item.coupon_type_id"
						:data-cname="item.coupon_name"
						:data-people_num="item.people_num"
						:data-money="item.money"
					>
						兑换
					</view>
				</view>
				<view class="coupons_bottom">
					<view class="coupons_bottom_time">
						(消耗{{item.people_num}}个金币兑换) 
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				imgpath:this.$store.state.httpUrl,
				gold:0,
				couponspage:1,
				couponslist:[],
				statusBar:0
			}
		},
		methods: {
			getGoldBoxList(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}activity/getGoldBoxList`,
					method:"POST",
					data:{
						page:_this.couponspage,
						pageSize:10
					},
					success(rescoupons) {
						// console.log(rescoupons)
						if(rescoupons.data.code==0){
							if(_this.couponspage>1){
								_this.couponslist = _this.couponslist.concat(rescoupons.data.data.list)
							}else{
								_this.couponslist = rescoupons.data.data.list
							}
						}
					}
				})
			},
			receiveCoupons(e){
				const _this = this 
				// console.log(e)
				let {cid,cname,people_num,money} = e.currentTarget.dataset
				if(Number(_this.gold)>=Number(money)){
					uni.getStorage({
						key:'bindtokey',
						success(restoken){
							app.globalData.Detectionupdatetokey(restoken.data)
							uni.showModal({
								title:"您确定要兑换此优惠券",
								content:"领取了将扣除相应金币",
								showCancel:true,
								cancelText:"取消",
								cancelColor:"#f00",
								confirmText:"确定",
								confirmColor:"#0f0",
								success(resbtn) {
									if(resbtn.confirm){
										uni.request({
											url:`${app.globalData.Requestpath}activity/userGetGoldBoxCoupon`,
											method:"POST",
											data:{
												token:restoken.data,
												cid,
											},
											success(res) {
												// console.log(res)
												if(res.data.code==0){
													app.globalData.showtoastsame(res.data.msg)
													uni.request({
														url:`${app.globalData.Requestpath}activity/addUserRecord`,
														method:"POST",
														data:{
															token:restoken.data,
															coupon_id:cid,
															coupon_name:cname,
															type:2,
															gold_num:people_num
														},
														success(resadd) {
															if(resadd.data.code==0){
																uni.setStorage({
																	key:"Fission_Gold",
																	data:resadd.data.data.new_gold,
																	success() {
																		_this.gold = resadd.data.data.new_gold
																	}
																})
															}
														}
													})
												}else{
													app.globalData.showtoastsame(res.data.msg)
												}
											}
										})
									}
								}
							})
						},
						fail(err){
							uni.navigateTo({
								url:`/pages/login/login`
							})
						}
					})
				}else{
					app.globalData.showtoastsame("当前的金币数量无法兑换")
				}
			}
		},
		components:{
			actionbar
		},
		created() {
			const _this = this
			_this.getGoldBoxList()
			uni.getStorage({
				key:`Fission_Gold`,
				success(resGold){
					// console.log(resinvitation)
					_this.gold = resGold.data
				}
			})
		},
		onReachBottom(){
			this.couponspage++
			this.getGoldBoxList()
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.exchangecoupons{
		background-color: #fff;
		.exchangecoupons_title{
			display:flex;
			justify-content: center;
			.exchangecoupons_text{
				text-align:center;
				// width: 50%;
				border:2rpx solid #ccc;
				padding:8rpx 40rpx;
				border-radius:30rpx;
			}
		}
		.coupons_item{
			padding: 20rpx 12rpx;
			border-bottom:2rpx solid #999;
			margin-bottom:20rpx;
			&:last-child{
				margin-bottom:0;
			}
			.coupons_top{
				display:flex;
				justify-content: space-between;
				.coupons_items{
					display: flex;
					width:60%;
					background-color:#fff1bb;
					box-shadow: 2rpx 2rpx 10rpx #999;
					
					.coupons_left{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 40%;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						color:#fff;
						.moneyicon{
							// margin:0rpx 0rpx;
							margin:8rpx 6rpx 0 0;
						}
						.money{
							font-size: 40rpx;
							font-weight: bold;
						}
					}
					.coupons_right{
						flex:1;
						// background-color: green;
						margin-left:20rpx;
						.coupons_title{
							// margin:20rpx 0rpx 0;
							padding:36rpx 0rpx;
							text{
								font-size: 34rpx;
								font-weight: bold;
							}
							.coupons_title-money{
								color:#a34f0a;
								
							}
						}
						// .coupons_time{
						// 	margin-bottom:20rpx;
						// 	color:#757056;
						// }
					}
				}
				.btnexchang{
					display: flex;
					align-items: center;
					// width: 100rpx;
					// height:100rpx;
					background-color: rgb(255,175,60);
					font-size: 36rpx;
					color:#fff;
					font-weight: bold;
					padding:0rpx 28rpx;
					border-radius:50%;
				}
			}
			.coupons_bottom{
				display: flex;
				justify-content: space-between;
				margin-top:20rpx;
				font-size: 28rpx;
				.coupons_bottom_time{
					flex:1;
					text-align:center;
				}
			}
		}
	}
</style>
