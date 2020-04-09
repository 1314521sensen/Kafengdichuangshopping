<template>
	<view class="storenews">
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="storerecommended-title">
				<text>{{Month}}月{{day}}日</text>
			</view>
			<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
		</scroll-view>
	</view>
</template>

<script>
	//这是店铺新品
	//引入横向列表
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	export default{
		data(){
			return {
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
				]
			}
		},
		methods:{
			
		},
		components:{
			horizontallylist
		},
		props:["Month","day"]
	}
</script>

<style lang="less" scoped>
	.storenews{
		.scroll-view{
			height:80vh;
			.storerecommended-title{
				color:#000;
				padding-left:16rpx;
				margin:28rpx 0;
				text{
					font-size: 33rpx;
					color:#565656;
				}
			}
		}
	}
</style>
