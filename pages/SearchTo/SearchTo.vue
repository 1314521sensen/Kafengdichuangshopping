<template>
	<view class="SeachTo">
		<pageheight :statusBar="statusBar"></pageheight>
		<searchbusiness :value3="value"></searchbusiness>
	</view>
</template>

<script>
	import searchbusiness from "@/components/seach/seachbusiness.vue"
	const app = getApp();
	//这是搜索的单独的也页面
	export default {
		data() {
			return {
				statusBar:0,
				value:""
			}
		},
		methods: {
			
		},
		components:{
			searchbusiness
		},
		onLoad(option){
			// console.log()
			this.value = option.value
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.SeachTo{
		background-color:#ffffff;
	}
</style>
