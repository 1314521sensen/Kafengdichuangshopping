<template>
	<view class="collection">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" :message="message"></actionbar>
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom" v-show="list.length!==0">
			<!-- <list :list="list" display="block" :deleteurl="deleteurl" :tokey="tokey" :deletelist="deletelist" :title="title" :titlename="titlename"></list> -->
			<view class="list">
				<view class="cu-list menu-avatar">
					<!-- 这是背景图片 -->
					<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
					<!-- <button class="cu-btn bg-red margin-tb-sm lg" :style="{'display':display}">删除你不想要的商品</button> -->
					<view class="cu-item" v-for="(item,index) in list" :key="index">
						<view class="cu-item-left" @tap="linkDetails(item.good_id?item.good_id:item.goods_id,item.store_id)">
							<!--为什么这么写 因为组件是相互引用的  再加上后台 返回的数据值可能不一样只能用三目去判断哪个有值 goods_image -->
							<view class="cu-avatar round lg cu-item-left-bg"
								:style="{'background-image':'url('+imgpath+(item.good_pic?item.good_pic:item.goods_image)+')'}"
							> 
								
							</view>
						</view>
						<view class="cu-item-right">
							<view class="content">
								<!-- goods_name这个值和上面的值一样的返回的不一样 -->
								<view 
									class="text-grey" 
									@tap="linkDetails(item.good_id?item.good_id:item.goods_id,item.store_id)"
								>{{item.good_title?item.good_title:item.goods_name}}</view>
								<view class="price">
									￥{{item.good_price?item.good_price:(item.fav_price?item.fav_price:item.track_price)}}
									<text 
										class="lg text-gray cuIcon-delete"  
										
										@tap="deletescollectionAndfootprint"
										:data-index="index"
										:data-fav_id="item.fav_id"
										:data-track_id="item.track_id"
									></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <uniLoadMore :iconSize="20" :contentText="{contentdown:text}" v-if="list.length>=10"></uniLoadMore> -->
		</scroll-view>
		<Nopage v-show="list.length==0"></Nopage>
		<loading v-if="loadingbool==false"></loading>
	</view>
</template>

