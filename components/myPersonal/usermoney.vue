<template>
	<view class="my-Personalmy-bottom">
		<mycoupons></mycoupons>
		<view class="Personal-list">
			<view class="money-list" v-for="(item,index) in moneylist" :key="index" @tap="jumpcenter" :data-url="item.url" :data-linkid="item.id" :data-nums="item.num">
				<text>{{item.num}}</text>
				<text>{{item.miao}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	//引入优惠券
	import mycoupons from "@/components/myPersonal/coupons.vue"
	export default{
		methods:{
			jumpcenter(e){
				let linksid = parseInt(e.currentTarget.dataset.linkid)
				let url = e.currentTarget.dataset.url
				// console.log(`${url}`)
				if(linksid==2){
					let nums = e.currentTarget.dataset.nums
					uni.navigateTo({
						url:`${url}?integralnum=${btoa(nums)}`
					})
					return 
				}
				// console.log(url)
				uni.navigateTo({
					url
				})
			},
		},
		props:["moneylist"],
		components:{
			mycoupons
		}
	}
</script>

<style lang="less" scoped>
	.my-Personalmy-bottom{
		display:flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top:20rpx;
		.Personal-list{
			display:flex;
			justify-content: space-around;
			width: 95%;
			padding: 28rpx 0;
			background-color: #fff;
			box-shadow: 4rpx 6rpx 6rpx #c6c6c6;
			border-radius:20rpx;
			.money-list{
				text{
					display:block;
					text-align:center;
					font-weight: bold;
					font-size: 28rpx;
					color:#616161;
					&:first-child{
						color:red;
					}
				}
			}
		}
	}
	
</style>
