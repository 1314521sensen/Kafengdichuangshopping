<template>
	<view class="detailscar">
		<!-- v-if这里判断时候为正常的商品 -->
		<view class="cu-bar bg-white tabbar border shop" v-if="parseInt(good_state)==1 && parseInt(good_verify)==1 && parseInt(good_delete)==0">
				<button class="action" open-type="contact" @tap="Enterthestore">
					<view class="cuIcon-shop text-green">
						<!-- <view class="cu-tag badge"></view> -->
					</view> 店铺
				</button>
				<view class="action text-orange" @tap="collectionwork">
					<!-- cuIcon-favorfill这是已收藏图标 -->
					<view :class="collectionbool?'cuIcon-favorfill':'cuIcon-favor'"></view>{{collection}}
				</view>
				<view class="action" @tap="shoppingcart">
					<view class="cuIcon-servicefill">
						<!-- cu-tag这个是角标 -->
						<view class="badge" :class="len?'cu-tag badge':'badge'">{{len}}</view>
					</view>
					客服
				</view>
				<view class="btn-group">
					<button 
						class="cu-btn bg-orange round shadow-blur" 
						v-if="parseInt(producttype)!==2 && couplebool!=='nlt' && activityType=='' && parseInt(fissiontype)!==4" 
						@tap="Addcart(pic)"
					>加入购物车</button>
					<button 
						class="cu-btn bg-red round shadow-blur" 
						@tap="Skiporder" 
						data-target="bottomModal"
						
					>立即订购</button>
				</view>
			</view>
			<immediatelypopup 
				:class="modalName=='bottomModal'?'show':''" 
				:immediatelylist="immediatelylist" 
				@hiddends="hiddends" 
				:bool="bool" 
				:gid="gid"
				:pic="pic"
				:storeid="storeid"
				:couplebool="couplebool"
				:code="code"
				:producttype="producttype"
				:activityType="activityType"
				:fissiontype="fissiontype"
			></immediatelypopup>
		</view>
</template>

