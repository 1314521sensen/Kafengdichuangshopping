<template>
	<view>
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="佣金明细"></actionbar>
		<view class="commissionsubsidiary">
			<scroll-view class="commissionsubsidiary_box" :scroll-y="true" @scrolltolower="scrollLeft">
				<view class="commissionsubsidiary_item" v-for="(item,index) in commissionsubsidiary" :key="index" >
					<view class="commissionsubsidiary_left">
						<view class="commissionsubsidiary_top" v-if="item.practical_cms < 0">
							<text>提现</text>
						</view>
						<view class="commissionsubsidiary_top" v-else-if="item.cms_category != 4">
							<text>{{item.good_title}}</text>
						</view>
						<view class="commissionsubsidiary_top" v-else>
							<text>{{item.user_name}}</text>
						</view>
						
						<view class="commissionsubsidiary_bottom" v-if="item.practical_cms < 0">
							<text >提现时间:{{item.create_time}}</text>
						</view>
						<view class="commissionsubsidiary_bottom" v-else-if="item.cms_category != 4">
							<text >数量*{{item.good_num}}</text>
						</view>
						
						<!-- <view>提现时间{{item.create_time}}</view> -->
						<view class="commissionsubsidiary_bottom" v-else>
							<text>注册时间：{{item.create_time}}</text>
						</view> 
					</view>
					<view class="commissionsubsidiary_right" v-if="item.practical_cms > 0">
						<text>+{{item.practical_cms}}元</text>
					</view>
					<view class="commissionsubsidiary_right" v-else>
						<text>{{item.practical_cms}}元</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	
	export default {
		data() {
			return {
				commissionsubsidiary:[],
				page:1,
				statusBar:0
			}
		},
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					uni.request({
						url:` ${app.globalData.Requestpath}CmsSettlement/getCmsSettlementListinfo`,
						method:"POST",
						data:{
							token:res.data,
							page:1,
							pageSize:10
						},
						success(res){
							// console.log(res,"佣金")
							if(res.data.code == 0){
								console.log(res)
								_this.commissionsubsidiary = res.data.data.list
							}
						}
					})
				}
			})
			
		},
		methods: {
			scrollLeft(){
				const _this = this
				this.page++
				
				uni.getStorage({
					key:"bindtokey",
					success(res){
						uni.request({
							url:` ${app.globalData.Requestpath}CmsSettlement/getCmsSettlementListinfo`,
							method:"POST",
							data:{
								token:res.data,
								page:_this.page,
								pageSize:10
							},
							success(res){
								if(res.data.code == 0){
									if(page < 1){
										_this.commissionsubsidiary = res.data.data.list
									}else{
									 _this.commissionsubsidiary = _this.commissionsubsidiary.concat(res.data.data.list) 	
									}
								}
							}
						})
					}
				})
			}
		},
		components:{
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.commissionsubsidiary{
		.commissionsubsidiary_box{
			height:90vh;
			background-color: #fff;
			.commissionsubsidiary_item{
				display:flex;
				justify-content: space-between;
				// background-color:red;
				padding:10rpx 20rpx;
				// height:100rpx;
				border-bottom:2rpx solid #ccc;
				.commissionsubsidiary_left{
					// background-color:green;
					// width: 100rpx;
					// height:100rpx;
					.commissionsubsidiary_top{
						font-size: 32rpx;
						font-weight: bold;
					}
					.commissionsubsidiary_bottom{
						color:#666;
						font-size: 28rpx;
						margin-top:10rpx;
					}
				}
				.commissionsubsidiary_right{
					display: flex;
					align-items: center;
					// background-color:pink;
					color:rgb(254,51,97);
					font-size: 30rpx;
					// width: 100rpx;
					// height:100rpx;
				}
			}
		}
	}
</style>
