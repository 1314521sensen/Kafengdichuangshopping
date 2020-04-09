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
			<view class="cart-list">
				<!-- 最后循环这个item -->
				<view class="cart-item" v-for="(item,index) in carlist" :key="index">
					<view class="cart-item-top">
						<text class="cart-item-title">{{item.ShopName}}</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
					<view class="cart-item-bottom">
						<view class="Select-box">
							<!-- checked 选中状态打钩 --> 
							<!--  :class="checkbox[1].checked?'checked':''" :checked="checkbox[1].checked?true:false" value="B"	 -->
							<checkbox-group @change="checkboxChange" :value="index">
								<checkbox class='round' :checked="true"></checkbox>
							</checkbox-group>
						</view>
						<view class="images">
							<image :src="item.img"></image>
						</view>
						<view class="describe">
							<view class="shoping-title shopping-Title">
								{{item.title}}
							</view>
							<view class="shoping-title ModelSize">
								<text>经典唐装款;坐高50cm全长60cm大萨达大大大萨达</text>
							</view>
							<view class="price-box">
								<text>¥{{item.unitprice}}</text>
								<view class="numbers">
									<button @click="Reduction">-</button>
									<input type="text" placeholder-class="inp" :value="item.value1" disabled="true"></input>
									<button @click="add(item.value1)">+</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部支付 -->
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="detailscar">
			<!-- 这是结算的 -->
			<view class="same settlement" v-if="bool==true">
				<view class="same-left">
					<checkbox class="checkboxs" ></checkbox>
					<label>全选</label>
				</view>
				<view class="same-right">
						<view class="same-right-text">
							<text>合计:</text>
							<text>¥0</text>
						</view>
					<button class="cu-btn round bg-orange">结算</button>
				</view>
			</view>
			<!-- 这是删除的 -->
			<view class="same delete" v-if="bool==false">
				<view class="same-left">
					<checkbox class="checkboxs"></checkbox>
					<label>全选</label>
				</view>
				<view class="same-right">
					<button class="cu-btn round bg-red">删除</button>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	const app = getApp();
	export default {
		//这是购物车
		data() {
			return {
				statusBar:0,
				value:1,
				carlist:[],
				bool:true,
			}
		},
		methods: {
			//这是在缓存中取值
			getAddcart(){
				uni.getStorage({
				    key:"Addcart",
				    success:(res)=>{
				        // console.log(res);
						this.carlist = res.data
						// console.log(res)
				    }
				});
			},
			//这是减
			Reduction(){
				
			},
			//这是加
			add(value1){
			},
			//这是管理
			showmanagement(){
				if(this.bool){
					this.bool = false
				}else{
					this.bool = true
				}
			},
			checkboxChange(e){
				
				//拿到每一个数组
				let items = this.carlist
				console.log(e.detail.value)
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		onShow(){
			const _this = this
			_this.getAddcart()
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
			.cart-list{
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
		}
		.detailscar{
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			height: 100rpx;
			left: 0;
			z-index: 99;
			background:#fff;
			padding:15rpx 0;
			.same{
				display:flex;
				justify-content: space-between;
				align-items: center;
				padding:0 10rpx;
				.same-left{
					display:flex;
					align-items: center;
					width: 30%;
					height:50rpx;
					// background-color:red;
					label{
						margin-left:10rpx;
					}
				}
				.same-right{
					display:flex;
					justify-content: space-between;
					align-items: center;
					width: 33%;
					// background-color:yellow;
						.same-right-text{
							display:flex;
							align-items: center;
							text{
								display:block;
								font-size: 32rpx;
								&:last-child{
									color:#ee6c29;
									font-size: 28rpx;
									margin:8rpx 0 0 6rpx;
								}
							}
						}
				}
			}
			.delete{
				margin-top:10rpx;
			}
		}
	}
</style>
