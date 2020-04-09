<template>
	<view class="horizontallylist">
		<view class="horizontally">
			<view class="list" v-for="(item,index) in horizontallylist" :key="index" @click="horizontallydetails">
				<image :src="item.imgs"></image>
				<view class="list-titile">
					<text>{{item.title}}</text>
					<text class="horizontallyprice">¥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//横排显示列表
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			horizontallydetails(){
				uni.navigateTo({
					url:"/pages/Details/Details"
				})
			}
		},
		props:["horizontallylist"]
	}
</script>

<style lang="less" scoped>
	.horizontallylist{
		margin-top:20rpx;
		.horizontally{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding:0 15rpx;
			.list{
				width: 49%;
				// height:100rpx;
				background-color: #fff;
				margin-bottom:10rpx;
				overflow: hidden;
				&:last-child{
					margin-bottom:0;
				}
				image{
					width: 100%;
					height:384rpx;
				}
				.list-titile{
					padding:0 10rpx;
					text{
						display: block;
						font-size: 30rpx;
						color:#000;
						 white-space:nowrap;
						 font-weight: bold;
						 margin-top:8rpx;
						 &:last-child{
							 margin-top:30rpx;
						 }
					}
					.horizontallyprice{
						color:red;
					}
				}
			}
		}
	}
</style>
