<template>
	<!-- 底部支付 -->
	 <!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
		<view class="detailscar">
			<view class="same settlement" v-if="bool==true">
				<!-- <view class="same-left">
					<checkbox class="checkboxs" ></checkbox>
					<label>全选</label>
				</view> -->
				<view class="same-right">
						<view class="same-right-text">
							<text>合计:</text>
							<!-- 如果传过来的数组里面的checked为false的时候就为0否则就用本身的值 -->
							<!-- 这里报错的原因是因为 父组件给子组件传值的时候异步传 开始的时候 传过来的是[](一个空数组) 导致的里面没有checked -->
							<!-- <text>¥{{zizujianlist.length<=0?0:(zizujianlist[xiabiao].checked?totalpic:0)}}</text> -->
							<text>¥{{totalpic}}</text>
						</view>
					<button class="cu-btn round bg-orange" @tap="settlement">结算</button>
				</view>
			</view>
			<!-- 这是删除的 -->
			<view class="same delete" v-if="bool==false">
				<!-- <view class="same-left">
					<checkbox class="checkboxs"></checkbox>
					<label>全选</label>
				</view> -->
				<view class="same-right">
					<button class="cu-btn round bg-red" @tap="detele">删除</button>
				</view>
			</view>
		</view>
	<!-- #endif -->
	
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
			}
		},
		methods:{
			//这是结算
			settlement(){
				if(this.xiabiao!==null){
					try{
						if(this.zizujianlist[this.xiabiao].checked){
							// console.log(this.num)//数量
							// console.log(this.goodid)
							// console.log(this.storename)//店铺的名字
							// console.log(this.goodname)//商品的标题
							// console.log(this.goodimg)//商品的图片
							// console.log(this.goodprice)//商品的单价
							//点击购买现在进行跳转
							uni.navigateTo({
								url:`/pages/Purchasepage/Purchasepage?gid=${this.goodid}&num=${this.num}&way=1&img=${JSON.stringify(this.goodimg)}&storename=${this.storename}&price=${this.goodprice}&goodtitle=${this.goodname}&cids=${this.carid}&storeid=${this.storeid}`
							})
						}
					}
					catch(err){
						throw err
					}
				}else{
					uni.showToast({
						title:"请选择你要购买的商品",
						icon:"none"
					})
				}
			},
			//删除
			detele(){
				// console.log(this.zizujianlist)
				// console.log(this.xiabiao)
				//该方法会改变原数组 返回被删除的数据
				//第一个参数 是下标 第二个参数 删除几个
				// if(this.xiabiao==null){
				// 	let arr = this.zizujianlist.splice(this.xiabiao,1)
				// 	console.log(arr)
				// }else{
				// 	uni.showToast({
				// 		title:"请选择你要删除的商品",
				// 		icon:"none"
				// 	})
				// }
				// console.log(this.xiabiao)
				const _this = this
				//这里一定要注意 虽然null是假值 传过来的下标0也是
				if(this.xiabiao!==null){
					try{
						if(this.zizujianlist[this.xiabiao].checked){
							console.log(this.tokey)
							console.log(this.carid)
							//调用删除的功能接口
							uni.startPullDownRefresh();
							uni.request({
								url:"http://hbk.huiboke.com/api/shopping_cart/deleteShoppingCartInfo",
								method:"POST",
								data:{
									token:this.tokey,
									cid:this.carid
								},
								success(res) {
									if(res.data.code==0){
										
										// console.log(_this.tokey)
										//实时刷新 
										//请求数据
										uni.request({
											url:"http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList",
											method:"POST",
											data:{
												token:_this.tokey,
												page:1,
												pageSize:10
											},
											success(res) {
												if(res.data.code==0){
													console.log("删除成功")
													uni.stopPullDownRefresh();
													console.log(res.data.data)
													//将请求的数据传到父组件
													_this.$emit("deleteData",res.data.data)
													//当用户删除成功了，将状态改成false 为了修复bug
													_this.$emit("deletestatic",false)
												}
											}
										})
									}else{
										app.globalData.showtoastsame("删除失败")
									}
								}
							})
							//在这里删除	
							// this.zizujianlist.splice(this.xiabiao,1)
							// //将改变后的数组通过事件车发送个shoppingcarlist组件
							// 		let newsuupdatearr = this.zizujianlist
							// 		//这里发送个数据 是异步 所以要变成同步的 用promise
							// 		this.$emit("deteindexdata",newsuupdatearr)
						}else{
							app.globalData.showtoastsame("请选择你要删除的商品")
						}
					}
					catch(err){
						throw err
					}
				}else{
					app.globalData.showtoastsame("请选择你要删除的商品")
				}
			}
		},
		props:["totalpic","bool","zizujianlist","xiabiao","tokey","carid","num","goodid","storename","goodname","goodimg","goodprice","storeid"],
		
	}
</script>

<style lang="less" scoped>
	.detailscar{
		position: fixed;
		/* #ifdef H5 */
		bottom: 96rpx;
		/* #endif */
		/* #ifdef APP-PLUS || MP-WEIXIN */
		bottom:0rpx;
		/* #endif */
		width: 100%;
		height: 100rpx;
		left: 0;
		z-index: 99;
		background:#fff;
		padding:15rpx 0;
		.same{
			display:flex;
			justify-content: flex-end;
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
				width: 50%;
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
</style>
