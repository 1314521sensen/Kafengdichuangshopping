<template>
	<view class="shoppingcart">
		<!-- 这是评判高度 -->
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 这是购物车的部分 -->
		<view class="cart">
			<view class="cart-title">
				<text>购物车</text>
				<text @tap="showmanagement">管理</text>
			</view>
			<!-- 这是shoppingcartlist子组件 传过来的数据-->
			<!-- :returnsindex="returnsindex" -->
			<!-- 这是购物车列表的组件 -->
			<shoppingcatlist 
				:tokey="tokey" 
				@price="price" 
				@datalist="datalist" 
				@dataindex="dataindex" 
				@datacarid="datacarid" 
				@datastorename="datastorename"
				@datagoodname="datagoodname"
				@Purchasequantity="Purchasequantity"
				@datagoodimg="datagoodimg"
				@datagoodprice="datagoodprice"
				@datagoodid="datagoodid"
				@datastoreid="datastoreid"
				:shopinglist="shopinglist"
				:delatestaticbool="delatestaticbool"
			></shoppingcatlist>
		</view>
		<!-- 从bool值往后 是 shoppingcartlist子组件数据 传给父组件 再由这个组件传过去 -->
		<!--  @deteindexdata="deteindexdata" -->
		<!-- 这是购物车底部的底部的组件 -->
		<shopingbottompay 
			:totalpic="totalpic" 
			:bool="bool" 
			:zizujianlist="zizujianlist" 
			:xiabiao="xiabiao" 
			:tokey="tokey" 
			:carid="carid" 
			@deleteData="deleteData"
			@deletestatic="deletestatic"
			:num="num"
			:goodid="goodid"
			:storename="storename"
			:goodname="goodname"
			:goodimg="goodimg"
			:goodprice="goodprice"
			:storeid="storeid"
		></shopingbottompay>
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
				carid:"",
				shopinglist:[],
				delatestaticbool:false,
				num:0,
				goodid:0,
				storename:"",
				goodname:"",
				goodimg:"",
				goodprice:"",
				storeid:""
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
			datacarid(e){//这是购物车选中id
				this.carid = e
			},
			//这是店铺id
			datastoreid(e){
				this.storeid = e
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
			},
			//封装个请求列表的函数
			UpdateShoppingCartlist(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						_this.tokey = res.data
						// console.log(_this.tokey)
						app.globalData.Detectionupdatetokey(res.data)
						uni.request({
							url:"http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList",
							method:"POST",
							data:{
								token:_this.tokey,
								page:1,
								pageSize:10
							},
							success(res){
								// console.log(res)
								if(res.data.code==0){//代表获取成功
										_this.shopinglist = res.data.data
										uni.stopPullDownRefresh();//关闭下拉刷新
								}else{
									console.log("重新登录")
								}
							}
						})
					}
				})
				
			},
			//这是删除购物车的时候传过来的数据
			deleteData(e){
				this.shopinglist = e
			},
			//当用户点击了删除子组件传一个状态过来，父组件用来接收
			deletestatic(e){
				this.delatestaticbool = e
			},
			//用户子组件发送过来  父组件进行接收 用于结算---开始
			Purchasequantity(e){//购买的数量
				// console.log(e)
				this.num  = e
			},
			datagoodid(e){//商品id
				this.goodid = e
			},
			datastorename(e){//店铺名称
				this.storename = e
			},
			datagoodname(e){//商品的标题
				this.goodname = e
			},
			datagoodimg(e){
				// console.log(e)
				this.goodimg = e
			},
			datagoodprice(e){
				// console.log(e)
				this.goodprice = e
			}
			//用户点击购买的数量发送过来  父组件进行接收 用于结算---结束
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		onShow(){
			//在购物车每次显示的时候 获取用户的tokey值
			const _this = this
			_this.UpdateShoppingCartlist()
		},
		created(){
			const _this = this
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