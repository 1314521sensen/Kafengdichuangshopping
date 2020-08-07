<template>
	<view class="Details">
		<view class="close" >
			<text class="lg text-gray cuIcon-close" @tap="close"></text>
		</view>
		<scroll-view scroll-y="true" class="aaa" @tap="detailslink" >
			<detailsbanner :swiperList="swiperList" height="720"></detailsbanner>
			<pricetitle 
				:pic="pic"
				:region="region"
				:storeid="storeid"
				:gid="gid"
				:tokey="tokey"
				:couplebool="couplebool"
				:good_state="good_state"
				:good_verify="good_verify"
				:good_delete="good_delete"
				:liveshopstate="liveshopstate"
				:good_title = "good_title"
			></pricetitle>
			<imgs :imglist="good_content_images"></imgs>
			
		</scroll-view>
		
	</view>
</template>

<script>
	// 这是商品的轮播图
	import detailsbanner from "@/components/indexcomponents/banner.vue"
	//这是商品的商品的title
	import pricetitle from "@/components/Details/PriceTitle.vue"
	//这是详情图
	import imgs from "@/components/Details/detailsimgs.vue"
	const app = getApp()
	export default {
		data() {
			return {
				//这是轮播图的数据
				swiperList:[],
				//这是详情页的图片的数据
				//这是标题和价格数据
				pic:{},
				region:[],
				tokey:"",
				gid:"",
				storeid:"",
				good_content_images:[],//这是商品详情页的内容
				couplebool:"",
				good_state:"",//商品的状态 是否下架 
				good_verify:"",//是否通过
				good_delete:"",//是否删除
				liveshopstate:"",
				producttype:"",//判断商品是不是团长类型
				good_title:""
			}
		},
		methods: {
			close(){
				this.$store.state.detailsbool = false
			},
			detailslink(){
				uni.navigateTo({
					url:`/pages/Details/Details?id=${this.gid}&storeid=${this.storeid}`
				})
				this.$store.state.detailsbool = false
			}
		},
		components:{
			detailsbanner,
			pricetitle,
			imgs,
		},
		
		props:["DetailsList","bool"],
		created() {
			const _this = this
			// console.log(_this.DetailsList)
			_this.good_state = _this.DetailsList.good_state
			_this.good_verify = _this.DetailsList.good_verify
			_this.good_delete = _this.DetailsList.good_delete
			_this.swiperList = JSON.parse(_this.DetailsList.good_images?_this.DetailsList.good_images:'[]')
			_this.good_content_images = _this.DetailsList.good_content_images
			_this.pic = _this.DetailsList
			_this.gid = _this.DetailsList.good_id
			_this.storeid = _this.DetailsList.store_id
			_this.good_title = _this.DetailsList.good_title
		},
		onShow(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res) {
					_this.tokey = res.data
				},
			})
		}
	}
</script>

<style lang="less" scoped>
	.Details{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0,0,0,.3);
		padding: 280rpx 120rpx 350rpx;
		// overflow: hidden;
		
		.close{
			width: 100%;
			position:relative;
			top: 60rpx;
			// right: 20rpx;
			z-index: 99;
			text-align: right;
			text{
				padding: 2rpx;
				border-radius: 50%;
				background-color: red;
				font-size: 50rpx;
			}
		}
		.aaa{
			width: 100%;
			height: 100%;
			// overflow: hidden;
			// padding: 190rpx 80rpx ;
			
		}
		
	}
</style>
