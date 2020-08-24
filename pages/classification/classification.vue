<template>
	<view class="classificastion" :style="{'padding-top':statusBar+20+'rpx'}">
		<view class="left-box" v-if="showbool">
			<scroll-view class="scroll-view" :scroll-y="true">
				<view class="scroll-view-item">
					<view 
						class="left-li" 
						v-for="(item,index) in leftlist" 
						:key="index" 
						@tap="lefttap" 
						:class="leftindex==index?'left-li-active':''"
						:data-index="index"
					>
						{{item.gc_short}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="right-box" v-if="showbool">
			<scroll-view class="scroll-view" :scroll-y="true">
				<!--  -->
				<!-- {{leftlist[leftindex]}} -->
				<view class="scroll-view-item" v-for="(items,indexs) in [leftlist[leftindex]]" :key="indexs">
					<view class="right-title">
						{{items.gc_title}}
					</view>
					<view class="right-list-box">
						<view 
							class="right-list" 
							v-for="(item,index) in items.children" 
							:key="index" 
							@tap="seach"
							:data-gc_short="item.gc_short"
							:data-gc_id="item.gc_id"
							:data-gc_level="item.gc_level"
						>
							<image :src="imgpath+item.pic" class="imgs"></image>
							<view class="right-list-text">
								{{item.gc_short}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<loading v-if="showbool==false"></loading>
	</view>
</template>
<script>
	const app = getApp()
	export default{
		data(){
			return {
				leftlist:[],
				leftindex:0,
				statusBar:0,
				showbool:false,
				imgpath:this.$store.state.imgyuming
			}
		},
		methods:{
			//点击左侧的时候
			lefttap(e){
				let {index} = e.currentTarget.dataset
				this.leftindex = index
			},
			seach(e){
				let {gc_short,gc_id,gc_level} = e.currentTarget.dataset
				uni.navigateTo({
					url:`/pages/Sortinglist/Sortinglist?value=${gc_short}&gcid=${gc_id}&gclevel=${gc_level}`
				})
			}
		},
		created() {
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}common/getCategoryListTwoLevel`,
				success(res) {
					// console.log(res)
					if(res.data.code==0){
						_this.leftlist = res.data.data
						_this.showbool = true
					}
				}
			})
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>
<style lang="less" scoped>
	.classificastion{
		overflow: hidden;
		display:flex;
		height:100vh;
		.left-box{
			width:26%;
			background-color: #F8F8F8;
			// background-color:red;
			.scroll-view{
				overflow: hidden;
				height:100vh;
				.scroll-view-item{
					.left-li{
						font-size:28rpx;
						text-align:center;
						color:#666;
						padding:20rpx 0rpx;
					}
					.left-li-active{
						color:#fd4c97;
						background-color: #fff;
					}
				}
			}
		}
		.right-box{
			flex:1;
			background-color:#fff;
			padding-left:20rpx;
			.scroll-view{
				overflow: hidden;
				height:100vh;
				.scroll-view-item{
					.right-title{
						font-size: 28rpx;
						font-weight: bold;
						line-height:80rpx;
					}
					.right-list-box{
						display:flex;
						flex-wrap: wrap;
						// justify-content:space-between;
						background-color: #fff;
						padding:20rpx 20rpx 40rpx 20rpx;
						box-shadow: 0rpx 6rpx 12rpx #ccc;
						// margin-top:40rpx;
						// padding-right:20rpx;
						.right-list{
							width: 112rpx;
							// height:100rpx;
							// background-color: red;
							padding-bottom:10rpx;
							margin:10rpx 72rpx 0 0;
							&:nth-child(3n){
								margin-right:0;
							}
							.imgs{
								width: 100%;
								height:108rpx;
								border-radius:50%;
							}
							.right-list-text{
								text-align:center;
								font-size: 24rpx;
								font-weight: bold;
							}
						}
					}
					
				}
			}
		}
	}
</style>