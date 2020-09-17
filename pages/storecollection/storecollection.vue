<template>
	<view class="storecollection" :style="{'padding-top':statusBar+'rpx'}">
		<!-- <pageheight :statusBar="+'px'"></pageheight> -->
		<actionbar message="店铺收藏"></actionbar>
		<scroll-view class="storecollection_box" :scroll-y="true" @scrolltolower="scrolltolower">
			<view 
				class="storecollection_item" 
				v-for="(item,index) in storelist" 
				:key="index"
				@tap="info_tap"
				:data-store_id="item.store_id"
			>
				<view class="item_info">
					<view class="item_info_left">
						<view class="item_info_icon">
							<view 
								class="Check_number"
								:data-index="index"
								@tap.stop="checkbox"
								:class="index==itemindex?'Check_number_active':'Check_number_weiactive'"
								:data-fav_id="item.fav_id"
							>
								<text v-show="index==itemindex">√</text>
							</view>
						</view>
						<view class="item_info_Headportrait">
							<image class="item_info_img" :src="imgpath+item.store_logo"></image>
						</view>
						<view class="item_info_title">
							<text>{{item.store_name}}</text>
						</view>
					</view>
					<view class="item_info_right">
						<text>进店</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="storecollection_bottom">
			<button class="cu-btn round bg-red btn" @tap="store_remove">移除</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	//引入 头部导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				statusBar:0,
				tokey:"",
				pages:1,
				storelist:[],
				imgpath:this.$store.state.imgyuming,
				itemindex:-1,
				fav_id:0,
				delectbool:false
			}
		},
		methods: {
			getstoredata(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}user/getStoreFavoriteList`,
					method:"POST",
					data:{
						token:_this.tokey,
						page:_this.pages,
						pageSize:10
					},
					success(res) {
						// console.log(res)
						if(res.data.code==0){
							_this.delectbool = false
							if(parseInt(_this.pages) > 1){
								_this.storelist = _this.storelist.concat(res.data.data.list)
							}else{
								_this.storelist = res.data.data.list
							}
						}else{
							if(_this.delectbool){
								_this.storelist = []
							}
						}
					}
				})
			},
			info_tap(e){
				let {store_id} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Store/store?storeid=${store_id}`
				})
			},
			checkbox(e){
				let {index,fav_id}  = e.currentTarget.dataset
				this.itemindex = index
				this.fav_id = fav_id
			},
			store_remove(){
				const _this = this
				if(_this.itemindex!==-1){
					uni.getStorage({
						key:"bindtokey",
						success(restokey) {
							uni.request({
								url:`${app.globalData.Requestpath}user/deleteFavoriteInfo`,
								method:"POST",
								data:{
									token:restokey.data,
									fav_id:_this.fav_id
								},
								success(res) {
									// console.log(res)
									if(res.data.code==0){
										app.globalData.showtoastsame("移除成功")
										_this.getstoredata()
										_this.itemindex = -1
										_this.delectbool = true
									}else{
										_this.getstoredata()
									}
								}
							})
						}
					})
				}else{
					app.globalData.showtoastsame("请选择您要移除的店铺")
				}
			},
			scrolltolower(){
				this.pages++
				this.getstoredata()
			}
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(restokey) {
					_this.tokey = restokey.data
					_this.getstoredata()
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.storecollection{
		height:100vh;
		background-color: #fff;
		.storecollection_box{
			padding:0 20rpx;
			/* #ifdef H5*/
			height:85vh;
			/* #endif */
			/* #ifdef APP-PLUS */
			height:83vh;
			/* #endif */
			// background-color:red;
			.storecollection_item{
				border-bottom:2rpx solid #f2f2f2;
				padding: 10rpx 0;
				margin-bottom:10rpx;
				&:last-child{
					margin-bottom:0;
				}
				// background-color:red;
				.item_info{
					display:flex;
					.item_info_left{
						display:flex;
						flex:1;
						align-items: center;
						// background-color:yellow;
						.item_info_icon{
							width: 10%;
							// height:100px;
							// background-color:pink;
							.Check_number{
								width: 50rpx;
								height:50rpx;
								border-radius: 50%;
								text-align:center;
								line-height:50rpx;
							}
							.Check_number_active{
								border:4rpx solid #e74444;
								color:#e74444;
							}
							.Check_number_weiactive{
								border:4rpx solid #ccc;
							}
						}
						.item_info_Headportrait{
							width:130rpx;
							height:130rpx;
							// background-color:deeppink;
							border-radius:50%;
							margin:0 20rpx;
							.item_info_img{
								width: 100%;
								height:100%;
							}
						}
						.item_info_title{
							flex:1;
							// background-color:blue;
						}
					}
					.item_info_right{
						display:flex;
						justify-content: center;
						align-items: center;
						// background-color:green;
						width: 20%;
						font-size: 28rpx;
						color:#999;
					}
				}
			}
		}
		.storecollection_bottom{
			display:flex;
			align-items: center;
			flex-direction:row-reverse;
			position:fixed;
			bottom:0;
			left:0;
			width: 100%;
			height:100rpx;
			// background-color:red;
			box-shadow: 6rpx -16rpx 8rpx #eee;
			.btn{
				margin-right:20rpx;
			}
		}
	}
</style>
