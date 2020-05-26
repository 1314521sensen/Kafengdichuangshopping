<template>
	<view class="Selectionrecommended">
		<view class="title">
			<text>精选推荐</text>
		</view>
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
		<loading v-if="iconbool"></loading>
	</view>
</template>

<script>
	//引入横排组件
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	const app = getApp()
	export default{
		data(){
			return {
				//这是横排的数据
				horizontallylist:[],
				iconbool:true
			}
		},
		components:{
			horizontallylist
		},
		created() {
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}good/getRandomRecommendGoodsList`,
				data:{
					limit:20
				},
				success(res) {
					if(res.data.code==0){
						_this.horizontallylist = res.data.data
					}
					_this.iconbool = false
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.Selectionrecommended{
		background-color: #fff;
		margin-top:30rpx;
		.title{
			font-size: 36rpx;
			color:red;
			text-align:center;
			line-height:70rpx;
			padding:12rpx 0 0;
		}
	}
</style>
