
<template>
	<view class="commodityshop">
		<view v-if="qractivebool==false">
			<view class="commodityshop-bg" :style="{'background-image':'url('+this.$store.state.httpUrl+'headearning/Headwithdrawal.png'+')','padding-top':statusBar+'rpx'}">
				<actionbar bg="aa" message="可推商品" textcolor="#fff" url="/pages/headearnings/headearnings" :Jumpchoose="true"></actionbar>
				<!-- 这个banner必须要有后端配合 -->
				<!-- <banner :swiperList="bannerlist"></banner> -->
			</view>
			<view class="notice">
				<view class="notice-box">
					<view class="notice-icon">
						<image :src="this.$store.state.httpUrl+'headearning/noticeicon.png'" class="images"></image>
					</view>
					<text class="notice-title">优秀商家</text>
					<text class="noticedescribe">
						佣金大赏,货源优秀,货源优秀
					</text>
				</view>
			</view>
			<!-- <view class="Criticalpush">
				<view class="Criticalpush-left">
					<text class="Criticalpush-title">爆推好货</text>
					<view class="Criticalpush-images">
						<image src="/static/headearning/Criticalpush.png" class="Criticalpush-img"></image>
					</view>
					<view class="Criticalpush-info">
						联想耳机
					</view>
					<view class="Criticalpush-price">
						<text class="price">¥200.00</text>
						<view class="Criticalpush-commission">
							佣金<text class="text-red">50</text>
						</view>
					</view>
				</view>
				<view class="Criticalpush-right">
					<view class="Criticalpush-right-top" v-for="(item,index) in 2" :key="index">
						<view class="Criticalpush-top">
							<text class="Criticalpush-top-title">发现好货</text>
							<text class="Criticalpush-top-info">团长口碑推荐</text>
						</view>
						<view class="Criticalpush-bottom">
							<view class="Criticalpush-bottom-imgs">
								<image src="/static/headearning/Criticalpush.png"></image>
								<image src="/static/headearning/Criticalpush.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="Singleblastingbox">
				<!-- :style="{'background-image':'url(/static/headearning/masklayerbg.jpg)'}" -->
				<view class="Singleblasting" :style="{'background-image':'url('+this.$store.state.httpUrl+'headearning/masklayerbg.jpg'+')'}">
					<view class="masklayer-bg">
						<view class="masklayerTop">
							<text class="masklayerTop-title">推广爆单</text>
							<text>推广上榜好物,佣金拿到手抽筋</text>
						</view>
					</view>
				</view>
			</view>
			<view class="Singleblastingrollingbox">
				<view class="Singleblastingrolling">
					<scroll-view class="scrollview" :scroll-x="true">
						<view class="scrollviewmidden" :style="{width:252*detective.length+15+'rpx'}">
							<view 
								class="scrollviewitem" 
								v-for="(item,index) in detective" 
								:key="index" 
								@tap="shopitem"
								:data-gid="item.good_id"
								:data-sid="item.store_id"
							>
								<view class="scrollviewitem-image">
									<image :src="imgpath+item.good_pic"></image>
								</view>
								<view class="scrollviewitem-info">
									<text class="scrollviewiteminfotext">{{item.good_title}}</text>
									<view class="scrollviewiteminfoprice">
										<text class="text-red">¥{{item.good_promotion_price}}</text>
										<view 
											class="scrollviewitemshare"
											@tap.stop="goodpromote"
											:data-gid="item.good_id"
										>
											<text class="text-gray cuIcon-share"></text>
										</view>
									</view>
								</view>
								<view class="scrollviewitem-info_commission">
									<text>佣金 {{item.commission}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<Recommend title="推荐" bg="#f2f2f2" bordercolor="#000" height="62"></Recommend>
			<view class="Promoterecommended_box">
				<view 
					class="Promoterecommended" 
					v-for="(item,index) in recommendGoodS" 
					:key="index"
					@tap="shopitem"
					:data-gid="item.good_id"
					:data-sid="item.store_id"
				>
					<view class="Promoterecommended-left">
						<image :src="imgpath+item.good_pic"></image>
					</view>
					<view class="Promoterecommended-right">
						<view class="Promoterecommended-title">
							<text>{{item.good_title}}</text>
						</view>
						<view class="Promoterecommended-store">
								<text class="Promoterecommended-storetext">{{item.store_name}}</text>
						</view>
						<view class="Promotioncommended_price">
							<text class="text-red">¥{{item.good_promotion_price}}</text>
							<view class="Promotioncommended_commission">
								佣金<text class="text-red Promotioncommended_commissiontext">{{item.commission}}</text>
							</view>
						</view>
						<view 
							class="Promotioncommended-btn" 
							@tap.stop="goodpromote"
							:data-gid="item.good_id"
						>
							<button class="cu-btn line-orange">推广</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<QRAcgood 
			:good_images="good_images" 
			:promotion_price="promotion_price"
			:good_title="good_title"
			:gid="gid"
			:sid="sid"
			:url="url"
			v-if="qractivebool"
			:statusBar="statusBar"
			@areclose="areclose"
		></QRAcgood>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import banner from "@/components/indexcomponents/banner.vue"
	import Recommend from '@/components/indexcomponents/Recommend.vue'
	// 二维码弹框
	import QRAcgood from '@/components/commodityshop/QRActivitgood.vue'
	
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				detective:[],//切割的第一个数组
				recommendGoodS:[],//第二个推荐的数组
				
				bannerlist:[
					{
						good_img_url:"/static/indexbanner/banner4.jpg"
					}
				],
				promotion_price:"",
				good_images:"",
				good_title:"",
				gid:"",
				sid:"",
				qractivebool:false,
				unl:"",
				imgpath:this.$store.state.imgyuming
			}
		},
		methods: {
			//当用户分享成功或者失败时 就让页面为false
			areclose(e){
				// console.log("父组件返回来的",e)
				this.qractivebool = e
			},
			shopitem(e){
				let {gid,sid} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Details/Details?id=${gid}&storeid=${sid}&type=3`
				})
			},
			goodpromote(e){
				const _this = this
				let {gid} = e.currentTarget.dataset
				// console.log(gid)
				uni.request({
					url:`${app.globalData.Requestpath}good/getGoodInfo`,
					data:{
						gid
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							let {good_images,good_promotion_price,good_title,good_id,store_id,url} = res.data.data
							_this.good_images = JSON.parse(good_images)[0]
							_this.promotion_price = good_promotion_price
							_this.good_title = good_title
							_this.gid = good_id
							_this.sid = store_id
							_this.url = url
							_this.qractivebool = true
						}
					}
				})
			}
		},
		components:{
			actionbar,
			banner,
			Recommend,
			QRAcgood
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
			
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}good/getCommanderGoodList`,
				data:{
					page:_this.page,
					pageSize:8
				},
				success(res) {
					if(res.data.code == 0){
						// console.log(res.data.data.list)
						//切割成二个数组
						//第一个
						_this.detective = res.data.data.list.slice(0,4)
						// console.log(_this.detective)
						// 第二个数组  推荐的数组
						_this.recommendGoodS = res.data.data.list.slice(4,res.data.data.list.length)
						
						// console.log(_this.recommendGoodS)
					}
					
					
					
					// console.log(res)
					// if(res.data.code==0){
					// 	if(_this.page>1){
					// 		_this.list = _this.list.concat(res.data.data.list)
					// 		// console.log(_this.list)
					// 	}else{
					// 		_this.list = res.data.data.list
					// 	}
					// }else{
					// 	// app.globalData.showtoastsame("数据暂无")
					// 	 if(_this.page > 1){
					// 		 _this.hinttext = '我也是有底线的'
					// 	 }
					// 	_this.textbool = true
					// }
					// _this.iconbool = false  
				}  
			})
			
		}
	}
