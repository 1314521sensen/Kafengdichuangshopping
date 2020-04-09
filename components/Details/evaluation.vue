<template>
	<view class="evaluation">
				<view class="evaluation-midden">
				<!-- 评价的上面 -->
					<view class="BottomPopup">
						<!-- 点击跳转到评价的路由 -->
						<view class="cu-bar bg-white margin-top" data-target="bottomModal" :style="{'border-bottom':'2rpx solid #999'}">
							<view class="action">
								商品评价
								<text>(51)</text>
							</view>
							<view class="action">
								<!-- <button class="cu-btn bg-green shadow"  >Bottom</button> -->
								<text>查看更多</text>
								<text class="lg text-gray cuIcon-right"></text>
							</view>
						</view>
				</view>
			</view>
			<view class="EvaluationContent">
				<!-- 这是小头像 -->
				<view class="minContent">
					<view class="padding">
						<!-- 头像动态的获取 -->
						<view class="cu-avatar sm round margin-left" 
							style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					</view>
					<text>明天的我又努力了</text>
				</view>
				<!-- 这是评论的内容 -->
				<view class="content-area">
					外观材质：抛光的不错 气味大小：有些气味 直观感受：买来做床头柜的，比想象中大，看起来美美哒！ 
				</view>
			</view>
	</view>
</template>

<script>
	//这是评价
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.evaluation{
		background-color: #fff;
		.EvaluationContent{
			padding-bottom:20rpx;
			.minContent{
				display: flex;
				margin-top:20rpx;
				view{
					&:first-child{
						padding:0;
					}
				}
				text{
					margin-left:30rpx;
				}
			}
			.content-area{
				padding:0 20rpx 0 35rpx;
				font-size: 20rpx;
				margin-top:14rpx;
			}
		}
	}
	.cu-bar{
		min-height: 70rpx;
		.action{
			font-size: 24rpx !important;
			&:first-child{
				font-size: 24rpx !important;
				text{
					margin-left:12rpx;
				}
			}
		}
	}
</style>
