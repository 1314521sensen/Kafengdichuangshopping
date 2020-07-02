<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<scroll-view scroll-x class="bg-gray nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in tabSelectList" :key="index" @tap="tabSelect" :data-id="index" :data-url="item.url">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 这是评价列表组件 -->
			<Evaluate></Evaluate>
	</view>
</template>

<script>
	const app = getApp()
	import Evaluate from "@/components/evaluate/evaluate.vue"
	export default {
		data() {
			return {
				statusBar:0,
				TabCur: 0,
				tabSelectList:[
					{
						name:"待评价",
						url:'order/getConfirmPayOrderList'
					},
					{
						name:"已评价",
						url:'order/getHaveEvaluationOrderList'
					}
				] 
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				let url = e.currentTarget.dataset.url
				// this.Evaluationdata(url)
				this.$store.commit("getevaluationlist",{url})
			},
		},
		components:{
			Evaluate
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		created(){
			this.$store.commit("getevaluationlist",{url:'order/getConfirmPayOrderList'})
		}
	}
</script>

<style lang="less" scoped>
	.nav .cu-item{
		height:64rpx;
		line-height:64rpx;
	}
	
</style>
