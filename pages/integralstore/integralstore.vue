<template>
	<view class="integralstore">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="search">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索商品" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-red shadow-blur round">搜索</button>
				</view>
			</view>
		</view>
		<banner :swiperList=swiperList  height='300'></banner>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center" style="background-image: url(../../static/integralstore/background.png);">
				<view class="cu-item flex-sub" 
					:class="index==TabCur?'text-orange cur':''" 
					v-for="(item,index) in navList" 
					:key="index" 
					@tap="tabSelect" 
					:data-id="index">
					<view class="icon">
						<image :src="imgpath+'/uploads/app/image/'+item.imgs" alt="">
					</view>
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		
	<!-- 商品的大容器 -->
	<view class="tankBox">
			<scroll-view>
				<view class="integral-item">
					<view class="productlist" v-for="(item,index) in 10" :key="index" @tap="Creditdetails">
						<view class="productimg">
							
						</view>
							<view class="productlist-bottom">
								<view class="introduce">
									<text>
										嘻哈帽子女潮流日系无言棒球帽秋冬
									</text>
								</view>
								<view class="salesvolume">
									<text>已兑换24952件</text>
								</view>
								<view class="conversion">
									<view class="conversion-left">
										<view class="left-top">
											<s><text>￥26</text></s>
										</view>
										<view class="left-bottom">
											<text>200积分</text>
										</view>
									</view>
									<view class="conversion-right">
										<button class="cu-btn">立即兑换</button>
									</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Banner from "@/components/indexcomponents/banner.vue"
	const app = getApp()
	export default {
		data() {
			return {
				InputBottom: 0,
				// 轮播图数据   
				swiperList: [{
					imgs:"../../static/indexbanner/banner1.jpg",
				},{
					imgs:"../static/indexbanner/banner2.png",
				},
				{
					imgs:"../static/indexbanner/banner3.jpg",
				},
				{
					imgs:"../static/indexbanner/banner4.jpg",
				},
				{
					imgs:"../static/indexbanner/banner5.jpg",
				},
					
				],
				dotStyle: false,
				TabCur: 0,
				navList:[{
					name:"商品专区",
					imgs:"integralstore/commodity.png",
				},{
					name:"特卖专区",
					imgs:"integralstore/special.png",
				},{
					name:"新品专区",
					imgs:"integralstore/newproduct.png",
				},{
					name:"热销专区",
					imgs:"integralstore/hotcakes.png",
				}],
				statusBar:0,
				imgpath:this.$store.state.imgyuming
			};
		},
		onShow() {
			this.statusBar = app.globalData.statusBar
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			//当用户点击积分列表跳转到积分详情
			Creditdetails(){
				uni.navigateTo({
					url:`/pages/giftdetails/giftdetails`
				})
			}

		},
		components:{
			Banner
		}
	}
</script>

<style lang="less" scoped>
	.flex{
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// height: 116rpx;;
		// overflow: hidden;
		.flex-sub{
			// height: 116rpx;
			font-size: 28rpx;
			padding-top: 10rpx;
			.icon{
				width: 50rpx;
				// height: 35rpx;
				margin: 5rpx auto 0;
				image{
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
	.tankBox{
		padding:0 25rpx 20rpx;
		.integral-item{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	 .productlist{
		margin-top:28rpx;
		width: 338rpx;
		// height: 520rpx;
		background-color: #FFFFFF;
		padding-bottom:30rpx;
		.productimg{
			width: 338rpx;
			height: 276rpx;
			background-color: #CCCCCC;
		}
		.introduce{
			// width: 90%;
			// margin: 10rpx auto 0;
			overflow:hidden;
			text-overflow:ellipsis;
			display:-webkit-box;
			-webkit-line-clamp:2;
			-webkit-box-orient:vertical;
			// padding:0 20rpx;
			font-size: 28rpx;
		}
		.salesvolume{
			// width: 90%;
			margin:20rpx 0;
			
			text{
				font-size: 24rpx;
				display: inline-block;
				border: 2rpx solid #ebc38d;
				color:#ebc38d;
				padding:5rpx;
			}
		}
		.conversion{
			// width: 90%;
			// margin: 20rpx auto 0;
			display: flex;
			justify-content: space-between;
			.conversion-left{
				width: 50%;
				.left-top{
					font-size: 24rpx;
				}
				.left-bottom{
					color: #d5923e;
				}
			}
			.conversion-right{
				.cu-btn{
					padding: 0 10rpx;
					color: #FFFFFF;
					background-color: #d5923e;
					// padding:0;
				}
			}
		}
	  }
	}
	.nav .cu-item{
		height:128rpx;
		line-height:44rpx;
	}
	.productlist-bottom{
		padding:0 20rpx;
	}
</style>
