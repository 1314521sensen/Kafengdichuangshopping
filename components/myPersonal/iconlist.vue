<template>
	<view class="orders-icon-list" :style="{'justify-content':`${align}`}">
		<view class="orders-item" v-for="(item,index) in iconList" :key="index" @tap="iconclik" :data-indexs="index">
			<view class="icon">
				<image :src=item.images alt="">
			</view>
			<text>{{item.textname}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props:["iconList","align"],
		methods:{
			iconclik(e){ //接收下标  根据下标跳转到相应的链接下面的下标
				let index = parseInt(e.currentTarget.dataset.indexs)
				if(index==3){
					uni.navigateTo({
						url:`/pages/evaluate/evaluate`
					})
					return 
				}
				// /pages/orderpageRouter/orderpageRouter 链接
				uni.navigateTo({
					//这块目前还没发现 哪引用着  后期发现再改
					url:`/pages/orderpageRouter/orderpageRouter?index=${index+1}&is_order=is_order`
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.orders-icon-list{
		display:flex;
		justify-content: space-around;
		// height:200rpx;
		// background-color:green;
		.orders-item{
			width: 18%;
			height:100%;
			// background-color: red;
			.icon{
				width: 40%;
				height:52rpx;
				// background-color:pink;
				margin:auto;
				image{
					width: 100%;
					height:100%;
				}	
			}
			text{
				display:block;
				text-align:center;
				margin-top:8rpx;
				font-size: 22rpx;
			}
		}
	}
</style>
