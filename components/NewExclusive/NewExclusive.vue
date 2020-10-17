<template>
	<view class="NewExclusivebox">
		<view class="img" :style="{'background-image':'url('+httpUrl+'NewExclusive/NewExclusiveone.png'+')'}">
			<text class="receive" @tap="coupon">开心收下</text>
			<text class="lg text-gray cuIcon-close" @tap.stop="close"></text>
			<text class="price">{{total_price}}</text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				total_price:0,
				httpUrl:this.$store.state.httpUrl
			};
		},
		methods:{
			close(){
				this.$store.state.NewExclusivebool = false
			},
			coupon(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(restokey){
						uni.request({
							url: `${app.globalData.Requestpath}activity/userGetNewgiftbag`,
							method: "POST",
							data: {
								token:restokey.data
							},
							success(res) {
								if(res.data.code == 0){
									_this.$store.state.NewExclusivebool = false
									app.globalData.showtoastsame("领取成功")
								}else{
									uni.navigateTo({
										url: `/pages/login/login`
									});
								}
							}
						})
					},
					fail(){
						uni.navigateTo({
							url: `/pages/login/login`
						});
					}
				})
			}
		},
		created() {
			const _this = this
			// 新人礼包总价
			uni.request({
				url: `${app.globalData.Requestpath}activity/getNewgiftbagPrice`,
				method: "POST",
				data: {
					page:1,
					pageSize:10
				},
				success(res) {
					// console.log(res,8888)
					_this.total_price = res.data.data.total_price
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.NewExclusivebox{
	height: 100vh;
	width: 100vh;
	background-color:rgba(0,0,0,.5);
	position: fixed;
	top: 0;
	z-index: 9999;
	.img{
		// background-image: url(/static/NewExclusiveone.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: relative;
		top: 300rpx;
		left: 80rpx;
		width: 600rpx;
		height: 720rpx;
		.text-gray{
			position: relative;
			left: 350rpx;
			font-size: 80rpx;
			color: #CCCCCC;
		}
		.price{
			display:inline-block;
			font-size: 50rpx;
			color: #FFFFFF;
			position: relative;
			top: 256rpx;
			right: 224rpx;
			transform:rotateZ(-35deg) ;
			font-weight: bold;
		}
		.receive{
			position: relative;
			top: 618rpx;
			left: 186rpx;
			color: red;
			font-size: 50rpx;
			font-weight: bold;
		}
	}
}
</style>
