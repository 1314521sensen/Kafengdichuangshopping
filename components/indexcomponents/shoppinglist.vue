<template>
	<view class="shoppinglist">
		<!-- 这里是组件定义出去 -->
		<scroll-view :scroll-y="true"  @scrolltolower="scrolltolower" class="scrolltolower-list" >
			<list :list="list" display="none"></list>
			<view class="text-bottom"  v-if="textbool">已经到底部</view>
		</scroll-view>
		<loading v-if="iconbool"></loading>
	</view>
</template>

<script>
	import list from "@/components/indexcomponents/list.vue"
	const app = getApp()
	export default{
		data(){
			return {
				list:[],
				iconbool:true,
				page:1,
				textbool:false
			}
		},
		components:{
			list,
		},
		methods:{
			indexshoplist(page){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}good/getRecommendGoodsList`,
					data:{
						page:page,
						pageSize:10
					},
					success(res) {
						console.log(res)
						if(res.data.code==0){
							if(_this.page>1){
								_this.list = _this.list.concat(res.data.data.list)
							}else{
								_this.list = res.data.data.list
							}
						}else{
							_this.textbool = true
						}
						_this.iconbool = false
					}
				})
			},
			scrolltolower(){
				this.page+=1
				this.indexshoplist(this.page)
			}
			
		},
		created(){
			
			this.indexshoplist(1)
		}
	}
</script>

<style lang="less" scoped>
	.scrolltolower-list{
		height:100vh;
		.text-bottom{
			text-align: center;
			color: #a1a1a1;
		}
	}
</style>
