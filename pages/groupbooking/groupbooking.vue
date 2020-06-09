<template>
	<view class="groupbooking">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 头部导航 -->
		<actionbar message="拼团" bg="red" textcolor="#fff" url="/pages/index/index"></actionbar>
		<!-- 类型 -->
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in Differentgoods" :key="index" @tap="tabSelect" :data-id="index">
				{{item.goods}}
			</view>
		</scroll-view>
		<!-- 背景图片 -->
		<view class="URI" :style="{'background-image':'url(/static/groupbooking/Spellbg.png)'}"></view>
		<view class="wrap">
			<!-- 人气区 -->	
			<view class="PeopleProvince">
				<!-- 人气区的标题 -->
				<view class="PeoplePerovince_title"> 
					<text class="xian"></text>
					<text class="PeoplePerovince_text">人气榜</text>
					<text class="xian"></text>
				</view>
			
				<view class="PeopleProvince_commodity">
					 <!-- 装每个图片和小文字 -->
					<view class="PeopleProvinceBox">
						<!-- 图片 -->
						<view class="PeoImgBox">
							<image class="hot_" src="/static/groupbooking/top1.png" mode=""></image>
							<image class="perUrl"  src="/static/groupbooking/belle.png" mode=""></image>
						</view>
						<!-- 描述 -->
						<view>
							<text class="describe_text">可用sub接口充电电子秤体重精准</text>
						</view>
					</view>
					<view class="PeopleProvinceBox">
						<!-- 图片 -->
						<view class="PeoImgBox">
							<image class="hot_" src="/static/groupbooking/top2.png" mode=""></image>
							<image class="perUrl"  src="/static/groupbooking/belle.png" mode=""></image>
						</view>
						<!-- 描述 -->
						<view>
							<text>可用sub接口充电电子秤体重精准</text>
						</view>
					</view>
					<view class="PeopleProvinceBox">
						<!-- 图片 -->
						<view class="PeoImgBox">
							<image class="hot_" src="/static/groupbooking/top3.png" mode=""></image>
							<image class="perUrl"  src="/static/groupbooking/belle.png" mode=""></image>
						</view>
						<!-- 描述 -->
						<view>
							<text>可用sub接口充电电子秤体重精准</text>
						</view>
					</view>
				</view>	 
				
			 </view>
		 </view>
		<liveintroduced></liveintroduced>
	</view>
</template>

<script>
	// 直播中  立即拼团
	import liveintroduced from "@/components/groupbooking/liveintroduced.vue"
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				statusBar:0,
				scrollTop: 0,
				   TabCur: 0,
				   scrollLeft: 0,
				   old: {
				  	    scrollTop: 0,
				   },
				   	loading: false,
				Differentgoods:[
				  {
					 goods:'最新' 
				  },
				  {
					  goods:'民生必须' 
				  },
				  {
					  goods:'居家生活'
				  },
				 {
					 goods:'醇酒美食'
				 },
				 {
				 	 goods:'健康'
				 },
				 {
					 goods:'运动'
				 },
				 {
					 goods:'健康'
				 },
				 {
					goods:'家具'
				 }
			   ],
			}
		 },
		methods: {
			upper: function(e) {
			    console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		components:{
			liveintroduced,
			actionbar
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.URI{
		margin-top: 20rpx;
		width: 100%;
		height: 300rpx;
		background-repeat: no-repeat;
		background-size:100%;
	}
	.wrap{
		// display: flex;
		// flex-wrap: nowrap;
		padding: 0 20rpx;
	}
	// 人气区
	.PeopleProvince{
		border-radius: 20rpx;
		// width: 720rpx;
		padding-bottom: 30rpx;
		background-color: #fff;
		margin-top: 30rpx;
		overflow: hidden;
		.PeoplePerovince_title{
			margin: 12rpx 0 20rpx 0;
			height: 50rpx;
		    display: flex;
			justify-content: center;
			align-items: center;
			.PeoplePerovince_text{
				font-size: 30rpx;
				margin-left: 8rpx;
			}
			.xian{
				display: inline-block;
				width: 50rpx;
				height: 5rpx;
				background-color: #282828;
				margin-left: 8rpx;
				
			 }
		}
	
		.PeopleProvince_commodity{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			// 每个商品的盒子
			.PeopleProvinceBox{
				display: flex;
				flex-wrap: wrap;
				width: 220rpx;
				background-color: #FFFFFF;
				// 装图片的盒子
				.PeoImgBox{
					height: 164rpx;
					width: 100%;	
					position: relative;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					align-items: center;
					border: 1px solid #bfbfbf;
					.hot_{
						width: 75rpx;
						height: 30rpx;
						position: absolute;
						left: 0;
						top: 0;
					}
					.perUrl{
						// margin-top: 50rpx;
						width:90rpx;
						height: 90rpx;
					}
				}
				// 描述
				.describe_text{
					font-size: 26rpx;
					display:-webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}
	  
</style>
