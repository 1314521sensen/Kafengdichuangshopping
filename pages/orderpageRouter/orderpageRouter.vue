<template>
	<view class="orderpagerouter">
		<pageheight :statusBar="statusBar"></pageheight>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in Myorder" :key="index" @tap="tabSelect" :data-id="index" :data-items="item.title" :data-url="item.url">
				{{item.title}}
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
					{
						title:"全部",
						url:"order/getAllOrderList"
					},
					{
						title:"待付款",
						url:"order/getUnPayOrderList"
					},
					{
						title:"待发货",
						url:"order/getPayOrderList"
					},
					{
						title:"已发货",
						url:"order/getSendOrderList"
					},
					{
						title:"待评价",
						url:"order/getConfirmPayOrderList"
					}
					
				],
				list:[],
				tokey:0
			}
		},
		methods: {
			tabSelect(e) {
				let {id,items,url} = e.currentTarget.dataset
				this.items = items
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.Allorders(url)
			},
			//封装一个获取订单的方法
			Allorders(url){
				uni.request({
					url:`http://hbk.huiboke.com/api/${url}`,
					method:"POST",
					data:{
						token:this.tokey,
						page:1,
						pageSize:10
					},
					success:(res)=>{
						if(res.data.code==0){
							console.log(res)
							this.list = res.data.data.list
						}
					}
				})
			}
		},
		components:{
			list,
		},
		onLoad(option){
			//当组件初始化的时候 获取用户tokey值
			uni.getStorage({
				key:"bindtokey",
				success:(res)=>{
					this.tokey = res.data
				}
			})
			// console.log(option.index)
			let orderindex = option.index
			// console.log(orderindex)//如果全部的话 就undefined
			let url = null
			if(orderindex){
				this.TabCur = orderindex
				this.items = this.Myorder[orderindex].title
				url = this.Myorder[orderindex].url
				this.Allorders(url)
			}else{
				this.TabCur = 0;
				this.items = this.Myorder[0].title
				url =  this.Myorder[0].url
				this.Allorders(url)
			}
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.orderpagerouter{
		
	}
</style>
