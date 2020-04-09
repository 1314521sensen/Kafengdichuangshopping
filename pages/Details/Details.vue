<template>
	<view class="Details">
		<detailsbanner :swiperList="swiperList" height="720"></detailsbanner>
		<pricetitle :pic="pic"></pricetitle>
		<imgs :imglist="imgs"></imgs>
		<bottomcar :pic="pic" imgs="/static/cart/01.webp"></bottomcar>
	</view>
</template>

<script>
	// 这是商品的轮播图
	import detailsbanner from "@/components/indexcomponents/banner.vue"
	//这是商品的商品的title
	import pricetitle from "@/components/Details/PriceTitle"
	//这是详情图
	import imgs from "@/components/Details/detailsimgs.vue"
	import bottomcar from "@/components/Details/detailsbottomcar.vue"
	export default {
		data() {
			return {
				//这是轮播图的数据
				swiperList:[
					{
						id: 1,
						type: 'image',
						url: '/static/Details/banner1.png',
						url2:"/pages/bannerRouter/bannerRouter"
					},
					{
						id: 2,
						type: 'image',
						url: '/static/Details/banner2.png',
						url2:"/pages/bannerRouter/bannerRouter"
					},
					{
						id: 3,
						type: 'image',
						url: '/static/Details/banner3.png',
						url2:"/pages/bannerRouter/bannerRouter"
					},
					{
						id: 4,
						type: 'image',
						url: '/static/Details/banner4.png',
						url2:"/pages/bannerRouter/bannerRouter"
					}
				],
				//这是详情页的图片的数据
				imgs:[
					"/static/Details/O1CN01UuLYnf1KPwpca0wIK_!!2399641157.jpg_640x0q80_.webp",
					"/static/Details/dfb5cbd7-556a-43a1-9e7b-c485e7b550dc.jpg"
				],
				//这是标题和价格数据
				pic:{
					title:"coconordic意大利 SC(Square circle)同款茶几简约现代北欧小茶桌",
					unitprice:"78.8",
					ShopName:"小明时尚衣服店铺",
					checked:false,
					value1:1,
				}
			}
		},
		methods: {
		
		},
		components:{
			detailsbanner,
			pricetitle,
			imgs,
			bottomcar
		},
		onLoad(){
			
		}
	}
</script>

<style lang="less" scoped>
	.Details{
		position: relative;
	}
</style>
