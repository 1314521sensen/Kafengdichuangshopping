<template>
	<view class="shoppingcarnew">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="shoppingcartop">
			<view class="shoppingcartitle">
				<text class="lg text-gray cuIcon-back carjiantou" @tap="carjiantou"></text>
				<text class="shoppingcartitle_text">购物车</text>
			</view>
			<!-- 这里加判断为了让删除按钮不要在显示 -->
			<text 
				class="management" 
				@tap="management"
				v-show="this.$store.state.cartList.length>0"
			>{{btnswitchtext}}</text>
		</view>
		<view class="shoppingcarlist">
			<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
				<view class="scroll-view-item">
					<view class="item-store" v-for="(item,index) in this.$store.state.cartList" :key="index" v-if="item.sub.length>=1">
						<view class="item-store-title">
							<!-- cuIcon-check 选中的类名 -->
							<view 
								class="title-checkbox" 
								:data-indexs="index" 
								@tap="fathercheck"
								:class="item.checked?'cuIcon-check':''"
							></view>
							<text class="title-text">{{item.store_name}}</text>
						</view>
						<view class="item-list" v-for="(items,indexs) in item.sub" :key="indexs">
							<view class="title-checkbox" 
								:data-indexs="index" 
								:data-childindex="indexs"
								:data-check="items.checked" 
								@tap="itemscheck"
								:class="items.checked?'cuIcon-check':''"
							></view>
							<!-- 商品的图片 -->
							<view 
								class="item-imgs"
								@tap="detaisinglepage"
								:data-g_id="items.good_id"
								:data-s_id="item.store_id"
							>
								<image :src="imgpath+items.good_pic" class="imgs"></image>
							</view>
							<view class="item-info">
								<!-- 商品的名称 -->
								<view 
									class="item-info-text"
									@tap="detaisinglepage"
									:data-g_id="items.good_id"
									:data-s_id="item.store_id"
								>
									{{items.good_name}}
								</view>
								<!-- 商品规格值 -->
								<text 
									class="specificationstext" 
									data-target="bottomModal" 
									@tap="getspecifications"
									v-if="items.spec_value!==''"
									:data-src="items.good_pic"
									:data-sid="items.store_id"
									:data-gid="items.good_id"
								>
									{{items.spec_value}}
								</text>
								<text 
									class="lg text-gray cuIcon-triangledownfill"
									data-target="bottomModal"
									@tap="getspecifications"
									v-if="items.spec_value!==''"
									:data-src="items.good_pic"
									:data-sid="items.store_id"
									:data-gid="items.good_id"
								></text>
								<view class="info-price-num">
									<!-- 商品价格 -->
									<text class="price" v-text="'¥'+items.good_price"></text>
									<view class="price-num">
										<button 
											class="price-btn" 
											@tap="Increasereduce" 
											:data-indexs="index" 
											:data-childindex="indexs"
											:data-spec_value="items.spec_value"
											:data-spec_id="items.spec_id"
											:data-gid="items.good_id"
											data-bool="0"
										>-</button>
										<input type="text" class="inp" :value="items.good_num" disabled="true"/>
										<button 
											class="price-btn" 
											@tap="Increasereduce"
											:data-indexs="index"
											:data-childindex="indexs"
											:data-spec_value="items.spec_value"
											:data-spec_id="items.spec_id"
											:data-gid="items.good_id"
											data-bool="1"
										>+</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="shoppingcar-bottom" v-show="this.$store.state.cartList.length>0">
			<view class="same-right" v-if="btnswitchbool">
				<!-- <view class="freight">
				    <text>运费:{{this.$store.state.freight}}</text>
				</view> -->
				<text class="combinedtext">(含运费)共合计:</text>
				<!-- {{this.$store}} -->
				<text style="color:#ee6c29">{{this.$store.getters.totalprice}}</text>
				<button class="same-btn cu-btn round bg-orange" @tap="settlement">结算</button>
			</view>
			<button class="cu-btn round bg-red" v-else @tap="deleteshop" v-show="this.$store.state.cartList.length>0">删除</button>
		</view>
		<!-- 底部的窗口 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="specifications">
					<view class="specifications-top">
						<view class="specificationstopLeft">
							<!-- 规格的图片 -->
							<image :src="imgpath+specificationsrc" class="imgs"></image>
						</view>
						<view class="specificationstopright">
							<view class="specifications-plice">
								<!-- <text class="price">¥12.90</text> -->
								<text class="lg text-gray cuIcon-close clone" @tap="hideModal"></text>
							</view>
							<!-- <view class="specifications-text">
								香辣口味185g
							</view> -->
						</view>
					</view>
					<view class="specifications-midden">
						<scroll-view class="scroll-view">
							<view 
								class="scroll-view-item" 
								v-for="(item,index) in this.$store.state.specificationslist"
								:key="index"
							>
								<text class="specificationsname">{{item.spec_name}}</text>
								<view class="specificationsitem">
									<text 
										class="specificationText"
										@tap="Updatespecifications"
										:data-gid="item.good_id"
										:data-specificationId="item.id"
									>{{item.spec_value}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="cartweiicon" v-if="this.$store.state.cartListBool">
			<view class="cartweiicon_center">
				<view class="cartweiicon_center_img" :style="{'background-image':'url('+this.$store.state.httpUrl+'shopcart/btnbrowsebuy.png'+')'}"></view>
				<view class="cartweiicon_center_text">
					您的购物车空空如也
				</view>
				<view class="browse">
					<button class="cu-btn round btnbrowse" @tap.stop="btnbrowse">去逛逛</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				//删除和结算按钮切换开关
				btnswitchbool:true,
				btnswitchtext:"管理",
				//点击规格的控制弹窗的变量
				modalName:null,
				//规格的src
				specificationsrc:"",
				imgpath:this.$store.state.imgyuming,
				forwardcartbool:0,//此变量判断用户是通过哪里进来的
				statusBar:0
			}
		},
		methods:{
			//点击去逛逛
			btnbrowse(){
				uni.reLaunch({
					url:`/pages/index/index`
				})
			},
			//点击里面的商品 跳到商品详情
			detaisinglepage(e){
			    let {g_id,s_id} = e.currentTarget.dataset
			    //当点击的时候跳转到详情页
			    //根据index和我的组件中传过来的url 判断跳到哪里
			    uni.navigateTo({
			     url:`/pages/Details/Details?id=${g_id}&storeid=${s_id}`
			    })
			   },
			//管理删除和结算按钮的切换
			management(){
				if(this.btnswitchbool){
					this.btnswitchbool = false
					this.btnswitchtext = "完成"
				}else{
					this.btnswitchbool = true
					this.btnswitchtext = "管理"
				}
			},
			//底部的窗口显示
			getspecifications(e) {
				// console.log(e)
				let {src,sid,gid} = e.currentTarget.dataset
				this.modalName = e.currentTarget.dataset.target
				this.specificationsrc = src
				this.$store.commit("getspecifications",{sid:sid,gid:gid})
			},
			//底部的窗口隐藏
			hideModal(e) {
				this.modalName = null
			},
			//每个小商品点击的选中那点击的时候
			itemscheck(e){
				let {indexs,childindex} = e.currentTarget.dataset
				//调用vuex的mutations方法
				this.$store.commit('itemscheck',{indexs:parseInt(indexs),childindex:parseInt(childindex)})
			},
			//点击店铺的选中的标识时
			fathercheck(e){
				let {indexs} = e.currentTarget.dataset
				this.$store.commit("fathercheck",{indexs:parseInt(indexs)})
			},
			//当每一个小商品数量点击减号时 或减号时 根据布尔值判断 点击的是加号还是减号
			Increasereduce(e){
				let {indexs,childindex,bool,spec_value,spec_id,gid} = e.currentTarget.dataset
				this.$store.commit("Increasereduce",{indexs:parseInt(indexs),childindex:parseInt(childindex),bool:bool,spec_value:spec_value,spec_id:spec_id,gid:gid})
			},
			//当点击删除商品的时候
			deleteshop(){
		        this.$store.state.pages = 1
				this.$store.commit("deleteshop")
			},
			//更新规格
			Updatespecifications(e){
				let {gid,specificationid} = e.currentTarget.dataset
				this.$store.commit("Updatespecifications",{gid:gid,specificationid:specificationid})
				this.hideModal()
			},
			//结算
			settlement(){
				
				this.$store.commit("Saveorder",{fromvalue:1})
				/*
				uni.navigateTo({
					url:`/pages/Purchasepage/Purchasepage?gid=${this.goodid}&num=${this.num}&way=1&img=${JSON.stringify(this.goodimg)}&storename=${this.storename}&price=${this.goodprice}&goodtitle=${this.goodname}&cids=${this.carid}&storeid=${this.storeid}&freight=${this.freightnum}`
				})
				*/ 
			},
			//当滚动底部的时候
			scrolltolower(){
				// console.log("触发了")
				this.$store.commit("shopcarscrolltolower")
			},
			carjiantou(){
				if(parseInt(this.forwardcartbool)==0){
					uni.reLaunch({
						url:"/pages/index/index"
					})
				}else{
					uni.navigateBack()
				}
				
			}
		},
		created(){
			// console.log(curRoute)
			// 判断是否登录
			uni.getStorageInfo({
				success(res){
					let key = res.keys
					let keylen = key.length
						key.forEach((item,index)=>{
							if(item != "bindtokey"){
								keylen-- 
								// console.log(keylen) 
							}
						})
						if(keylen == 0){
							uni.redirectTo({
								url:"/pages/login/login"
							})
						}
					}
				})

			const _this = this
			_this.$store.state.pages = 1
			//调用vuex的actions里面的异步函数
			_this.$store.dispatch('getcarlists')
			//在缓存中取出值
			uni.getStorage({
				key:"forwardcartbool",
				success(res) {
					_this.forwardcartbool = res.data
					// console.log(_this.forwardcartbool)
				},
				fail(){
					_this.forwardcartbool = 1
				}
			})
			// console.log(this.$store.state)
		},
		onLoad() {
			const _this = this
			uni.getStorage({
				key:'bindtokey',
				success(res){
					app.globalData.Detectionupdatetokey(res.data)
					_this.statusBar = app.globalData.statusBar
				}
			})
			
			uni.getStorage({
						key: "bindtokey",
						success(restokey) {
							uni.request({
								url: `${app.globalData.Requestpath}shopping_cart/getShoppingCartList`,
								method: "POST",
								data: { 
									token: restokey.data,
									page: 1,
									pageSize: 10
								},
								success(res) {
									// console.log(res,"购物车里的商品") 
									 if(res.data.code == 0){
										 
									 }else{
										 // console.log("没有商品")
										 _this.$store.state.cartList = []
									 }
								}
							})
						}
					})
			
		},
		onShow(){
			this.$store.dispatch('getcarlists')
		},
		//当用户按手机系统返回的时候
		onBackPress(opction){
			if(opction.from=='backbutton'){
				uni.redirectTo({
					url:`/pages/index/index`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.shoppingcarnew{
		height:100vh;
		background-color: #F8F8F8;
		.shoppingcartop{
			display:flex;
			justify-content: space-between;
			padding:0 20rpx;
			.shoppingcartitle{
				display: flex;
				flex:1;
				font-size: 45rpx;
				font-weight: bold;
				.carjiantou{
					color:#CCCCCC;
					margin-right:15rpx;
					text-align:left;
				}
				.shoppingcartitle_text{
					flex:1;
					text-align:center;
				}
			}
			.management{
				width: 20%;
				font-size: 35rpx;
				text-align:center;
			}
		}
		.shoppingcarlist{
			margin-top:30rpx;
			.scroll-view{
				height:86vh;
				// background-color:red;
				.scroll-view-item{
					padding:0 20rpx;
					.item-store{
						// height:200rpx;
						background-color: #fff;
						border-radius:16rpx;
						padding:40rpx 10rpx;
						margin-top:30rpx;
						.item-store-title{
							display:flex;
							.title-text{
								font-size: 30rpx;
								font-weight: bold;
								margin-left:20rpx;
							}
						}
						.item-list{
							display:flex;
							margin-top:40rpx;
							.item-imgs{
								width:26%;
								height:180rpx;
								// background-color:green;
								margin:0 20rpx;
								.imgs{
									width: 100%;
									height:100%;
								}
							}
							.item-info{
								flex:1;
								// background-color:pink;
								.item-info-text{
									font-size:30rpx;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
								}
								.specificationstext{
									display:inline-block;
									max-width: 360rpx;
									font-size: 24rpx;
									color:#999;
									// background-color:#f2f2f2;
									padding:5rpx;
									margin-top:20rpx;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
									border-radius:16rpx;
									border:2rpx solid red;
								}
								.cuIcon-triangledownfill{
									margin-top: 20rpx !important;
									font-size: 50rpx;
								}
								.info-price-num{
									display:flex;
									justify-content: space-between;
									margin-top:40rpx;
									.price{
										line-height:44rpx;
										font-size: 30rpx;
										color: #ee6c29;
										font-weight: bold;
									}
									.price-num{
										display:flex;
										.price-btn{
											width:74rpx;
											height:44rpx;
											margin:0;
											line-height:44rpx;
											background-color: #fff;
											color:#999;
										}
										.inp{
											width:108rpx;
											height:44rpx;
											font-size:24rpx;
											text-align:center;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		.shoppingcar-bottom{
			position: fixed;
			/* #ifdef H5 */
			bottom:0;
			/* #endif */
			/* #ifdef APP-PLUS || MP-WEIXIN */
			bottom:0;
			/* #endif */
			left:0;
			width: 100%;
			display:flex;
			justify-content:flex-end;
			background-color: #fff;
			padding:16rpx 20rpx 16rpx 0;
			.freight{
				flex-grow: 9;
				display: flex;
				align-items: center;
				padding-left: 60rpx;
			}
			.same-right{
				display:flex;
				align-items: center;
				justify-content: flex-end;
				width: 100%;
				.same-btn{
					margin-left:60rpx;
				}
				.combinedtext{
					font-size: 30rpx;
				}
			}
		}
	}
	//这是圆圈公共的
	.title-checkbox{
		width:45rpx;
		height:45rpx;
		// background-color:yellow;
		border-radius:50%;
		border:2rpx solid #ccc;
		text-align:center;
		line-height:40rpx;
	}
	.cuIcon-check{
		background-color:red;
		color:#fff;
		border:0;
	}
	.specifications{
		height:70vh;
		.specifications-top{
			display:flex;
			padding:0 20rpx;
			margin-top:30rpx;
			.specificationstopLeft{
				width:27%;
				height:176rpx;
				// background-color:red;
				.imgs{
					width: 100%;
					height:100%;
				}
			}
			.specificationstopright{
				flex:1;
				// background-color:yellow;
				padding-left:20rpx;
				.specifications-plice{
					display:flex;
					justify-content: space-between;
					.price{
						display: block;
						color: #f00;
						font-weight: bold;
						font-size: 34rpx;
					}
					.clone{
						color: #999;
						font-size: 28rpx;
					}
					text{
						margin:20rpx 0 14rpx;
					}
				}
				.specifications-text{
					overflow: hidden;
					width: 100%;
					height: 68rpx;
					font-size:24rpx;
					text-align:left;
				}
			}
		}
		.specifications-midden{
			margin-top:30rpx;
			padding:0 20rpx;
			.scroll-view{
				height:52vh;
				// background-color:red;
				.scroll-view-item{
					text-align:left;
					margin-top:20rpx;
					.specificationsname{
						font-size: 30rpx;
						font-weight: bold;
					}
					.specificationsitem{
						margin-top:20rpx;
						text{
							border:2rpx solid #ccc;
							padding:6rpx 10rpx;
							border-radius:16rpx;
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
	.cartweiicon{
		display:flex;
		justify-content: center;
		position: fixed;
		top:30%;
		left:0;
		width: 100%;
		// height:100rpx;
		// background-color:red;
		.cartweiicon_center{
			width: 50%;
			// background-color:yellow;
			.cartweiicon_center_img{
				height:200rpx;
				// background-color:green;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.cartweiicon_center_text{
				text-align:center;
				color:#999;
				font-weight:bold;
				font-size: 36rpx;
				// margin:20rpx 0;
			}
			.browse{
				display:flex;
				justify-content: center;
				.btnbrowse{
					background-color:rgb(254,86,120) !important;
					font-weight: bold;
					color:#fff;
				}
			}
			
		}
	}
	.specificationText{
		line-height: 50rpx;
	}
</style>
