<template>
	<view class="collection">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" :message="message"></actionbar>
		<list :list="list"></list>
	</view>
</template>

<script>
	//这是引入头部的导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//引入竖列列表
	import list from "@/components/indexcomponents/list.vue"
	const app = getApp();
	//这是我的收藏
	export default{
		data(){
			return {
				message:"",
				list:[
					{
						images:'/static/index/indexlist/1.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"50"
					},
					{
						images:'/static/index/indexlist/2.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"60"
					}
				],
				statusBar:0
			}
		},
		components:{
			actionbar,
			list
		},
		onLoad(opctry){
			this.message=opctry.title
			if(opctry.title=="我的收藏"){
				//在这里请求渲染数据
			}else{
				if(opctry.title=="我的足迹"){
					// 在这里请求渲染数据
				}
			}
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	
</style>
