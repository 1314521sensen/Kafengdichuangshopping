<template>
	<view class="store-nav">
		<view>
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?' cur':''" v-for="(item,index) in navlist" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
					{{item}}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				items:"",
				TabCur: 0,
				scrollLeft: 0,
				navlist:["推荐","宝贝","新品"]//"视频"
			}
		},
		methods:{
			tabSelect(e) {
				let {id,items} = e.currentTarget.dataset
				this.items = items
				
				// console.log(e.currentTarget.dataset)
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.$emit("getChildnav",this.items)
			}
		},
		
	}
</script>

<style scoped>
	.nav .cu-item.cur{
		border-bottom:0;
		font-size: 40rpx;
		transition: .5s;
	}
</style>