</script>

<style lang="less" scoped>
	.commodityshop{
		background-color: #f2f2f2;
		.commodityshop-bg{
			height:375rpx;
			// background-color:red;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			
		}
		.notice{
			padding:0 20rpx;
			.notice-box{
				display:flex;
				// line-height:1;
				align-items: center;
				.notice-icon{
					width: 52rpx;
					height:52rpx;
					// background-color:red;
					.images{
						width: 100%;
						height:100%;
					}
				}
				.notice-title{
					font-size: 34rpx;
					font-weight: bold;
					margin:0 20rpx;
					line-height:58rpx;
				}
				.noticedescribe{
					font-size: 24rpx;
					// line-height:52rpx;
				}
			}
		}
		.Criticalpush{
			display:flex;
			padding:0 20rpx;
			margin-top:40rpx;
			.Criticalpush-left{
				width: 50%;
				background-color: #fff;
				margin-right: 20rpx;
				padding-bottom:10rpx;
				.Criticalpush-title{
					font-size: 32rpx;
					font-weight:bold;
				}
				.Criticalpush-images{
					display:flex;
					justify-content: center;
					margin-top:28rpx;
					.Criticalpush-img{
						width: 292rpx;
						height:288rpx;
					}
				}
				.Criticalpush-info{
					text-align:center;
					font-weight: bold;
					font-size:32rpx;
					margin:20rpx 0;
				}
				.Criticalpush-price{
					display:flex;
					align-items: flex-end;
					justify-content: space-between;
					padding-left:20rpx;
					.price{
						color:red;
						font-weight: bold;
					}
				}
				.Criticalpush-commission{
					width:140rpx;
					// height:20rpx;
					font-size: 30rpx;
					// background-color:red;
					color:#fff;
					background-color: rgba(0,0,0.5);
					text-align:center;
					padding:8rpx 0;
					border-radius:16rpx 0rpx 0rpx 12rpx;
				}
			}
			.Criticalpush-right{
				// background-color: #fff;
				width: 50%;
				.Criticalpush-right-top{
					background-color: #fff;
					padding:20rpx 0;
					margin-bottom:20rpx;
					&:last-child{
						margin-bottom:0;
					}
					.Criticalpush-top{
						padding:0 10rpx;
						.Criticalpush-top-title{
							font-size: 32rpx;
							font-weight: bold;
						}
						text{
							display:block;
						}
						.Criticalpush-top-info{
							font-size: 24rpx;
							color:#ccc;
						}
					}
					.Criticalpush-bottom{
						
						.Criticalpush-bottom-imgs{
							display:flex;
							justify-content: center;
							margin-top:34rpx;
							image{
								width:100rpx;
								height:100rpx;
								margin-right:60rpx;
								&:last-child{
									margin-right:0;
								}
							}
						}
					}
				}
				
			}
		}
		.Singleblastingbox{
			padding:0 20rpx;
			margin-top:40rpx;
			.Singleblasting{
				border-radius:26rpx 20rpx 0rpx 0rpx;
				// background-color:red;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.masklayer-bg{
					background-color:rgba(0,0,0,.5);
					height:200rpx;
					border-radius:26rpx 20rpx 0rpx 0rpx;
					.masklayerTop{
						padding:20rpx 0rpx 0rpx 30rpx;
						.masklayerTop-title{
							font-size: 38rpx;
							color:#fff;
						}
						text{
							display:block;
							color:#ccc;
							font-size: 24rpx;
						}
					}
				}
			}
		}
		.Singleblastingrollingbox{
			padding:0 20rpx;
			.Singleblastingrolling{
				background-color: #fff;
				padding:20rpx 0 20rpx 20rpx;
				border-radius: 16px;
				.scrollview{
					overflow: hidden;
					width: 100%;
					.scrollviewmidden{
						display:flex;
						.scrollviewitem{
							width: 252rpx;
							padding-bottom:40rpx;
							margin-right:20rpx;
							.scrollviewitem-image{
								// background-color:red;
								image{
									height:240rpx;
								}
							}
							.scrollviewitem-info{
								.scrollviewiteminfotext{
									overflow:hidden;
									text-overflow:ellipsis;
									display:-webkit-box;
									-webkit-line-clamp:2;
									-webkit-box-orient:vertical;
									margin:15rpx 0;
								}
								.scrollviewiteminfoprice{
									display:flex;
									justify-content: space-between;
									padding: 0 15rpx;
								}
								.scrollviewitemshare{
									text{
										font-size:35rpx;
									}
								}
							}
							.scrollviewitem-info_commission{
								color:#fff;
								text{
									background-color:rgba(0,0,0,.5);
									padding:6rpx 10rpx;
									font-size: 24rpx;
								}
							}
						}
					}
				}
			}
		}
		.Promoterecommended_box{
			padding:0 20rpx;
			.Promoterecommended{
				display:flex;
				background-color: #fff;
				padding:20rpx 0;
				.Promoterecommended-left{
					width: 32%;
					height:280rpx;
					// background-color:red;
					image{
						width: 100%;
						height:100%;
					}
				}
				.Promoterecommended-right{
					flex:1;
					// background-color:green;
					margin-left:20rpx;
					.Promoterecommended-title{
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-line-clamp:2;
						-webkit-box-orient:vertical;
						font-size:32rpx;
						font-weight: bold;
					}
					.Promoterecommended-store{
						margin:20rpx 0;
						.Promoterecommended-storetext{
							width: 120rpx;
							// line-height:30rpx;
							background-color: #de4517;
							color:#fff;
							padding:10rpx;
							border-radius:10rpx;
						}
					}
				}
			}
		}
		.Promotioncommended_price{
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding:0 20rpx;
			.Promotioncommended_commission{
				background-color:rgba(0,0,0,.5);
				padding:8rpx;
				color:#fff;
				text{
					margin-left:10rpx;
					color:#fff;
				}
			}
		}
		.Promotioncommended-btn{
			margin-top:10rpx;
			button{
				height:48rpx;
			}
		}
	}
</style>
