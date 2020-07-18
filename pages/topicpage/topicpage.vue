<template>
	<view class="topicpage">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- 头部导航 -->
		<actionbar message="潮男专场" url="/pages/index/index"></actionbar>
		<!-- 不同专场 -->
		<view class="DifferentSpecial">
			<!-- 种类 -->
			<scroll-view scroll-x class="bg-white nav customheight" scroll-with-animation :scroll-left="scrollLeft" style="height: 60rpx;">
				<view class="cu-item" :class="index==TabCur?'text-red':''" v-for="(item,index) in navtabSelect" :key="index" @tap="tabSelect" :data-id="index">
					 {{item}}
				</view>
			</scroll-view>
		</view>
		<!--背景图 -->
		<view class="logo_bg" style="background: url(/static/topicpage/newCoat.png) no-repeat;
			  background-size: 100% 100%;"></view>
		<!-- 领劵购买 -->
		<view class="LedtheSecuritiesPurchase_box">
			<view class="LedtheSecuritiesPurchase">
				<view class="discount_tit">先领劵再购买</view>
				<view class="discountBox">
					<view class="discount">
						<view class="ChinaYuan">RMB</view>
						<view class="price">20</view>
						<view class="satisfy">满100元可用</view>
						<view class="drawDown">
							<text>立即领取</text>
							<text class="lg text-white cuIcon-right"></text>
						</view>
					</view>
					<view class="discount">
						<view class="ChinaYuan">RMB</view>
						<view class="price">80</view>
						<view class="satisfy">满200元可用</view>
						<view class="drawDown">
							<text>立即领取</text>
							<text class="lg text-white cuIcon-right"></text>
						</view>
					</view>
					<view class="discount">
						<view class="ChinaYuan">RMB</view>
						<view class="price">200</view>
						<view class="satisfy">满1000元可用</view>
						<view class="drawDown">
							<text>立即领取</text>
							<text class="lg text-white cuIcon-right"></text>
						</view>
					</view>
					<view class="discount">
						<view class="ChinaYuan">RMB</view>
						<view class="price">999</view>
						<view class="satisfy">满9999元可用</view>
						<view class="drawDown">
							<text>立即领取</text>
							<text class="lg text-white cuIcon-right"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 热销推荐 -->
		<view class="sellLike" :style="{'background-image':'url('+this.$store.state.httpUrl+'/topicpage/title_top.png)'}">热销推荐</view>
		<!-- 热销商品 -->	
		<view class="hotSaleProducts">
			<!-- 单个商品 -->
			<view class="particular">
				<!-- 图片展示 -->
				<view class="productImg" :style="{'background-image':'url(/static/topicpage/Cityboyclothes.png)'}"></view>
				<!-- 详细资料-->
				<view class="details">
					<view class="product">2020年夏季短袖T桖男潮牌印花男装爆款宽松</view>
					<view class="character">当季新品  潮男必备  纯棉 柔软 亲肤 吸汗</view>
					<view class="ActivityPrice">活动价:<text class="special">208</text></view>
					<view class="purchaseNow">立即购买</view>
				</view>	
			</view>
			<!-- 单个商品 -->
			<view class="particular">
				<!-- 详细资料-->
				<view class="details">
					<view class="product">夏季运动体闲套装男同学韩版潮流个性渐变色短袖T桖一套男装帅气</view>
					<view class="character">赠送运费  免费试穿</view>
					<view class="ActivityPrice">活动价:<text>69</text></view>
					<view class="purchaseNow">立即购买</view>
				</view>	
				<!-- 图片展示 -->
				<view class="productImg" :style="{'background-image':'url(/static/topicpage/Cityboyclothes.png)'}"></view>
			</view>
			<!--  活动区域 -->
			<view class="particular different">
				<view class="border-right"></view>
				<!-- 特价展示区 -->
				<view class="dif_left">
					<view class="leftUrl" style="background:url(/static/topicpage/FashionClothing.png);background-size: 100% 100%;">
						<!-- 价格 -->
						<view class="promotion">活动价:128</view>
					</view>
				</view>
				<!-- 活动整套 -->
				<view class="dif_Activity">
					<view>
						<image src="/static/topicpage/acomplete.png" class="acomplete" mode=""></image>
					</view>
					<text class="acomplete_bg">活动价:88</text>
				</view>
			</view>
		</view>
		<!-- madou 模特 -->
		<view class="madou">
			<view class="showBox" v-for="(item,index) in 10" :key="index">
				<image src="/static/topicpage/Women.png" mode=""></image>
				<view class="showBoxtext">
					<text class="lprice">￥128</text>
					<view class="liText">
						立即购买
					</view>
				</view>
			</view>
		</view>
		
  </view>
