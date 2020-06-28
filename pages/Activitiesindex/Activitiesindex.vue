<template>
	<view class="Activitesindindex">
			<view class="Activitesindindex-top" :style="{'background-image':'url(/static/Activirsindex/indexbg.png)','padding-top':statusBar+10+'rpx'}">
				<search :showbtn="false"></search>
				<Activitiesbanner></Activitiesbanner>
				<ScratchableLatex margintext="28" :cuIconList="cuIconList"></ScratchableLatex>
				<Activiesindextitle titlemsg="好物联盟" textcolor="#e79d08"></Activiesindextitle>
			</view>
			<view class="Activitesindindex-bottom" :style="{'background-color':'red'}">
				<bigsanlist></bigsanlist>
				<smailshopbg></smailshopbg>
				<view class="recommendation">
					<recommendation></recommendation>
					<discountsList></discountsList>
					<list></list>
				</view>
			</view>
	</view>
</template>

<script>
	//引入搜索
	import search from "@/components/Activitesindindex/search.vue"
	//引入活动banner
	import Activitiesbanner from "@/components/Activitesindindex/Activitiesbanner.vue"
	//引入九宫格
	import ScratchableLatex from "@/components/indexOneComponents/ScratchableLatex.vue"
	//引入标题
	import Activiesindextitle from "@/components/Activitesindindex/Activiesindextitle.vue"
	//引入三个大列表
	import bigsanlist from "@/components/Activitesindindex/bigsanlist.vue"
	//引入三个小的
	import smailshopbg from "@/components/Activitesindindex/smailshopbg.vue"
	//引入精品推荐
	import recommendation from "@/components/Activitesindindex/recommendation.vue"
	import discountsList from "@/components/Activitesindindex/discountsList.vue"
	import list from "@/components/Activitesindindex/list.vue"
	//这是活动的首页
	const app = getApp()
	export default {
		data() {
			return {
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '拼团',
					imgs:"/static/Activirsindex/Scratchablelatexicon/Spellgroup.png",
					url:"/pages/groupbooking/groupbooking"
				},
				{
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '团购',
					imgs:"/static/Activirsindex/Scratchablelatexicon/bulk.png",
					url:"/pages/grouppurchase/grouppurchase"
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '折扣',
					imgs:"/static/Activirsindex/Scratchablelatexicon/discount.png",
					url:"/pages/discount/discount"
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '新人礼',
					imgs:"/static/Activirsindex/Scratchablelatexicon/Ledsecurities.png",
					url:"/pages/Newgift/Newgift",
					Routinghopname:"Newgift"
				}, 
				{
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '品牌',
					imgs:"/static/Activirsindex/Scratchablelatexicon/brand.png",
					url:"/pages/brand/brand"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '秒杀',
					imgs:"/static/Activirsindex/Scratchablelatexicon/Secondskill.png",
					url:"/pages/limitedtimesecondskill/limitedtimesecondskill"
				},
				{
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '专题',
					imgs:"/static/Activirsindex/Scratchablelatexicon/project.png",
					url:"/pages/topicpage/topicpage"
				}, 
				{
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '积分',
					imgs:"/static/Activirsindex/Scratchablelatexicon/integral.png",
					url:"/pages/integralstore/integralstore"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '小蜜蜂',
					imgs:"/static/Activirsindex/Scratchablelatexicon/Littlebee.png",
					url:"/pages/Littlebee/Littlebee"
				},
				{
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助',
					imgs:"/static/Activirsindex/Scratchablelatexicon/help.png",
					url:"/pages/help/help"
				}
				],
				statusBar:0
			}
		},
		methods: {
			
		},
		components:{
			search,
			Activitiesbanner,
			ScratchableLatex,
			Activiesindextitle,
			bigsanlist,
			smailshopbg,
			recommendation,
			discountsList,
			list
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.Activitesindindex{
		// background-color: #fa1323;
			.Activitesindindex-top{
				background-size: 100% 100%;
				background-repeat: no-repeat;
				padding-bottom:48rpx;
			}
			// .Activitesindindex-bottom{
				
			// }
		.recommendation{
			padding: 0 15rpx;
			overflow: hidden;
		}
	}
	/* 这是活动首页的背景颜色 */
	// .activityindexbg{
	// 	background-color:red;
	// }
</style>
