<template>
	<view class="shoppinglist">
		<!-- 这里是组件定义出去 -->
		<list :list="list"></list>
	</view>
</template>

<script>
	import list from "@/components/indexcomponents/list.vue"
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
				url:"http://hbk.huiboke.com/api/good/getRecommendGoodsList",
				data:{
					limit:10
				},
				success(res) {
					_this.list = res.data.data.list
				}
			})
		}
	}
</script>

<style>
</style>
