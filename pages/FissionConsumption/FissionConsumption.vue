<template>
	<view class="FissionConsumption">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="明细"></actionbar>
		<view class="FissionConsumption_bottom">
			<view class="FissionConsumption_midden">
				<view class="FissionConsumption_nav">
					<scroll-view scroll-x class="bg-white nav bgnav" scroll-with-animation>
						<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in navlist" :key="index" @tap="tabSelect" :data-id="index">
							{{item}}
						</view>
					</scroll-view>
				</view>
				<view class="Invite_num" v-show="TabCur==0">
					<view class="Invite_item" v-for="(item,index) in Inviten" :key="index">
						<view class="Invite_item_left">
							<image class="name_img" :src="imgpath+item.user_pic"></image>
						</view>
						<view class="Invite_item_right">
							<view class="Invite_name">
								{{item.user_nick}}
							</view>
							<view class="Invite_item_time">
								注册时间:{{item.create_time}}
							</view>
						</view>
					</view>
				</view>
				<view class="exchange" v-show="TabCur==1">
					<view v-for="(item,index) in exchangelist" :key="index">
						<view class="shop_item" v-show="item.type==1">
							<view class="shop_left">
								<image :src="imgyuming+item.good_pic" class="imgs"></image>
							</view>
							<view class="shop_right">
								<view class="shop_name">
									{{item.good_name}}
								</view>
								<view class="shop_time">
									<view class="shop_time_left">
										兑换时间:{{item.create_time}}
									</view>
									<view class="shop_time-right">
										-{{item.gold_num}}
									</view>
								</view>
							</view>
						</view>
						<view class="coupons_item" v-show="item.type==2">
							<view class="coupons_top">
								<view class="coupons_items">
									<view class="coupons_left" :style="{'background-image':'url('+imgpath+'fission/coupons_bg.png'+')'}">
										<text class="moneyicon">¥</text>
										<text class="money">{{item.money}}</text>
									</view>
									<view class="coupons_right">
										<view class="coupons_title">
											<text v-show="Number(item.at_full)!==0.00">满</text>
											<text class="coupons_title-money">{{Number(item.at_full)!==0?item.at_full:`无门槛使用`}}</text>
											<text v-show="Number(item.at_full)!==0.00">使用</text>
										</view>
										<!-- <view class="coupons_time">
											使用时间:8.17-8.23
										</view> -->
									</view>
								</view>
							</view>
							<view class="coupons_bottom">
								<view class="coupons_bottom_time">
									兑换时间:{{item.create_time}}
								</view>
								<view class="coupons_bottom_num">
									-{{item.gold_num}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hint" v-if="TabCur==0 && Inviten.length <=0 || TabCur==1 && exchangelist.length <= 0">
			<text>{{TabCur==0?'暂无邀请人':'暂无明细'}}</text>
		</view>
		<!-- <hint :message="TabCur==0?'暂无人数':'暂无明细'" v-show="Inviten.length<=0"></hint> -->
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				TabCur:0,
				scrollLeft:0,
				navlist:[
					"邀请人数",
					"兑换明细"
				],
				imgpath:this.$store.state.httpUrl,
				imgyuming:this.$store.state.imgyuming,
				exchangepage:1,
				exchangelist:[],
				Invitenpage:1,
				Inviten:[],
				statusBar:0
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// console.log(this.TabCur)
				if(this.TabCur==1){
					this.getexchangelist()
				}else{
					this.getInvitenumber()
				}
			},
			//获取兑换列表
			getexchangelist(){
				const _this = this
				uni.getStorage({
					key:`bindtokey`,
					success(restokey){
						uni.request({
							url:`${app.globalData.Requestpath}activity/getUserRecordList`,
							method:"POST",
							data:{
								token:restokey.data,
								page:_this.exchangepage,
								pageSize:10
							},
							success(res) {
								// console.log(res)
								if(res.data.code==0){
									if(_this.exchangepage>1){
										_this.exchangelist = _this.exchangelist.concat(res.data.data.list)
									}else{
										_this.exchangelist = res.data.data.list
									}
									// console.log(_this.exchangelist)
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
			},
			//获取邀请的人数
			getInvitenumber(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(restoken){
						uni.request({
							url:`${app.globalData.Requestpath}user/getReferrerList`,
							method:"POST",
							data:{
								token:restoken.data,
								page:_this.Invitenpage,
								pageSize:10
							},
							success(res) {
								if(res.data.code==0){
									if(_this.Invitenpage>1){
										_this.Inviten =_this.Inviten.concat(res.data.data.list)
									}else{
										_this.Inviten = res.data.data.list
									}
									
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
			}
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			this.getexchangelist()
			this.getInvitenumber()
		},
		onReachBottom(){
			if(this.TabCur==0){
				this.Invitenpage++
				this.getInvitenumber()
			}else{
				this.exchangepage++
				this.getexchangelist()
			}
		}
	}
</script>

<style lang="less" scoped>
	.hint{
		height: 200rpx;
		line-height: 200rpx;
		font-size: 40rpx;
		text-align: center;
		color:#999999;
	}
	.FissionConsumption{
		.FissionConsumption_bottom{
			padding:0 20rpx;
			background-color:#fff;
			.FissionConsumption_midden{
				// height:100rpx;
				// background-color: green;
				.FissionConsumption_nav{
					.cu-item{
						width: 50%;
						height:72rpx;
						line-height:72rpx;
						text-align:center;
						font-weight: bold;
					}
				}
			}
			.Invite_num{
				.Invite_item{
					display:flex;
					padding: 20rpx 0;
					border-bottom:2rpx solid #000;
					margin-bottom: 16rpx;
					&:last-child{
						margin-bottom:0;
					}
					.Invite_item_left{
						width:140rpx;
						height:140rpx;
						// background-color:pink;
						border-radius:50%;
						.name_img{
							width: 100%;
							height:100%;
							border-radius:50%;
						}
					}
					.Invite_item_right{
						flex:1;
						// background-color: green;
						margin-left:20rpx;
						.Invite_name{
							margin:14rpx 0 42rpx;
						}
						.Invite_item_time{
							
						}
					}
				}
			}
			.exchange{
				.shop_item{
					display:flex;
					padding:20rpx 0;
					border-bottom:2rpx solid #000;
					margin-bottom:20rpx;
					&:last-child{
						margin-bottom:0;
					}
					.shop_left{
						width: 140rpx;
						height:140rpx;
						// background-color:deeppink;
						.imgs{
							width: 100%;
							height:100%;
						}
					}
					.shop_right{
						flex:1;
						// background-color: green;
						margin-left:20rpx;
						.shop_name{
							margin:14rpx 0 32rpx;
						}
						.shop_time{
							display:flex;
							justify-content: space-between;
							font-size: 28rpx;
							.shop_time_left{
								
							}
							.shop_time-right{
								color:red;
							}
						}
					}
				}
				.coupons_item{
					padding: 20rpx 0;
					border-bottom:2rpx solid #000;
					margin-bottom:20rpx;
					&:last-child{
						margin-bottom:0;
					}
					.coupons_top{
						.coupons_items{
							display: flex;
							width: 70%;
							background-color:#fff1bb;
							box-shadow: 2rpx 2rpx 10rpx #999;
							
							.coupons_left{
								display: flex;
								justify-content: center;
								align-items: center;
								width: 30%;
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
									margin:40rpx 0rpx;
									text{
										font-size: 34rpx;
										font-weight: bold;
									}
									.coupons_title-money{
										color:#a34f0a;
										
									}
								}
								.coupons_time{
									margin-bottom:20rpx;
									color:#757056;
								}
							}
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
						.coupons_bottom_num{
							width: 20%;
							color:red;
							text-align: right;
						}
					}
				}
			}
		}
	}
	.bgnav{
		background-color: #eee;
	}
</style>
