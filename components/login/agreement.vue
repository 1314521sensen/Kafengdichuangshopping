<template>
	<view class="agreement" v-show="loginprop!==1">
		<view class="pop">
			<scroll-view scroll-y="true" class="scroll">
				<view>
					<view class="loginAgreementText">
						<view class="loginagreementTitle">用户协议和隐私协议</view>
						<view class="loginagreementText">山东卡风迪创信息科技有限公司（注册地址：山东省德州市经济开发区宋官屯街道办事处三八东路董子文化街汇智街28号一层）一直以来都非常重视个人信息的保护。您可阅读惠播客<text class="agreementText" @tap="agreementText">《用户协议》</text>和<text class="agreementText" @tap="agreementText">《隐私政策》</text>在您浏览访问惠播客平台网站、应用程序、微信小程序等或者注册登录使用惠播客的任何产品和服务时，我们将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。</view>
					</view>
				</view>
			</scroll-view>
			<view class="button">
				<!-- <view class="button-left" @tap="agreement">
					<text>不同意</text>#2d8ed8
				</view> -->
				<view class="button-right" @tap="agreement">
					<text class="loginagree">同意</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginprop:1
			};
		},
		methods:{
			agreement(){
				const _this = this
				uni.setStorage({
					key:"loginprop",
					data:1,
					success() {
						_this.loginprop = 1
					},
					fail(err){
						
					}
				})
			},
			agreementText(){
				uni.navigateTo({
					url:`/pages/loginagreement/loginagreement`
				})
			}
		},
		created() {
			const _this = this
			//取出缓存中的值 如果值等于0的情况下 就让弹窗显示
			uni.getStorage({
				key:"loginprop",
				success(res){
					_this.loginprop = res.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.agreement {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		padding: 400rpx 100rpx;

		.pop {
			border-radius: 10rpx;
			overflow: hidden;
			// height: 100%;
			width: 100%;
			background-color: #FFFFFF;
			letter-spacing:3rpx;
			.scroll {
				height: 85%;
				width: 100%;
				// padding: 20rpx 20rpx 0;
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
			}

			.button {
				line-height: 80rpx;
				height: 15%;
				width: 100%;
				display: flex;
				justify-content: space-between;

				.button-left {
					width: 50%;
					text-align: center;
					border: 2rpx solid #CCCCCC ;
				}
				.button-right {
					width: 100%;
					text-align: center;
					// border: 2rpx solid #CCCCCC ;
					// background-color:green;
					.loginagree{
						color:#2d8ed8;
					}
				}
			}
		}
	}
</style>
