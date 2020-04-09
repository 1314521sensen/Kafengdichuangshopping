<template>
	<view class="orderpagerouter">
		<pageheight :statusBar="statusBar"></pageheight>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in Myorder" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
				{{item}}
			</view>
		</scroll-view>
		<!-- <view v-for="(item,index) in 10" :key="index" v-if="index==TabCur" class="bg-grey padding margin text-center">
			Tab{{index}}
		</view> -->
		<view >{{items}}</view>
		<list :list="list" v-if="items==Myorder[TabCur]" url="/pages/Temporarynonpayment/Temporarynonpayment"></list>
	</view>
</template>

<script>
	import list from "@/components/indexcomponents/list.vue"
	const app = getApp();
	export default {
		//这是全部订单的顶部导航
		data() {
			return {
				statusBar:0,
				items:"全部",
				TabCur: 0,
				scrollLeft: 0,
				Myorder:[
					"全部",
					"待付款",
					"待发货",
					"待收货",
					"已发货",
					"退款售后"
				],
				list:[
					{
						images:'/static/index/indexlist/1.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"50"
					}
				]
			}
		},
		methods: {
			tabSelect(e) {
				// console.log(e.currentTarget.dataset)
				let {id,items} = e.currentTarget.dataset
				this.items = items
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		components:{
			list,
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.orderpagerouter{
		
	}
</style>
