<template>
	<view class="personaldata">
		<actionbar url="/pages/PersonalMy/PersonalMy" message="个人资料"></actionbar>
		<modelkuang></modelkuang>
	</view>
</template>

<script>
	//这是引入的操作条
	import actionbar from "@/components/actionbar/actionbar.vue"
	import modelkuang from "@/components/personaldata/modelkuang.vue"
	export default {
		//这是个人资料
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			actionbar,
			modelkuang
		}
	}
</script>

<style lang="less" scoped>
	.personaldata{
		
	}
</style>
