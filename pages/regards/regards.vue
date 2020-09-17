<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbarwei></actionbarwei?>
		<privacy></privacy>
		<agreement></agreement>
	</view>
</template>

<script>
	import privacy from "@/components/setcenter/privacy.vue"
	import agreement from "@/components/setcenter/agreement.vue"
	import actionbarwei from "@/components/actionbar/actionbarwei.vue"
	export default {
		data() {
			return {
				statusBar:30,
			}
		},
		methods: {
			
		},
		components:{
			privacy,
			agreement,
			actionbarwei
		}
	}
</script>

<style scoped lang="less">
    
</style>
