<template>
	<view class="Allevaluation">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- <seachinput value="" value2="" url="/pages/Details/Details"></seachinput> -->
		<!-- v-for="(item,index) in evaluationlist" :key="index" -->
		<scroll-view scroll-y="true" class="scroll-view" @scrolltolower="pullUp">
			<view class="EvaluationContent" v-for="(item,index) in evaluationlist" :key="index">
				<!-- 这是小头像 -->
				<view class="minContent">
					<view class="padding">
						<!-- 头像动态的获取 -->
						<view class="cu-avatar sm round margin-left bgimg" 
							:style="{'background-image':'url('+yuming+item.user_pic+')'}"
						>
						</view>
					</view>
					<text>{{item.user_name}}</text>
				</view>
				<!-- 这是评论的内容 -->
				<view class="content-area">
					{{item.ge_content}}
				</view>
				<view class="content-imgs" v-if="item.ge_image.length>0">
					<image 
						v-for="(items,indexs) in item.ge_image" 
						:key="indexs" 
						:src="yuming+items"
						 mode="" 
						 @tap="previewImage"
						 :data-img="items"
						 :data-indexs="indexs"
					></image>
				</view>
			</view>
			<view class="bottom-text" v-if="bottombool">
				<text>已经到底了</text>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	//先引用处理页面的状态栏的高度
	import pageheight from "@/components/pageheight/pageheight.vue"
	//引用搜索栏
	// import seachinput from "@/components/sortinglist/seachinput.vue"
	//这是全部路由页面
	const app = getApp();
	export default {
		data() {
			return {
				//这是页面状态栏的高度初始化
				statusBar:0,
				gid:0,
				evaluationlist:[],
				pages:1,
				yuming:"",
				bottombool:false
			}
		},
		methods: {
			//封装一个请求获取评价的方法
			getevaluationlist(){
				const _this = this
				uni.request({
					url:`${app.globalData.Requestpath}good/getGoodEvaluateList`,
					data:{
						gid:_this.gid,
						page:_this.pages,
						pageSize:10
					},
					success(res) {
						console.log(res)
						if(res.data.code==0){
							if(_this.pages>1){
								
								_this.evaluationlist = _this.evaluationlist.concat(res.data.data.list)
							}else{
								if(res.data.data.list.length < 10){
									_this.bottombool = true
								}
								_this.evaluationlist = res.data.data.list
							}
							//将每一个商品的评价 的第一个 传到父级就行显示
							//将评价图片转换为数组
							_this.evaluationlist.forEach((item,index)=>{
								console.log(item.ge_image)
								if(item.ge_image!="" && item.ge_image!=null){
									let url = item.ge_image.split(",")
									_this.evaluationlist[index].ge_image = url
								}
							})
						}else{
							_this.bottombool = true
						}
					}
				})
			},
			pullUp(e){
				this.pages++
				console.log(this.pages)
				this.getevaluationlist()
			},
			previewImage(e){
			    let {img,indexs} = e.currentTarget.dataset
			    var imgArr = [];
			        // imgArr.push('this.$store.state.httpUrl'+item);
			     imgArr.push(this.yuming+img);
			        //预览图片
			        uni.previewImage({
					   urls: imgArr,
					   current: imgArr[indexs]
			        });
			   }
		},
		components:{
			pageheight
			// seachinput
		},
		onLoad(opction){
			// console.log(app.globalData)
			this.gid = opction.gid
			this.getevaluationlist()
			this.statusBar = app.globalData.statusBar
			this.yuming = app.globalData.imgyuming
		},
	}
</script>

<style lang="less" scoped>
	.scroll-view{
		height: 100vh;
		.EvaluationContent{
			padding:20rpx 0;
			background-color: #fff;
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
				.bgimg{
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
			}
			.content-area{
				padding:0 20rpx 0 35rpx;
				font-size: 20rpx;
				margin-top:14rpx;
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
		}
		.bottom-text{
			height: 60rpx;
			width: 100%;
			background-color: #DDDDDD;
			line-height: 60rpx;
			text-align: center;
			text{
				color: #999999;
			}
		}
	}
	
</style>
