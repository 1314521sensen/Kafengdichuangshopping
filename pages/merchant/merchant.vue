<template>
	<view class="merchaWrap">
		<view class="merchant" :style="{'background-image':'url(/static/merchant/merchant_bg.png)'}">
			<!-- 导航 -->
			<view class="Shop-Check-in-return" :style="{'padding-top':statusBar+20+'rpx'}">
				<view class="Shop-Check-in-icon" @tap="ShopCheckinreturn">
					<text class="text-gray cuIcon-back text-white"></text>
				</view>
			</view>
		</view>
		<!-- 入驻需要几步 -->
		<view class="enter_imgBox">
			<image class="enter_img" src="/static/merchant/enter.png" alt="">
		</view>
		<!-- 入驻步骤 -->
		<view class="wroldBox">
			<view class="worldwide">
				<!-- 每个步骤 -->
				<view class="stop_Box" v-for="(item,index) in stopList" :key='index'>
					<text class="step">{{item.merchatStop}}</text>
					<text class="stepContent">{{item.stepContent}}</text>
				</view>
			</view>
		</view>
		<view class="ImmediatelymoveBox">
			 
			<view class="Immediatelymove" @tap="Immediatelymove">立即入驻</view>
		</view>
		<!-- 确定入驻 -->
	</view>
</template>

<script>
	//这是入驻启动图
	const app = getApp()
	export default {
		data() {
			return {
				stopList:[{
					merchatStop:'第一步',
					stepContent:'签订入驻协议'
				},
				{
					merchatStop:'第二步',
					stepContent:'店铺资质信息'
				},
				{
					merchatStop:'第三步',
					stepContent:'店铺经营信息'
				},
				{
					merchatStop:'第四步',
					stepContent:'合同签订及缴费'
				},
				{
					merchatStop:'第五步',
					stepContent:'成功开通'
				},
				],
				statusBar:0
			}
		},
		methods: {
			ShopCheckinreturn(){
				uni.navigateBack()
			},
			Immediatelymove(){
				uni.redirectTo({
					url:"/pages/choosing/choosing"
				})
			}
		},
		components:{
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.merchaWrap{
		background-color: #fff;
		min-height: 100vh;
		.merchant{
			height:435rpx;
			// background-image: url(/static/merchant/merchant_bg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			.Shop-Check-in-return{
				padding-left:20rpx;
				.Shop-Check-in-icon{
					width: 50rpx;
					// height:50rpx;
					font-size: 44rpx;
					// background-color: red;
				}
			}
		}
		.enter_imgBox{
			display: flex;
			justify-content: center;
			margin: 20rpx 0 80rpx;
			.enter_img{
				width: 400rpx;
				height: 100rpx;
			}
		}
		.wroldBox{
			display: flex;
			justify-content: center;
			// 入驻步骤
			.worldwide{
				// margin-left: 140rpx;
				width: 65%;
				.stop_Box{
					display: flex;
					justify-content: space-between;
					border-bottom: 2rpx solid yellow;
					margin-bottom: 12px;
					padding-bottom: 10rpx;
					.step{
						color: #e55646;
					}
					.stepContent{
						margin-left: 80rpx;
						font-size: 33rpx;
					}
				}
			}
		}
		.ImmediatelymoveBox{
			display: flex;
			justify-content: center;
			.Immediatelymove{
				width: 540rpx;
				height: 90rpx;
				background-color: #ff5500;
				color: #FFFFFF;
				font-size: 34rpx;
				text-align: center;
				line-height: 90rpx;
				border-radius: 40rpx;
				margin-top: 50rpx;
			}
		}
	}
</style>
