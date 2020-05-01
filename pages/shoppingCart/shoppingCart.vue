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
			<shoppingcatlist :tokey="tokey" @price="price" @datalist="datalist" @dataindex="dataindex" @datacarid="datacarid"></shoppingcatlist>
		</view>
		<!-- 从bool值往后 是 shoppingcartlist子组件数据 传给父组件 再由这个组件传过去 -->
		<!--  @deteindexdata="deteindexdata" -->
		<shopingbottompay :totalpic="totalpic" :bool="bool" :zizujianlist="zizujianlist" :xiabiao="xiabiao" :tokey="tokey" :carid="carid"></shopingbottompay>
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
				returnsindex:[],
				tokey:"",
				carid:""
			}
		},
		methods: {
			//这是传过来的价格
			price(e){
				if(e){//判断传过来的价格有没有 有的话 就采用 没有的话就赋值0
					this.totalpic = e
				}else{
					this.totalpic = 0
				}
				
			},
			//这是传过来的数组
			datalist(e){
				this.zizujianlist = e
			},
			//这是传过来的下标
			dataindex(e){
				this.xiabiao = e
			},
			datacarid(e){
				this.carid = e
			},
			//这是shopingbottompay组件传过来的删除后的数组  在将下标返回去删除
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
			const _this = this
			//父组件事件接收子组件传过来的值
			// this.price()
			// this.deteledatalist()
			// this.deteledatasubscript()
			//在购物车刚加载的时候 获取用户的tokey值
			uni.getStorage({
				key:"bindtokey",
				success(res){
					_this.tokey = res.data
				}
			})
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