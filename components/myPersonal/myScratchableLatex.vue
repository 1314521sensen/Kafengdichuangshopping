<template>
	<view class="myScratchableLatex">
		<scratchablelatex :cuIconList="cuIconList" :gridCol="gridCol" width="40%" height="60"></scratchablelatex>
	</view>
</template>

<script>
	import scratchablelatex from "@/components/indexcomponents/ScratchableLatex.vue";
	export default{
		data(){//这是个人中心得九宫格
			return {
				cuIconList: [
					{
					badge: 120,
					name: '分享赚钱',
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Promotedistribution.png`,
					Routinghopname:"Promotedistribution",
					url:"/pages/headearnings/headearnings"
				},
				{
					badge: 22,
					name: '收货地址',
					url:"/pages/addressTo/addressTo",
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Shippingaddress.png`,
					Routinghopname:"userShippingaddress"
				}, 
				// {
				//      badge: 1,
				//      name: '签到',
				//      imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Signin.png`,
				//      Routinghopname:"Signin",
				//      // url:"/pages/signin/signin"
				// }, 
				{
					badge: 0,
					name: '商品收藏',
					url:"/components/collection/collection",
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Mycollection.png`,
					Routinghopname:"userMycollection"
				},
				{
					badge: 0,
					name: '店铺收藏',
					url:"/pages/storecollection/storecollection",
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/storecollection.png`,
					Routinghopname:"storecollection"
				},
				// {
				//      badge: 0,
				//      name: '我的拼单',
				//      imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Myspelllist.png`,
				//      Routinghopname:"userMyspelllist",
				//      // url:"/pages/myspelllist/myspelllist"
				// }, 
				{
					badge: 0,
					name: '我的足迹',
					url:"/components/collection/collection",
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Myfootprint.png`,
					Routinghopname:"userMyfootprint"
				}, {
					badge: 0,
					name: '平台客服',
					url:"/pages/Customerservice/Customerservice",
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Myadvice.png`,
					Routinghopname:"userMyinquiry"
				}, {
					badge: 0,
					name: '小蜜蜂',
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/Littlebee.gif`,
					Routinghopname:"userTopupwithdrawal",
					url:"/pages/Littlebee/Littlebee"
				},
				{
					badge: 0,
					name: '设置',
					url:"/components/setcenter/setcenter",
					imgs:`${this.$store.state.httpUrl}my/ScratchableLatex/shezhi.png`,
					Routinghopname:"userset"
				},
				// {
				// 	badge: 0,
				// 	name: '店铺入驻',
				// 	url:"/pages/merchant/merchant",
				// 	imgs:`${this.$store.state.httpUrl}/uploads/app/image/my/ScratchableLatex/storehouse.png`,
				// 	Routinghopname:"userset"
				// }
				],
				gridCol: 5,//这是格数
			}
		},
		components:{
			scratchablelatex
		}
	}
</script>

<style lang="less" scoped>
	.myScratchableLatex{
		
	}
</style>
