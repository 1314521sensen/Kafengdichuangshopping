<template>
	<view class="Liveplatformlist">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- <actionbar></actionbar> -->
		<!-- <view class="Liveplatformlist-top-bg" :style="{'background-image':'url(/static/Liveplatformlist/bg.png)'}">
			<pageheight :statusBar="statusBar"></pageheight>
			<view class="region">
				<view class="region-left">
					<image src="/static/Liveplatformlist/coordinates.png" class="region-imgs"></image>
					<text class="regiontext">德州</text>
				</view>
				<view class="region-right">
					<input type="text" class="region-inp" placeholder="请输入主播/房间ID" placeholder-class="inpclass">
				</view>
			</view>
			<view class="regionnav-box">
				<view class="regionnav">
					<view 
						class="regionnav-text" 
						v-for="(item,index) in regionnavlist" 
						:key="index" 
						:class="indexs==index?'regionnav-text-active':''"
						@tap="regionnavTab"
						:data-index="index"
					>
						{{item}}
					</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="Liveplatformlistbanner" v-show="swiperList.length>0">
			<view class="Liveplatformbanner">
				
				<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :autoplay="true" interval="5000" duration="500" :circular="true"
				  @change="cardSwiper" indicator-color="#8799a3"
				 indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item">
							<image :src="imgpath+item.live_pic" mode="scaleToFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view> -->
		<scroll-view :scroll-y="true" @scrolltolower="scrolltolower" style="height:95vh;">
			<view class="Livelist">
				<view class="hint" v-if="livebool">
					{{'暂无主播开播'}}
				</view>
				<view 
					class="Livelist-item" 
					:style="{'background-image':'url('+imgpath+item.live_pic+')'}"
					v-for="(item,index) in list"
					:key="index"
					@tap="viewervideo"
					:data-live_url="item.live_url"
					:data-live_nick="item.live_nick"
					:data-room_id="item.room_id"
					:data-live_pic="item.live_pic"
					:data-liveuid="item.user_id"
				>
					<!-- <view class="item-top item-plice">
						 <view class="watchimgs">
							<image src="/static/Liveplatformlist/liveicon.gif"></image>
							<text class="watchtext">{{100}}人观看</text>
						</view> 
						<view class="watchimgs">
							<view class="user_name">
								<text>{{item.live_nick}}</text>
							</view>
							<view class="room_number">
								<text>{{item.room_id}}</text>
							</view>
						</view>
					</view> -->
					<!-- <view class="item-bottom item-plice">
						<view class="item-describe">
							<view class="describe-top">
								<view class="describe-top-imags">
									<image :src="imgpath+item.shop_good_pic"></image>
								</view>
								<view class="describe-left">
									<view class="describedianxin">
										<image src="/static/liveplatfrom/dianxin.png"></image>
										<text class="describedzan">155</text>
									</view>
									<text class="shopLivedescribe">{{item.shop_good_title}}</text>
								</view>
							</view>
							<view class="describe-bottom">
								<text class="describe-price">{{item.shop_good_price}}</text>
								<text class="describe-shopstore">{{item.shop_store_name}}</text>
							</view>
						</view>
					</view> -->
				</view>
			</view>
		</scroll-view>
		<tabber></tabber>
	</view>
</template>

