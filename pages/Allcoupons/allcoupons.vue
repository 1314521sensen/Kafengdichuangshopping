<template>
	<view class="allcoupons">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="优惠券"></actionbar>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="nav-text">
				<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in coupons" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<!-- <view v-for="(item,index) in 10" :key="index" v-if="index==TabCur" class="bg-grey padding margin text-center">
			Tab{{index}}
		</view> -->
		<!-- {{coupons[TabCur]}}
		{{items}} -->
		<securitiesbottom v-if="items==coupons[TabCur]"></securitiesbottom>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import securitiesbottom from "@/components/allcoupons/securitiesbottom.vue"
	const app = getApp();
	//这是全部优惠卷路由
	export default{
		data(){
			return {
				statusBar:0,
				items:"未使用",
				TabCur: 0,
				scrollLeft: 0,
				coupons:[
					"未使用",
					"已使用",
					"已过期"
				]
			}
		},
		methods:{
			tabSelect(e) {
				// console.log(e.currentTarget.dataset)
				// console.log(this.coupons[this.TabCur+1])
				let {id,items} = e.currentTarget.dataset
				this.items = items
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		components:{
			actionbar,
			securitiesbottom
		}
	}
</script>

<style lang="less" scoped>
	.nav-text{
		display:flex;
		justify-content: space-around;
	}
	.nav .cu-item{
			height:74rpx;
	}
</style>
