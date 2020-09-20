<template>
	<view 
		class="shoreicon"
		@tap="shopshore"
		:data-good_img="pic.good_pic"
		:data-gid="pic.good_id"
		:data-sid="pic.store_id"
		:data-price="pic.good_promotion_price"
		:data-shoptitle="pic.good_title"
	>
		<text class="lg text-gray cuIcon-share right_arrow"></text>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			shopshore(e){
				let {good_img,gid,sid,price,shoptitle} = e.currentTarget.dataset
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						app.globalData.Detectionupdatetokey(res.data)
						uni.setStorage({
							key:"indexstore",
							data:{
								good_img,
								gid,
								sid,
								price,
								shoptitle
							},
							success() {
								uni.navigateTo({
									url:`/pages/shareshop/shareshop`
								})
							}
						})
					},
					fail(err){
						uni.navigateTo({
							url:`/pages/login/login`
						})
					}
				})
			}
		},
		props:["pic"]
	}
</script>

<style lang="less" scoped>
	.shoreicon{
		position:fixed;
		top:50rpx;
		right:20rpx;
		width: 70rpx;
		height:70rpx;
		background-color:rgba(0,0,0,0.6);
		border-radius:50%;
		text-align:center;
		line-height:70rpx;
		z-index:2;
		.right_arrow{
			color:#fff;
			font-size:34rpx;
		}
	}
</style>
