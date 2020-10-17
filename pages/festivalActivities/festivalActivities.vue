<template>
	<view class="festivalActivities" :style="{'padding-top':statusBar+'px'}">
		<!--  v-show="loadingbool" -->
		<view class="scroll-view">
		<!-- <view class="scroll-view"> :scroll-y="true" @scrolltolower="shopscrolltolower"-->
			<view class="festivalActivities_top" :style="{'background-image':'url('+imgpath+'festivalactivities/lantern_project.png'+')'}">
				<view class="festivalActivities_top_midden">
					<view class="festivalActivities_top_middens">
						<!-- :muted="true"
								:autoplay="true"
								:loop="true"
								play-btn-position="center" -->
						<!-- <cover-view style="background-color:green;" class="videofill"> -->
							<video 
								:src="shopimgpath+'/uploads/video/zq.mp4'" 
								id="myVideo"
								class="video"
								:muted="false"
								:autoplay="true"
								:loop="true"
								:show-mute-btn="true"
								play-btn-position="center"
							>
							</video>
						<!-- </cover-view> -->
					</view>
					<view class="festivalActivities_icon_title">
						<view 
							class="item" 
							:style="{'background-image':'url('+imgpath+'festivalactivities/lantern.png'+')'}"
							v-for="(item,index) in festivalActivitiesTitlelist"
							:key="index"
						>
						{{item}}
						</view>
					</view>
				</view>
			</view>
			
			<scroll-view class="festivalActivities_coupons" 
				:scroll-x="true" 
				@scrolltolower="couponsscrolltolower"
			>
				<view :style="{width:coupons_list.length>3?(26*coupons_list.length+22)+'%':'100%'}">
					<view class="festivalActivities_coupons_list">
						<view class="coupons_item">
							<!-- coupons_list -->
							<view class="item_midden" v-for="(item,index) in coupons_list" :key="index">
								<view 
									class="coupons_bottom_view" 
									:style="{'background-image':'url('+imgpath+'festivalactivities/coupons_bg.png'+')'}"
								>
									<text 
										class="coupons_receive" 
										@tap="receivecoupons"
										:data-ids="item.coupon_type_id"
									>
									<!--  -->
										立即领取
									</text>
								</view>
								<view class="coupons_taking">
									<view class="coupons_taking_midden">
										<view class="coupons_taking_amount">
											<text class="amount_icon">
												¥
											</text>
											<text class="amount_num">
												{{item.money}}
											</text>
										</view>
										<view class="Full_reduction">
											<view class="Full_reduction_text">
												{{Number(item.at_full)==0?'无门槛使用':`满${item.at_full}元减`}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="shoplist">
				<view class="shoplist_midden">
					<view class="shoplist_item" v-for="(item,index) in shoplist" :key="index">
						<view 
							class="item_top" 
							:style="{'background-image':'url('+imgpath+'festivalactivities/shopbg.png'+')'}"
							@tap="shopdefail"
							:data-sid="item[0].store_id"
							:data-gid="item[0].good_id"
						>
							<view class="item_top_left_img">
								<image class="imgs" :src="shopimgpath+item[0].good_pic"></image>
							</view>
							<view class="item_top_right_text">
								<view class="shopTitle">
									{{item[0].good_title}}
								</view>
								<view class="shopsubTitle">
									<text v-show="item[0].good_sub_title!==''">{{item[0].good_sub_title}}</text>
								</view>
								<view class="Activity_price">
									<view class="price_text">
										<view class="Activity_price_left">
											活动价:
											<text class="price">{{item[0].good_promotion_price}}</text>
										</view>
										<view class="Activity_price_right">
											<text class="btn">立即抢购</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="item_bottom">
							<view 
								class="item_items" 
								@tap="shopdefail"
								:data-sid="item[1].store_id"
								:data-gid="item[1].good_id"
							>
								<view class="items_top_imgs" :style="{'background-image':'url('+imgpath+'festivalactivities/shopbg.png'+')'}">
									<image class="items_imgs" :src="shopimgpath+item[1].good_pic"></image>
								</view>
								<view class="items_bottom_price">
									<view class="price_text">
										<view class="Activity_price_left">
											活动价:
											<text class="price">{{item[1].good_promotion_price}}</text>
										</view>
										<view class="Activity_price_right">
											<text class="btn">立即抢购</text>
										</view>
									</view>
								</view>
							</view>
							<view 
								class="item_items"
								@tap="shopdefail"
								:data-sid="item[2].store_id"
								:data-gid="item[2].good_id"
							>
								<view class="items_top_imgs" :style="{'background-image':'url('+imgpath+'festivalactivities/shopbg.png'+')'}">
									<image class="items_imgs" :src="shopimgpath+item[2].good_pic"></image>
								</view>
								<view class="items_bottom_price">
									<view class="price_text">
										<view class="Activity_price_left">
											活动价:
											<text class="price">{{item[2].good_promotion_price}}</text>
										</view>
										<view class="Activity_price_right">
											<text class="btn">立即抢购</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- </view> -->
		<defaultbgblackcolorwhitebar></defaultbgblackcolorwhitebar>
		<!-- <loading v-show="loadingbool==false"></loading> -->
	</view>
</template>

<script>
	import defaultbgblackcolorwhitebar from "@/components/actionbar/defaultbgblackcolorwhitebar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				festivalActivitiesTitlelist:["中","秋","献","礼"],
				imgpath:this.$store.state.httpUrl,
				shopimgpath:this.$store.state.imgyuming,
				coupons_list:[],
				Couponpage:1,
				statusBar:0,
				shoplistpage:1,
				shoplist:[],
				loadingbool:false
			}
		},
		methods: {
			//用户领取优惠券
			receivecoupons(e){
				const _this = this
				// console.log(e.currentTarget.dataset)
				let {ids} = e.currentTarget.dataset
				uni.getStorage({
					key:"bindtokey",
					success(restoken){
						app.globalData.Detectionupdatetokey(restoken.data)
						uni.request({
							url:`${app.globalData.Requestpath}activity/userGetMidAutumnCoupon`,
							method:"POST",
							data:{
								token:restoken.data,
								cid:ids
							},
							success(res){
								if(res.data.code==0){
									app.globalData.showtoastsame("领取成功")
								}else{
									if(res.data.code==1 && res.data.msg=="令牌错误"){
										app.globalData.showtoastsame("请登录领取")
									}else{
										app.globalData.showtoastsame(res.data.msg)
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
			},
			//获取优惠券列表
			getCouponTypeList(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}activity/getMidAutumnCouponTypeList`,
					method:"POST",
					data:{
						page:_this.Couponpage,
						pageSize:5
					},
					success(res){
						// console.log(res)
						if(res.data.code==0){
							if(_this.Couponpage > 1){
								_this.coupons_list = _this.coupons_list.concat(res.data.data.list)
							}else{
								_this.coupons_list = res.data.data.list
								
							}
						}
					}
				})
			},
			getshoplist(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}activity/getMidAutumnGoodsList`,
					data:{
						page:_this.shoplistpage,
						pageSize:6
					},
					success(res) {
						if(res.data.code==0){
							_this.loadingbool = true
							if(_this.shoplistpage>1){
								_this.shoplist = _this.shoplist.concat(res.data.data.list)
							}else{
								_this.shoplist = res.data.data.list
							}
						}
					}
				})
			},
			//当用户滑动到右边 
			couponsscrolltolower(){
				this.Couponpage++
				this.getCouponTypeList()
			},
			//当用户滚动到底部的时候
			shopscrolltolower(){
				this.shoplistpage++
				this.getshoplist()
			},
			//当点击每个商品的时候
			shopdefail(e){
				// console.log(111)
				let {sid,gid} = e.currentTarget.dataset
				// console.log(sid)
				uni.navigateTo({
					url:`/pages/Details/Details?id=${gid}&storeid=${sid}&activityType=activity`
				})
			}
		},
		components:{
			defaultbgblackcolorwhitebar
		},
		created(){
			const _this = this
			//请求优惠券
			_this.getCouponTypeList()
			_this.getshoplist()
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onReachBottom(){
			this.shopscrolltolower()
		},
		onHide(){
			this.videoContext.stop()
		},
	}
</script>

<style lang="less" scoped>
	.festivalActivities{
		// height:100vh;
		background-color: rgb(255,73,73);
		// overflow: hidden;
		.scroll-view{
			// height:100vh;
			overflow: hidden;
			.festivalActivities_top{
				height:464rpx;
				// background-color: green;
				background-repeat: no-repeat;
				background-size: 100% 86%;
				.festivalActivities_top_midden{
					position: relative;
					height:100%;
					.festivalActivities_top_middens{
						position: absolute;
						top:208rpx;
						left:16%;
						width:65%;
						height:256rpx;
						// background-color:pink;
						border:5rpx solid #f6eaa3;
						z-index:3;
						.videofill{
							// position: relative;
							width: 100%;
							height:100%;
						}
						.video{
							position:static;
							// top:0;
							// left:0;
							width: 100%;
							height:100%;
							// background-color:pink;
						}
					}
					.festivalActivities_icon_title{
						display:flex;
						justify-content: space-around;
						position: absolute;
						bottom:-207rpx;
						left:16%;
						width: 65%;
						// background-color: blue;
						// height:30rpx;
						.item{
							// background-color:green;
							height:208rpx;
							width: 18%;
							background-size: 100% 100%;
							background-repeat: no-repeat;
							text-align:center;
							line-height:208rpx;
							color:#ffdca6;
							font-weight: bold;
							font-size: 32rpx;
						}
					}
				}
			}
			.festivalActivities_coupons{
				// background-color:green;
				overflow: visible;
				margin-top:260rpx;
				padding:0 20rpx;
				// padding: 0 20rpx;
				.festivalActivities_coupons_list{
					// background-color: pink;
					.coupons_item{
						display:flex;
						padding-top:86rpx;
						.item_midden{
							position: relative;
							width: 26%;
							height:190rpx;
							background-color:#c40e20;
							border:2rpx solid #faa07f;
							border-bottom:0;
							border-radius:10rpx 10rpx 0 0;
							margin-right:24rpx;
							&:last-child{
								margin-right:0;
							}
							.coupons_bottom_view{
								display: flex;
								justify-content: center;
								align-items: center;
								position: absolute;
								bottom:0;
								left:0;
								width: 100%;
								height:100rpx;
								// background-color:#c40e20;
								// border-top:2rpx solid #ea9a7c;
								background-repeat: no-repeat;
								background-size: 100% 100%;
								.coupons_receive{
									// background-color:yellow;
									padding:6rpx 20rpx;
									border-radius:34rpx;
									font-size: 28rpx;
									font-weight: bold;
									background-color:#fedca9;
									margin-top:10rpx;
									color:#be1726;
									// line-height:1;
								}
							}
							.coupons_taking{
								padding:0 10rpx;
								margin-top:-84rpx;
								.coupons_taking_midden{
									background-color: #fbe0c2;
									color:#bc041b;
									padding-bottom:80rpx;
									border-radius:12rpx 12rpx 0 0;
									.coupons_taking_amount{
										display:flex;
										justify-content: center;
										margin-bottom:10rpx;
										padding-top:20rpx;
										.amount_icon{
											font-size: 24rpx;
										}
										.amount_num{
											display:inline-block;
											font-weight: bold;
											font-size:40rpx;
											vertical-align: top;
											margin:6rpx 0 0 6rpx;
										}
									}
									.Full_reduction{
										display:flex;
										justify-content: center;
										padding:0 10rpx;
										font-size:28rpx;
										font-weight: bold;
										.Full_reduction_text{
											border:2rpx solid #bc041b;
											border-left:0;
											border-right:0;
											padding:10rpx 0 5rpx;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		.shoplist{
			margin-top:40rpx;
			padding:0 20rpx 20rpx;
			.shoplist_midden{
				// background-color:green;
				.shoplist_item{
					border:4rpx solid #f8eeb7;
					background-color: #df1016;
					padding:20rpx 10rpx;
					margin-bottom:20rpx;
					&:last-child{
						margin-bottom:0;
					}
					// height:100rpx;
					.item_top{
						display:flex;
						justify-content: space-between;
						// background-color: green;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						padding:20rpx 10rpx;
						.item_top_left_img{
							width:36%;
							// height:200rpx;
							// border:2rpx solid #f8eeb7;//这最后去掉
							.imgs{
								width: 100%;
								height:100%;
							}
						}
						.item_top_right_text{
							flex:1;
							margin-left:20rpx;
							.shopTitle{
								overflow: hidden;
								font-size: 30rpx;
								letter-spacing:.2em;
								color:#fb1a22;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.shopsubTitle{
								display: flex;
								// margin-top:34rpx;
								// margin-bottom:48rpx;
								margin:34rpx 0 48rpx; 
								text{
									padding:10rpx 30rpx;
									background-color:#ca3130;
									border-radius:30rpx;
									color:#fff;
									width: 260rpx;
									display: inline-block;
									white-space: nowrap; 
									// width: 100%; 
									overflow: hidden;
									text-overflow:ellipsis;
								}
							}
							.Activity_price{
								display: flex;
								justify-content:flex-end;
								
							}
						}
					}
					.item_bottom{
						margin-top:20rpx;
						display:flex;
						justify-content: space-between;
						.item_items{
							width: 49%;
							.items_top_imgs{
								padding:28rpx;
								
								height:300rpx;
								background-repeat: no-repeat;
								background-size: 100% 100%;
								.items_imgs{
									width: 100%;
									height:100%;
									// background-color: green;
								}
							}
							.items_bottom_price{
								margin-top:20rpx;
							}
						}
					}
				}
			}
		}
	}
	// 这是公用的
	.price_text{
		display:flex;
		align-items: center;
		padding:10rpx 10rpx;
		background-color: #f72d32;
		border-radius:30rpx;
		color:#fdd4a0;
		font-size: 24rpx;
		justify-content: space-between;
		.Activity_price_left{
			flex:1;
		}
		.btn{
			padding:10rpx 10rpx;
			background-color:#edcaa8;
			border-radius:30rpx;
			font-size: 24rpx;
			color:#cd2927;
			margin-left:10rpx;
		}
		.price{
			font-size: 30rpx;
			color:#ffdca6;
			vertical-align: middle;
		}
	}
</style>
