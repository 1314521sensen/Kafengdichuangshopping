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
					name: '团长申请',
					imgs:"/static/Settheicon/Promotedistribution.png",
					Routinghopname:"Promotedistribution",
					url:"/pages/applygroup/applygroup"
				},
				{
					badge: 1,
					name: '签到',
					imgs:"/static/Settheicon/Signin.png",
					Routinghopname:"Signin",
					url:"/pages/signin/signin"
				}, {
					badge: 22,
					name: '收货地址',
					url:"/pages/addressTo/addressTo",
					imgs:"/static/Settheicon/Shippingaddress.png",
					Routinghopname:"userShippingaddress"
				},  {
					badge: 0,
					name: '我的拼单',
					imgs:"/static/Settheicon/Myspelllist.png",
					Routinghopname:"userMyspelllist",
					url:"/pages/myspelllist/myspelllist"
				}, {
					badge: 0,
					name: '我的收藏',
					url:"/components/collection/collection",
					imgs:"/static/Settheicon/Mycollection.png",
					Routinghopname:"userMycollection"
				}, {
					badge: 0,
					name: '我的足迹',
					url:"/components/collection/collection",
					imgs:"/static/Settheicon/Myfootprint.png",
					Routinghopname:"userMyfootprint"
				}, {
					badge: 0,
					name: '我的咨询',
					imgs:"/static/Settheicon/Myadvice.png",
					Routinghopname:"userMyinquiry"
				}, {
					badge: 0,
					name: '充值/提现',
					imgs:"/static/Settheicon/withdrawal.png",
					Routinghopname:"userTopupwithdrawal"
				},
				{
					badge: 0,
					name: '设置',
					url:"/components/setcenter/setcenter",
					imgs:"/static/Settheicon/shezhi.png",
					Routinghopname:"userset"
				},
				{
					badge: 0,
					name: '店铺入驻',
					url:"/pages/merchant/merchant",
					imgs:"/static/Settheicon/shezhi.png",
					Routinghopname:"userset"
				}
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
