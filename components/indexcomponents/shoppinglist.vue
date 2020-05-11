<template>
	<view class="shoppinglist">
		<!-- 这里是组件定义出去 -->
		<list :list="list" display="none"></list>
	</view>
</template>

<script>
	import list from "@/components/indexcomponents/list.vue"
	const app = getApp()
	export default{

		data(){
			return {
				list:[],
			}
		},
		components:{
			list,
		},
		created(){
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}good/getRecommendGoodsList`,
				data:{
					limit:10
				},
				success(res) {
					if(res.data.code==0){
						_this.list = res.data.data.list
					}else{
						app.globalData.showtoastsame("数据暂无")
					}
				}
			})
		}
	}
</script>

<style>
</style>
