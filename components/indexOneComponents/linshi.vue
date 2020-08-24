<template>
	<view class="recommend_box">
		<!-- 热门推荐 -->
		<view class="recommend">
			 <!-- 推荐 -->
			<view 
				class="recommend_left" 
				v-for="(item,index) in list"
				:key="index"
				:style="{'background-color':item.bgcolor,'background-image':'url('+item.bgimg+')'}"
				@tap="clicklink"
				:data-link='item.link'
				:data-index='index'
			>
				<view class="titie" :style="{'color':item.color}">
					<text>{{item.title}}</text>
				</view>
				<view class="button">
					<text :style="{'background-image':'url('+item.bgbtn+')'}">{{item.button}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
						title:"惠播客直播",
						button:"水果大采购",
						color:"#f35425",
						shadow:"#fd441b",
						bgcolor:"#fee6dc",
						bgbtn:`${this.$store.state.httpUrl}lin_shi/btn2.png`,
						bgimg:`${this.$store.state.httpUrl}lin_shi/live.png`,
						link:"/pages/Liveplatformlist/Liveplatformlist"
					},
					{
						title:"品质大牌",
						button:"化妆品仅1299",
						color:"#e347af",
						shadow:"#e83ca8",
						bgcolor:"#ffe5f8",
						bgbtn:`${this.$store.state.httpUrl}lin_shi/btn1.png`,
						bgimg:`${this.$store.state.httpUrl}lin_shi/brand.png`,
						link:"/pages/brand/brand"
					}
				]
			}
		},
		methods:{
			clicklink(e){
				let {link,index} = e.currentTarget.dataset
				if(index == 0){
					uni.switchTab({
						url: link
					})
				}else{
					uni.navigateTo({
						url: link
					});
				}
				
			}
		}
	}
	
</script>

<style lang="less" scoped>
	.recommend_box{
			 display: flex;
			 justify-content: center;
			 margin: 30rpx 0;
			 .recommend{
				 padding: 0 10rpx;
			 	width: 715rpx;
				display: flex;
				justify-content: space-between;
				.recommend_left{
					width: 340rpx;
					height: 141rpx;
					font-size: 36rpx;
					padding: 10rpx 20rpx;
					border-radius: 20rpx;
					background-size: 180rpx 120rpx;
					background-repeat:no-repeat;
					background-position:right bottom;
					.titie{
						font-size: 36rpx;
						font-weight: bold;
					}
					.button{
						margin-top: 10rpx;
						text{
							font-size: 24rpx;
							padding: 10rpx 30rpx;
							border-radius: 30rpx;
							color: #FFFFFF;
							background-size: 100% 100%;
						}
					}
				}
			 }
	}
</style>
