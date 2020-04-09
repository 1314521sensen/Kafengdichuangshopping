<template>
	<view class="sortinglist">
		<pageheight :statusBar="statusBar"></pageheight>
		<seachinput :value2="value2" :value="value"></seachinput>
		<sorting></sorting>
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
	</view>
</template>

<script>
	import seachinput from "@/components/sortinglist/seachinput.vue"
	import sorting from "@/components/sortinglist/sorting.vue"
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	const app = getApp();
	export default {
		//这是商品排序列表大组件
		data() {
			return { //这两个value需要传参传个去
				value:"",
				value2:"",
				statusBar:0,
				//这是横排的显示数据
				horizontallylist:[
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:88
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:888
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:66
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:99
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:108
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:99
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:66
					}]
			}
		},
		methods: {
		},
		components:{
			sorting,
			horizontallylist,
			seachinput
		},
		onLoad(opctry){
			this.value = opctry.value
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>

</style>
