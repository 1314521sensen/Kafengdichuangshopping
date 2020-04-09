<template>
	<view class="securitiesbottom">
		<view class="securities">
			<view class="securities-left">
				<view class="securities-left-imgs">
					<image src="/static/securities/01.webp"></image>
				</view>
				<view class="securities-left-right">
					<view class="securities-left-right-top">
						<text>无线蓝牙音响外放无线蓝牙音响外放</text>
						<text>退货包运费</text>
					</view>
					<view class="securities-left-right-bottom">
						<text>领劵后</text>
						<text>¥9.8</text>
					</view>
				</view>
			</view>
			<view class="securities-right">
				<view class="securities-right-top">
					<text>¥</text>
					<text>1.5</text>
				</view>
				<text>充48可用</text>
				<button class="cu-btn round bg-red" @click="receive" data-target="bottomModal">立即领取</button>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="hideModal">确定</view>
				</view>
				<view class="padding-xl">
					领卷成功
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		//这是卷的下面
		data(){
			return {
				modalName: null,
			}
		},
		methods:{
			receive(e){
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				//隐藏窗口
				this.modalName = null;
				//加入到缓存里面
			},
		}
	}
</script>

<style lang="less" scoped>
	.securitiesbottom{
		margin-top:15rpx;
		.securities{
			display:flex;
			background-color: #fff;
			padding:15rpx 10rpx;
			.securities-left{
				display:flex;
				width: 80%;
				// height:50rpx;
				// background-color:red;
				.securities-left-imgs{
					width: 40%;
					height:220rpx;
					// background-color:green;
					image{
						width: 100%;
						height:100%;
					}
				}
				.securities-left-right{
					overflow: hidden;
					display:flex;
					flex-wrap: wrap;
					align-items: center;
					width: 60%;
					// background-color:pink;
					padding-left:20rpx;
					.securities-left-right-top{
						overflow:hidden;
						font-size: 30rpx;
						font-weight: bold;
						text{
							display:block;
							white-space:nowrap;
							// overflow:hidden;
							// text-overflow:ellipsis;
							&:last-child{
								font-size: 27rpx;
								color:#FF5706;
								margin-top:14rpx;
							}
							// #e02e24
						}
					}
					.securities-left-right-bottom{
						color:#e02e24;
						display:flex;
						text{
							font-size:24rpx;
							margin-top:6rpx;
							&:last-child{
								font-size: 36rpx;
								font-weight: bold;
								margin:0 0 0 10rpx;
							}
						}
					}
				}
			}
			.securities-right{
				display:flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: center;
				width: 20%;
				// background-color:yellow;
				border-left:2rpx dashed #ccc;
				text-align:center;
				color:#e02e24;
				.securities-right-top{
					display:flex;
					justify-content: center;
					text{
						font-weight: bold;
						font-size: 25rpx;
						margin-top:10rpx;
						&:last-child{
							font-size: 36rpx;
							margin-top:0rpx;
						}
					}
				}
				button{
					width: 90%;
					height:52rpx;
					font-size: 20rpx;
					padding:0;
				}
			}
		}
		
	}
</style>
