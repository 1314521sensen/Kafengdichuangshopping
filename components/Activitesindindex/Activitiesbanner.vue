<template>
	<view class="Activitiesbanner" style="background-image: url(/static/Activirsindex/ActivityEntry.gif);">
		<view class="Activitiesbanner-list">
			<view 
				class="Activitiesbanner-item" 
				v-for="(item,index) in 4" 
				:key="index"
				:class="index==1 || index==2?'Activitiesbanner-item-margin':''"
				style="background-image: url(/static/Activirsindex/111.webp);"
			>
				<view class="item-bottom">
					<text>4.3折封顶</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.Activitiesbanner{
		display:flex;
		align-items: flex-end;
		height:30vh;
		background-color:red;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.Activitiesbanner-list{
			display:flex;
			justify-content: space-around;
			width: 100%;
			height:168rpx;
			// background-size: 100% 100%;
			// padding:0 20rpx;
			.Activitiesbanner-item{
				width:21%;
				height:168rpx;
				background-color:#FFFFFF;
				border-radius:46rpx;
				background-size: 80% 50%;
				background-repeat: no-repeat;
				background-position: center 24rpx;
				display: flex;
				flex-direction:column-reverse;
				overflow: hidden;
				.item-bottom{
					width: 100%;
					height: 36rpx;
					text-align: center;
					font-size: 24rpx;
					background-image: linear-gradient(to right,#a94ff1,#7b22df);
					color: #FFFFFF;
				}
			}
			.Activitiesbanner-item-margin{
				margin-top:20rpx;
			}
		}
	}
</style>