<script>
	const app = getApp()
	// import actionbar from "@/components/actionbar/actionbarwei.vue"
	//引入底部tabbber
	import tabber from "@/components/indexcomponents/indextaber.vue"
	export default {
		data() {
			return {
				statusBar:0,
				indexs:0,
				regionnavlist:[
					"关注",
					"精选"
				],
				dotStyle: false,
				cardCur: 0,
				swiperList: [],
				list:[],
				uid:"",
				uname:"",
				imgpath:this.$store.state.imgyuming,
				pages:1,
				livebool:false
			}
		},
		methods: {
			jieshu(){
				uni.navigateTo({
					url:`/pages/Closeby/Closeby`
				})
			},
			regionnavTab(e){
				this.indexs = e.currentTarget.dataset.index
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			//点击每一个直播项 跳到不同的主播
			viewervideo(e){
				let {index,live_url,live_nick,room_id,live_pic,liveuid} = e.currentTarget.dataset
				
				// console.log(e)
				// let {index} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Liveplatform/Liveplatform?indexs=${index}&live_url=${live_url}&livenick=${live_nick}&roomid=${room_id}&livepic=${live_pic}&uid=${this.uid}&uname=${this.uname}&liveuid=${liveuid}`
				})
				// uni.navigateTo({
				// 	url:`/pages/Liveplatform/Liveplatform?indexs=${index}`
				// })
			},
			getlivelist(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}live_user/getLiveUserList`,
					data:{
						page:_this.pages,
						pageSize:10,
						is_living:1
					},
					success(res) {
						if(res.data.code==0){
							if(_this.pages>1){
								_this.list = _this.list.concat(res.data.data.list)
							}else{
								_this.list = res.data.data.list
							}
							res.data.data.list.forEach((item,index)=>{
								// console.log(item)
								uni.request({
									url:`${app.globalData.Requestpath}live/getAnchorGoodInfo`,
									data:{
										uid:item.user_id
									},
									success(resliveshop) {
										if(resliveshop.data.code==0){
											_this.list[index].shop_good_pic = [resliveshop.data.data][0].good_pic
											_this.list[index].shop_good_price =[resliveshop.data.data][0].good_price
											_this.list[index].shop_store_name = [resliveshop.data.data][0].store_name
											_this.list[index].shop_good_title = [resliveshop.data.data][0].good_title
										}else{
											_this.list[index].shop_good_pic = ''
											_this.list[index].shop_good_price = ""
											_this.list[index].shop_store_name = ""
											_this.list[index].shop_good_title = ''
										}
										// console.log(_this.list)
									}
								})
							})
						}else{
							_this.livebool = true
						}
					}
				})
			},
			scrolltolower(){
				// console.log(1111)
				this.pages++
				this.getlivelist()
			}
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			_this.getlivelist()
			//获取轮播图里面的直播数据
			uni.request({
				url:`${app.globalData.Requestpath}live_user/getLiveUserListRandom`,
				data:{
					limit:5
				},
				success(res) {
					if(res.data.code==0){
						_this.swiperList = res.data.data
					}
				}
			})
			//获取用户详情
			uni.getStorage({
				key:"bindtokey",
				success(restokey){
					// console.log(restokey)
					app.globalData.Detectionupdatetokey(restokey.data)
					uni.request({
						url:`${app.globalData.Requestpath}user/getUserDetail`,
						method:"POST",
						data:{
							token:restokey.data
						},
						success(res) {
							// console.log(res)
							if(res.data.code==0){
								let {user_id,user_nick} = res.data.data
								_this.uid = user_id
								_this.uname = user_nick
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
		onShow() {
			this.getlivelist()
		},
		components:{
			// actionbar,
			tabber
		},
		//当用户按手机系统返回的时候
		onBackPress(opction){
			// console.log(opction)
			if(opction.from=='backbutton'){
				uni.redirectTo({
					url:`/pages/index/index`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.Liveplatformlist{
		background-color: #fff;
		.hint{
			text-align: center;
			color: #CCCCCC;
			width: 100%;
			font-size: 50rpx;
			padding-top: 500rpx;
		}
	}
	.Liveplatformlist-top-bg{
		// height:170rpx;
		/* background-color:red; */
		background-repeat:no-repeat;
		background-size: 100% 100%;
		padding:20rpx 0 30rpx;
		.region{
			display:flex;
			// background-color:red;
			align-items: center;
			padding:0 40rpx;
			.region-left{
				display:flex;
				align-items: center;
				width:20%;
				height:54rpx;
				// background-color:green;
				.region-imgs{
					width: 42rpx;
					height:100%;
				}
				.regiontext{
					margin-left:16rpx;
					font-size:28rpx;
					color:#fff;
				}
			}
			.region-right{
				flex:1;
				background-color:#ff98b1;
				border-radius:30rpx;
				color:#fff;
				font-size: 26rpx;
				// height:60rpx;
				.region-inp{
					height:68rpx;
					padding-left:20rpx;
					font-size: 26rpx;
				}
				.inpclass{
					color:#fff;
				}
			}
		}
		.regionnav-box{
			display:flex;
			justify-content: center;
			margin-top:30rpx;
			padding-bottom:20rpx;
			.regionnav{
				display:flex;
				justify-content:space-between;
				width: 50%;
				height:30px;
				.regionnav-text{
					font-size:36rpx;
					color:#dbdbdb;
				}
				.regionnav-text-active{
					color:#fff;
					border-bottom:4rpx solid #fff;
				}
			}
		}
	}
	.Liveplatformlistbanner{
		display:flex;
		justify-content: center;
		.Liveplatformbanner{
			width: 100%;
			// height:200rpx;
			// background-color:red;
			.card-swiper{
				height:260rpx !important;
			}
			.card-swiper swiper-item{
				padding:0;
				width: 600rpx !important;
			}
		}
	}
	.Livelist{
		display:flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding:0 10rpx;
		margin-top:30rpx;
		.Livelist-item{
			overflow: hidden;
			width:49%;
			height:556rpx;
			// background-color:red;
			margin-bottom:30rpx;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			border-radius:20rpx;
			.item-plice{
				height:50%;
				// background-color:yellow;
			}
			.item-top{
				.watchimgs{
					// display: flex;
					// align-items: center;
					// padding:20rpx 0 0 10rpx;
					// image{
					// 	width: 50rpx;
					// 	height:50rpx;
					// 	vertical-align:middle;
					// }
					// .watchtext{
					// 	display:inline-block;
					// 	 padding:6rpx 26rpx;
					// 	 background-color:rgba(0,0,0,.5);
					// 	 border-radius:16rpx;
					// 	 color:#fff;
					// 	 margin-left:-20rpx;
					// 	 font-size: 26rpx;
					// }
					display: flex;
					justify-content: space-between;
					padding:10rpx 20rpx;
					background-color: rgba(0,0,0,0.3);
					.user_name{
						color: #FFFFFF;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
						width: 40%;
					}
					.room_number{
						color: #FFFFFF;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
						width: 50%;
						text-align: right;
					}
				}
			}
			.item-bottom{
				display:flex;
				align-items:flex-end;
				.item-describe{
					width: 100%;
					background-color:rgba(0,0,0,.5);
					padding:0 10rpx 10rpx;
					border-radius:16rpx;
					.describe-top{
						display:flex;
						align-items: center;
						justify-content: space-between;
						.describe-top-imags{
							width:32%;
							height:92rpx;
							// background-color:yellow;
							image{
								width: 100%;
								height:100%;
							}
						}
						.describe-left{
							overflow: hidden;
							flex:1;
							height:120rpx;
							
							// background-color:red;
							// padding:0 10rpx;
							color:#fff;
							.describedianxin{
								display:flex;
								align-items: center;
								justify-content: flex-end;
								margin:10rpx 0 0;
								image{
									width: 40rpx;
									height:40rpx;
								}
								.describedzan{
									font-size: 24rpx;
								}
							}
							.shopLivedescribe{
								display:inline-block;
								width: 100%;
								font-size: 24rpx;
								margin-left:10rpx;
								white-space :nowrap;
								text-overflow:ellipsis;
							}
						}
					}
					.describe-bottom{
						display:flex;
						justify-content: space-between;
						// background-color:green;
						margin-top:10rpx;
						color:#fff;
						font-size: 26rpx;
						.describe-price{
							font-weight: bold;
						}
						.describe-shopstore{
							flex:0.8;
							white-space: nowrap;
							overflow: hidden; 
							text-overflow:ellipsis;
							color:#999;
						}
					}
				}
			}
		}
	}
	.uni-swiper-dot-active{}
</style>
