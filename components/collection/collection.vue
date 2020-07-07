<template>
	<view class="collection">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" :message="message"></actionbar>
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom" v-if="list.length!==0">
			<list :list="list" display="block" :deleteurl="deleteurl" :tokey="tokey" :deletelist="deletelist" :requesturl="requesturl"></list>
			<uniLoadMore :iconSize="20" :contentText="{contentdown:text}" v-if="list.length>=10"></uniLoadMore>
		</scroll-view>
		<Nopage v-if="list.length==0"></Nopage>
	</view>
</template>

<script>
	//这是引入头部的导航
	import actionbar from "@/components/actionbar/actionbar.vue"
	//引入竖列列表
	import list from "@/components/indexcomponents/list.vue"
	//引入暂无商品的
	import Nopage from "@/components/Nopage.vue"
	//引入加载的插件
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
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
				deleteurl:"",
				deletelist:[],
				requesturl:"",//请求接口
			}
		},
		components:{
			actionbar,
			list,
			Nopage,
			uniLoadMore
		},
		methods:{
			//封装一个请求获取用户收藏的信息
			mycollection(url){
				// #ifdef MP-WEIXIN
					uni.getStorage({
						key:"bindtokey",
						success:(res)=>{
							this.tokey = res.data
							uni.request({
								url,
								method:"POST",
								data:{
									token:this.tokey,
									page:this.listindex,
									pageSize:this.listnum
								},
								success:(reslist)=>{
									if(reslist.data.data!==undefined){
										this.deletelist = reslist.data.data.list
									}
									if(reslist.data.code==1 && reslist.data.msg){
										this.text = "我也是有底线的"
										return
									}
									this.listindex++
									this.list = this.list.concat(reslist.data.data.list)
								}
							})
						}
					})
				// #endif
				// #ifdef H5 || APP-PLUS
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(res){
						uni.request({
							url,
							method:"POST",
							data:{
								token:res.data,
								page:_this.listindex,
								pageSize:_this.listnum
							},
							success:(reslist)=>{
								if(reslist.data.data!==undefined){
									_this.deletelist = reslist.data.data.list
								}
								if(reslist.data.code==1 && reslist.data.msg){
									_this.text = "我也是有底线的"
									return
								}
								_this.listindex++
								_this.list = _this.list.concat(reslist.data.data.list)
								// console.log(_this.list)
							}
						})
					}
				})
				// #endif
			},
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				this.mycollection(`${app.globalData.Requestpath}user/getGoodFavoriteList`)
			}
		},
		onLoad(opctry){
			//获取缓存
			uni.getStorage({
				key:"bindtokey",
				success:(res)=>{
					this.tokey = res.data
				}
			})
			this.message=opctry.title
			if(opctry.titlename=="userMycollection"){
				//在这里请求渲染数据
				//这是获取收藏的列表
				this.mycollection(`${app.globalData.Requestpath}user/getGoodFavoriteList`)
				this.requesturl = `${app.globalData.Requestpath}user/getGoodFavoriteList`
				//这是删除收藏的商品
				this.deleteurl = `${app.globalData.Requestpath}user/deleteFavoriteInfo`
			}else{
				if(opctry.titlename=="userMyfootprint"){
					// 在这里请求渲染数据
					//这是获取我的足迹
					this.mycollection(`${app.globalData.Requestpath}user/getTrackList`)
					this.requesturl = `${app.globalData.Requestpath}user/getTrackList`
					//这是删除我的足迹商品
					this.deleteurl = `${app.globalData.Requestpath}user/deleteTrackInfo`
				}
			}
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.scroll-view{
		overflow: hidden;
		height:100vh;
		margin-top:20rpx;
	}
</style>
