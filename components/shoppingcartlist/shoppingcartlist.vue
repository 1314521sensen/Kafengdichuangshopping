<template>
	<view class="cart-list">
		<!-- 最后循环这个item -->
		<view class="cart-item" v-for="(item,index) in shopinglist" :key="index">
			<view class="cart-item-top">
				<text class="cart-item-title">{{item.store_name}}</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="cart-item-bottom" v-for="(items,indexs) in item.sub" :key="indexs">
				<checkbox-group @change="CheckboxChange">
					<view>
						<checkbox class="" checked="false" value="indexs"></checkbox>
					</view>
				</checkbox-group>
				<view class="images">
					<image :src="'http://hbk.huiboke.com/'+items.good_pic"></image>
				</view>
				<view class="describe">
					<view class="shoping-title shopping-Title">
						{{items.good_name}}
					</view>
					<view class="shoping-title ModelSize">
						<!-- spec_name spec_value -->
						<text 
							v-for="(itemitem,indexss) in JSON.parse(items.spec)" 
							:key="indexss" 
							@tap="showModal" 
							data-target="RadioModal"
							:data-id="items.good_id"
						>{{itemitem.spec_name+" "+itemitem.spec_value}}</text>
					</view>
					<view class="price-box">
						<text>¥{{items.good_price}}</text>
						<view class="numbers">
							<button >-</button>
							<input type="text" :value="items.good_num" placeholder-class="inp" disabled="true"></input>
							<button >+</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 这是cart-item-bottom小列表结束 -->
		</view>
		<!-- 弹窗商品规格列表 -->
		<immediatelypopup
			:class="modalName=='RadioModal'?'show':''" 
			:immediatelylist="immediatelylist"
			:bool="bool"
			@hiddends="hiddends"
			@guigedata="guigedata"
		></immediatelypopup>
	</view>
</template>

<script>
	import immediatelypopup from"@/components/Details/immediatelypopup.vue"
	export default{
		data(){
			return {
				total:0,
				shopinglist:[],
				checkedbool:true,
				modalName:null,
				radio: 'radio1',
				id:"",
				immediatelylist:[],
				bool:true,
				newslist:[],
				str:"",
				onloadbool:false,//设置开关
			}
		},
		methods:{
			CheckboxChange(e){
				console.log(e)
			},
			showModal(e) {
				
				//获取id值用来获取商品的规格
				this.id = e.currentTarget.dataset.id
				// http://hbk.huiboke.com/api/
				uni.request({
					url:"http://hbk.huiboke.com/api/good/getGoodSpecList",
					method:"GET",
					data:{
						gid:this.id
					},
					success:(res)=>{
						if(res.data.code==0){
							this.immediatelylist = res.data.data
							this.modalName = e.currentTarget.dataset.target
						}
					}
				})
			},
			hiddends(e) {
				this.modalName = e
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			//这是子组件传给父组件的值
			guigedata(e){
				const _this = this
				//当用户点击了规格这 就让下拉刷新的状态为true
				this.onloadbool = true
				// console.log(e)
				uni.request({
					url:"http://hbk.huiboke.com/api/shopping_cart/updateGoodSpec",
					method:"POST",
					data:{
						token:this.tokey,
						gid:this.id,
						spec:e
					},
					success:(res)=>{
						if(res.data.code==0){
							if(_this.onloadbool){//如果为true的话就开启下拉刷新
								uni.startPullDownRefresh()//开启下拉刷新
								_this.UpdateShoppingCart(_this)
								_this.onloadbool = false
							}
						}else{
							console.log(_this.onloadbool)
							console.log("修改失败")
						}
					}
				})
			},
			//更新购物车
			UpdateShoppingCart(_this){
				uni.request({
					url:"http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList",
					method:"POST",
					data:{
						token:_this.tokey,
						page:1,
						pageSize:10
					},
					success(res){
						if(res.data.code==0){//代表获取成功
							if(_this.onloadbool==false){
								_this.shopinglist = res.data.data
								uni.stopPullDownRefresh();//关闭下拉刷新
							}
						}
					}
				})
			}
		},
		components:{
			immediatelypopup,
		},
		created(){
			const _this = this
			_this.UpdateShoppingCart(_this)
		},
		props:["returnsindex","tokey"], //这是传过来啊的下标
		//在生命周期函数里面进行加工修改
		// beforeUpdate() {
		// 	if(this.returnsindex.length==''){
		// 		return 
		// 	}else{
		// 		console.log(this.returnsindex)
		// 		this.checkbox = this.returnsindex
		// 	}
		// }
	}
</script>

<style lang="less" scoped>
	.cart-list{
		padding-bottom:100rpx;
		.cart-item{
			padding:20rpx 10rpx;
			background-color: #fff;
			border-radius:16rpx;
			margin-top:40rpx;
			.cart-item-top{//在是购物车列表的top
				display: flex;
				align-items: center;
				padding:14rpx 0;
				text{
					font-size: 34rpx;
					font-weight: bold;
					&:last-child{
						font-weight: normal;
						font-size: 28rpx;
						margin:8rpx 0 0 10rpx;
					}
				}
			}
			.cart-item-bottom{//在是购物车列表的中间
				display:flex;
				justify-content: space-around;
				margin:20rpx 0 40rpx;
				&:last-child{
					margin-bottom:0;
				}
				.cu-form-group{
					padding:0;
				}
				.Select-box{
					border-radius:50%;
					width: 8%;
					height:50rpx;
					// background-color:yellow;
					.checkbox-inp{
						width: 36rpx;
						height:36rpx;
					}
				}
				.images{
					width: 26%;
					height:180rpx;
					// background-color:red;
					image{
						width: 100%;
						height:100%;
					}
				}
				.describe{
					flex:50%;
					// background-color:pink;
					padding-left:20rpx;
					.shopping-Title{
						height: 80rpx;
					}
					.shoping-title{
						overflow: hidden;
						text-overflow: ellipsis;
						display:flex;
						flex-wrap: wrap;
						font-size: 30rpx;
					}
					.ModelSize{
						margin-top:44rpx;
						text{
							background-color: #f2f2f2;
							color:#999;
						}
						
					}
					.price-box{
						display:flex;
						justify-content: space-between;
						margin-top:44rpx;
						padding-right:10rpx;
						text{
							font-size: 30rpx;
							color:#ee6c29;
							font-weight: bold;
							margin-top:8rpx;
						}
						.numbers{
							display: flex;
							button{
								width: 74rpx;
								height:44rpx;
								line-height:1.1;
								font-weight: normal;
								margin:0;
								// border:2rpx solid #999;
								border-radius:0 !important;
								background-color: #fff;
								color:#999;
								&:first-child{
									
								}
								&:last-child{
									
									
								}
							}
							input{
								width: 108rpx;
								height:20rpx;
								// border:2rpx 0 solid #999;
								border-top:2rpx solid #ccc;
								border-bottom:2rpx solid #ccc;
								// border-style: solid;
								// border-color:#ccc;
								font-size: 24rpx;
								text-align:center;
								height:44rpx;
							}
							
						}
					}
				}
			}
		}
	}
	.cu-modal{
		background: rgba(0, 0, 0, 0.2)
	}
</style>