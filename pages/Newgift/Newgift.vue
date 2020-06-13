<template>
	<view class="Startingdiagrambox">
		<view class="Startingdiagram" :style="{'background-image':'url(/static/Newgift/Presentscar.gif)','height':Newgiftheight+'vh'}"></view>
		<view class="new" style="background-image: url(/static/Newgift/bg.png);">
			<pageheight :statusBar="statusBar"></pageheight>
			<scroll-view class="fa-new" scroll-y="true" >
				<view class="new-top-img" style="background-image: url(/static/Newgift/bgtitle.png);"></view>
				<view class="new-bottom">
					<NewPeople></NewPeople>
					<scroll-view :scroll-x="true">
						<view class="fa-discounts">
							<view class="discounts-list">
								<view class="discounts">
									<view class="discounts-left">
										<text class="left-text-one">￥</text>
										<text class="left-text-two">5</text>
									</view>
									<view class="discounts-right">
										<view class="right-left">
											<text class="right-left-textone">优惠券</text>
											<text class="right-left-texttwo">无限制使用</text>
										</view>
										<view class="right-right" style="background-image: url(/static/Newgift/Rightcouponimg.png);">
											<button class="cu-btn">领取</button>
										</view>
									</view>
								</view>
								<view class="discounts">
									<view class="discounts-left">
										<text class="left-text-one">￥</text>
										<text class="left-text-two">5</text>
									</view>
									<view class="discounts-right">
										<view class="right-left">
											<text class="right-left-textone">优惠券</text>
											<text class="right-left-texttwo">无限制使用</text>
										</view>
										<view class="right-right" style="background-image: url(/static/Newgift/Rightcouponimg.png);">
											<button class="cu-btn">领取</button>
										</view>
									</view>
								</view>
								<view class="discounts">
									<view class="discounts-left">
										<text class="left-text-one">￥</text>
										<text class="left-text-two">5</text>
									</view>
									<view class="discounts-right">
										<view class="right-left">
											<text class="right-left-textone">优惠券</text>
											<text class="right-left-texttwo">无限制使用</text>
										</view>
										<view class="right-right" style="background-image: url(/static/Newgift/Rightcouponimg.png);">
											<button class="cu-btn">领取</button>
										</view>
									</view>
								</view>
								<view class="discounts">
									<view class="discounts-left">
										<text class="left-text-one">￥</text>
										<text class="left-text-two">5</text>
									</view>
									<view class="discounts-right">
										<view class="right-left">
											<text class="right-left-textone">优惠券</text>
											<text class="right-left-texttwo">无限制使用</text>
										</view>
										<view class="right-right" style="background-image: url(/static/Newgift/Rightcouponimg.png);">
											<button class="cu-btn">领取</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<NewPeople></NewPeople>
					<!-- <scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom"> -->
					<view class="commodity-list">
						<view class="commodity" v-for="(item,index) in list" :key="index">
							<view class="commodity-img">
								<!-- 这里放的图片 -->
							</view>
							<view class="commodity-bottom">
								<view class="">
									<text class="text-one">RMB:</text><text class="text-two">{{item}}</text>
								</view>
								<button class="cu-btn">领取</button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
			
			<view class="new-bottom-bottom cu-dialog">
				<view class="bottom-midden">
					<view class="log-left" style="background-image: url(/static/logo.png);"></view>
					<view class="log-right" style="background-image: url(/static/Newgift/bottomlogo.png);"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NewPeople from "@/components/Newgift/Newgifttitletext.vue"
	const app = getApp()
	export default {
		data() {
			return {
				list:[10,20,30,40,50,60,70,80,90],
				statusBar:"",
				Newgiftheight:100,
			}
		},
		components:{
			NewPeople
		},
		onLoad() {
			const _this = this
			_this.statusBar = app.globalData.statusBar
			// setInterval(()=>{
			// 	_this.Newgiftheight-20
			// },1000)
		}
	}
</script>

<style lang="less" scoped>
	.Startingdiagrambox{
		height:100vh;
		overflow: hidden;
	}
	.Startingdiagram{
		// background-color:red;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.new{
		overflow: hidden;
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
		.fa-new{
			width: 95%;
			margin: 0 auto;
			height: 88vh;
		}
		.new-top-img{
			height: 360rpx;
			width: 80%;
			background-size: 100% 100%;
			margin: 0 auto;
		}
		.new-bottom{
			overflow: hidden;
			width: 100%;
			// height: 80vh;
			// z-index: 0;
			background-color: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			margin: 0 auto ;
			.fa-discounts{
				width: 1000%;
				.discounts-list{
					width: 10%;
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;
					.discounts{
						overflow: hidden;
						margin-top: 20rpx;
						width: 336rpx;
						height: 110rpx;
						border-radius: 15rpx;
						background-image: linear-gradient(to right,#c61571, #cc2d2c);
						display: flex;
						justify-content: space-between;
						.discounts-left{
							width: 25%;
							height: 110rpx;
							// background-color: red;
							line-height: 90rpx;
							text-align: center;
							border-right: 2rpx dotted #FFFFFF;
							.left-text-one{
								color: white;
								font-size: 20rpx;		
							}
							.left-text-two{
								color: white;
								font-size: 40rpx;
								font-weight: bold;
							}
						}
						.discounts-right{
							width: 75%;
							height: 110rpx;
							display: flex;
							justify-content: space-between;
							.right-left{
								width: 60%;
								height: 100%;
								margin-left: 20rpx;
								
								.right-left-textone{
									font-size: 28rpx;
									color: white;
									display: block;
									margin-top: 10rpx;
								}
								.right-left-texttwo{
									font-size: 16rpx;
									color: white;
									display: block;
									margin-top: 10rpx;
								}
							}
							.right-right{
								width: 40%;
								height: 100%;
								background-size: 80rpx 80rpx;
								 background-repeat:no-repeat;
								 background-position:top right;
								 margin: -5rpx -10rpx 0 0;
								 .cu-btn{
									width: 80rpx;
									height: 30rpx; 
									font-size: 24rpx;
									background-color: white;
									padding:0rpx;
									margin:64rpx 0 0 -10rpx;
									color: red;
								 }
							}
						}
					}
				}
			}
			.commodity-list{
				margin-top: 40rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding:0 10rpx 20rpx;
				.commodity{
					width: 340rpx;
					margin: 15rpx 0 15rpx 0 ;
					.commodity-img{
						width: 340rpx;
						height: 340rpx;
						background-color: red;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.commodity-bottom{
						
						display: flex;
						justify-content: space-between;
						line-height: 80rpx;
						.text-one{
							font-size: 24rpx;
						}
						.text-two{
							font-size: 34rpx;
							font-weight: bold;
							color: red;
						}
						.cu-btn{
							height: 40rpx;
							background-color: #f30000;
							margin-top:20rpx;
							color: white;
						}
					}
				}
			}
		}
		.new-bottom-bottom{
			// height: 154rpx;
			 background: linear-gradient(#f8ce70,#f57a24 );
			 width: 98%;
			 border-radius: 10rpx;
			 margin: 0 auto;
			 display: flex;
			 justify-content: center;
			 padding: 20rpx 0;
			 .bottom-midden{
				 display:flex;
				 justify-content: space-around;
				 align-items: center;
				 width: 60%;
				 .log-left{
					 width: 104rpx;
					 height: 104rpx;
					 background-size: 100% 100%;
				 }
				 .log-right{
					 width: 180rpx;
					 height: 68rpx;
					 background-size: 180rpx 68rpx;
				 }
			 }
		}
	}
	
	
</style>
