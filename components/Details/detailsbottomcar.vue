<template>
	<view class="detailscar">
		<view class="cu-bar bg-white tabbar border shop">
				<button class="action" open-type="contact" @tap="Enterthestore">
					<view class="cuIcon-shop text-green">
						<!-- <view class="cu-tag badge"></view> -->
					</view> 店铺
				</button>
				<view class="action text-orange" @tap="showModal" data-target="DialogModal1">
					<!-- cuIcon-favorfill这是已收藏图标 -->
					<view :class="collectionbool?'cuIcon-favorfill':'cuIcon-favor'"></view>{{collection}}
				</view>
				<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">备注信息</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							<input type="text" v-model="Noteinformation" :placeholder="Noteplaceholder">
						</view>
						<view class="cu-bar bg-white justify-end">
							<view class="action btn-que">
								<button class="cu-btn bg-green" @tap="collectionwork">确定</button>
							</view>
						</view>
					</view>
				</view>
				<view class="action" @tap="shoppingcart">
					<view class="cuIcon-cart">
						<!-- cu-tag这个是角标 -->
						<view class="badge" :class="len?'cu-tag badge':'badge'">{{len}}</view>
					</view>
					购物车
				</view>
				<view class="btn-group">
					<button class="cu-btn bg-orange round shadow-blur" @tap="Addcart(pic,imgs)">加入购物车</button>
					<button class="cu-btn bg-red round shadow-blur" @tap="Skiporder" data-target="bottomModal">立即订购</button>
				</view>
			</view>
			<immediatelypopup 
				:class="modalName=='bottomModal'?'show':''" 
				:immediatelylist="immediatelylist" 
				@hiddends="hiddends" 
				:bool="bool" 
				:gid="gid"
				:pic="pic"
			></immediatelypopup>
		</view>
</template>

<script>
	import immediatelypopup from "@/components/Details/immediatelypopup.vue"
	const app = getApp()
	export default{
		data(){
			return {
				newscarobj:{},
				newcararr:[],
				len:"",
				collectionbool:false,
				collection:"未收藏",
				modalName: null,
				Noteinformation:"",
				Noteplaceholder:"请输入商品的备注信息",
				favid:"",
				immediatelylist:[],
				bool:false
			}
		},
		components:{
			immediatelypopup,
		},
		methods:{
			//这是弹窗的功能
			showModal(e) {
				if(this.collectionbool){
					uni.request({
						url:"http://hbk.huiboke.com/api/user/deleteFavoriteInfo",
						method:"POST",
						data:{
							token:this.tokey,
							fav_id:this.favid
						},
						success:(res)=> {
							this.collectionbool = false
							this.collection = "未收藏"
						}
					})
				}else{
					this.modalName = e.currentTarget.dataset.target
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			//弹窗结束的功能
			//进入店铺
			Enterthestore(){
				uni.navigateTo({
					url:`/pages/Store/store?storeid=${this.storeid}`
				})
			},
			shoppingcart(){
				uni.switchTab({
					url:"/pages/shoppingCart/shoppingCart"
				})
			},
			Addcart(obj,img){
				let {store_name,good_title,good_price,good_pic} = obj
				uni.request({
					url:"http://hbk.huiboke.com/api/shopping_cart/addShoppingCartInfo",
					method:"POST",
					data:{
						token:this.tokey,//tokey值
						sid:this.storeid,//店铺id
						s_name:store_name,
						gid:this.gid,
						g_name:good_title,
						g_price:good_price,
						g_pic:good_pic
					},
					success(res) {
						if(res.data.code==0){
							uni.switchTab({
								url:"/pages/shoppingCart/shoppingCart"
							})
						}
					}
				})
				//当点击加入到购物车 就加入到缓存中 获取店铺名字 商品的图片 商品的标题 商品的参数(可有可无) 商品的价格
				// let {newscarobj,newcararr} = this.$data
				// newscarobj = obj
				// newscarobj.img = img
				// this.newscarobj = newscarobj
				// newcararr.unshift(newscarobj)
				// this.newcararr = newcararr
				// if(newcararr.length==0){
				// 	this.len=""
				// }else{
				// 	this.len = newcararr.length
				// }
				// uni.setStorage({
				//     key:"Addcart",
				//     data:this.newcararr,
				//     success:(res)=>{
				// 		console.log(res)
				//     },
				// 	fail(err){
				// 		console.log(err)
				// 	}
				// });
			},
			//这是点击弹窗的确定是否确定添加
			collectionwork(){
				//this.Noteinformation收藏信息
					if(this.Noteinformation!==""){
						//在这里添加数据
						this.Noteplaceholder = "请输入商品的备注信息"
						this.collectionbool = true
						this.collection = "已收藏"
						uni.request({//请求添加收藏信息的接口
							url:"http://hbk.huiboke.com/api/user/addGoodFavoriteInfo",
							method:"POST",
							data:{
								token:this.tokey,
								good_id:this.pic.good_id,
								good_name:this.pic.good_title,
								good_image:this.pic.good_pic,
								fav_price:this.pic.good_price,
								fav_remark:this.Noteinformation
							},
							success:(res)=>{
								if(res.data.code==0){
									app.globalData.showtoastsame("收藏成功")
									this.favid = parseInt(res.data.data.fav_id)
								}else{
									app.globalData.showtoastsame(res.data.msg)
								}
							}
						})
						this.hideModal()
					}else{
						this.Noteplaceholder = "收藏备注不能为空"
					}
			},
			Skiporder(e){
				this.modalName = e.currentTarget.dataset.target
			},
			//当用户点击了 子组件里面的x
			hiddends(e){
				this.modalName = e
			}
		},
		props:["pic","imgs","tokey","gid","storeid"],
		created(){
			const _this = this
			uni.request({//请求一条商品来看一下 用户收藏没收藏
				url:"http://hbk.huiboke.com/api/user/getGoodFavoriteInfo",
				method:"POST",
				data:{
					token:this.tokey,
					id:this.gid
				},
				success:(res)=>{
					if(res.data.code==0){
						this.collectionbool = true
						this.collection = "已收藏"
						_this.favid = res.data.data.fav_id
					}
				}
			})
			//购物车弹窗数据
			uni.request({
				url:"http://hbk.huiboke.com/api/good/getGoodSpecList",
				data:{
					gid:_this.gid
				},
				success(res) {
					if(res.data.code==0){
						_this.immediatelylist = res.data.data
					}
				}
			})
			//去请求 获取规格详情的列表
		}
	}
</script>

<style lang="less" scoped>
	.detailscar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		left: 0;
		z-index: 1;
	}
	.btn-que{
		width: 100% !important;
		button{
			width: 100%;
		}
	}
	.btn-group{
		.cu-btn{
			padding:0 12rpx;
		}
	}
	
</style>
