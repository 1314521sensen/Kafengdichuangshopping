<template>
	<view class="content">
		<pageheight :statusBar="statusBar"></pageheight>
		<search  @inpblue="inpblue"></search>
		<banner :swiperList="swiperList" height="300"></banner>
		<ScratchableLatex :cuIconList="cuIconList" :gridCol="gridCol"></ScratchableLatex>
		<coupons></coupons>
		<shoppinglist></shoppinglist>
	</view>
</template>

<script>
	
	import search from "@/components/indexcomponents/search.vue"
	import banner from "@/components/indexcomponents/banner.vue"
	import ScratchableLatex from "@/components/indexcomponents/ScratchableLatex.vue"
	import coupons from "@/components/indexcomponents/coupons.vue"
	import shoppinglist from "@/components/indexcomponents/shoppinglist.vue"
	const app = getApp();
	export default {
		//这是首页
		data() {
			return {
				//这是首页的高度
				statusBar:0,
				//这是九宫格的数据通过父子组件传递
				cuIconList: [
					{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				gridCol: 4,//这是格数
				// 这是banner的数据
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					url2:"pages/bannerRouter/bannerRouter"
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					url2:"/pages/bannerRouter/bannerRouter"
				}],
			}
		},
		
		methods: {
			inpblue(e){
				if(e){
					e.blur()
				}
			}
		},
		onLoad(){
			
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
		},
		components:{
			search,
			banner,
			ScratchableLatex,
			coupons,
			shoppinglist,
			// pageheight
		},
		onShow(){
			this.inpblue()
		}
	}
</script>

<style>
	
</style>
