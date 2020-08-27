<template>
	<view class="evaluation" v-if="listone.length>0">
				<view class="evaluation-midden">
				<!-- 评价的上面 -->
					<view class="BottomPopup">
						<!-- 点击跳转到评价的路由 -->
						<view class="cu-bar bg-white margin-top" data-target="bottomModal" :style="{'border-bottom':'4rpx solid #f8f8f8'}">
							<view class="action">
								商品评价
								<text>{{'('+listone.length+')'}}</text>
							</view>
							<view class="action" @tap="Allevaluation">
								<!-- <button class="cu-btn bg-green shadow"  >Bottom</button> -->
								<text>查看更多</text>
								<text class="lg text-gray cuIcon-right"></text>
							</view>
						</view>
				</view>
			</view>
			<view class="EvaluationContent" v-for="(item,index) in listone" :key="index">
				<!-- 这是小头像 -->
				<view class="minContent">
					<view class="padding">
						<!-- 头像动态的获取 -->
						<view class="cu-avatar sm round margin-left" 
							:style="{'background-image':'url('+imgpath+item.user_pic+')'}">
						</view>
					</view>
					<text>{{item.user_name}}</text>
				</view>
				<!-- 这是评论的内容 -->
				<view class="content-area">
					{{item.ge_content}}
				</view>
				<view class="content-imgs">
				    <image 
						v-for="(items,indexs) in item.ge_image" 
						:key="indexs" 
						:src="imgpath+items"
					></image>
				</view>
			</view>
	</view>
</template>

<script>
	const app = getApp()
	//这是评价
	export default{
		data(){
			return {
				listone:[],
				imgpath:this.$store.state.imgyuming
			}
		},
		methods:{
			Allevaluation(){
				//当点击的时候 跳到全部评论的路由
				uni.navigateTo({
				    url:`/pages/Allevaluation/Allevaluation?gid=${this.gid}`
				});
			}
		},
		props:["gid"],
		created() {
			const _this = this
			uni.request({
				url:`${app.globalData.Requestpath}good/getGoodEvaluateList`,
				data:{
					gid:_this.gid,
					page:1,
					pageSize:1
				},
				success(res) {
					if(res.data.code==0){
						_this.listone = res.data.data.list
						_this.listone.forEach((item,index)=>{
							// console.log(item)
							if(item.ge_image!="" && item.ge_image!=null){
								let url = item.ge_image.split(",")
								_this.listone[index].ge_image = url
							}
						})
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.margin-top{
	  margin-top: 10rpx;
	 }
	.evaluation{
		background-color: #fff;
		.EvaluationContent{
			// padding-bottom:20rpx;
			.minContent{
				display: flex;
				margin-top:20rpx;
				view{
					&:first-child{
						padding:0;
					}
				}
				text{
					margin-left:30rpx;
				}
			}
			.content-area{
				padding:0 20rpx 0 35rpx;
				font-size: 20rpx;
				margin-top:14rpx;
			}
		}
	}
	.cu-bar{
		min-height: 70rpx;
		.action{
			font-size: 24rpx !important;
			&:first-child{
				font-size: 24rpx !important;
				text{
					margin-left:12rpx;
				}
			}
		}
	}
	.content-imgs{
	   width: 100%;
	   padding: 20rpx;
	   display: flex;
	   justify-content: left;
	   flex-wrap: wrap;
	   image{
	    margin: 0 20rpx 20rpx 0;
	    width: 150rpx;
	    height: 150rpx;
	   }
	  }
</style>
