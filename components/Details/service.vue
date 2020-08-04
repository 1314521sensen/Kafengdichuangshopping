<template>
	<view class="serviceBox">
		<view class="service">
			<view class="servicetext">
				<text>服务</text>
			</view>
			<view class="spotGoods">
				<text>现货</text>
			</view>
			<view class="delivery-time">
				<text>23:10前下单，预计({{getMonth}}月{{getDate}}日)送达</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getMonth:'',
				getDate:''
			};
		},
		created() {
			let date = new Date()
			let getFullYear = date.getFullYear()
			let getMonth = date.getMonth() + 1
			let getDate = date.getDate()
			let newdate = new Date(getFullYear, getMonth, getDate + 3)
			// console.log(newdate.getDate())
			this.getMonth=newdate.getMonth()
			this.getDate=newdate.getDate()
		}
	}
</script>

<style lang="less" scoped>
	.serviceBox {
		background-color: #FFFFFF;
		margin-top: 10rpx;

		.service {
			padding: 0 30rpx;
			height: 80rpx;
			display: flex;
			justify-content: left;
			line-height: 80rpx;

			.servicetext {
				text {
					letter-spacing: 30rpx;
					color: #999999;
				}
			}
			.spotGoods{
				padding: 0 10rpx;
				text{
					font-weight: bold;
					color: #FF0000;
				}
			}
			.delivery-time{
				text{
					font-size: 24;
				}
			}
		}
	}
</style>
