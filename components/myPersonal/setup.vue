<template>
	<view class="setup">
		<!--动态设置css end -->
		<iconlist :iconList="iconList" align="flex-start"></iconlist>
	</view>
</template>

<script>
	import iconlist from "@/components/myPersonal/iconlist.vue";
	export default{
		data(){
			return {
				iconList:[
					{
						images:"/static/my/payment.png",
						textname:"设置"
					}
				]
			}
		},
		components:{
			iconlist
		}
	}
</script>

<style lang="less" scoped>
	.setup{
		background-color: #fff;
		padding-bottom:10rpx;
	}
</style>
