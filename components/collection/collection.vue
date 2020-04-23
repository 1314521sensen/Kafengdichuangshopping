<template>
	<view class="collection">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" :message="message"></actionbar>
		<list :list="list" v-if="list.length!==0"></list>
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
	const app = getApp();
	//这是我的收藏
	export default{
		data(){
			return {
				message:"",
				tokey:"",
				listindex:1,
				listnum:10,
				list:[
					{
						images:'/static/index/indexlist/1.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"50"
					},
					{
						images:'/static/index/indexlist/2.jpg',
						describe:"梓画 床 实木床 单双人床新中式床1.8米1.5m高箱储物床婚床卧室精品家具",
						price:"60"
					}
				],
				statusBar:0
			}
		},
		components:{
			actionbar,
			list,
			Nopage
		},
		methods:{
			//封装一个请求获取用户收藏的信息
			mycollection(){
				//先获取tokey值
				uni.getStorage({
					key:"bindtokey",
					success:(res)=>{
						this.tokey = res.data
						console.log(this.tokey)
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
									this.list = []
								}else{
									//就有商品 一会逻辑在这写
								}
							}
						})
					}
				})
			}
		},
		onLoad(opctry){
			this.message=opctry.title
			if(opctry.title=="我的收藏"){
				//在这里请求渲染数据
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
	
</style>
