<template>
	<view class="addressTo">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="添加地址"></actionbar>
		<view class="newaddressTO-box">
			<view class="newaddressTO" @tap="tonews">
				<button class="cu-btn bg-red lg">新建</button>
			</view>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in addaddresslist" :key="index" :class="addressselectedindex==index?'bg-itemcolor':''" @tap="selecteditem(index,item)">
					<view class="cu-avatar" :class="addressselectedindex==index?'bg-itemcolor':''">{{item.consignee_name}}</view>
					<view class="content" @tap="setaddress(item.address_id)">
						<view class="text-grey" :class="addressselectedindex==index?'bg-itemcolor':''">{{item.consignee_phone}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut" :class="addressselectedindex==index?'bg-itemcolor':''">
								{{item.street_number}}
							</view> </view>
					</view>
					<view class="action">
						<text class="lg text-gray text-red cuIcon-delete" @tap="Deleteaddress(index,item.address_id)"></text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	const app = getApp();
	export default {
		data() {
			return {
				addressselectedindex:0,
				addaddresslist:[],
				statusBar:0,
				tokey:"",
				titleparameter:"",
				gid:"",
				img:"",
				num:0,
				storename:"",
				price:0,
				goodtitle:"",
				data:[],
				way:0,
				specname:"",
				storeid:"",
				cids:"",
				freight:"",
				spec_id:0,
				pageye:1,//上拉加载的页数
			}
		},
		methods: {
			selecteditem(index,itemitem){
				this.addressselectedindex = index
				if(this.titleparameter=='orderaddress'){
					// console.log(this.cids)
					//1是购物车过来的
					// 2是详情过来的
					// console.log(this.way,typeof this.way)
					if(this.way==1 || this.way=="1"){
						// console.log("购物车")
						// console.log(this.freight)
						uni.reLaunch({
							url:`/pages/Purchasepage/Purchasepage?gid=${this.gid}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&selectitem=${encodeURI(JSON.stringify(itemitem))}&cids=${this.cids}&storeid=${this.storeid}&freight=${this.freight}`
						})
						// console.log(this.gid)
					}else{
						// console.log("执行这里详情")
						// console.log(this.freight)
						uni.reLaunch({
							url:`/pages/Purchasepage/Purchasepage?gid=${this.gid}&specname=${this.specname}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&selectitem=${encodeURI(JSON.stringify(itemitem))}&storeid=${this.storeid}&freight=${this.freight}&spec_id=${this.spec_id}`
						})
					}
				}
			},
			tonews(){
				if(this.way==1){
					uni.navigateTo({
						url:`/components/address/address?title=newaddress&titleparameter=${this.titleparameter}&gid=${this.gid}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&cids=${this.cids}&storeid=${this.storeid}&freight=${this.freight}`
					})
				}else if(this.way==2){
					uni.navigateTo({
						url:`/components/address/address?title=newaddress&titleparameter=${this.titleparameter}&gid=${this.gid}&specname=${this.specname}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&storeid=${this.storeid}&freight=${this.freight}&spec_id=${this.spec_id}`
					})
				}else{
					uni.navigateTo({
						url:`/components/address/address?title=newaddress&titleparameter=${this.titleparameter}`
					})
				}
			},
			Deleteaddress(index,address_id){
				const _this = this
				uni.startPullDownRefresh()
				uni.request({
					url:`${app.globalData.Requestpath}user/deleteShippingAddress`,
					method:"POST",
					data:{
						token:this.tokey,
						address_id:address_id
					},
					success(res){
						if(res.data.code==0){
							_this.getShippingAddressList(_this.pageye,9)
						}
					}
				})
			},
			//点击跳到修改地址
			setaddress(address_id){
				if(this.way==1){
					uni.navigateTo({
						url:`/components/address/address?title=setaddress&address=${address_id}&titleparameter=${this.titleparameter}&gid=${this.gid}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&cids=${this.cids}&storeid=${this.storeid}`
					})
					// console.log()
				}else if(this.way==2){
					uni.navigateTo({
						url:`/components/address/address?title=setaddress&address=${address_id}&titleparameter=${this.titleparameter}&gid=${this.gid}&specname=${this.specname}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&storeid=${this.storeid}&spec_id=${this.spec_id}`
					})
				}else{
					uni.navigateTo({
						url:`/components/address/address?title=setaddress&address=${address_id}&titleparameter=${this.titleparameter}`
					})
				}
			},
			//封装一个获取用户收货地址的功能
			getShippingAddressList(page,pages){
				const _this = this
				uni.getStorage({
					key:"bindtokey",
					success(restokey) {
						uni.request({
							url:`${app.globalData.Requestpath}user/getShippingAddressList`,
							method:"POST",
							data:{
								token:restokey.data,
								page:page,
								pageSize:pages
							},
							success(res) {
								if(res.data.code==0){
									if(_this.pageye>1){
										_this.addaddresslist = _this.addaddresslist.concat(res.data.data)
									}else{
										_this.addaddresslist = res.data.data
										uni.stopPullDownRefresh()
									}
								}else if(res.data.code==1){
									_this.addaddresslist = []
									uni.stopPullDownRefresh()
								}
							}
						})
					}
				})
			},
			//当用户上拉的时候
			scrolltolower(){
				this.pageye++
				this.getShippingAddressList(this.pageye,9)
			}
		},
		components:{
			actionbar
		},
		onShow(){
			//当页面每次显示的时候去渲染数据库里面的数据
		},
		created() {
			const _this = this
			//获取缓存中的用户的tokey
			uni.getStorage({
				key:"bindtokey",
				success(res) {//获取到用户的tokey值
					_this.tokey = res.data
					_this.getShippingAddressList(_this.pageye,9)
				}
			})
		},
		onLoad(opction){
			this.titleparameter = opction.title
			this.statusBar = app.globalData.statusBar
			//1是购物车过来的
			//2是详情过来的
			if(this.titleparameter=='orderaddress'){
				let {way,gid,img,num,storename,price,goodtitle,storeid,freight,spec_id} = opction
				this.way = way
				if(this.way==1){//这是购物车过来的
					let {cids} = opction
					this.cids = cids
				}else{//这是详情过来的
					let {specname} = opction
					this.specname = specname
				}
				this.gid = gid
				this.num = num
				this.img = img
				this.spec_id = spec_id
				this.storename = storename
				this.price = price
				this.goodtitle = goodtitle
				this.storeid = storeid
				this.freight = freight
			}
		}
	}
</script>

<style lang="less" scoped>
	.addressTo{
		
		.newaddressTO-box{
			.newaddressTO{
				position: fixed;
				bottom:0;
				left:0;
				width: 100%;
				height:70rpx;
				button{
					width: 100%;
				}
			}
		}
		.cu-list{
			.cu-item{
				.cu-avatar{
					color:#000;
					background-color: #fff;
					font-size: 26rpx;
					font-weight: bold;
					width: 80rpx;
				}
				.content{
					.text-grey{
						color:#000;
					}
					.text-cut{
						color:#000;
						text-overflow:clip;
						white-space:normal;
						overflow:visible;
					}
				}
			}
			.bg-itemcolor{
				background-color: #e82930 !important;
				color:#fff !important;
			}
		}
	}
	.scroll-view{
		overflow: hidden;
		height:87vh;
		/* #ifdef APP-PLUS */
		height:79vh;
		/* #endif */
		// background-color:red
	}
</style>