<script>
	//这是引入头部的导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//引入竖列列表
	// import list from "@/components/indexcomponents/newList.vue"
	//引入暂无商品的
	import Nopage from "@/components/Nopage.vue"
	//引入加载的插件
	// import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	const app = getApp();
	//这是我的收藏
	export default{
		data(){
			return {
				message:"",
				tokey:"",
				listindex:1,
				listnum:10,
				list:[],
				statusBar:0,
				text:"正在加载...",
				deleteurl:"",//这是删除的地址
				geturl:"",//这是请求的地址
				deletelist:[],
				Delete:false,
				loadingbool:false,
				imgpath:this.$store.state.imgyuming
			}
		},
		components:{
			actionbar,
			// list,
			Nopage,
			// uniLoadMore
		},
		methods:{
			//封装一个请求获取用户收藏的信息
			mycollection(url){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						_this.tokey = res.data
						uni.request({
							url:`${app.globalData.Requestpath}${url}`,
							method:"POST",
							data:{
								token:res.data,
								page:_this.listindex,
								pageSize:_this.listnum
							},
							success(reslist){
								if(reslist.data.code==0){
									if(_this.listindex>1){
										_this.list = _this.list.concat(reslist.data.data.list)
									}else{
										_this.list = reslist.data.data.list
									}
									_this.Delete = false
								}else{
									if(_this.Delete){
										_this.list = []
									}
								}
								_this.loadingbool = true
							}
						})
					}
				})
			},
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				this.listindex++
				this.mycollection(this.geturl)
			},
			//点击跳转商品详情
			linkDetails(gid,sid){
				uni.navigateTo({
					url:`/pages/Details/Details?id=${gid}`
				})
			},
			
			//删除列表
			deletescollectionAndfootprint(e){
				const _this = this
				_this.Delete = true
				let {fav_id,track_id} = e.currentTarget.dataset
				uni.showModal({
					title:"亲!",
					content:"您确定要删除当前的商品吗",
					showCancel:true,
					cancelText:"暂不删除",
					cancelColor:"#f00",
					confirmText:"确认删除",
					confirmColor:"#0f0",
					success(res){
						if(res.confirm){
							uni.request({
								url:`${app.globalData.Requestpath}${_this.deleteurl}`,
								method:"POST",
								data:{
									token:_this.tokey,
									fav_id:fav_id,
									track_id:track_id
								},
								success(res) {
									// console.log(res)
									if(res.data.code==0){
										_this.listindex = 1
										_this.mycollection(_this.geturl)
									}
								}
							})
						}
					}
				})
			}
		},
		
		onLoad(opctry){
			// console.log(opctry)
			let {titlename,title} = opctry
			this.message = title
			/*
				userMycollection 我的收藏
				userMyfootprint 我的足迹
			*/
			if(titlename=='userMycollection'){
				this.geturl = `user/getGoodFavoriteList`
				this.deleteurl = `user/deleteFavoriteInfo`
			}else if(titlename=='userMyfootprint'){
				this.geturl = `user/getTrackList`
				this.deleteurl = `user/deleteTrackInfo`
			}
			// console.log(this.geturl)
			this.mycollection(this.geturl)
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #F8F8F8;
	}
	.scroll-view{
		overflow: hidden;
		height:100vh;
		margin-top:20rpx;
	}
	
	//列表样式
	.list{
	  background-color: #F8F8F8;
	  .shopping-title{
	   //由于背景图片没高度 给来一个高度
	   height:70rpx;
	   // background-color:deeppink ;//背景图片没有 先用颜色替代
	   // background-image:url() //这里背景图片到时候有图片在渲染  先把图片的其他属性写上
	   // background:no-repeat 0 0;
	   // background-size: 100% 100%;
	  }
	  .cu-list{
	   margin-bottom:20rpx;
	   display: flex;
	   flex-wrap:wrap;
	   justify-content:space-between;
	   padding: 0 20rpx;
	   
	   
	  }
	  .cu-list.menu-avatar>.cu-item{
	   display:block;
	   height:490rpx;
	   width: 340rpx;
	   // border: 2rpx solid red;
	   margin-bottom: 18rpx;
	   border-radius: 20rpx;
	   overflow: hidden;
	   box-shadow: 4rpx 4rpx 12rpx #C0C0C0;
	   padding:0;
	   // box-shadow: 0rpx 0rpx 0rpx 5rpx;
	   // align-items: center;
	   // margin-bottom:20rpx;
	   // &:last-child{
	   //  margin-bottom:0;
	   // }
	   .cu-avatar{
	    position: static !important;
	   }
	   .cu-item-left{
	    .cu-item-left-bg{
			width:100%;
			// background-size: 100% 100%;
		}
	   }
	   .cu-item-right{
	    margin-top:18rpx;
	    // background-color: ;
	     // width:100%;
		 padding-right:10rpx;
	     .content{
	      position: static !important;
	      width: 100% !important;
	      left:0 !important;
	     display: flex;
	     flex-wrap: wrap;
	     align-items: stretch !important;
	     /* #ifdef APP-PLUS */
	      .text-grey{
	       line-height:28rpx;
	       color:#000;
	       font-size: 28rpx;
	      display: -webkit-box;
	      -webkit-box-orient: vertical;
	      -webkit-line-clamp: 2;
	      overflow: hidden;
	      
	      }
	     /* #endif*/
	      /* #ifdef H5 */
	      .text-grey{
	       // height: 50rpx;
	       // overflow: hidden;
	       line-height:28rpx;
	       color:#000;
	       font-size: 22rpx;
	       // height: 50rpx;
	       display: -webkit-box;
	       -webkit-box-orient: vertical;
	       -webkit-line-clamp: 2;
	       overflow: hidden;
	      }
	     /* #endif */
	      .price{
	      margin-top: 20rpx;
	      display:flex;
	      width: 100%;
	       color:red;
	       font-weight: bold;
	       font-size: 30rpx;
	      
	      // margin-top:60rpx;
	      justify-content: space-between;
	      }
	     }
	   }
	  }
	  .cu-avatar.lg{
	   width: 318rpx;
	   height:330rpx;
	   border-radius:18rpx;
	  }
		.cu-btn.lg{
			line-height:80rpx;
		}
	}
</style>
