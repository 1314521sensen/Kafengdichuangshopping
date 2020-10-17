<template>
	<view class="BottomPopup">
		<view class="cu-bar bg-white margin-top" @tap="showModal" data-target="bottomModal">
			<view class="action">
				{{parameter}}
				<text>品牌,型号...</text>
			</view>
			<view class="action">
				<!-- <button class="cu-btn bg-green shadow"  >Bottom</button> -->
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<!-- 这是底部的弹出的窗口 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" @tap="hideModal">
			<view class="cu-zidingyi cu-dialog">
				<view class="padding-xl">
					<scroll-view scroll-y="true" style="height: 60vh;overflow: hidden;">
						<text>品牌参数</text>
						<view class="popup-list">
							<view class="popup-list-auxiliary" v-for="(item,index) in brandlist" :key="index">
								<view class="popup-list-same popup-list-left">{{item.attr_name}}:</view>
								<view class="popup-list-same popup-list-right">{{item.attr_value}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="cu-bar bg-red">
					<view class="action text-green determine" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			//这是底部弹窗的组件
			return {
				modalName: null,
				// 这是品牌的参数
				brandlist: []
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			}
		},
		props: ["parameter", "storeid", "gid"],
		created() {
			const app = getApp()
			const _this = this
			uni.request({
				url: `${app.globalData.Requestpath}good/getGoodattributeList`,
				data: {
					sid: _this.storeid,
					gid: _this.gid
				},
				success(res) {

					if (res.data.code == 0) {
						_this.brandlist = res.data.data
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.margin-top {
		margin-top: 10rpx;
	}

	.cu-bar {
		min-height: 70rpx;

		.action {
			&:first-child {
				font-size: 24rpx !important;

				text {
					margin-left: 12rpx;
				}
			}
		}

		.determine {
			&:first-child {
				width: 100%;
				display: block;
				text-align: center;
				font-size: 28rpx !important;
				font-weight: bold;
				color: #fff;
			}

		}
	}

	.cu-zidingyi {
		// height:50%;
		border-radius: 20rpx 20rpx 0 0 !important;

	}

	.padding-xl {
		// height: 40vh;
		padding: 40rpx 0 0 0;

		text {
			display: block;
			text-align: center;
			font-size: 36rpx;
		}

		.popup-list {
			margin-top: 20rpx;

			.popup-list-auxiliary {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				text-align: left;
				box-sizing: border-box;
				border-bottom: 2rpx solid #999;
				padding: 20rpx 0;
				// vertical-align: midden;
				&:last-child {
					border: 0;
				}

				.popup-list-same {
					padding-left: 14rpx;
				}

				.popup-list-left {
					color: #999;
					white-space: nowrap;
				}
				.popup-list-right {
					font-size: 30rpx;
					color: #000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
