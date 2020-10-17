<template>
	<view class="facoupons">
		<pageheight :statusBar="statusBar"></pageheight>
		<!-- <view class="allcoupons"> -->
			<actionbar url="/pages/PersonalMy/PersonalMy" message="优惠券"></actionbar>
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="nav-text">
					<view class="cu-item" :class="index==TabCur?'nav-bg text-red cur':''" v-for="(item,index) in coupons" :key="index" @tap="tabSelect" :data-id="index" :data-items="item">
						{{item}}
					</view>
				</view>
				<!--  v-if="items==coupons[TabCur]" :couponslist="couponslist" -->
			<securitiesbottom @storeIsStillAndPlatform="storeIsStillAndPlatform" :TabCur="TabCur" :bottomindex="bottomindex"></securitiesbottom>
			</scroll-view>
		<!-- </view> -->
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	import securitiesbottom from "@/components/allcoupons/securitiesbottom.vue"
	const app = getApp();
	//这是全部优惠卷路由
	export default{
		data(){
			return {
				statusBar:0,
				items:"未使用",
				TabCur: 0,
				scrollLeft: 0,
				coupons:[
					"未使用",
					"已使用",
					"已过期"
				],
				bottomindex:0,
				pages:1,
				
			}
		},
		methods:{
			tabSelect(e) {//当上面的三个点击时候触发
				this.$store.state.couponspages = 1
				this.$store.state.couponslist = []
				let {id,items} = e.currentTarget.dataset
				this.items = items
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.$store.commit("getallcouponslist",{topindex:parseInt(Number(this.TabCur) + 1),bottomindex:parseInt(this.bottomindex),pages:this.pages})
			},
			//这是子组件传过来的 判断点击了平台 还是店铺
			storeIsStillAndPlatform(e){
				this.bottomindex = e
				this.$store.commit("getallcouponslist",{topindex:parseInt(this.TabCur),bottomindex:parseInt(this.bottomindex),pages:this.pages})
			}
		},
		components:{
			securitiesbottom
		},
		created() {
			//初始化获取优惠券的页数
					this.$store.state.couponspages = 1
			//初始化 优惠券列表
			this.$store.commit("getallcouponslist",{topindex:1,bottomindex:0,pages:this.pages})
		},
		onLoad() {
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.facoupons{
		height: 100vh;
		background-color: white;
	}
	 .allcoupons{
	  margin: 0 auto;
	  background: linear-gradient(to bottom,#fe3217,#fc8c62);
	  height: 500rpx;
	  border-radius: 0 0 40rpx 40rpx;
	  }
	 .bg-white{
	  width: 100%;
	  margin: 0 auto;
	  // border-radius: 20rpx;
	 }
	 .nav-text{
		background-color: #d2d2d2;
		display:flex;
		justify-content: space-around;
		border-bottom: 2rpx solid #f6dad2;
		.cu-item{
		  width: 34%;
		  line-height: 49rpx;
		  margin: 0;
		  padding: 15px 25px 15px 25px;
		  text-align: center;
		  font-weight: bold;
		}
		.nav-bg{
				
				background-color: #f1952b;
				color:#fff;
		}
	 }

	 .nav .cu-item.cur{
	  border-bottom: 0;
	 }
</style>
