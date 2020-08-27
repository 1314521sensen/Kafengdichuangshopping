<template>
	<view class="popupBox">
		<view class="popup">
			<view class="popuptop">
				<view class="texttiele">
					<text>欢迎使用惠播客</text>
				</view>
				<view class="loginagreementText">山东卡风迪创信息科技有限公司（注册地址：山东省德州市经济开发区宋官屯街道办事处三八东路董子文化街汇智街28号一层）一直以来都非常重视个人信息的保护。您可阅读惠播客<text class="agreementText" @tap="agreementText">《用户协议》</text>和<text class="agreementText" @tap="Privacyagreement">《隐私政策》</text>在您浏览访问惠播客平台网站、应用程序、微信小程序等或者注册登录使用惠播客的任何产品和服务时，我们将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。</view>
				<view class="agreement">
					<text class="agreement-one">继续使用代表您已阅读并同意上述内容及</text>
				</view>
			</view>
			<view class="popup-bottom">
				<view class="consent" @tap="consent">
					<text>同意</text>
				</view>
				<view class="disagree" @tap="disagree">
					<text>不同意</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			agreementText(){
				uni.navigateTo({
					url:`/pages/loginagreement/loginagreement`
				})
			},
			Privacyagreement(){
				uni.navigateTo({
					url:`/pages/Privacyagreement/Privacyagreement`
				})
				// console.log(666)
			},
			consent(){
				this.$store.state.indexpopupbool = false
				uni.setStorage({
					key:'indexpopupbool',
					data:false
				}) 
			},
			disagree(){
				plus.runtime.quit();
			},
		}
	}
</script>

<style lang="less" scoped>
	.popupBox{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: rgba(0,0,0,.5);
		width: 100%;
		height: 100%;
		padding: 200rpx 100rpx ;
		.popup{
			width: 100%;
			height: 90%;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			overflow: hidden;
			.popuptop{
				width: 100%;
				// height: 70%;
				background-color: #FFFFFF;
				padding: 30rpx;
				color: #999999;
				font-size: 26rpx;
				.texttiele{
					color: #000000;
					text-align: center;
					font-size: 60rpx;
					margin: 30rpx 0;
				}
				.texttop{
					
				}
				.location{
					margin: 40rpx 0;
					display: flex;
					justify-content: space-between;
					.location-icon{
						text{
							font-size: 80rpx;
						}
					}
					.location-top{
						color: #000000;
						font-weight: #000000;
						font-size: 28rpx;
					}
				}
				.phone{
					margin: 30rpx 0;
					display: flex;
					justify-content: space-between;
					.phone-icon{
						text{
							font-size: 80rpx;
						}
					}
					.phone-top{
						color: #000000;
						font-weight: #000000;
						font-size: 28rpx;
					}
				}
				.agreement{
					margin: 40rpx 0;
					.agreement-one{
						
					}
					.agreement-two{
						color: #309df3;
					}
				}
			}
			.popup-bottom{
				width: 100%;
				height: 20%;
				text-align: center;
				line-height: 90rpx;
				font-size: 38rpx;
				.consent{
					width: 100%;
					height: 50%;
					background-color: #f03b65;
					color:#fff;
				}
				.disagree{
					width: 100%;
					height: 50%;
					
				}
			}
		}
	}
	.loginAgreementText{
		.loginagreementTitle{
			text-align: center;
			padding: 16rpx;
			font-weight: bold;
			font-size: 30rpx;
		}
	}
	.loginagreementText{
		font-size: 24rpx;
		padding: 20rpx 40rpx;
		background-color: #f2f2f2;
		.agreementText{
			color:#2d8ed8;
		}
	}
</style>
