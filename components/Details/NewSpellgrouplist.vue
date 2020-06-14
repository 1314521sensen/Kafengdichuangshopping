<template>
	<view>
		<!-- 拼单 -->
		<view class="shareThebill">
			<!-- 拼单参与 -->
			<view class="ParticipateInTheSpellList">
				<view>xx正在参与，可以直接参与 </view> 
				<view class="viewMore">
					 查看更多
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view>
				<view class="informationBox">
					<!-- 参加拼单人的资料 -->
					<view class="information">
					  <!-- 左边的资料   -->
						<view class="information_left">
							<!-- 头像 -->
							<image class="shareThebill_photo" src="/static/groupActivityPuurchasePage/yue.png"></image>
							<!-- 姓名 -->
							<view class="shareThebill_name">xiaoming</view>
						</view>
						<!-- 右边的   --> 
						<view class="information_right">
							<view>
								<view>还差一人拼成</view>
								<view>2018-09 13:52结束</view>
							</view>
							<view>
								<button class="cu-btn bg-red margin-tb-sm lg InTheGroup">去拼团</button>
							</view>
						</view>
					</view>
					<view class="information">
					  <!-- 左边的资料   -->
					    <view class="information_left">
						    <!-- 头像 -->
						    <image class="shareThebill_photo" src="/static/groupActivityPuurchasePage/yue.png"></image>
						    <!-- 姓名 -->
						    <view class="shareThebill_name">xiaoming</view>
					    </view>
						<!-- 右边的  --> 
						<view class="information_right">
							<view>
								<view>还差一人拼成</view>
								<view>2018-09 13:52结束</view>
							</view>
							<view>
								<button class="cu-btn bg-red margin-tb-sm lg InTheGroup">去拼团</button>
							</view>
							
						</view>
					</view>
				</view>	
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	// 进行拼单
	.shareThebill{
		margin-top: 6rpx;
		// height: 150rpx;
		padding-left: 25rpx;
		background-color: #FFFFFF;
		
		.ParticipateInTheSpellList{
			display: flex;
			.viewMore{
				margin-left: 225rpx;
			}
		}
		// 头像
		.shareThebill_photo{
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
		}
		.information{
			display: flex;
			border-bottom: 1px solid #CCCCCC;
		}
		.information_left{
			display: flex;	
			align-items: center;
			.shareThebill_name{
				margin-left: 8rpx;
			}//
		}
		.information_right{
			margin-left: 150rpx;
			display: flex;
			align-items: center;
			font-size: 12px;
			
			.InTheGroup{
				height: 50rpx;
				background-color: #E51657;
				margin-left: 8rpx;
			}
		}
	}
</style>
