<template>
	<view class="coupons">
		<!-- 这是优惠卷的信息 -->
		<scroll-view scroll-x="true">
			<view class="rows">
				<view class="coupons-for" v-for="(item,index) in list" :key="index">
					
					 <view class="coupons-list" v-for="(citem,cindex) in item" :key="cindex"><!-- v-for="(item,index) in list" :key="index"-->
						<view class="coupons-midden">
								<text>优惠券</text>
								<text>{{citem.price}}元</text>
								<text>满{{citem.preferential}}元可使用</text>
							</view>
					</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default{
		//这是优惠卷的组件
		data(){
			return {
				list:[
						[
							{
								price:3,
								preferential:58
							},
							{
								price:5,
								preferential:88
							},
							{
								price:10,
								preferential:168
							}
						],
						[
							{
								price:18,
								preferential:68
							},
							{
								price:20,
								preferential:78
							},
							{
								price:10,
								preferential:168
							}
						],
						[
							{
								price:30,
								preferential:98
							},
							{
								price:11,
								preferential:108
							},
							{
								price:13,
								preferential:208
							}
						]
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.coupons{
		width: 100%;
		overflow: hidden;
		.rows{
			width: 300%;
			display:flex;
		
		.coupons-for{
			width: 100%;
			display:flex;
			justify-content: space-around;
			align-items: center;
			width: 95%;
			height:200rpx;
			background-color:#fff;
			margin:20rpx auto;
			border-radius:16rpx;
		.coupons-list{
			display:flex;
			align-items: center;
			width: 220rpx;
			height:148rpx;
			background-color:#cd293f;
			padding:8rpx 0;
			.coupons-midden{
				width: 80%;
				// height:100%;
				background-color: #ec3636;
				margin:auto;
				// padding-left:10rpx;
				padding: 8rpx 0 8rpx 10rpx;
				text{
					display:block;
					color:yellow;
					font-size: 38rpx;
					margin-bottom: 5rpx;
					text-align:center;
					white-space: nowrap;
					overflow:hidden;
					text-overflow:ellipsis;//文字超出以后显示小圆点
					&:first-child{
						font-size: 12rpx;
						text-align:left
					}
					&:last-child{
						font-size: 12rpx;
						margin-bottom:0;
						text-align:left;
					}
				}
			}
		}
	}
	}
}
</style>
