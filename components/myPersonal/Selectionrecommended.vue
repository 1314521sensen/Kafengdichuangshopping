<template>
	<view class="Selectionrecommended">
		<view class="title">
			<text>精选推荐</text>
		</view>
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
	</view>
</template>

<script>
	//引入横排组件
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	export default{
		data(){
			return {
				//这是横排的数据
				horizontallylist:[],
			}
		},
		components:{
			horizontallylist
		},
		created() {
			const _this = this
			uni.request({
				url:"http://hbk.huiboke.com/api/good/getRandomRecommendGoodsList",
				data:{
					limit:20
				},
				success(res) {
					if(res.data.code==0){
						_this.horizontallylist = res.data.data
					}
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
