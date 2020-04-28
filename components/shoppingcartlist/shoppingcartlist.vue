<template>
	<view class="cart-list">
		<!-- 最后循环这个item -->
		<view class="cart-item">
			<view class="cart-item-top">
				<text class="cart-item-title">小明店铺</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="cart-item-bottom">
				<checkbox-group class="block">
					<view class="cu-form-group">
						<checkbox :checked="true" value="A"></checkbox>
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
						<text>¥69.9</text>
						<view class="numbers">
							<button >-</button>
							<input type="text" value="1" placeholder-class="inp" disabled="true"></input>
							<button >+</button>
						</view>
					</view>
				</view>
			</view>
			<view class="cart-item-bottom">
				<checkbox-group class="block">
					<view class="cu-form-group">
						<checkbox :checked="true" value="A"></checkbox>
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
						<text>¥69.9</text>
						<view class="numbers">
							<button >-</button>
							<input type="text" value="1" placeholder-class="inp" disabled="true"></input>
							<button >+</button>
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
				total:0,
				tokey:""
			}
		},
		methods:{
			
		},
		created(){
			const _this = this
			//获取用户的tokey值
			uni.getStorage({
				key:"bindtokey",
				success(res){
					// console.log(res.data)
					_this.tokey = res.data
				}
			})
			// console.log(_this.tokey)
			// http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList
			//获取购物车的列表详情
			// uni.request({
			// 	url:"http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList",
			// 	method:"POST",
			// 	data:{
			// 		token:_this.token,
			// 		page:1,
			// 		pageSize:2
			// 	},
			// 	success(res){
			// 		console.log(res)
			// 	}
			// })
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
</style>