<template>
	<view class="signin">	
		<pageheight :statusBar="statusBar"></pageheight>
	<!-- 返回 -->
		<actionbar message="签到" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<!-- 签到 -->
		<view class="signBg_box">
			<view class="sign_bg" style="background-image:url(/static/sign/sign_bg.png);">
				<view class="sign_box">
					<text class="two">2</text>
					<text class="three">3</text>
				</view>
			</view>
		</view>
		
		<!-- 点击签到 -->
		<view class="ClickTheSignBox">
			<view class="ClickTheSign">
				<text class="sign_url" style="background-image:url(/static/sign/ClicktheSign.png) "></text>
				<text class="promptlySign">立即签到</text>
			</view>
				
		</view>
		<!-- 兑换商品 -->
			<view class="conversion_titie">
				兑换商品
			</view>
		<view class="conversion_cen">
			<!-- 兑换列表  -->
			<view class="conversion_Box">
				<!-- 单个 商品 box-->
				<view class="particular" v-for="(item,index) in particularList" :key='index' @tap="Points">
					<!-- 商品展示图  -->
					<view class="particular_bg" :style="{'background-image':'url('+item.imageS+')'}"></view>
					<view class="bot">
						<view>
							<text class="integral">积分:</text>
							<text class="integral_num">{{item.integrals}}</text>
						</view>
						<text class="exchange">兑换</text>
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
				statusBar:0,
				particularList:[{
						imageS:'/static/sign/ClothesToShow.png',
						integrals:300,
					},
					{
						imageS:'/static/sign/ClothesToShow.png',
						integrals:300,
					},
					{
						imageS:'/static/sign/ClothesToShow.png',
						integrals:300,
					},
					{
						imageS:'/static/sign/ClothesToShow.png',
						integrals:300,
					},
					{
						imageS:'/static/sign/ClothesToShow.png',
						integrals:300,
					},
					{
						imageS:'/static/sign/ClothesToShow.png',
						integrals:300,
					},
				]
			}
		},
		methods: {
			Points(){
				uni.navigateTo({
					url:"/pages/giftdetails/giftdetails"
				})
			}
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}  
</script>

<style lang="less" scoped>

  .signin{
	background-color: #fff;
	.conversion_titie{ 
		font-weight: bold;
		margin: 30rpx 0 0 30rpx;
		font-size: 32rpx; 
	}
	// 签到背景图  
	.signBg_box{
		display: flex;
		justify-content: center;
		.sign_bg{
			background-size: 100% 100%;
			width: 690rpx;
			height:315rpx;
			margin: 20rpx 0 15rpx;
			display: flex;
			justify-content: space-around;
			.sign_box{
				margin-left: 376rpx;
				margin-top:4rpx;
				.two{
					display: inline-block;
					font-size: 44rpx;
				}
				.three{
					display: inline-block;
					margin-left: 58rpx;
					margin-top: 180rpx;
					font-size: 44rpx;
				}
			}
		}
	}
	.ClickTheSignBox{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	// 立即签到
	.ClickTheSign{
		width: 690rpx;
		height: 80rpx;
		border-radius: 50rpx;
		background-color: #2382fa;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.sign_url{
			width: 52rpx;
			height: 50rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%; 
		}
		.promptlySign{
			font-size: 36rpx;
			color: #FFFFFF;
			margin-left: 25rpx;
		}
	 }
	 
	.conversion_list{
		width: 700rpx; 
	} 
   .conversion_cen{	
		display: flex;
		justify-content: center;
	// 兑换列表
	.conversion_Box{
		width: 710rpx;
		display: flex;
		flex-wrap: wrap;
		justfy-content:space-between;
		padding-bottom: 50rpx;
		// 单个商品
		.particular{
			display: flex;
			flex-wrap: wrap;
			width: 340rpx;
			margin-left: 10rpx;
			line-height: 60rpx;
			margin-top: 30rpx;
			box-shadow: 5rpx 5rpx  20rpx #CCCCCC;
			// padding: 0 20rpx 0 ;
			// 商品展示图   
			.particular_bg{
				width: 340rpx;
				height: 340rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
			.bot{
				display: flex;
				flex: 1;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;
				height: 60rpx;
				background-color: #fff;
				.integral{//
					font-size: 24rpx;
					margin-left: 15rpx;
					margin-right: 5rpx;
				}
				.integral_num{
					font-size: 28rpx;
					font-weight: bold;
				}
				.exchange{
					margin-right: 20rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-indent: 0.2rem;
					width: 80rpx;
					background-color: #ff0000;
					color: #FFFFFF;
				}
			}
		}
	  }
	} 
 }	
</style>
