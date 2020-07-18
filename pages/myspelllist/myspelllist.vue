<template>
	<view class="myspelllist">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 返回 -->
		<actionbar message="我的拼单" url="/pages/PersonalMy/PersonalMy"></actionbar>
		<!-- 我的拼单 -->	
		<sharethebill></sharethebill>
		<!-- 精品推荐  -->
		<Recommend title="精选推荐"  bg="#f2f2f2"></Recommend>
		<!-- // 直播中  立即拼团 -->
		<liveintroduced></liveintroduced>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	// 引入我的拼单记录   
	import sharethebill from "@/components/MySpellList/sharethebill"
	
	// 这是精选推荐几个字
	import Recommend from '@/components/indexcomponents/Recommend.vue'
	// 直播中  立即拼团
	import liveintroduced from "@/components/groupbooking/liveintroduced.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0
			}
		},
		methods: {
			                
		},
		components:{
			sharethebill,
			liveintroduced,
			Recommend,
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
    .myspelllist{
		background-color: #F8F8F8;;
		
		.recommend{
			display: flex;
			justify-content: center;	
			align-items: center;
			margin-top: 30rpx;
			.left{
				display: inline-block;
				width: 40rpx;
				height: 5rpx;
				background-color: #333333;
				margin-left: -20rpx;
			}
			.text{
				display: inline-block;
				margin: 0 8rpx 0 8rpx;
			}
			.right{
				display: inline-block;
				width: 40rpx;
				height: 5rpx;
				background-color: #333333;
			}
		}
		
	}
</style>
