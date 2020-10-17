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
				// console.log(this.isorder)
				if(this.isorder){
					// console.log(1111)
					uni.redirectTo({
						url:url
					})
				}else if(this.bool == 1){
					uni.navigateBack({
						delta: 2
					});
				}else{
					if(this.Jumpchoose){
						// uni.redirectTo({
						// 	url
						// })
						uni.navigateBack()
					}else{
						// uni.redirectTo({
						// 	url
						// })
						uni.navigateBack()
					}
				}
			}
		},
		props:["url","message","bg","textcolor",'Jumpchoose',"isorder","bool"]
	}
</script>

<style>
	.minheight{
		min-height:100rpx;
	}
	
</style>
