<template>
	<view>
		<view>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'"  :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in 3" :key="index">
					<view class="exhibitionBanner">
						<view class="exhibitionBanner-box" >
							<view
							class="exhibitionBanner-item item-tilt" 
							v-for="(item,index) in 3" 
							:key="index" 
							:class="index==0?'item-left':'' || index==2?'item-right':''"
							>
								<view class="src">
									<image src="/static/indexOne/watches.png"></image>
								</view>
								<view class="item-center item-title">
									商城采购
								</view>
								<view class="item-center item-info">
									商城采购
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// procurementlist:[
				// 	{
				// 		perspective:534,
				// 		rotatey:-45
				// 	},
				// 	{
				// 		perspective:0,
				// 		rotatey:0
				// 	},
				// 	{
				// 		perspective:534,
				// 		rotatey:45
				// 	}
				// ]
				dotStyle: false,
			};
		}
	}
</script>

<style lang="less" scoped>
	.exhibitionBanner{
		// overflow: hidden;
		// height: 344rpx;
		// background-color: #FFFFFF;
		// width: 95%;
		// margin: 44rpx auto 0;
		margin-top:44rpx;
		padding-bottom:40rpx;
		.exhibitionBanner-scroll-view{
			margin:auto;
		}
		.exhibitionBanner-box{
			
			display:flex;
			justify-content: space-between;
			.exhibitionBanner-item{
				overflow: hidden;
				width: 230rpx !important;
				// height:229rpx;
				background-color:#fff;
				padding-bottom:10rpx;
				border-radius:16rpx;
				.src{
					width: 100%;
					display:flex;
					justify-content: center;
					margin-top:20rpx;
					image{
						width: 84%;
						height:120rpx;
						
					}
				}
				.item-title{
					font-size: 34rpx;
					margin:24rpx 0rpx 8rpx;
				}
				.item-info{
					color:red;
					font-size: 31rpx;
				}
				.item-center{
					text-align: center;
					font-weight: bold;
				}
			}
			.item-tilt{
				transform-style: preserve-3d;
				margin-right:10rpx;
				// transform: ;
				 // transform:perspective(534rpx) rotatey(-45deg);
			}
			.item-left{
				transform:perspective(534rpx) rotateY(-45deg);
			}
			.item-right{
				transform:perspective(534rpx) rotateY(45deg);
			}
		}
		
		
		
		
		// .exhibitionBanner-box{
		//     // width: 280px;
		//     // height: 400px;
		//     // position: fixed;
		//     // left: 0;
		//     // right: 0;
		//     // top:0;
		//     // bottom: 0;
		//     // margin: 200px auto;
		//     transform-style: preserve-3d;/*表示所有子元素在3D空间中呈现*/
		// 	// transform: rotate(45deg);
		//     transform: rotateX(-5deg) rotateY(0deg);
		//     animation: run 3s linear infinite;/*循环执行run动画，每30秒执行一次*/
		// 	// transform-origin: 30% 50%;
		// 	// transform: rotate(45deg);
		// 	// transform-origin:30% center;
		// 	-webkit-transform: rotate(45deg); /* Safari and Chrome */
		// 	-webkit-transform-origin:30% 10% 200rpx; /* Safari and Chrome */
		// }
		
		// /*设置图像大小、边框、圆角、位置*/
		// .exhibitionBanner-box .exhibitionBanner-item{
		//     // width: 250px;
		//     // height: 350px;
		//     // border: 5px solid #ccc;
		//     border-radius: 10rpx;
		//     position: absolute;
		//     left: 0;
		//     top: 0;
		// }
		
		// /*依次设置图像盒子中每个图像旋转后位置*/
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(1){
		//     transform: rotateY(0deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(2){
		//     transform: rotateY(36deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(3){
		//     transform: rotateY(72deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(4){
		//     transform: rotateY(108deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(5){
		//     transform: rotateY(144deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(6){
		//     transform: rotateY(180deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(7){
		//     transform: rotateY(216deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(8){
		//     transform: rotateY(252deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(9){
		//     transform: rotateY(288deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(10){
		//     transform: rotateY(324deg) translateZ(400rpx);
		// }
		// .exhibitionBanner-box .exhibitionBanner-item:nth-child(11){
		//     transform: rotateY(360deg) translateZ(400rpx);
		// }
		
		// /*采用@keyframes 规则创建run动画。*/
		// @keyframes run {
		//     0%{transform: rotateX(-6deg) rotateY(0deg);
		//     }
		//     25%{transform: rotateX(-6deg) rotateY(90deg);
		//     }
		//     50%{transform: rotateX(-6deg) rotateY(180deg);
		//     }
		//     75%{transform: rotateX(-6deg) rotateY(270deg);
		//     }
		//     100%{transform: rotateX(-6deg) rotateY(360deg);
		//     }
		// }
		
	}
</style>
