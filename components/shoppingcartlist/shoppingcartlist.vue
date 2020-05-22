<template>
	<view class="cart-list">
		<!-- 最后循环这个item -->
		<view class="cart-item" v-for="(item,index) in shopinglist" :key="index">
			<view class="cart-item-top">
				<text class="cart-item-title">{{item.store_name}}</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="cart-item-bottom" v-for="(items,indexs) in item.sub" :key="indexs">
				<checkbox-group 
					@change="CheckboxChange"
					:data-index="index"
					:data-indexs="indexs"
					:data-id="items.good_id"
					:data-unitprice="items.good_price"
					:data-num="numlistxiabiao[index][indexs].good_num"
					:data-carid="items.cart_id"
					:data-storeid="item.store_id"
				>
					{{numlistxiabiao[index][indexs].checked}}
					{{items.good_id}}
					<view>
						<checkbox :class="items.good_id==idbool &&checkbool?'checked':''" :checked="numlistxiabiao[index][indexs].checked" value="index"></checkbox>
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
							data-target="bottomModal"
							:data-id="items.good_id"
						>{{itemitem.spec_name+" "+itemitem.spec_value}}</text>
					</view>
					<view class="price-box">
						<text>¥{{items.good_price}}</text>
						<view class="numbers">
							<button @tap="Adddeletepublic(items.good_id,index,indexs,false,items.good_price)" :data-id="items.good_id">-</button>
							<input type="text" 
								:value="numlistxiabiao[index][indexs].good_num?numlistxiabiao[index][indexs].good_num:'1'" 
								placeholder-class="inp" 
								disabled="true"
							></input>
							<button @tap="Adddeletepublic(items.good_id,index,indexs,true,items.good_price)">+</button>
						</view>
					</view>
				</view>
			</view>
			111
			<!-- 弹窗商品规格列表 -->
			<immediatelypopup :class="modalName=='bottomModal'?'show':''"  
				:immediatelylist="immediatelylist"
				:bool="bool"
				@hiddends="hiddends"
				@guigedata="guigedata"
			></immediatelypopup>
			<!-- 这是cart-item-bottom小列表结束 -->
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import immediatelypopup from "@/components/Details/immediatelypopup.vue"
	// import tanchuang from "@/components/Details/immediatelypopup.vue"
	export default{
		data(){
			return {
				total:0,
				checkedbool:true,
				modalName:null,
				radio: 'radio1',
				id:"",
				immediatelylist:[],
				bool:true,
				newslist:[],
				str:"",
				onloadbool:false,//设置开关
				numlistxiabiao:[],//获取用户商品的数量
				checkbool:false,
				idbool:"",
				toals:0,
				shopcheckboxindex:0,
				shopcheckboxindexs:0,
			}
		},
		methods:{
			//封装一个数量增加 减少功能
			Adddeletepublic(getid,index,indexs,adddeletebool,unitprice){
				if(adddeletebool){
					++this.numlistxiabiao[index][indexs].good_num
					if(this.numlistxiabiao[index][indexs].checked){
						// console.log(this.numlistxiabiao[index][indexs].good_num) //这里把用户购买的数量 传给父级
						this.$emit("Purchasequantity",this.numlistxiabiao[index][indexs].good_num)
						//当用户选中时 点击的+号的时候 用来计算价格
						this.totals(unitprice,this.numlistxiabiao[index][indexs].good_num)
					}else{
						this.toals = 0
					}
				}else{
					if(this.numlistxiabiao[index][indexs].good_num<=1){
						app.globalData.showtoastsame("数量不能小于1")
					}else{
						--this.numlistxiabiao[index][indexs].good_num
						//当用户选中是时 点击-号时 用来减
						if(this.numlistxiabiao[index][indexs].checked){
							this.$emit("Purchasequantity",this.numlistxiabiao[index][indexs].good_num)
							this.totals(unitprice,this.numlistxiabiao[index][indexs].good_num)
						}else{
							this.toals = 0
						}
					}
				}
			},
			//封装个总价
			totals(unitprice,num){//unitprice单价  num数量
				// 单价*数量
				this.toals = unitprice*num
				this.$emit("price",this.toals)
			},
			CheckboxChange(e){
				let {index,indexs,id,unitprice,num,carid,storeid} = e.currentTarget.dataset
				this.idbool = id
				// //开始先让他们都为false
				this.numlistxiabiao.forEach((item,itemindex)=>{
					item.forEach((itemitem,itemsindexs)=>{
						this.numlistxiabiao[itemindex][itemsindexs].checked = false
						this.checkbool = false
					})
				})
				if(this.idbool==id){
					//如果当前的没有为true 在点击其他的 就让他为false
					if(this.checkbool){
						this.numlistxiabiao[index][indexs].checked = false
						this.checkbool = false
					}else{//否则都为true
						this.numlistxiabiao[index][indexs].checked = true
						this.checkbool = true
						//把选中的数组发送过去
						
						let {good_id,store_name,good_name,good_pic,good_price,good_freight} = this.numlistxiabiao[index][indexs]
						// console.log(good_pic)
						// console.log(this.numlistxiabiao[index][indexs])
						//向父组件传递 用于结算用---开始  这么写后期改小程序用
						this.$emit("datagoodid",good_id)//商品的id
						this.$emit("datastorename",store_name)//店铺名称
						this.$emit("datagoodname",good_name)//商品的标题
						this.$emit("datagoodimg",good_pic)//商品的图片
						this.$emit("datagoodprice",good_price)//商品的单价
						this.$emit("Purchasequantity",this.numlistxiabiao[index][indexs].good_num)//商品的数量
						this.$emit("freight",good_freight)//商品运费
						//向父组件传递 用于结算用---结束
						// console.log(this.numlistxiabiao[index])
						this.$emit("datalist",this.numlistxiabiao[index])
						this.$emit("dataindex",indexs)
						this.$emit("datacarid",carid)
						this.$emit("datastoreid",storeid)
						this.totals(unitprice,num)
					}
				}
				
			},
			showModal(e) {
				//获取id值用来获取商品的规格
				this.id = e.currentTarget.dataset.id
				
				this.modalName = e.currentTarget.dataset.target
				console.log(e.currentTarget.dataset.target)
				// http://hbk.huiboke.com/api/
				// uni.request({
				// 	url:"http://hbk.huiboke.com/api/good/getGoodSpecList",
				// 	data:{
				// 		gid:this.id
				// 	},
				// 	success:(res)=>{
				// 		if(res.data.code==0){
				// 			this.immediatelylist = res.data.data
				// 			// this.modalName = e.currentTarget.dataset.target
				// 			// console.log(this.modalName)
				// 		}
				// 	}
				// })
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
				console.log(_this.tokey)
				console.log(_this.shopinglist)
				if(_this.shopinglist.length<=0){
					uni.request({
							url:"http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList",
							method:"POST",
							data:{
								token:_this.tokey,
								page:1,
								pageSize:10
							},
							success(res){
								console.log(res)
								if(res.data.code==0){//代表获取成功
									if(_this.onloadbool==false){
										// console.log(res.data.data)
										_this.shopinglist = res.data.data
										uni.stopPullDownRefresh();//关闭下拉刷新
								}
								}else{
									console.log("重新登录")
								}
								//这个遍历为了拿到购物车的数量
								_this.shopinglist.forEach((item,index)=>{
									_this.numlistxiabiao[index] = item.sub
								})
							}
						})
				}else{
					console.log("数组里面有值")
					_this.shopinglist = _this.shopinglist
				}
			}
		},
		components:{
			immediatelypopup
			// tanchuang
		},
		props:["tokey","shopinglist","delatestaticbool"], //这是传过来啊的下标
		created(){
			// console.log(111)
			// console.log(this.shopinglist)
			const _this = this
			if(_this.tokey==""){
				uni.getStorage({
					key:"bindtokey",
					success(res){
						console.log(res)
						_this.tokey = res.data
						// console.log(_this.tokey)
						_this.UpdateShoppingCart(_this)
					}
				})
			}else{
				_this.UpdateShoppingCart(_this)
			}		
		}
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