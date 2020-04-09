<template>
	<view class="actionbar">
		<view class="cu-bar minheight" :style="{'background-color':bg?bg:'#fff'}">
			<view class="action" @click="returnsmy(url)">
				<text class="cuIcon-back text-gray"></text>
			</view>
			<view class="content text-bold">
				{{message}}
			</view>
		</view>
	</view>
</template>

<script>
	//这是操作条
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			returnsmy(url){
				uni.switchTab({
					url
				})
			}
		},
		props:["url","message","bg"]
	}
</script>

<style>
	.minheight{
		min-height:70rpx;
	}
	
</style>
