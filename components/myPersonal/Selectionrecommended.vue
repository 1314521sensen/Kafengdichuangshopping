<template>
	<view class="Selectionrecommended">
		<view class="title">
			<text>精选推荐</text>
		</view>
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
	</view>
</template>

<script>
	//引入横排组件
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	export default{
		data(){
			return {
				//这是横排的数据
				horizontallylist:[
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:88
					},
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:888
					},
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:66
					},
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:99
					},
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:108
					},
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:99
					},
					{
						imgs:"/static/horizontally/2.jpeg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:66
					}]
			}
		},
		components:{
			horizontallylist
		}
	}
</script>

<style lang="less" scoped>
	.Selectionrecommended{
		background-color: #fff;
		margin-top:30rpx;
		.title{
			font-size: 36rpx;
			color:red;
			text-align:center;
			line-height:70rpx;
			padding:12rpx 0 0;
		}
	}
</style>
