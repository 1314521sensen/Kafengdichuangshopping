<template>
	<view class="cu-modal bottom-modal immediately">
		<view class="cu-dialog">
			<view class="immediately-top">
				<view class="immediately-top-image">
					<image :src="'http://hbk.huiboke.com'+img"></image>
				</view>
				<view class="immediately-top-describe">
					<view class="price">
						<text v-if="price!==''">¥{{price}}</text>
						<text class="lg text-gray cuIcon-close" @tap="Shutdown"></text>
					</view>
					<view class="describe" v-html="text">
						
					</view>
				</view>
			</view>
			<view class="immediately-midden-scrollarea">
				<scroll-view scroll-y="true" class="scrollarea">
					<view class="scrollareapagespecifications">
						<view class="scrollareapagespecifications-item" v-for="(item,index) in shopinglist" :key="index">
							<view class="item-text">
								{{item.spec_name}}
							</view>
							<view class="item-specifications">
								<text 
								    
									@tap="choose"
									class="test"
									:data-specvalue="item.spec_value"
									:data-prices="item.spec_price"
									:data-specid="item.id"
									:data-numa="item.good_num"
								>{{item.spec_value}}</text>  
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				color:"#000",
				selectedlist:[],
				selectedlistnamelist:{},
				text:"",//规格里面的商品名字
				datalist:[],
				price:"",
				good_sids:0,
				good_gids:0,
				img:"",
				shopinglist:[],
				totalpic:'',
				// remotaicent:''
			}
		},
		methods:{
			//这是当用户点击规格
			choose(e){
				console.log(111)
				let {specvalue,prices,specid,numa}= e.currentTarget.dataset
				// console.log(prices)
				this.price = prices
				this.text = specvalue
				this.selectedlist
				console.log(this.selectedlist)
				// uni.startPullDownRefresh()//开启下拉刷新   
				// console.log(this.good_sids)
				const _this = this
				console.log(e)
				// 合计	
				_this.$emit('numprice',this.price)
				
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						// console.log(`${app.globalData.Requestpath}shopping_cart/updateGoodSpec`)
						uni.request({
							url:`${app.globalData.Requestpath}shopping_cart/updateGoodSpec`,
							method:"POST",
							data:{
								token:res.data,
								gid:_this.good_gids,
								spec_id:specid
							},
							success(resspecifications) {
								if(resspecifications.data.code!==0){
									app.globalData.showtoastsame(resspecifications.data.msg)
								}else{
									uni.request({
										url:`${app.globalData.Requestpath}shopping_cart/getShoppingCartList`,
										method:"POST",
										data:{
											token:res.data,
											page:1,
											pageSize:10
										},
										success(resjiazai) {
											if(resjiazai.data.code==0){
												_this.$emit("updataimmediatelylist",resjiazai.data.data)
												// 返回的数据
												// console.log(resjiazai.data.data)
												// 合计的功能 
											}
										}
									})
								}
							}
						})
					}
				})
				
				this.$emit("hiddends",null)
			},
			//这是用户点击了数量+还是-
			shopingnum(bool){
				if(bool){//true就是+
					this.num++
				}else{//-
					if(this.num<=1){
						app.globalData.showtoastsame("数量不能小于1")
						return 
					}
					this.num--
				}
			},
			//这是当用户点击了立即购买的按钮   
			buy(){
				
			},
			//当用户点击了×   
			Shutdown(){
				this.$emit("hiddends",null)
			}
		},
		props:['good_sid','good_gid','imgs',"immediatelylist","remotaicent"],
		created() {
			const _this = this
			
			_this.$watch("remotaicent",function(newval,oldval){
				_this.goods = newval
			})
			// console.log(this.good_sid)  
			// console.log(this.good_gid)  
			_this.$watch("good_sid",function(newval,oldval){
				_this.good_sids = newval
			})
			_this.$watch("good_gid",function(newval,oldval){
				_this.good_gids = newval
			})
			_this.$watch('imgs',function(newval,oldval){
				// console.log(newval)  
				_this.img = newval
			})
			_this.$watch('immediatelylist',function(newval,oldval){
				// console.log(newval)  
				_this.shopinglist = newval
			})
		},
	}
</script>

<style lang="less" scoped>
	.immediately{
		text-align:left;
		// height:50vh;
		.cu-dialog{
			height:60vh;
			padding:0 20rpx;
			.immediately-top{
				display:flex;
				justify-content: space-between;
				margin-top:30rpx;
				padding:0 20rpx;
				.immediately-top-image{
					width: 27%;
					height:176rpx;
					image{
						width: 100%;
						height:100%;
					}
				}
				.immediately-top-describe{
					align-items: center;
					flex:.95;
					.price{
						display:flex;
						justify-content: space-between;
					}
					text{
						display:block;
						color:#f00;
						font-weight: bold;
						font-size: 34rpx;
						margin:20rpx 0 15rpx;
						&:last-child{
							color:#999;
							font-size: 28rpx;
						}
					}
					.describe{
						overflow:hidden;
						width: 100%;
						height: 68rpx;
						font-size: 22rpx;
					}
				}
			}
		}
		.immediately-midden-scrollarea{
			font-size: 30rpx;
			font-weight: bold;
			margin:44rpx 0;
			padding: 0 20rpx;
			.scrollarea{
				height:34vh;
				//这是midden中间的规格
				.scrollareaspecifications{
					text{
						color:#7f7f7f;
						
					}
				}
				//这是midden一些配置规格
				.scrollareapagespecifications{
					.scrollareapagespecifications-item{
						margin-top:20px;
						.item-text{
							
						}
						.item-specifications{
							display: flex;
							flex-wrap: wrap;
							margin-top:20rpx;
							text{
								padding:12rpx;
								border:2rpx solid #ccc;
								border-radius:16rpx;
								margin:0 22rpx 10rpx 0;
							}
						}
					}
				}
			}
		}
		.numberof{
			display:flex;
			justify-content: space-between;
			margin-bottom:36rpx;
			.adder{
				display:flex;
				button{
					width: 50rpx;
					margin:0;
					padding:0;
					line-height:50rpx;
				}
				input{
					width: 100rpx;
					border:2rpx solid #ccc;
					text-align:center;
				}
			}
		}
	}
</style>