<script>
	import immediatelypopup from "@/components/Details/immediatelypopup.vue"
	const app = getApp()
	export default{
		data(){
			return {
				// tokey:"",
				newscarobj:{},
				newcararr:[],
				len:"",
				collectionbool:false,
				collection:"未收藏",
				modalName: null,
				Noteinformation:"",
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
						url:`${app.globalData.Requestpath}user/deleteFavoriteInfo`,
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
				// console.log(this.pic)
				app.globalData.Detectionupdatetokey(this.tokey)
				//店铺跳转的时候  把图片 商品的标题商品的 价格 发送的过去
				uni.navigateTo({
					url:`/pages/Customerservice/Customerservice?
						shoplink=storeshop&shopimg=${JSON.stringify(this.pic.good_pic)}&shoptitle=${this.pic.good_title}&shopprice=${this.pic.good_price}&shoppromotion_price=${this.pic.good_promotion_price}&storename=${this.pic.store_name}&statestore=${this.storeid}&gid=${this.gid}`
				})
			},
			Addcart(obj){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						app.globalData.Detectionupdatetokey(res.data)
						let {store_name,good_title,good_price,good_pic} = obj
						_this.$store.commit("Addcart",{s_name:store_name,g_name:good_title,g_pic:good_pic,gid:_this.gid,sid:_this.storeid,couplebool:_this.couplebool})
					},
					fail(err){
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}
				})
				
			},
			//这是点击弹窗的确定是否确定添加收藏
			collectionwork(){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						app.globalData.Detectionupdatetokey(res.data)
					//this.Noteinformation收藏信息
							//在这里添加数据
						if(_this.collectionbool==false){//如果为false的话代表用户为添加收藏 
							// console.log("当前为true")
							_this.collectionbool = true
							_this.collection = "已收藏"
							uni.request({//请求添加收藏信息的接口
								url:`${app.globalData.Requestpath}user/addGoodFavoriteInfo`,
								method:"POST",
								data:{
									token:res.data,
									good_id:_this.pic.good_id,
									good_name:_this.pic.good_title,
									good_image:_this.pic.good_pic,
									fav_price:_this.pic.good_promotion_price,
									fav_remark:""
								},
								success(res){
									
									// console.log(res)
									if(res.data.code==0){
										app.globalData.showtoastsame("收藏成功")
										_this.favid = parseInt(res.data.data.fav_id)
									}else{
										//这个函数 如果用户的tokey过期了 那么就跳转到登录页
										app.globalData.Logback(res.data.msg)
									}
								}
							})
						}else{//如果用户点击收藏的时候 为true的时候 就让用户取消收藏
							//这里是删除收藏
							_this.collectionbool = false
							_this.collection = "收藏"
							uni.request({
								url:`${app.globalData.Requestpath}user/deleteFavoriteInfo`,
								method:"POST",
								data:{
									token:res.data,
									fav_id:_this.favid
								},
								success(res) {
									if(res.data.code==0){
										app.globalData.showtoastsame("取消成功")
									}else{
										app.globalData.showtoastsame(res.data.msg)
									}
								}
							})
						}
					},
					fail(err){
						uni.navigateTo({
							url:`/pages/login/login`
						})
					}
				})
			},
			Skiporder(e){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res) {
						// console.log(2222)
						app.globalData.Detectionupdatetokey(res.data)
						// console.log(this.immediatelylist.length)
						/*
							当用户点击立即购买的时候  
								1.如果有规格就让框弹出来 数量也可以自己选择 
								2.如果没有规格 就不让框弹出来 直接跳转订单 数量默认的就是1 规格默认的就是0
						*/
						if(_this.immediatelylist.length>0){
							_this.modalName = e.currentTarget.dataset.target
						}else{
							// console.log(_this.pic)
							let couponsstrId = ""
							let {gc_id3,gc_id2,gc_id1} = _this.pic
							// uni.navigateTo({
							// 	url:`/pages/Purchasepage/Purchasepage?gid=${this.gid}&spec_id=0&num=1&way=2&&img=${JSON.stringify(this.pic.good_pic)}&storename=${this.pic.store_name}&price=${this.pic.good_promotion_price}&goodtitle=${this.pic.good_title}&storeid=${this.storeid}&freight=${this.pic.good_freight}`
							// })
							// console.log(this.pic.good_freight)
							// console.log(this.pic)
							if(gc_id3){
								//这是三有的情况下
								if(gc_id2){
									if(gc_id1){
										couponsstrId = gc_id1+'-'+gc_id2+'-'+gc_id3
									}
								}else{
									if(gc_id1){
										couponsstrId = gc_id1
									}
								}
							}else{
								//如果三没有的情况下
								if(gc_id2){
									//如果三没有的情况下 找二
									if(gc_id1){
										couponsstrId = gc_id1+'-'+gc_id2
									}
								}else{
									if(gc_id1){
										couponsstrId = gc_id1
									}
								}
							}
							
							let SpecificationShopdetails = {
								good_id:_this.gid,
								spec_id:0,
								good_num:1,
								way:2,
								good_pic:_this.pic.good_pic,
								store_name:_this.pic.store_name,
								good_price:_this.pic.good_promotion_price,
								good_name:_this.pic.good_title,
								store_id:_this.storeid,
								good_freight:_this.pic.good_freight,
								good_type:_this.couplebool,
								good_purchase_price:_this.pic.good_purchase_price,
								limit_gcategory:[couponsstrId],
								activityType:_this.activityType,
								fissiontype:_this.fissiontype
							}
							//如果是团长类型增加 属性值
							if(parseInt(_this.producttype)==2){
								//这个分享码后期是动态的
								SpecificationShopdetails.share_code = _this.code
								SpecificationShopdetails.share_from = 2
							}
							// console.log(SpecificationShopdetails)
							_this.$store.commit("Saveorder",{fromvalue:0,publicShopdetails:SpecificationShopdetails})
							
						}
					},
					fail(err){
						// console.log(err)
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}
				})
			},
			//当用户点击了 子组件里面的x
			hiddends(e){
				this.modalName = e
			}
		},
		props:["pic","gid","storeid","couplebool","good_state","good_verify","good_delete","producttype","code","activityType","tokey","fissiontype"],
		created(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					// _this.tokey = res.data
					uni.request({//请求一条商品来看一下 用户收藏没收藏
						url:`${app.globalData.Requestpath}user/getGoodFavoriteInfo`,
						method:"POST",
						data:{
							token:res.data,
							id:_this.gid
						},
						success:(res)=>{
							if(res.data.code==0){
								_this.collectionbool = true
								_this.collection = "已收藏"
								_this.favid = res.data.data.fav_id
							}
						}
					})
				}
			})
			//购物车弹窗数据
			uni.request({
				url:`${app.globalData.Requestpath}good/getGoodSpecListOneLever`,
				data:{
					sid:_this.storeid,
					gid:_this.gid
				},
				success(res) {
					// console.log(res)
					if(res.data.code==0){
						// console.log(res.data.data)
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
