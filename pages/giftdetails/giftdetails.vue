<template>
	<!-- 最大的盒子 -->
	<view class="giftdetailst">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar message="礼品详情" url="/pages/integralstore/integralstore" :Jumpchoose="true"></actionbar>
		 <!-- 轮播图 -->
		 <banner height='300' :swiperList="swiperList"></banner>
		  <!-- 介绍价格 -->
		 <view class="introduce">
			<text class="introduced_name">嘻哈帽子女潮日系无棒球帽秋冬瓜</text>
			<view class="price_detail">
				<image class="price_Img" :src="this.$store.state.httpUrl+'giftdetails/integral.png'" mode=""></image>
				<text class="price">300</text>
			</view>
		 </view>
		 <!-- 选择规格 -->
		 <view class="specification">
			  选择规格
			  <text class="lg text-gray cuIcon-right"></text>
		 </view>
		 <!-- 商品评价盒子 -->
		 <view class="evaluate">
			 <!-- 商品评价 -->
			 <view class="evaluate_Tbox">
				 <view class="evaluateTit">商品评价({{evaluatenum}})</view>
				 <view class="Lookatall">
					 查看全部  
					 <text class="lg text-gray cuIcon-right"></text>
				 </view>
			 </view>
			 <!-- 在这追加每个商品的数据 -->
			 <view class="evaluate_Box">
				 <view class="evaluate_top" v-for="(item,index) in 2" :key="index">
					 <view class="Lookatall">
					 </view>
					 <!-- 评论的内容 -->
					 <view>
						 <!-- 每个人 -->
						 <view>
							 <view class="ziliao">
								 <!-- 头像 -->
								 <image class="phone"  :src="httpurl+'giftdetails/yue.png'" mode=""></image>
								 <view class="name">xxxx</view>
							 </view>
							 <view> 
								<!-- 用户评论 -->
								帽子收到了，好好看，满意
							 </view>
						 </view> 
					 </view>
				 </view>
			 </view>
			 
			 
		</view>
		 <!-- 宝贝详情  --> 
		<view class="productDetails">
			 <view>  
			    <text class="productDetails_left"></text> 
				<text>宝贝详情</text>  
				<text class="productDetails_right"></text>
			</view>
		 </view>
		 <!-- 装图片的展示图 -->
		 <view class="imgExhibition">
			 <image src="/static/Details/brand_bg.jpg"></image>
		 </view>
		 <!--  下面的导航  -->
		 <view class="Purchase">
			 <view class="cancel">取消</view>
			 <view class="conversion">兑换</view>
		 </view>
    </view>
</template>

<script>
	//引用轮播图组件
	import Banner from "@/components/indexcomponents/banner.vue"
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp()
	export default {
		data(){
			return{
				evaluatenum:25,
				statusBar:0,
				httpurl:"http://hbk.huiboke.com/uploads/app/image/",
				swiperList:[
					{
						imgs:"/static/indexbanner/banner1.jpg",
					},{
						imgs:"/static/indexbanner/banner2.png",
					},
					{
						imgs:"/static/indexbanner/banner3.jpg",
					},
					{
						imgs:"/static/indexbanner/banner4.jpg",
					},
					{
						imgs:"/static/indexbanner/banner5.jpg",
					},
				]
			}
		},
		methods:{
			
		},
		components:{
			Banner,
			actionbar
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
	
</script>
    
<style lang="less" scoped>
	.giftdetailst{
		.introduce{
			padding-bottom: 5px;
			background-color: #fff;
			.introduced_name{
				flex: 1;
				margin-left: 30rpx;
				line-height: 30px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.price_detail{
				display: flex;
				margin: 15rpx 0 0 30rpx;
				.price_Img{
					width: 50rpx;
					height: 50rpx;
				}
				.price{
					// margin-left: 50rpx;
					color: #d7903d;
					font-size: 24px;
					margin-left: 8rpx;
				}
			}
		}
		.specification{
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;
			background-color: #fff;
			line-height: 80rpx;
			text-indent:1rem;
		    .lg{
				margin-left: 500rpx;
			}
		}
		// 商品评价
		.evaluate{
			padding-left: 30rpx;
			margin-top: 10rpx;
			background-color: #fff;
			overflow: hidden;
			padding-bottom: 15rpx;
			.evaluate_Tbox{
				margin: 15rpx 0 10rpx 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.evaluateTit{
					display: flex;
					flex-wrap: wrap;
				}
				.Lookatall{
					margin-right: 35rpx;
					color:#d6923a;
					.lg{
						color:#d6923a;
					}
				}
			}
			
			.evaluate_top{
				display: flex;
				flex-wrap: wrap;
				line-height: 50rpx;
				margin-top: 10rpx;
				.ziliao{
					display: flex;
					 // align-items: center;
					
					.phone{
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
					.name{
						margin-left: 30rpx;
						margin-top: -4rpx;
					}
				}
			}
			
		}
		// 宝贝详情
		.productDetails{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			background-color: #f2f2f2;
			text-align: center;
			color: #919191;			
			.productDetails_left{
				display: inline-block;
				width: 52rpx;
				height: 2rpx;
				margin-right: 15rpx;
				background-color: red;
				vertical-align: middle;
				background-color: #bfbfbf;
			}
			.productDetails_right{
				display: inline-block;
				width: 52rpx;
				height: 2rpx;
				margin-left: 15rpx;
				background-color: red;
				vertical-align: middle;
				background-color: #bfbfbf;
			}
			
		}
		// 下面展示的图片
		.imgExhibition{
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			
			image{
				margin-top: 95rpx;
			}
		}
		
		// 最下面的
		.Purchase{
			width: 100%;
			background-color: #fff;
			height: 98rpx;
		    position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.conversion{
				width: 265rpx;
				background-color: #d8913c;
				border: 1px solid #fff;
				color: #fff;
				text-align: center;
				line-height: 62rpx;
				margin-left: 100rpx;
			}
			.cancel{
				width: 265rpx;
				border: 1px solid #d8913c;
				color: #d8913c;
				text-align: center;
				line-height: 62rpx;
			}
		}
		
	}
</style>
