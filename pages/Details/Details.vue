<template>
	<view class="Details">
		<detailsbanner :swiperList="swiperList" height="720"></detailsbanner>
		<pricetitle :pic="pic" :region="region" :storeid="storeid" :tokey="tokey"></pricetitle>
		<imgs :imglist="imgs"></imgs>
		<bottomcar :pic="pic" imgs="/static/cart/01.webp" :tokey="tokey" :gid="gid" :storeid="storeid"></bottomcar>
	</view>
</template>

<script>
	// 这是商品的轮播图
	import detailsbanner from "@/components/indexcomponents/banner.vue"
	//这是商品的商品的title
	import pricetitle from "@/components/Details/PriceTitle"
	//这是详情图
	import imgs from "@/components/Details/detailsimgs.vue"
	import bottomcar from "@/components/Details/detailsbottomcar.vue"
	const app = getApp()
	export default {
		data() {
			return {
				//这是轮播图的数据
				swiperList:[],
				//这是详情页的图片的数据
				imgs:[
					"/static/Details/O1CN01UuLYnf1KPwpca0wIK_!!2399641157.jpg_640x0q80_.webp",
					"/static/Details/dfb5cbd7-556a-43a1-9e7b-c485e7b550dc.jpg"
				],
				//这是标题和价格数据
				pic:{},
				region:[],
				tokey:"",
				gid:"",
				storeid:""
			}
		},
		methods: {
		
		},
		components:{
			detailsbanner,
			pricetitle,
			imgs,
			bottomcar,
		},
		onLoad(opction){
			const _this = this
			//这是商品的id
			this.gid = opction.id
			//店铺id
			this.storeid = opction.storeid
			//先去请求详情页的轮播数据图片
			uni.request({
				url	:`${app.globalData.Requestpath}good/getGoodImageList`,
				data:{
					gid:opction.id,
					lt:5,
				},
				success(res) {
					if(res.data.code==0){
						_this.swiperList = res.data.data
					}
				}
			})
			//在去请求详情页的其他数据
			uni.request({
				url:`${app.globalData.Requestpath}good/getGoodInfo`,
				data:{
					gid:opction.id
				},
				success(res) {
					if(res.data.code==0){
						_this.pic = res.data.data
						// console.log(_this.pic)
						//这和下面没关系 这块处理用户足迹的
						//从这
						//当用户点击进来的时候代表已经游览了商品足迹
						uni.request({
							url:"http://hbk.huiboke.com/api/user/addTrackInfo",
							method:"POST",
							data:{
								token:_this.tokey,
								good_id:_this.gid,
								good_name:_this.pic.good_title,
								good_image:_this.pic.good_pic,
								track_price:_this.pic.good_price
							}
						})
						//到这
						//商品规格开始
						// console.log(_this.id) //这块等等
							// uni.request({
							// 	url:"http://hbk.huiboke.com/api/good/getGoodSpecList",
							// 	data:{
							// 		gid:_this.id
							// 	},
							// 	success(resspecifications) {
							// 		console.log(resspecifications)
							// 	}
							// })
						//商品规格结束
						
						//在这里请求店家的地址信息
						let arr = []
						let url = "http://hbk.huiboke.com/api/common/getAreas"
						uni.request({//地址这块还是有些问题
							url,
							data:{
								parent_id:res.data.data.area_id2
							},
							success(resprovince) {
								arr.push(resprovince.data.data[0].area_name)
								_this.region = arr
							}
						})
					}
				}
			})
		},
		onShow(){
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res) {
					_this.tokey = res.data
				},
			})
		},
		// created() {
		// 	const _this = this
		// 	uni.getStorage({
		// 		key:"bindtokey",
		// 		success(res) {
		// 			_this.tokey = res.data
		// 			app.globalData.Detectionupdatetokey(res.data)
		// 		}
		// 	})
		// }
	}
</script>

<style lang="less" scoped>
	.Details{
		position: relative;
	}
</style>
