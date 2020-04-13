<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<information :couponslistdata="couponslistdata"></information>
		<mycoupons></mycoupons>
		<orders></orders>
		<myScratchableLatex></myScratchableLatex>
		<!-- <setup></setup> -->
		<Selectionrecommended></Selectionrecommended>
	</view>
</template>

<script>
	import orders from "@/components/myPersonal/orders.vue";
	import myScratchableLatex from "@/components/myPersonal/myScratchableLatex.vue";
	import information from "@/components/myPersonal/PersonalInformation.vue";
	import mycoupons from "@/components/myPersonal/coupons.vue"
	// import setup from "@/components/myPersonal/setup.vue"
	//这是精选推荐
	import Selectionrecommended from "@/components/myPersonal/Selectionrecommended.vue"
	const app = getApp();
	export default {
		//这是个人中心
		data() {
			return {
				statusBar:0,
				couponslistdata:[],
			}
		},
		components:{
			orders,
			myScratchableLatex,
			information,
			mycoupons,
			// setup,
			Selectionrecommended
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		methods: {
			
		},
		onShow(){
			//当数据发生改变得时候 就获取缓存中的值
			uni.getStorage({
				key:"couponsData",
				success:(res)=>{
					// console.log(res)
					this.couponslistdata = res.data
				},
				fail(err){
					this.couponslistdata = null
				}
			})
		}
	}
</script>

<style>

</style>
