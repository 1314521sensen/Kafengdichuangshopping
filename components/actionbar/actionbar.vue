<template>
	<view class="actionbar">
		<view class="cu-bar minheight" :style="{'background-color':bg?bg:'#fff'}">
			<view class="action" @tap="returnsmy" :data-url="url">
				<text class="cuIcon-back text-gray"></text>
			</view>
			<view class="content text-bold" :style="{'color':textcolor?textcolor:'#000'}">
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
			returnsmy(e){
				let url = e.currentTarget.dataset.url
				uni.switchTab({
					url
				})
			}
		},
		props:["url","message","bg","textcolor"]
	}
</script>

<style>
	.minheight{
		min-height:100rpx;
	}
	
</style>
