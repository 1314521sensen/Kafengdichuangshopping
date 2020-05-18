<template>
	<view class="coupons" v-if="couponsbool==true">
		<!-- 这是优惠卷的信息 -->
		<scroll-view scroll-x="true">
			<view class="rows">
				<!-- v-for="(item,index) in list" :key="index" -->
				<view class="coupons-for">

					<view class="coupons-list" v-for="(citem,cindex) in list" :key="cindex">
						<view class="coupons-top">
							<text>￥</text>
							<text class="price">{{citem.money}}</text>
							<text class="quan">券</text>
						</view>
						<!-- 优惠券左右白色圆点 -->
						<view class="dot left"></view>
						<view class="dot right"></view>
						<view class="coupons-bottom">
							<text>{{ citem.at_full?'满'+citem.at_full:'无门槛'}}使用</text>
							<view class="at-once" :data-coucontype="citem.coupon_type_id" @tap="Platformreceive">
								立即抢券
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		//这是优惠卷的组件
		data() {
			return {
				tokey:"",
				list: [],
				couponsbool:true
			}
		},
		methods:{
			Platformreceive(e){
				// console.log(cid)
				uni.request({
					url:`${app.globalData.Requestpath}activity/userGetPlatformCoupon`,
					method:"POST",
					data:{
						token:this.tokey,
						cid:e.currentTarget.dataset.coucontype
					},
					success(res) {
						if(res.data.code==0){
							app.globalData.showtoastsame(res.data.msg)
						}else{
							app.globalData.showtoastsame(res.data.msg)
						}
					}
				})
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
					// console.log(res.data)
					uni.request({
						url:`${app.globalData.Requestpath}activity/getPlatformCouponTypeList`,
						method:"POST",
						data:{
							token:res.data,
							page:1,
							pageSize:3,
						},
						success(rescoupons) {
							if(rescoupons.data.code==0){
								_this.list = rescoupons.data.data.list
								_this.couponsbool = true
							}else{
								_this.couponsbool = false
							}
						}
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.coupons {
		width: 100%;
		height: 152rpx;
		padding-left:20rpx;
		.rows {
			width: 300%;
			display: flex;

			.coupons-for {
				width: 100%;
				display: flex;
				// justify-content: space-around;
				width: 95%;
				height: 148rpx;
				background-color: #fff;

				.coupons-list {
					position: relative;
					align-items: center;
					width: 240rpx;
					height: 120rpx;
					background-image: linear-gradient(to right, #e60578, #e62d28);
					box-shadow: 5rpx 20rpx 20rpx #ccc;
					color: #fff;
					border: 1px solid #fee03c;
					margin-right:20rpx;
					border-radius:16rpx;
					.coupons-top {
						// border: 2px solid blue;
						border-bottom: 4rpx dashed #fff;
						overflow: hidden;

						font-weight: 700;
						font-size: 40rpx;
						padding-left: 10rpx;
						height: 50rpx;
						line-height: 50rpx;
						position: relative;
						width: 100%;
						margin: 0 auto;

						.price {
							margin-left: 25rpx;
						}

						.quan {
							position: absolute;
							border: 2px solid #fee03c;
							border-radius: 50%;
							width: 40rpx;
							height: 40rpx;
							text-align: center;
							line-height: 40rpx;
							transform: rotateZ(-30deg);
							top: -10rpx;
							right: -10rpx;
							font-size: 20rpx;
						}
					}
					.dot {
						position: absolute;
						width: 22rpx;
						height: 22rpx;
						background-color: #fff;
						border-radius: 50%;
						&.left {
							left: -8rpx;
						}
						top: 42rpx;
						&.right {
							right: -8rpx;
							
						}
					}
					
					.coupons-bottom {
						text-align: center;
						width: 100%;

						.at-once {
							position: absolute;
							width: 120rpx;
							left: calc(50% - 60rpx);
							bottom: -20rpx;
							height: 30rpx;
							margin-top: -20rpx;
							border-radius: 20rpx;
							background-color: #fff;
							color: #f00;
							border: 4rpx solid #fae053;
							font-size: 10rpx;
							line-height: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
