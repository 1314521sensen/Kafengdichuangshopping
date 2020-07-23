<template>
	<view class="lineaddshoplist">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="cu-bar minheight" style="'background-color':'#fff'">
			<view class="action" @tap="returnsmy">
				<text class="cuIcon-back text-gray"></text>
			</view>
			<view class="content text-bold" style="color:#000">
				添加直播商品
			</view>
		</view>
		<view class="cu-bar search" v-if="type!='storetype'">
			<view class="search-form round">
				
				<input 
					:adjust-position="false" 
					type="text" 
					placeholder="搜索您要添加的商品名称、店铺名" 
					confirm-type="search"
					class="inp"
					v-model="value"
				></input>
				<text class="cuIcon-search" @tap="seachliveshop"></text>
			</view>
		</view>
		<view class="addshoplist">
			<scroll-view class="scroll-view-box" @scrolltolower="scrolltolower" :scroll-y="true">
				<view class="scroll-view">
					<view class="addlist-item" v-for="(item,index) in liveshoplist" :key="index">
						<view class="img-left">
							<image class="left-image" :src="'http://hbk.huiboke.com'+item.good_pic"></image>
						</view>
						<view class="right-shop-info">
							<view class="shoptitle">{{item.good_title}}</view>
							<view class="right-shop-add_price">
								<text class="shop-info-price" v-text="'¥'+item.good_promotion_price">355.00</text>
								<text class="addshop text-white cuIcon-add" @tap="addCommoditypools" :data-g_id="item.good_id"></text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="position-shopicon" @tap="Commodityshop">
			<image src="/static/Liveplatformlist/positionshopicon.png" class="imgs"></image>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				tokey:"",
				pages:1,
				value:"",
				liveshoplist:[],
				Shop_g_idlist:[],
				storeid:"",
				type:""
			}
		},
		methods: {
			//封装一个请求列表的方法
			getliveshoplist(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}live/getLiveGoodList`,
					method:'POST',
					data:{
						token:_this.tokey,
						page:_this.pages,
						pageSize:10,
						gkey:_this.value,
						sid:_this.storeid
					},
					success(res) {
						if(res.data.code==0){
							//实现下拉加载
							if(_this.pages>1){
								_this.liveshoplist = _this.liveshoplist.concat(res.data.data.list)
							}else{
								_this.liveshoplist = res.data.data.list
							}
						}else{
							app.globalData.showtoastsame(res.data.msg)
						}
					}
				})
			},
			//点击搜索的时候
			seachliveshop(){
				if(this.value==""){
					app.globalData.showtoastsame("请输入搜索的宝贝名称")
					return
				}else{
					this.getliveshoplist()
				}
			},
			//当用户下拉加载的时候
			scrolltolower(){
				this.pages++
				this.getliveshoplist()
			},
			//点击加号的时候 添加到商品池中
			addCommoditypools(e){
				const _this = this
				// console.log(e.currentTarget.dataset)
				let {g_id} = e.currentTarget.dataset
				_this.Shop_g_idlist.push(g_id)
				uni.request({
					url:`${app.globalData.Requestpath}live/saveAnchorGoods`,
					method:"POST",
					data:{
						token:_this.tokey,
						gids:_this.Shop_g_idlist
					},
					success(res) {
						app.globalData.showtoastsame(res.data.msg)
					}
				})
			},
			//点击箭头返回
			returnsmy(){
				uni.navigateBack()
			},
			//点击跳到商品池中
			Commodityshop(){
				uni.navigateTo({
					url:`/pages/commoditypools/commoditypools`
				})
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res) {
					_this.tokey = res.data
					_this.getliveshoplist()
				}
			})
		},
		onLoad(opction) {
			console.log(opction)
			let {storeid,type} = opction
			const _this = this
			_this.storeid = storeid
			_this.type = type
			_this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.lineaddshoplist{
		background-color: #f5f5f5;
		.round{
			border:2rpx solid #f00;
			border-radius:26rpx;
			padding:10rpx 32rpx;
			.cuIcon-search{
				background-color: #f00;
				color:#fff;
				border-radius:50%;
				// padding: 0 20rpx;
				font-size: 28rpx;
				margin:0;
				width: 25px;
				height: 25px;
				text-align: center;
				line-height: 26px;
			}
		}
		.addshoplist{
			padding:0 20rpx;
			.scroll-view-box{
				height:90vh;
				.addlist-item{
					display:flex;
					background-color: #fff;
					margin-bottom:20rpx;
					.img-left{
						width: 28%;
						// background-color:red;
						height:180rpx;
						.left-image{
							width:100%;
							height:100%;
						}
					}
					.right-shop-info{
						flex:1;
						// background-color:green;
						padding:10rpx 0rpx 0rpx 10rpx;
						.shoptitle{
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-size: 30rpx;
						}
						.right-shop-add_price{
							display:flex;
							justify-content: flex-end;
							align-items:center;
							margin-top:20rpx;
							.shop-info-price{
								color:#f00;
								margin-right:40rpx;
								font-size: 32rpx;
								font-weight: bold;
							}
							.addshop{
								background-color: #f00;
								padding:10rpx;
								border-radius:50%;
								margin-right:10rpx;
							}
						}
					}
				}
			}
		}
		.position-shopicon{
			position: absolute;
			top:65%;
			right:5%;
			width: 100rpx;
			height:100rpx;
			// background-color:yellow;
			.imgs{
				width: 100%;
				height:100%;
			}
		}
	}
</style>
