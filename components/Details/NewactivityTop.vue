<template>
	<view>
		<view class="backBox bg-gradual-red">
			<view class="backFlex">
				<view class="backLeft">
					<view><text class="currentprice">￥99</text><text class="originalCost">￥199</text></view>
					<view><text>5123人正在拼</text><text class="residue">剩余200件</text></view>
				</view>
				<view class="backRight">
					<view><text class="nao lg text-white cuIcon-remind"></text>距离结束仅剩</view>
					<view class="timi">
						<text>24</text>:<text>00</text>:<text>00</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
		.backBox{
			height: 120rpx;
			display: flex;
			padding-right: 10rpx;
			flex: 1;
			.backFlex{
				display: flex;
				flex-wrap: wrap;
			}
			.backLeft{
				padding-left: 20rpx;
				color: #FFFFFF;
				.currentprice{
					font-size: 38rpx;
					line-height: 70rpx;
				}
				.originalCost{
					text-decoration: line-through;
					margin-left: 6rpx;
					margin-top: 15rpx;
				} 
				.residue{
					margin-left: 20rpx;
				}
			}
			.backRight{
				margin-left: 190rpx;
				padding-top: 20rpx;
				color: #FFFFFF;
				.nao{
					font-size: 34rpx;
				}
				.timi{
					margin-top: 5rpx;
					text{
						width: 30rpx;
						height: 30rpx;
						display:inline-block;
						background-color:#fff;
						color: #F43F3B;
						border-radius: 10rpx;
						padding: 5rpx 6rpx;
						margin: 0 10rpx;
					}
				}
			}
		}
</style>
