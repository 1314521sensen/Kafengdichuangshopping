<template>
	<view class="collection">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" :message="message"></actionbar>
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="scrollbottom">
			<list :list="list" v-if="list.length!==0"></list>
			<uniLoadMore :iconSize="20" :contentText="{contentdown:text}"></uniLoadMore>
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
				text:"正在加载..."
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
			mycollection(){
				uni.request({
					url:"http://hbk.huiboke.com/api/user/getGoodFavoriteList",
					method:"POST",
					data:{
						token:this.tokey,
						page:this.listindex,
						pageSize:this.listnum
					},
					success:(reslist)=>{
						if(reslist.data.code==1 && reslist.data.msg){
							this.text = "我也是有底线的"
							return
						}
						this.listindex++
						this.list = this.list.concat(reslist.data.data.list)
					}
				})
			},
			//监控scroll-view 滚动标签是否滚动到底部
			scrollbottom(){
				this.mycollection()
			}
		},
		onLoad(opctry){
			this.message=opctry.title
			if(opctry.title=="我的收藏"){
				//在这里请求渲染数据
				uni.getStorage({
					key:"bindtokey",
					success:(res)=>{
						this.tokey = res.data
					}
				})
				this.mycollection()
			}else{
				if(opctry.title=="我的足迹"){
					// 在这里请求渲染数据
				}
			}
			this.statusBar = app.globalData.statusBar
		},
		created() {
			
		}
	}
</script>

<style lang="less" scoped>
	.scroll-view{
		overflow: hidden;
		height:100vh;	
	}
</style>
