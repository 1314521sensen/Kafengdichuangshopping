<template>
	<view class="groupinfomation" :style="{'background-image':'url('+this.$store.state.httpUrl+'/applygrup/groupinfomationbg.png)','padding-top':statusBar+'px'}">
		<view class="groupinfomation-title">
			<view class="returnicon" @tap="returnicon">
				<text class="text-gray cuIcon-back"></text>
			</view>
			<view class="groupinfomation-title-text">
				<text>申请团长</text>
			</view>
		</view>
		<view class="infokuang-box">
			<view class="infokuang">
				<view class="infokuang-white">
					<view class="infokuang-white-top">
						<view class="infokuang-white-top-title" :style="{'background-image':'url('+this.$store.state.httpUrl+'/applygrup/groupinfomationtitle.png)'}">
							<text>填入信息</text>
						</view>
					</view>
					<form @submit="applyinfo" class="inpform">
						<view>
							<input type="text" class="inp" placeholder="请输入姓名" placeholder-class="inpplaceholder">
							<input type="text" class="inp" placeholder="请输入手机号" placeholder-class="inpplaceholder">
						</view>
						<button class="applyinfobtn" form-type="submit">立即申请</button>
					</form>
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
			}
		},
		methods: {
			applyinfo(){
				//点击请求后台数据
				//请求完成 进行跳转
				uni.redirectTo({
					url:"/pages/headearnings/headearnings"
				})
			},
			returnicon(){
				uni.switchTab({
					url:"/pages/PersonalMy/PersonalMy"
				})
			}
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.groupinfomation{
		height:100vh;
		background-size:100% 100%;
		background-repeat: no-repeat;
		.groupinfomation-title{
			display:flex;
			
			// height:50rpx;
			// background-color: red;
			padding:0 20rpx;
			.returnicon{
				width:80rpx;
				height:80rpx;
				text-align:center;
				line-height:80rpx;
				font-size:40rpx;
				text{
					color:#FFF;
				}
			}
			.groupinfomation-title-text{
				flex:1;
				// background-color:green;
				color:#FFF;
				font-size:40rpx;
				line-height:80rpx;
				text-align:center;
			}
		}
		.infokuang-box{
			height:85vh;
			// background-color:red;
			display:flex;
			align-items: flex-end;
			padding:0 40rpx;
			.infokuang{
				height:50vh;
				width: 100%;
				background-color:#00aa97;
				padding:20rpx;
				.infokuang-white{
					overflow: hidden;
					height:100%;
					background-color: #fff;
					.infokuang-white-top{
						display:flex;
						justify-content: center;
						margin:70rpx 0 0 0;
						.infokuang-white-top-title{
							width:50%;
							height:70rpx;
							// background-color: red;
							background-size: 100% 100%;
							background-repeat: no-repeat;
							text-align:center;
							line-height:70rpx;
							font-size:34rpx;
							color: #fff;
							font-weight: bold;
						}
					}
					.inpform{
						width: 100%;
						// padding:0 40rpx;
						display: flex;
						justify-content: center;
						.inp{
							display:block;
							border:2rpx solid #f8f8f8;
							width: 100%;
							height:92rpx;
							border-radius:36rpx;
							margin-top:52rpx;
							padding-left:20rpx;
							color:#999;
							box-shadow: 4rpx 6rpx 18rpx #eee;
						}
						.inpplaceholder{
							font-size: 28rpx;
						}
						.applyinfobtn{
							border-width:0;
							border-radius:40rpx;
							height:80rpx;
							font-size: 36rpx;
							line-height:80rpx;
							margin-top:80rpx;
							background-color: #0dcea6;
							color:#fff;
							font-weight: bold;
							box-shadow: 6rpx 8rpx 4rpx #eee;
						}
					}
				}
			}
		}
	}
</style>
