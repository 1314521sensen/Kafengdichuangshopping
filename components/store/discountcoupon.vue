<template>
		<!-- 优惠券 -->
		<view class="discountCoupon" :style="{'background-image':'url('+this.$store.state.httpUrl+'store/striated_bg.png'+')'}">
				<!-- 优惠券的总盒子 -->
				<view class="discountCoupon_box">
					<scroll-view scroll-x="true" class="Scoeoll_box">
						<!-- 单个优惠券 -->
						<view  class="scoView" >
							<view class="discounBox" v-for="(item,index) in discountList" :key="index"> 
								<view class="fullsubtract">
									<text class="fuprice"><text>{{item.price}}</text>元</text>
									<text class="reduction">满{{item.Fullreduction}}元用</text>
								</view>
								<view class="godraw">
									<text>立即领取</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>	
		</view>
</template>

<script>
	export default {
		data() {
			return {
				discountList:[
					{
						price:10,
						Fullreduction:200
					},
					{
						price:10,
						Fullreduction:200
					},
					{
						price:10,
						Fullreduction:200
					},
					{
						price:10,
						Fullreduction:200
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
        // 优惠券 
		.discountCoupon{
			padding: 30rpx 0;
			width: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			// background-color: red;
			display: flex;
			align-items: center;
			// 装所有优惠局的盒子
			.discountCoupon_box{
				overflow: hidden;
					.scoView{
						display: flex;
						width: 1500rpx;
					}
				// 每个优惠券
				.discounBox{
					display: flex;
					margin-left: 40rpx;
					width: 320rpx;
					height: 175rpx;
					position: relative;
					background-image: linear-gradient(to right, #ec661c, #f0942c, #ec661c);
					.fullsubtract{
						 flex:1;
						 display: flex;
						 flex-direction: column;
						 color: #FFFFFF;
						 text-align: center;
						 margin-top: 20rpx;
						.fuprice{
							text{
								font-size: 70rpx;
							}
						}
						.reduction{
							font-size: 32rpx;
						}
					}
					.godraw{
						width: 30rpx;
						padding: 0 80rpx 0 0;
						border-left: 4rpx dashed #FFFFFF;
						text{
							margin: 8rpx 0 0 20rpx;
							display: block;
							color: #FFFFFF;
						}
					}
				}
			}
		}
</style>
