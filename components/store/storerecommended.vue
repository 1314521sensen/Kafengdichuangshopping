<template>
	<view class="storerecommended">
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="storerecommended-title">
				<text>热销宝贝</text>
			</view>
			<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
		</scroll-view>
		
	</view>
</template>

<script>
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	export default{
		data(){
			return {
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
						price:88
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:888
					}
				]
			}
		},
		components:{
			horizontallylist
		}
	}
</script>

<style lang="less" scoped>
	.storerecommended-title{
		color:#000;
		padding-left:16rpx;
		margin:28rpx 0;
		text{
			font-size: 33rpx;
			color:#565656;
			font-weight: bold;
		}
	}
	.scroll-view{
		height:80vh;
	}
</style>
