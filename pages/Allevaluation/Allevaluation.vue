<template>
	<view class="Allevaluation">
		<pageheight :statusBar="statusBar"></pageheight>
		<seachinput value="" value2="" url="/pages/Details/Details"></seachinput>
	</view>
</template>

<script>
	//先引用处理页面的状态栏的高度
	import pageheight from "@/components/pageheight/pageheight.vue"
	//引用搜索栏
	import seachinput from "@/components/sortinglist/seachinput.vue"
	//这是全部路由页面
	const app = getApp();
	export default {
		data() {
			return {
				//这是页面状态栏的高度初始化
				statusBar:0,
			}
		},
		methods: {
			
		},
		components:{
			pageheight,
			seachinput
		},
		onLoad(){
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
		},
	}
</script>

<style>

</style>
