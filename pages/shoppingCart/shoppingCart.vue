<template>
	<view class="shoppingcart">
		<!-- 这是评判高度 -->
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 这是购物车的部分 -->
		<view class="cart">
			<view class="cart-title">
				<text>购物车</text>
				<text @click="showmanagement">管理</text>
			</view>
			<!-- 这是shoppingcartlist子组件 传过来的数据-->
			<!-- :returnsindex="returnsindex" -->
			<shoppingcatlist @getChild1="getChild1" @deteledatalist="deteledatalist" @deteledatasubscript="deteledatasubscript" :returnsindex="returnsindex"></shoppingcatlist>
		</view>
		<!-- 从bool值往后 是 shoppingcartlist子组件数据 传给父组件 再由这个组件传过去 -->
		<!--  @deteindexdata="deteindexdata" -->
		<shopingbottompay :totalpic="totalpic" :bool="bool" :zizujianlist="zizujianlist" :xiabiao="xiabiao" @deteindexdata="deteindexdata"></shopingbottompay>
	</view>
</template>

<script>
	import shoppingcatlist from "@/components/shoppingcartlist/shoppingcartlist.vue"
	import shopingbottompay from "@/components/shoppingcartlist/shopingbottompay.vue"
	const app = getApp();
	export default {
		
		data() {
			return {
				totalpic:0,
				bool:true,
				zizujianlist:[],
				xiabiao:null,
				returnsindex:[]
			}
		},
		methods: {
			getChild1(e){
				// console.log(e)
				if(e){
					this.totalpic = e
				}else{
					this.totalpic = 0
				}
			},
			//这是传过来的数组
			deteledatalist(e){
				this.zizujianlist = e
			},
			//这是传过来的下标
			deteledatasubscript(e){
				this.xiabiao = e
			},
			//这是shopingbottompay组件传过来的删除后的数组  在将下标返回去删除
			deteindexdata(e){
				this.returnsindex = e
				// console.log(e) 这是删除后的数组
			},
				// console.log(this.totalpic)
			//这是管理
			showmanagement(){
				if(this.bool){
					this.bool = false
				}else{
					this.bool = true
				}
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		onShow(){
			
		},
		created(){
			//父组件事件接收子组件传过来的值
			this.getChild1()
			// this.deteledatalist()
			// this.deteledatasubscript()
		},
		components:{
			shoppingcatlist,
			shopingbottompay
		}
	}
</script>

<style lang="less" scoped>
	.shoppingcart{
		padding:0 20rpx;
		.cart{
			.cart-title{
				display:flex;
				justify-content: space-between;
				padding:0 25rpx;
				text{
					display:block;
					font-size: 40rpx;
					&:first-child{
						font-weight: bold;
					}
					&:last-child{
						font-size: 35rpx;
					}
				}
			}
		}
		
	}
</style>