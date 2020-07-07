<template>
	<view class="orderForm">
		<pageheight :statusBar="statusBar"></pageheight>
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
		<scroll-view class="scroll-view" scroll-y = "true" v-if="indexs!=5">
				<view 
					class="orderFormList" 
					v-for="(item,index) in this.$store.state.Temporarynonpaymentlist" 
					:key='index'
				>
						<view class="img" 
							@tap="linkDetails" 
							:data-order_sn="item.order_sn"
							:data-title="item.store_name"
							:data-dispatch_price="item.change_dispatch_price"
							:data-swift_no="item.swift_no"
							:data-address_id="item.address_id"
							:data-buyer_name="item.buyer_name"
							:data-price="item.price"
							:data-create_time="item.create_time"
							:date-send_time="item.send_time"
							:data-finish_time="item.finish_time"
						>
							<image :src="'http://hbk.huiboke.com'+item.store_logo" mode=""></image>
						</view>
						<view class="title-text">
							<view class="item-text">
								<text>{{item.store_name}}</text>
							</view>
							<view class="price">
								<text v-text="'￥'+item.price"></text>
								<text 
									class="text-gray cuIcon-delete" 
									@tap="deletescollectionAndfootprint"
									:data-order_sn="item.order_sn"
									v-if="item.status==-1 || item.status==3"
								></text>
								
							</view>
						</view>
				</view>
		</scroll-view>
		<ReturntheMoneylist v-if="indexs==5"></ReturntheMoneylist>
	</view>
</template>

<script>
	const app = getApp()
	import ReturntheMoneylist from "@/components/Commoditycomponent/ReturntheMoneylist.vue"
	export default {
		data() {
			return {
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
			}
		},
		components:{
			ReturntheMoneylist
		},
		methods:{
			tabSelect(e) {
				// console.log(e)
				let {geturl} = e.currentTarget.dataset
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.$store.commit("getTemporarynonpayment",{index:parseInt(this.TabCur),geturl:geturl})
			},
			linkDetails(e){
				// console.log(e.currentTarget.dataset.order_sn)title
				let {order_sn,title,dispatch_price,swift_no,address_id,buyer_name,price,create_time,send_time,finish_time} = e.currentTarget.dataset
				// console.log(create_time)
				//这是往vuex里面存东西
				this.$store.commit("linkDetails",{order_sn:order_sn,title:title,dispatch_price:dispatch_price,swift_no:swift_no,address_id:address_id,buyer_name:buyer_name,price:price,create_time:create_time,send_time:send_time,finish_time:finish_time})
				
			},
			//这是删除
			deletescollectionAndfootprint(e){
				let {order_sn} = e.currentTarget.dataset
				this.$store.commit("deletescollectionAndfootprint",{order_sn,TabCur:this.TabCur,url:this.url})
			}
		},
		onLoad(opction){
			const _this = this
			let {index} = opction
			//如果index等等于undefined就让index等于0
			if(index==undefined){
				index=0
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
		}
	}
</script>

<style lang="less" scoped>
	.scroll-view{
		overflow: hidden;
		height:91vh;
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
</style>
