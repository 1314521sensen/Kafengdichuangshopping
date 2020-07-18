<template>
	<view class="Liveplatformlist">
		<view class="Liveplatformlist-top-bg" :style="{'background-image':'url(/static/Liveplatformlist/bg.png)'}">
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
		</view>
		<view class="Liveplatformlistbanner">
			<view class="Liveplatformbanner">
				<!-- :autoplay="true" interval="5000" duration="500" -->
				<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :autoplay="true" interval="5000" duration="500" :circular="true"
				  @change="cardSwiper" indicator-color="#8799a3"
				 indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
						<view class="swiper-item">
							<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="Livelist">
			<view 
				class="Livelist-item" 
				:style="{'background-image':'url(/static/Liveplatformlist/itembg.png)'}"
				v-for="(item,index) in 20" 
				:key="index"
				@tap="viewervideo"
				:data-index="index"
			>
				<view class="item-top item-plice">
					<view class="watchimgs">
						<image src="/static/Liveplatformlist/liveicon.gif"></image>
						<text class="watchtext">{{100}}人观看</text>
					</view>
				</view>
				<view class="item-bottom item-plice">
					<view class="item-describe">
						<view class="describe-top">
							<view class="describe-top-imags">
								<image src="/static/Liveplatformlist/imgs.png"></image>
							</view>
							<view class="describe-left">
								<view class="describedianxin">
									<image src="/static/liveplatfrom/dianxin.png"></image>
									<text class="describedzan">155</text>
								</view>
								<text class="shopLivedescribe">买一送一,半价</text>
							</view>
						</view>
						<view class="describe-bottom">
							<text class="describe-price">¥100</text>
							<text class="describe-shopstore">小熊维尼店</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
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
				swiperList: [
				{
					id: 0,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png'
				}, {
					id: 1,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png',
				}, {
					id: 2,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png'
				}, {
					id: 3,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png'
				}, {
					id: 4,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png'
				}, {
					id: 5,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png'
				}, {
					id: 6,
					type: 'image',
					url: '/static/Liveplatformlist/banner1.png'
				}],
				list:[]
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
				let {index} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Liveplatform/Liveplatform?indexs=${index}`
				})
			}
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.Liveplatformlist{
		background-color: #fff;
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
		padding:0 20rpx;
		margin-top:30rpx;
		.Livelist-item{
			width:48%;
			height:500rpx;
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
					display: flex;
					align-items: center;
					padding:20rpx 0 0 10rpx;
					image{
						width: 50rpx;
						height:50rpx;
						vertical-align:middle;
					}
					.watchtext{
						display:inline-block;
						 padding:6rpx 26rpx;
						 background-color:rgba(0,0,0,.5);
						 border-radius:16rpx;
						 color:#fff;
						 margin-left:-20rpx;
						 font-size: 26rpx;
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
							color:#999;
						}
					}
				}
			}
		}
	}
	.uni-swiper-dot-active{}
</style>
