<template>
	<view classc="actionbarwei">
		<view class="cu-bar bg-white">
			<view class="action" @tap="actionbarwei">
				<text class="cuIcon-back text-gray"></text> 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				actionbarwei(){
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.cu-bar{
		min-height:72rpx;
	}
</style>
