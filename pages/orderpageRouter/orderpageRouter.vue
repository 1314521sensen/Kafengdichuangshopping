<template>
	<view class="orderpagerouter">
		<pageheight :statusBar="statusBar"></pageheight>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" v-if="refundindex!=='5'">
			
			<view class="item-juactcontent">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in Myorder" :key="index" @tap="tabSelect" :data-id="index" :data-items="item.title" :data-url="item.url">
				{{item.title}}
				</view>
			</view>
		</scroll-view>
		<list :list="list" v-if="items==Myorder[TabCur].title && refundindex!=='5'" url="/pages/Temporarynonpayment/Temporarynonpayment" :display="display" :tokey="tokey"></list>
		<ReturntheMoneylist :list="refundlist" v-if="refundindex=='5'"></ReturntheMoneylist>
	</view>
</template>

<script>
	import list from "@/components/Commoditycomponent/Orderdetailslist.vue"
	import ReturntheMoneylist from "@/components/Commoditycomponent/ReturntheMoneylist.vue"
	const app = getApp();
	export default {
		//这是全部订单的顶部导航
		data() {
			return {
				statusBar:0,
				items:"全部",
				TabCur: 0,
				scrollLeft: 0,
				display:"block",
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
					}
				],
				list:[],
				tokey:0,
				refundindex:"",
				refundlist:[]
			}
		},
		methods: {
			tabSelect(e) {
				// console.log(orderindex)
				let {id,items,url} = e.currentTarget.dataset
				// console.log(id,items,url)
				// console.log(url)
				this.items = items
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.Allorders(url)
			},
			//封装一个用户点击不同的选项 显示不同状态的订单
			statusorder(_this,item){
				// console.log(_this.TabCur)
				switch(parseInt(_this.TabCur)){
					case 1:
						if(item.status==0){//当状态等于0的时候 代表未付款
							this.list.push(item)
						}
						_this.display = "none"
					break;
					case 2:
						if(item.status==1){//当状态等于0的时候 代表未付款
							this.list.push(item)
						}
						_this.display = "block"
					break;
					case 3:
						if(item.status==2){//当状态等于0的时候 代表未付款
							this.list.push(item)
						}
						_this.display = "block"
					break;
				}
			},
			//由于APP这边无法获取tokey值 只能在封装一个获取订单方法
			getorderinfoAppAndPc(_this,tokey,url){
				// console.log(url)
				uni.request({
					url:`${app.globalData.Requestpath}${url}`,
					method:"POST",
					data:{
						token:tokey,
						page:1,
						pageSize:10
					},
					success(res){
						// console.log(res)
						if(res.data.code==0){
							if(_this.TabCur=='0'){//如果等于0的话就代表 点击了全部 赋值 直接return 出去
								_this.list = res.data.data.list
								_this.display = "block"
								return 
							}
							_this.list = []
							res.data.data.list.forEach((item,index)=>{
								_this.statusorder(_this,item)
							})
						}
						app.globalData.Requestmethod(_this.tokey,res.data.msg)
					}
				})
			},
			//封装一个获取订单的方法
			Allorders(url){
				const _this = this
				// #ifdef APP-PLUS
					uni.getStorage({
						key:"bindtokey",
						success(restokey){
							_this.getorderinfoAppAndPc(_this,restokey.data,url)
						}
					})
				// #endif
				_this.getorderinfoAppAndPc(_this,_this.tokey,url)
			},
			//封装一个 退货款的方法
			ReturntheMoney(refundurl){
				const _this = this
				//这是去申请退款的商品的列表
				uni.getStorage({
					key:"bindtokey",
					success(restokey){
						uni.request({
							url:`${app.globalData.Requestpath}order/getRefundOrderList`,
							method:"POST",
							data:{
								token:restokey.data,
								page:1,
								pageSize:5,
							},
							success(resrefund) {
								// console.log(resrefund)
								if(resrefund.data.code==0){
								// console.log(resrefund,"这是退款的")
									_this.refundlist = _this.refundlist.concat(resrefund.data.data.list)
									
								}
								app.globalData.Requestmethod(_this.tokey,resrefund.data.msg)
							}
						})
						//这是退货退款的
						uni.request({
							url:`${app.globalData.Requestpath}order/getRefundAndGoodsOrderList`,
							method:"POST",
							data:{
								token:restokey.data,
								page:1,
								pageSize:5,
							},
							success(resrefund) {
								if(resrefund.data.code==0){
									// console.log(resrefund)
								// console.log(resrefund,"这是退货退款的")
									_this.refundlist = _this.refundlist.concat(resrefund.data.data.list)
									// console.log(_this.refundlist)
								}
								app.globalData.Requestmethod(_this.tokey,resrefund.data.msg)
							}
							
						})
					}
				})
			}
		},
		components:{
			list,
			ReturntheMoneylist
		},
		onShow(){
			// this.ReturntheMoney('order/getRefundOrderList')//这是退款的
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
				// console.log(orderindex)
				if(orderindex!=='5'){
					this.TabCur = orderindex
					this.items = this.Myorder[orderindex].title
					url = this.Myorder[orderindex].url
					this.Allorders(url)
				}else{
					//将退货的按钮下标赋值
					this.refundindex = orderindex
					//这是封装了退货退款的
					this.ReturntheMoney()
				}
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
		.item-juactcontent{
			display:flex;
			justify-content: space-around;
		}
	}
</style>
