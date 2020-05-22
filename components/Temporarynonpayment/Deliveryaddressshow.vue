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
				
			}
		},
		methods:{
			Logisticsinformation(){
				uni.navigateTo({
					url:`/pages/logistics/logistics?tokey=${btoa(this.tokey)}&ordernumber=${btoa(this.ordersnSerialid)}`
				})
			}
		},
		props:["tokey","ordersnSerialid",]
	}
</script>

<style lang="less">
	.Deliveryaddressminheight{
		min-height:76rpx;
	}
</style>
