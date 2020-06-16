<template>
	<view class="Businessinformation">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="店铺经营信息" :Jumpchoose="true" url="/pages/Qualificationinformation/Qualificationinformation?titlename=Individuals"></actionbar>
		<view class="Businessbox">
			<view class="Businessmidden">
				<view class="Business-title">店铺经营信息</view>
				<view class="Business-bottom">
					<view class="cu-form-group BusinessPadding">
						<view class="title">店铺名称:</view>
						<input placeholder="请输入店铺名称" name="input" class="inp" placeholder-class="inpplaceholder"></input>
					</view>
					<view class="cu-form-group BusinessPadding">
						<view class="title">店铺等级:</view>
						<input placeholder="请选择店铺等级" name="input" placeholder-class="inpplaceholder"></input>
					</view>
					<view class="cu-form-group BusinessPadding">
						<view class="title">店铺分类:</view>
						<input placeholder="请选择店铺分类" name="input" placeholder-class="inpplaceholder"></input>
					</view>
					<view class="cu-form-group BusinessPadding">
						<view class="title">经营项目:</view>
						<input placeholder="请选择经营项目" name="input" placeholder-class="inpplaceholder"></input>
					</view>
					<view class="ensuregold">
						保证金:<text class="text-red ensuregoldText">99.9</text>
					</view>
				</view>
			</view>
			<button class="Businessbtn" @tap="Businessbtn">下一步</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			Businessbtn(){
				uni.navigateTo({
					url:"/pages/contractsigning/contractsigning"
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
	.Businessinformation{
		height:100vh;
		background-color: #f2f2f2;
		.Businessbox{
			padding:0 20rpx;
			margin-top:30rpx;
			.Businessmidden{
				background-color: #fff;
				box-shadow: 4rpx 2rpx 10rpx #999;
				.Business-title{
					font-size: 34rpx;
					font-weight: bold;
					text-indent:1em;
					border-bottom:2rpx solid #ccc;
					padding:20rpx 0;
				}
				.Business-bottom{
					padding-bottom:50rpx;
					.cu-form-group{
						min-height:80rpx;
						
						.title{
							padding-right:0;
						}
						.inp{
							border:2rpx solid #ccc;
							height:60rpx;
							margin-left:20rpx;
						}
						.inpplaceholder{
							font-size:26rpx;
						}
					}
					.BusinessPadding{
						padding:24rpx 0 24rpx 100rpx;
					}
					.ensuregold{
						text-align:center;
						margin-top:34rpx;
						.ensuregoldText{
							font-size: 36rpx;
							margin-left:20rpx;
						}
					}
				}
			}
			.Businessbtn{
				border-radius:92rpx;
				height:80rpx;
				font-size: 30rpx;
				line-height:80rpx;
				color:#fff;
				background-color: #ff5500;
				margin-top:80rpx;
			}
		}
	}
</style>
