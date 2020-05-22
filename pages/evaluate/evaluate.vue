<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<scroll-view scroll-x class="bg-gray nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in tabSelectList" :key="index" @tap="tabSelect" :data-id="index" :data-url="item.url">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 这是评价列表组件 -->
			<Evaluate 
				:TabCur="TabCur" 
				:tokey="tokey" 
				:evaluatelist="evaluatelist" 
				:loadingbool="loadingbool" 
				:shopinglist="shopinglist" 
				:yuming="yuming"
			></Evaluate>
			
	</view>
</template>

<script>
	const app = getApp()
	import Evaluate from "@/components/evaluate/evaluate.vue"
	export default {
		data() {
			return {
				statusBar:0,
				TabCur: 0,
				tabSelectList:[
					{
						name:"待评价",
						url:'order/getConfirmPayOrderList'
					},
					{
						name:"已评价",
						url:'order/getHaveEvaluationOrderList'
					}
				] ,
				tokey:"",
				evaluatelist:[],//这是几个订单
				loadingbool:true,
				shopinglist:[],//这是这个订单下的几个商品 类似购物车一样
				yuming:"",
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				let url = e.currentTarget.dataset.url
				this.Evaluationdata(url)
			},
			//封装一个 根据点击事件的不同 处理不同的数据
			Evaluationdata(url){
				const _this = this
				//如果传过来的url有值就采用本身的 没有就采用默认的
				let newurl = url?url:'order/getConfirmPayOrderList'
				uni.request({
					url:`${app.globalData.Requestpath}${newurl}`,
					method:"POST",
					data:{
						token:_this.tokey,
						page:1,
						pageSize:10,
					},
					success(resevaluatelist) {
						if(resevaluatelist.data.code==0){//待评价请求成功
							//这是订单 的数组
							_this.evaluatelist = resevaluatelist.data.data.list
							//这是是否让加载出现
							_this.loadingbool = false
							//这是图片的前缀
							_this.yuming = app.globalData.imgyuming
							// console.log(resevaluatelist.data.data.list)
							resevaluatelist.data.data.list.forEach((item,index)=>{
								// console.log(item.iscomment)
								// console.log(item.order_sn)
								uni.request({//根据商品的编号 去查订单内的订单商品
									url:`${app.globalData.Requestpath}order/getOrderGoodList`,
									method:"POST",
									data:{
										token:_this.tokey,
										order_sn:item.order_sn,
										page:1,
										pageSize:index
									},
									success(resshopid) {//根据订单号找到的商品
										if(resshopid.data.code==0){
											_this.shopinglist.push(resshopid.data.data.list)
										}
									}
								})
							})
						}
					}
				})
			}
		},
		components:{
			Evaluate
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		created(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					//检测tokey过没过期
					app.globalData.Detectionupdatetokey(res.data)
					_this.tokey = res.data
					_this.Evaluationdata()
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.nav .cu-item{
		height:64rpx;
		line-height:64rpx;
	}
	
</style>
