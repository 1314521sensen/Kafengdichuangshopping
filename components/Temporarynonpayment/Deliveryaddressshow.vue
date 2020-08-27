<template>
	<view class="cu-form-group margin-top Deliveryaddressminheight" @tap="Logisticsinformation">
		<view class="title">物流信息</view>
		<view>
			
		</view>
		<text class="lg text-gray cuIcon-right"></text>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				 encrypted:'',
			}
		},
		props:["buyer_mobile"],
		methods:{
			// Logisticsinformation(){
			// 	// console.log(111)
			// 	uni.navigateTo({
			// 		url:`/pages/logistics/logistics`
			// 	})
			// }
			Logisticsinformation(){
				const _this = this 
					uni.getStorage({
						key:"express_sn",
						success(res){
							_this.order_sn = res.data[0]
							
							_this.encrypted = btoa(_this.buyer_mobile)
							uni.navigateTo({ 
								url:`/pages/logistics/logistics?order_sn=${_this.order_sn}&mobile=${_this.encrypted}`
							})
							// console.log(_this.order_sn,'雨淋湿的天空，毁的很讲究')
						}
					})
				}
		},
		
	}
</script>

<style lang="less">
	.Deliveryaddressminheight{
		min-height:76rpx;
	}
</style>
