<template>
	<view class="Details">
		<detailsbanner :swiperList="swiperList" height="720"></detailsbanner>
		<pricetitle 
			:pic="pic" 
			:areaName="areaName"
			:storeid="storeid" 
			:gid="gid" 
			:tokey="tokey" 
			:couplebool="couplebool"
			:good_state="good_state"
			:good_verify="good_verify"
			:good_delete="good_delete"
			:liveshopstate="liveshopstate"
		></pricetitle>
		<imgs :imglist="good_content_images"></imgs>
		<bottomcar 
			:pic="pic" 
			:tokey="tokey" 
			:gid="gid" 
			:storeid="storeid" 
			:couplebool="couplebool"
			:good_state="good_state"
			:good_verify="good_verify"
			:good_delete="good_delete"
			:producttype="producttype"
			:code="code"
		></bottomcar>
	</view>
</template>

<script>
	// 这是商品的轮播图
	import detailsbanner from "@/components/indexcomponents/banner.vue"
	//这是商品的商品的title
	import pricetitle from "@/components/Details/PriceTitle.vue"
	//这是详情图
	import imgs from "@/components/Details/detailsimgs.vue"
	import bottomcar from "@/components/Details/detailsbottomcar.vue"
	//引入活动组件
	import NewactivityTop from "@/components/Details/NewactivityTop.vue"
	import NewSpellgrouplist from "@/components/Details/NewSpellgrouplist.vue"
	const app = getApp()
	export default {
		data() {
			return {
				//这是轮播图的数据
				swiperList:[],
				//这是详情页的图片的数据
				//这是标题和价格数据
				pic:{},
				// region:[],
				areaName:'',//商品的地址
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
				code:0,//团长分享码
			}
		},
		methods: {
		
		},
		components:{
			detailsbanner,
			pricetitle,
			imgs,
			bottomcar,
			NewactivityTop,
			NewSpellgrouplist
		},
		onLoad(opction){
			// couplebool
			// console.log(opction)
			let {id,storeid,goodtype,liveshopstate,type} = opction
			const _this = this
			//这是商品的id
			this.gid = id
			//店铺id
			this.storeid = storeid
			this.liveshopstate = liveshopstate
			let shopJSON = {
				gid:opction.id
			}
			//判断是不是新人
			if(goodtype=="npt"){
				this.couplebool = "npt"
			}else if(goodtype=="nlt"){
				this.couplebool = "nlt"
				shopJSON.gtype = "nlt"
			}else{
				this.couplebool = "nt"
			}
			//判断是不是团长商品
			if(parseInt(type)==3){
				this.producttype = type
				this.code = opction.code
			}else{
				this.producttype = ""
			}
			//在去请求详情页的其他数据
			// console.log(shopJSON)
			uni.request({
				url:`${app.globalData.Requestpath}good/getGoodInfo`,
				data:shopJSON,
				success(res) {
					// console.log(res)
					// console.log(res.data.data.good_content_images)
					if(res.data.code==0){
						_this.good_state = res.data.data.good_state
						_this.good_verify = res.data.data.good_verify
						_this.good_delete = res.data.data.good_delete
						_this.swiperList = JSON.parse(res.data.data.good_images?res.data.data.good_images:'[]')
						_this.pic = res.data.data
						_this.good_content_images = res.data.data.good_content_images
						_this.storeid = res.data.data.store_id
						//将轮播图的数据加入到缓存中
						uni.setStorage({
							key:"detailsbanner",
							data:_this.swiperList
						})
						
						//这和下面没关系 这块处理用户足迹的
						//从这
						//当用户点击进来的时候代表已经游览了商品足迹
						uni.request({
							url:`${app.globalData.Requestpath}user/addTrackInfo`,
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
						uni.request({
							url:`${app.globalData.Requestpath}store/getStoreInfo`,
							data:{
								sid:_this.storeid
							},
							success(res) {
								if(res.data.code == 0){
									_this.areaName = res.data.data.area_name
								}
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
		created() {
			const _this = this
			_this.$store.state.bannerbool = true
		}
	}
</script>

<style lang="less" scoped>
	.Details{
		position: relative;
		background-color: #F8F8F8;
	}
</style>
