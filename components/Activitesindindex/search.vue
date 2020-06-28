<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round" :class="showbtn?'':'search-radius'" @tap="InputFocus">
				<text class="cuIcon-search"></text>
				<input 
				:adjust-position="false" 
				type="text" 
				placeholder="搜索您想要的商品" 
				confirm-type="search"
				disabled="true"
				class="inp"
				placeholder-style="color:#fff"
			></input>
			</view>
			<view class="action" v-if="showbtn">
				<button class="cu-btn shadow-blur round">搜索</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			InputFocus() {
				uni.navigateTo({
					url:"/pages/SearchTo/SearchTo"
				})
			},
		},
		props:["showbtn"]
	}
</script>

<style lang="less" scoped>
	.search{
		// background-color:#FF0000;
		background-color:transparent;
		width: 95%;
		margin: 0 auto !important;
		// padding:0 40rpx;
		
		.search-form{
			background-color:rgba(255,255,255,.5);
			margin: 0;
			border-radius: 40rpx 0  0 40rpx;
		}
		.search-radius{
			opacity:1;
			border-radius: 40rpx;
		}
		.cu-btn{
			border-radius: 0 40rpx 40rpx 0;
			background-color: #fffof4;
		}
		
		.cu-bar .search-form+.action{
			margin-right: 0 !important;
		}
		.cu-bar .action:last-child{
			margin-right: 0 !important;
		}
		.inp{
			color:#fff;
		}
	}
</style>
