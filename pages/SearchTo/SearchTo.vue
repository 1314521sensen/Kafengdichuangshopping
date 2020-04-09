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
				value:"",
				statusBar:0
			}
		},
		methods: {
			
		},
		components:{
			searchbusiness
		},
		onLoad:function(option){
			this.value=option.value
			this.statusBar = app.globalData.statusBar
		},
	}
</script>

<style lang="less" scoped>
	.SeachTo{
		background-color:#ffffff;
	}
</style>
