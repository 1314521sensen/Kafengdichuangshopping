<template>
	<view class="shoppinglist">
		<!-- 这里是组件定义出去 -->
		<list :list="list"></list>
	</view>
</template>

<script>
	import list from "@/components/indexcomponents/list.vue"
	export default{

		data(){
			return {
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
					},
					{
						images:'/static/index/indexlist/3.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"100"
					},
					{
						images:'/static/index/indexlist/4.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"120"
					},
					{
						images:'/static/index/indexlist/1.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"50"
					},
					{
						images:'/static/index/indexlist/2.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"60"
					},
					{
						images:'/static/index/indexlist/3.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"100"
					},
					{
						images:'/static/index/indexlist/4.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"120"
					}
				]
			}
		},
		components:{
			list,
		}
	}
</script>

<style>
</style>
