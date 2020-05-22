<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<scroll-view scroll-x class="bg-gray nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in tabSelectList" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
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
				tabSelectList:["待评价","已评价"] ,
				
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		components:{
			Evaluate
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.nav .cu-item{
		height:64rpx;
		line-height:64rpx;
	}
	
</style>
