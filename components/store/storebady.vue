<template>
	<view class="shoppngbady">
		<scroll-view scroll-y="true" class="scroll-view">
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
		</scroll-view>
	</view>
</template>

<script>
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	export default{
		data(){
			return {
				
			}
		},
		components:{
			horizontallylist
		},
		props:["horizontallylist"]
	}
</script>

<style lang="less" scoped>
	.shoppngbady{
		.scroll-view{
			height:80vh;
		}
	}
</style>
