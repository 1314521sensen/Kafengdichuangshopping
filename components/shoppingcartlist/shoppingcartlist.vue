<template>
	<view class="cart-list">
		<!-- 最后循环这个item -->
		<view class="cart-item" v-for="(item,index) in checkbox" :key="index">
			<view class="cart-item-top">
				<text class="cart-item-title">小明店铺</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			{{checkbox[index].checked}}
			{{item.value}}
			<view class="cart-item-bottom">
				<checkbox-group class="block" @change="CheckboxChange">
					<view class="cu-form-group">
						<checkbox :class="checkbox[index].checked?'checked':''" :checked="checkbox[index].checked?true:false" :value="item.value"></checkbox>
					</view>
				</checkbox-group>
				<view class="images">
					<image src="/static/cart/01.webp"></image>
				</view>
				<view class="describe">
					<view class="shoping-title shopping-Title">
						大老鼠
					</view>
					<view class="shoping-title ModelSize">
						<text>经典唐装款;坐高50cm全长60cm大萨达大大大萨达</text>
					</view>
					<view class="price-box">
						<text>¥{{item.shoppic}}</text>
						<view class="numbers">
							{{item.inputvalue}}
							<button @tap="Reduction(item.inputvalue,index)">-</button>
							<input type="text" :value="item.inputvalue" placeholder-class="inp" disabled="true"></input>
							<button @tap="add(item.inputvalue,index)">+</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				checkbox: [{
					value: 'A',
					inputvalue:1,
					shoppic:50,
					checked: false
				}, {
					value: 'B',
					inputvalue:2,
					shoppic:90.8,
					checked: false
				}, {
					value: 'C',
					inputvalue:3,
					shoppic:60,
					checked: false
				}],
				total:0
			}
		},
		methods:{
			//这是减
			Reduction(value1,index){
				// console.log(value1,"这是计算前")
				if(value1>1){
					--value1
				}else{
					value1 = 1
				}
				this.checkbox[index].inputvalue = value1
				// console.log(value1,"这是计算后")
					if(this.checkbox[index].checked){
						this.smallforehead(this.checkbox[index].inputvalue,this.checkbox[index].shoppic,index)
					}
			},
			//这是加
			add(value1,index){
				// console.log(index)
				// console.log(value1,"这是计算前")
				this.checkbox[index].inputvalue = ++value1
				// console.log(value1,"这是计算后")
				if(this.checkbox[index].checked){
					this.smallforehead(this.checkbox[index].inputvalue,this.checkbox[index].shoppic,index)
				}
			},
			//计算商品的价格
			smallforehead(Aftercalculation,unitprice,i){
				// console.log(this.checkbox[i].checked)//i是每个商品的下标
				//Aftercalculation数量 
				//unitprice单价
				let totalprice = 0
				totalprice = unitprice*Aftercalculation
				//和
				this.total = totalprice
				//将和的值 传给父组件渲染到页面上
				this.$emit("getChild1",this.total);
			},
			CheckboxChange(e) {
				// console.log(e)
				var items = this.checkbox,//这里是数组里的三个对象
					values = e.detail.value;
					// console.log(values) //A
					//这是colorui的
					//lengI 是0 1 2 
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						// console.log(lenJ) 111
						if (items[i].value == values[j]) {
							// console.log(items[i].value) //A
							// console.log(values[j]) //A
							items[i].checked = true;
							// console.log(i) //每一个对象的下标
							// console.log(items[i].inputvalue)
							// console.log(items[i].shoppic)
							// console.log(this.returnsindex)
							// if(this.returnsindex!==null){
							// 	items.splice(this.returnsindex[0],1)
							// }else{
							// 	console.log(2)
							// }
							//当用户选中时才能传递
								//实现删除数据 把数据和下标传递过去
								this.$emit("deteledatalist",items)//这是数据
								this.$emit("deteledatasubscript",i)//这是下标
							//第一个参数 数量 第二个参数 单价
							this.smallforehead(items[i].inputvalue,items[i].shoppic,i)
							break
						}
					}
				}
			},
		},
		props:["returnsindex"], //这是传过来啊的下标
		//在生命周期函数里面进行加工修改
		beforeUpdate() {
			if(this.returnsindex.length==''){
				return 
			}else{
				console.log(this.returnsindex)
				this.checkbox = this.returnsindex
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
				margin-top:20rpx;
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
</style>