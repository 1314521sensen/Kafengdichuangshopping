<template>
	<view>
		<QRAcgood 
			:statusBar="statusBar"
			:good_images="good_images"
			:promotion_price="promotion_price"
			:good_title="good_title"
			:gid="gid"
			:sid="sid"
			@areclose="areclose"
		></QRAcgood>
	</view>
</template>

<script>
	const app = getApp()
	import QRAcgood from '@/components/commodityshop/QRActivitgood.vue'
	export default {
		data() {
			return {
				statusBar:0,
				good_images:'',
				promotion_price:"",
				good_title:"",
				gid:0,
				sid:0
			}
		},
		methods: {
			areclose(e){
				// console.log(e)
				if(e.storetext=="分享成功"){
					app.globalData.showtoastsame("分享成功")
				}else{
					app.globalData.showtoastsame("分享失败")
				}
				uni.navigateBack()
			}
		},
		components:{
			QRAcgood
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			uni.getStorage({
				key:`indexstore`,
				success(res) {
					// console.log(res)
					let {good_img,gid,sid,price,shoptitle} = res.data
					_this.good_images = good_img
					_this.gid = gid
					_this.sid = sid
					_this.promotion_price = price
					_this.good_title = shoptitle
				}
			})
		}
	}
</script>

<style>

</style>
