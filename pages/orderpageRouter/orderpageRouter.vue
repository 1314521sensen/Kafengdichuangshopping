<template>
	<view class="orderForm">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- <actionbar  
			message="退款列表" 
			:Jumpchoose="false" 
			url="/pages/PersonalMy/PersonalMy"
			:isorder="isoder"
		></actionbar> -->
		<actionbar  
			:message="orderstatus" 
			:Jumpchoose="false" 
			url="/pages/PersonalMy/PersonalMy"
			:isorder="isoder"
		></actionbar>
		<scroll-view scroll-x class="bg-white nav" v-if="indexs!=5">
			<view class="flex text-center">
				<view 
					class="cu-item flex-sub" 
					:class="index==TabCur?'text-orange cur':''" 
					v-for="(item,index) in Myorder" 
					:key="index" 
					@tap="tabSelect" 
					:data-id="index"
					:data-geturl="item.url"
				>
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		<scroll-view class="scroll-view" @scrolltolower="scrollBottom" scroll-y = "true" v-if="indexs!=5">
				<view 
					class="orderFormList" 
					v-for="(item,index) in this.$store.state.Temporarynonpaymentlist" 
					:key='index'
					@tap="linkDetails"
					:data-order_sn="item.order_sn"
					:data-title="item.store_name"
					:data-dispatch_price="item.change_dispatch_price"
					:data-swift_no="item.swift_no"
					:data-address_id="item.address_id"
					:data-buyer_name="item.buyer_name"
					:data-price="item.price"
					:data-create_time="item.create_time"
					:data-send_time="item.send_time"
					:data-finish_time="item.finish_time"
					:data-cancel_time="item.cancel_time"
				>
						<view class="img">
							<image :src="imgpath+item.store_logo" mode=""></image>
						</view>
						<view class="title-text">
							<view class="item-text">
								<text>{{item.store_name}}</text>
							</view>
							<view class="price">
								<text v-text="'￥'+item.price"></text>
								<text 
									class="text-gray cuIcon-delete deletesize" 
									@tap.stop="deletescollectionAndfootprint"
									:data-order_sn="item.order_sn"
									v-if="item.status==-1 || item.status==3"
								></text>
								
							</view>
						</view>
				</view>
				<Nopage v-show="this.$store.state.Temporarynonpaymentlist.length == 0" :prompttext="prompttext"></Nopage>
		</scroll-view>
		<ReturntheMoneylist v-if="indexs==5"></ReturntheMoneylist>
	</view>
</template>

<script>
	const app = getApp()
	import ReturntheMoneylist from "@/components/Commoditycomponent/ReturntheMoneylist.vue"
	import actionbar from "@/components/actionbar/actionbar.vue"
	import Nopage from "@/components/Nopage.vue"
	export default {
		data() {
			return {
				orderstatus:"",
				statusBar:0,
				TabCur: 0,
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
				url:"",
				indexs:"",
				page:1,
				geturls:'',
				judge:true,
				imgpath:this.$store.state.imgyuming,
				isoder:false,
				TabCurBool:0,
				prompttext:'暂无订单'
			}
		},
		components:{
			ReturntheMoneylist,
			actionbar,
			Nopage
		},
		methods:{
			scrollBottom(){
				// console.log("划到底部")	
				this.page++
				this.$store.commit("scrollBottom",{pages:parseInt(this.page)})
				if(this.judge){
					this.$store.commit("getTemporarynonpayment",{index:parseInt(this.TabCur),geturl:this.url})
				}else{
					this.$store.commit("getTemporarynonpayment",{index:parseInt(this.TabCur),geturl:this.geturls})
				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if(!(this.TabCurBool == this.TabCur)){
					this.$store.state.orderpage = 1
					this.page = 1
					this.judge = false
					this.$store.state.Temporarynonpaymentlist = []
					let {geturl} = e.currentTarget.dataset
					this.geturls = geturl
					this.TabCurBool = this.TabCur
					this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
					this.$store.commit("getTemporarynonpayment",{index:parseInt(this.TabCur),geturl:this.geturls})
				}
				
			},
			linkDetails(e){
				// console.log(e.currentTarget.dataset.order_sn)title
				let {order_sn,title,dispatch_price,swift_no,address_id,buyer_name,price,create_time,send_time,finish_time,cancel_time} = e.currentTarget.dataset
				//这是往vuex里面存东西
				this.$store.commit("linkDetails",{order_sn:order_sn,title:title,dispatch_price:dispatch_price,swift_no:swift_no,address_id:address_id,buyer_name:buyer_name,price:price,create_time:create_time,send_time:send_time,finish_time:finish_time,cancel_time:cancel_time})
			},
			//这是删除
			deletescollectionAndfootprint(e){
				this.$store.state.orderpage = this.$store.state.orderpage -1
				let {order_sn} = e.currentTarget.dataset
				this.page = 1
				this.$store.state.orderpage = 1
				this.$store.commit("deletescollectionAndfootprint",{order_sn,TabCur:this.TabCur,url:this.url})
			}
		},
		created(){
			this.$store.state.Temporarynonpaymentlist = []
			this.$store.state.orderpage = 1
			this.TabCurBool =this.TabCur
		},
		onLoad(opction){
			// console.log(opction.index)
			 if(opction.index == 5){
				 this.orderstatus = "退款列表"
			 }else{
				 this.orderstatus = "订单列表"
			 }
			const _this = this
			let {index,is_order} = opction
			//如果index等等于undefined就让index等于0
			if(index==undefined){
				index=0
			}
			//这里为了判断 是不是要跳转的路由
			if(is_order=="is_order"){
				_this.isoder = false
			}else{
				_this.isoder = true
			}
			//每次进来的时候改变nav的导航
			_this.TabCur = index
			_this.indexs = index
			switch(parseInt(index)){
				case 0:
					_this.url="order/getAllOrderList"
					break;
				case 1:
					_this.url="order/getUnPayOrderList"
					break;
				case 2:
					_this.url="order/getPayOrderList"
					break;
				case 3:
					_this.url="order/getSendOrderList"
					break;
			}
			_this.$store.commit("getTemporarynonpayment",{index:parseInt(index),geturl:_this.url})
			this.statusBar = app.globalData.statusBar
		},
		onBackPress(e){
			if(e.from=="backbutton"){
				uni.redirectTo({
					url:"/pages/PersonalMy/PersonalMy"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.orderForm{
		background-color: #F8F8F8;
	}
	.scroll-view{
		overflow: hidden;
		height:91vh;
		background-color: #F8F8F8;
		// background-color:red;
	}
	.orderFormList{
		height: 200rpx;
		background-color: white;
		margin-bottom: 20rpx;
		padding: 6rpx 30rpx;
		display: flex;
		justify-content: space-between;
		.img{
			border-radius: 10rpx;
			overflow: hidden;
			image{
				width: 188rpx;
				height: 188rpx;
				background-color: #CCCCCC;
			}
		}
		.title-text{
			width: 490rpx;
			// background-color: green;
			height: 188rpx;
			display: flex;
			flex-direction:column;
			justify-content: space-around;
			.price{
				color: #FF0000;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.deletesize{
		font-size: 32rpx;
	}
</style>
