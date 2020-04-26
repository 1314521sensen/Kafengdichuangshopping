<template>
	<view class="cu-modal bottom-modal immediately">
		<view class="cu-dialog">
			<view class="immediately-top">
				<view class="immediately-top-image">
					<image src="/static/index/indexlist/3.jpg"></image>
				</view>
				<view class="immediately-top-describe">
					<text>¥300</text>
					<view class="describe">
						挖机大家都破案啪嗒啪嗒破奥普达可大可搭配萨达是大卡卡哒的卡片地阿卡卡大萨达撒多撒所多撒啊大大大萨达
					</view>
				</view>
			</view>
			<view class="immediately-midden-scrollarea">
				<scroll-view scroll-y="true" class="scrollarea">
					<view class="scrollareaspecifications">
						<text>商品规格</text>
						<view class="yispecifications">
							<view class="specifications" v-for="(item,index) in immediatelylist" :key="index">
								<!-- <view class="specifications-left">
									<image src="/static/cart/01.webp"></image>
								</view> -->
								<view class="specifications-right">
									{{item.good_title}}
								</view>
							</view>
						</view>
					</view>
					<view class="scrollareapagespecifications">
						<view class="scrollareapagespecifications-item">
							<view class="item-text">
								套餐类型
							</view>
							<view class="item-specifications">
								<text>官方标配</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 这里购买数量没写 -->
			<button class="cu-btn bg-red lg" :style="{'width':'100%','border-radius':'32rpx'}">立即购买</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:["immediatelylist"]
	}
</script>

<style lang="less" scoped>
	.immediately{
		text-align:left;
		// height:50vh;
		.cu-dialog{
			height:63vh;
			padding:0 20rpx;
			.immediately-top{
				display:flex;
				justify-content: space-between;
				margin-top:30rpx;
				padding:0 20rpx;
				.immediately-top-image{
					width: 27%;
					height:176rpx;
					image{
						width: 100%;
						height:100%;
					}
				}
				.immediately-top-describe{
					align-items: center;
					flex:.95;
					text{
						display:block;
						color:#f00;
						font-weight: bold;
						font-size: 34rpx;
						margin:20rpx 0 15rpx;
					}
					.describe{
						overflow:hidden;
						width: 100%;
						height: 68rpx;
						font-size: 22rpx;
					}
				}
			}
		}
		.immediately-midden-scrollarea{
			font-size: 30rpx;
			font-weight: bold;
			margin:44rpx 0;
			padding: 0 20rpx;
			.scrollarea{
				height:34vh;
				//这是midden中间的规格
				.scrollareaspecifications{
					text{
						color:#7f7f7f;
						
					}
					.yispecifications{
						display:flex;
						flex-wrap: wrap;
						margin-top:50rpx;
						.specifications{
							display: flex;
							flex-wrap: wrap;
							align-items: center;
							margin:0 22rpx 10rpx 0;
							// .specifications-left{
							// 	width: 68rpx;
							// 	height: 68rpx;
							// 	background-color:red;
							// 	image{
							// 		width: 100%;
							// 		height:100%;
							// 	}
							// }
							.specifications-right{
								// display:inline-block;
								display: inline-block;
								white-space: nowrap; 
								overflow: hidden;
								text-overflow:ellipsis;
								background-color: #eee;
								line-height:68rpx;
								padding:0 10rpx;
							}
						}
					}
				}
				//这是midden一些配置规格
				.scrollareapagespecifications{
					.scrollareapagespecifications-item{
						margin-top:20px;
						.item-text{
							
						}
						.item-specifications{
							display: flex;
							flex-wrap: wrap;
							margin-top:20rpx;
							text{
								padding:12rpx;
								border:1px solid #ccc;
								border-radius:16rpx;
								margin:0 22rpx 10rpx 0;
							}
						}
					}
				}
			}
		}
	}
</style>
