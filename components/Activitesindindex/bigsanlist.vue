<template>
	<view class="bigsanlist">
		<view class="bigsanlist-item" v-for="(item,index) in shoppinglist" :key="index">
			<view class="item-list" style="background-image: url(/static/Activirsindex/img/5.png);">
				<view class="item-text">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shoppinglist:[
					{
						text:"大牌女装"
					},
					{
						text:"猫耳朵"
					},
					{
						text:"精品男装"
					}
				]
			};
		}
	}
</script>

<style lang="less" scoped>
	.bigsanlist{
		display:flex;
		justify-content: space-around;
		.bigsanlist-item{
			width: 30%;
			height:300rpx;
			background-color:#FFFFFF;
			border-radius:30rpx;
			margin-top:-30rpx;
			padding: 8rpx;
			.item-list{
				width: 100%;
				height: 100%;
				background-color: red;
				border-radius: 30rpx;
				background-color: #ff1ca6;
				background-repeat: no-repeat;
				background-size: auto 100%;
				background-position: center;
				box-shadow: inset 0rpx 0rpx 20rpx 6rpx #8b8b8b;
				overflow: hidden;
				display: flex;
				flex-direction:column-reverse;
				.item-text{
					height: 90rpx;
					width: 100%;
					background-color: #ff1ca6;
					box-shadow:inset 0 0 6rpx 1rpx #FFFFFF;
					font-size: 38rpx;
					text-align: center;
					line-height: 90rpx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
