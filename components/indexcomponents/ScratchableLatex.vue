<template>
	<view class="ScratchableLatex">
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @click="collection(item.url,item.name)">
				<!-- <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view> -->
				<!-- 把这变成image -->
				<view class="icon" :style="{width:width,height:height+'rpx'}">
					<image src="/static/1.png" alt="">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){//这是九宫格
			return {
				gridBorder: false,
			}
		},
		props:["cuIconList","gridCol","width","height"],
		methods:{
			collection(url,name){
				// console.log(url,name,list)
				uni.navigateTo({
					url:`${url}?title=${name}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.ScratchableLatex{
		margin-top:30rpx;
		.icon{
			width: 40%;
			height:60rpx;
			// background-color:pink;
			margin:auto;
			image{
				width: 100%;
				height:100%;
			}	
		}
		text{
			font-size: 24rpx;
		}
	}
</style>
