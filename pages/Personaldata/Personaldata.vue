<template>
	<view class="personaldata">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="个人资料"></actionbar>
		<modelkuang></modelkuang>
	</view>
</template>

<script>
	//这是引入的操作条
	import actionbar from "@/components/actionbar/actionbar.vue"
	import modelkuang from "@/components/personaldata/modelkuang.vue"
	const app = getApp()
	export default {
		//这是个人资料
		data() {
			return {
				statusBar:0,
			}
		},
		methods: {
			
		},
		components:{
			actionbar,
			modelkuang
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.personaldata{
		
	}
</style>