</template>

<script>
	const app = getApp()
	import actionbar from "@/components/actionbar/actionbar.vue"
	export default {
		data() {
			return {
				scrollTop: 0,
				scrollLeft: 0,
				TabCur: 0,
				statusBar:0,
				old: {
					scrollTop: 0
				},
				navtabSelect:['男装','百货','医药','生鲜','食品','进口','家具','女装','食品','进口'],
			}
		},
		methods: {
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
			actionbar
		},
		onLoad(){
			// console.log(app.globalData)
			this.statusBar = app.globalData.statusBar
		},
	}
</script>

<style lang="less" scoped>
   .topicpage{
	   background-color: #F5F5F5;
	   .bg-white{
		   background-color: #F5F5F5;
	   }
	   .customheight{
		   // height:0;
	   }
		 .cu-item{
			 line-height: 60rpx;
			 height:60rpx;
			 font-size: 32rpx;
		 }
			
		  // 上面背景图
		  .logo_bg{
			  height: 400rpx;
		  }
		  // 领劵购买
		 .LedtheSecuritiesPurchase_box{
			  margin: 50rpx 0 30rpx 0;
			 display: flex;
			 flex-wrap: wrap;
			 justify-content: center;
		 } 
		  .LedtheSecuritiesPurchase{
			  box-shadow: 3rpx 4rpx 20rpx #CCCCCC;
			  width: 710rpx;
			  background-color: #FFFFFF;
			  border: 1px solid rgba(0,0,0,0);
			  border-radius: 15rpx;
			  padding-bottom:20rpx;
			  .discount_tit{
				  margin: -20rpx auto 0;
				  border: 2rpx solid red;
				  width: 170rpx;
				  height: 40rpx;
				  border-radius: 20rpx;
				  font-size: 24rpx;
				  text-align: center;
				  font-weight: bold;
			  }
			  
			  .discountBox{
				  display: flex;
				  .discount{
					  width: 160rpx;
					  margin: 20rpx 0 0 15rpx;
					  
					  .ChinaYuan{
						  text-align: center;
						  font-size: 24rpx;
					  }
					  .price{
						  text-align: center;
						  font-size: 40rpx;
					  }
					  .satisfy{
						  text-align: center;
						  font-size: 24rpx;
						  margin-top: 4rpx ;
					  }
					  .drawDown{
						  padding: 4rpx 8rpx;
 						  text-align: center;
						  font-size: 24rpx;
						  background-color: #d10132;
						  width: 136rpx;
						  margin: 6rpx 0 0 10rpx;
						  color: #FFFFFF;
					  }
				  }
			  }
		  }
		  // 热销
		  .sellLike{
			  width: 270rpx;
			  height: 70rpx;
			  // background: url(/static/topicpage/sellLike.png);
			  background-repeat: no-repeat;
			  background-size: 100% 100%;
			  margin: 0 auto;
			  text-align: center;
			  line-height: 60rpx;
			  font-size: 32rpx;
		  }
		  // 热销商品
		  .hotSaleProducts{
			  margin-top: 20rpx;
			 
			  // 单个商品
			  .particular{
				  border-radius: 10rpx;
				   margin: 0 auto 10rpx;
				  width: 710rpx;
				  height: 310rpx;
				  border: 10rpx solid #df083e;
				  display: flex;
				  // 装图片的盒子
				  .productImg{
					  width: 380rpx;
					 height: 100%;
					  // background: url(/static/topicpage/Cityboyclothes.png);
					  background-repeat: no-repeat;
					   background-size: 100% 100%;
				  }
				  // 详细资料  
				  .details{
					  // display: flex;
					  // flex-wrap: wrap;
					  width: 310rpx;
					  font-size: 26rpx;
					  padding-left: 20rpx;					  
					  .product{
					  display: -webkit-box;
					  -webkit-box-orient: vertical;
					  -webkit-line-clamp: 2;
					  overflow: hidden;
					  margin: 40rpx 0 15rpx 0;
					  }
					  .character{
						  font-size: 24rpx;
						  color: #999999;
						  display: -webkit-box;
						  -webkit-box-orient: vertical;
						  -webkit-line-clamp: 1;
						  overflow: hidden;
					  }
					  .ActivityPrice{
						  font-size: 36rpx;
						  margin: 8rpx 0 10rpx;
						  color: #ff0000;
						  text{
							  line-height: 65rpx;
						  }
						  .special{
							 font-size: 36rpx;
						  }
					  }
					  .purchaseNow{
						  width: 160rpx;
						  height: 42rpx;
						  line-height: 42rpx;
						  color: #FFFFFF;
						  border-radius: 10rpx;
						  text-align: center;
						  background-color: #ff0000;
						  margin:  -6rpx auto 0;
						  padding: 0 4rpx;
					  }
				  }
			  }
			  // 不同的炫酷商品
			  .different{
				  height: 340rpx;
				  width: 100%;
				  border: 30rpx solid #de083e;
				  position: relative;
			  }
			  .border-right{
				  width: 15rpx;
				  height: 160rpx;
				  margin-top: -80rpx;
				  position: absolute;
				  top: 50%;
				  right: -15rpx;
				  background-color: #000;
			  }
			  .different::after{
				  content: "";
				  display: block;
				  position: absolute;
				  top: -15rpx;
				  left: 0rpx;
				  width: 90rpx;
				  height: 15rpx;
				  background-color: #000;
			  }
			  .different::before{
				  content: "";
				  display: block;
				  position: absolute;
				  top: -15rpx;
				  left: -15rpx;
				  width: 15rpx;
				  height: 105rpx;
				  background-color: #000;
			  }
			  // 特价展示区
			  .dif_left{
				  .leftUrl{
					  // display:flex;
					  justify-content: flex-end;
					  width:360rpx;
					  height: 100%;
					  background-size: 100% 100%;
					  overflow: hidden;
				  }
				  .promotion{
					  text-align: center;
					  font-size: 28rpx;
					  width: 140rpx;
					  color: #FFFFFF;
					  margin-left: auto;
					  // height:20rpx;
					  margin-top: 180rpx;
					  background-color: red;
				  }
			  }
			  .dif_Activity{
				  margin: 19rpx 0 0 50rpx;
				  .acomplete{
					  width: 246rpx;
					  height: 206rpx;
					  display: block;
				  }
				  .acomplete_bg{
					  margin-left: 112rpx;
					  padding: 4rpx 6rpx;
					  background-color: red;
					  color: #FFFFFF;
				  }
			  }
			  
		  }
		  .madou{
			  
			  display: flex;
			  // padding:0 20rpx 40rpx 20rpx;
			  padding:0 10rpx 40rpx;
			  flex-wrap: wrap;
			  .showBox{
				  // padding: 0 5rpx 0 5rpx;
				  // padding:0 5rpx;
				  width: 240rpx;
				  background-color: #fff;
				  // margin-right:4rpx;
				  margin:0 4rpx 20rpx 0;
				  &:nth-child(3n){
					  margin-right:0;
				  }
				  .showBoxtext{
					  padding: 0 10rpx;
					  display:flex;
					  justify-content: space-between;
					  margin: 10rpx 0;
				  }
				  image{
					  width: 100%;
					  height: 240rpx;
					 // padding: 0 10rpx;
				  }
				  .lprice{
					  // margin-left: 10rpx;
				  }
				  .liText{
					  background-color: red;
					  font-size: 24rpx;
					  padding: 4rpx 2rpx;
					  color: #FFFFFF;
				  }
				  .text-white{
					  padding: 0 !important;
				  }
			  }
		  }
		  
	   }
	   
	  
</style>
