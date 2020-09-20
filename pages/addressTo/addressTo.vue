<template>
	<view class="addressTo">
		<pageheight :statusBar="statusBar"></pageheight>
		<actionbar url="/pages/PersonalMy/PersonalMy" message="添加地址" isorder='isorder'></actionbar>
		<view class="newaddressTO-box">
			<view class="newaddressTO" @tap="tonews">
				<button class="cu-btn bg-red lg newaddressbtn">
					<text class="newaddressadd">+</text>
					<text class="newaddresstext">新建收货地址</text>
				</button>
			</view>
		</view>
		<scroll-view class="scroll-view" :scroll-y="true" @scrolltolower="scrolltolower">
			<view class="cu-list menu-avatar">
				<!-- <view class="cu-item" v-for="(item,index) in addaddresslist" :key="index" :class="addressselectedindex==index?'bg-itemcolor':''" @tap="selecteditem(index,item)">
					<view class="cu-avatar" :class="addressselectedindex==index?'bg-itemcolor':''">{{item.consignee_name}}</view>
					<view class="content" @tap="setaddress(item.address_id,item)">
						<view class="text-grey" :class="addressselectedindex==index?'bg-itemcolor':''">{{item.consignee_phone}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut" :class="addressselectedindex==index?'bg-itemcolor':''">
								{{item.street_number}}
							</view> </view>
					</view>
					<view class="action" v-if="!way">
						<text class="lg text-gray text-red cuIcon-delete" @tap="Deleteaddress(index,item.address_id)"></text>
					</view>
				</view> -->
				<view 
					class="cu-item" 
					v-for="(item,index) in addaddresslist" 
					:key="index"  
					@tap="selecteditem(index,item)"
					@longtap="Deleteaddress(index,item.address_id)"
				>
					<view class="item-left">
						<view class="userinfo">
							<text class="userinfoplice">{{item.consignee_name}}</text>
							<text class="userinfoplice userplone">{{item.consignee_phone}}</text>
							<text class="addressdefault" v-show="item.is_default==1">默认</text>
						</view>
						<view class="useraddres">
							<text class="addrestext">{{item.street_number}}</text>
						</view>
					</view>
					<view class="item-right">
						<view class="uploadaddres" @tap.stop="setaddress(item.address_id,item)">
							<image 
								:src="httpUrl+'address/uploadaddress.png'"
								class="uploadaddres_img"
							></image>
						</view>
					</view>
				</view>
			</view>
			<view class="Longpressadd" v-show="addaddresslist.length>0">— 长按地址 进行删除地址 —</view>
			<!-- <newaddres></newaddres> -->
		</scroll-view>
	</view>
</template>

<script>
	import actionbar from "@/components/actionbar/actionbar.vue"
	// import newaddres from "@/components/address/newaddres.vue"
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
				addresbool:false,
				httpUrl:this.$store.state.httpUrl
			}
		},
		methods: {
			selecteditem(index,itemitem){
				const _this = this
				let {address_id} = itemitem
				this.addressselectedindex = index
				if(this.titleparameter=='orderaddress'){
					// console.log(this.cids)
					//1是购物车过来的
					// 2是详情过来的
					// console.log(this.way,typeof this.way)
					if(this.way==1 || this.way=="1"){
						// console.log("购物车")
						// console.log(this.freight)
						uni.redirectTo({
							url:`/pages/Purchasepage/Purchasepage?gid=${this.gid}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&selectitem=${encodeURI(JSON.stringify(itemitem))}&cids=${this.cids}&storeid=${this.storeid}&freight=${this.freight}`
						})
						// console.log(this.gid)
					}else{
						// console.log("执行这里详情")
						// console.log(this.freight)
						uni.redirectTo({
							url:`/pages/Purchasepage/Purchasepage?gid=${this.gid}&specname=${this.specname}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&selectitem=${encodeURI(JSON.stringify(itemitem))}&storeid=${this.storeid}&freight=${this.freight}&spec_id=${this.spec_id}`
						})
					}
				}else{
					//当用户普通进来的时候 点击时候 设置默认值
					uni.getStorage({
						key:"bindtokey",
						success(res){
							
							uni.request({
								url:`${app.globalData.Requestpath}user/setDefaultShippingAddress`,
								method:"POST",
								data:{
									token:res.data,
									address_id:address_id
								},
								success(resxiugai) {
									if(resxiugai.data.code==0){
										_this.getShippingAddressList(_this.pageye,9)
									}else{
										app.globalData.showtoastsame(resxiugai.data.msg)
									}
								}
							})
						}
					})
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
				uni.showModal({
					title:"删除地址",
					content:"是否要删除该地址",
					showCancel:true,
					cancelText:"取消删除",
					cancelColor:"#ff0000",
					confirmText:"确定删除",
					confirmColor:"#00ff00",
					success(resmodel){
						// console.log(resmodel)
						if(resmodel.confirm){
							_this.addresbool = true
							uni.startPullDownRefresh()
							uni.request({
								url:`${app.globalData.Requestpath}user/deleteShippingAddress`,
								method:"POST",
								data:{
									token:_this.tokey,
									address_id:address_id
								},
								success(res){
									if(res.data.code==0){
										_this.getShippingAddressList(_this.pageye,9)
									}
								}
							})
						}
					}
				})
				
			},
			//点击跳到修改地址
			setaddress(address_id,item){
				let itemStr = JSON.parse(JSON.stringify(item));
				let value1 = itemStr.consignee_name;
				let value2 = itemStr.consignee_phone;
				let value4 = itemStr.street_number
				let value6 = itemStr.is_default
				let province = itemStr.province
				let city = itemStr.city
				let area = itemStr.area
				let province_name = itemStr.province_name
				let city_name = itemStr.city_name
				let area_name = itemStr.area_name
				if(this.way==1){
					uni.redirectTo({
						url:`/components/address/address?title=setaddress&address=${address_id}&titleparameter=${this.titleparameter}&gid=${this.gid}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&cids=${this.cids}&storeid=${this.storeid}&value1=${value1}&value2=${value2}&value4=${value4}&value6=${value6}&amend=1`
					})
					// console.log()
				}else if(this.way==2){
					uni.redirectTo({
						url:`/components/address/address?title=setaddress&address=${address_id}&titleparameter=${this.titleparameter}&gid=${this.gid}&specname=${this.specname}&num=${this.num}&way=${this.way}&img=${this.img}&storename=${this.storename}&price=${this.price}&goodtitle=${this.goodtitle}&storeid=${this.storeid}&spec_id=${this.spec_id}&value1=${value1}&value2=${value2}&value4=${value4}&value6=${value6}&amend=1`
					})
				}else{
					uni.redirectTo({
						url:`/components/address/address?title=setaddress&address=${address_id}&titleparameter=${this.titleparameter}&value1=${value1}&value2=${value2}&value4=${value4}&value6=${value6}&amend=1&province=${province}&city=${city}&area=${area}&province_name=${province_name}&city_name=${city_name}&area_name=${area_name}`
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
									_this.addresbool = false
									//将地址中的数据长度加入到缓存中 借用个数去做订单中的地址的判断
									uni.setStorage({
										key:"addresslength",
										data:res.data.data.length
									})
								}else if(res.data.code==1){
									if(_this.addresbool){
										_this.addaddresslist = []
										uni.stopPullDownRefresh()
										uni.setStorage({
											key:"addresslength",
											data:0
										})
									}
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
			actionbar,
			// newaddres
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
		height:100vh;
		background-color: #F8F8F8;
		.newaddressTO-box{
			.newaddressTO{
				position: fixed;
				bottom:0;
				left:0;
				width: 100%;
				height:70rpx;
				.newaddressbtn{
					width: 100%;
					background-color: #fa2342;
					font-size: 36rpx;
					.newaddressadd{
						font-size:54rpx;
						margin-right:20rpx;
					}
					
				}
			}
		}
		.cu-list{
			// .cu-item{
			// 	.cu-avatar{
			// 		color:#000;
			// 		background-color: #fff;
			// 		font-size: 26rpx;
			// 		font-weight: bold;
			// 		width: 80rpx;
			// 	}
			// 	.content{
			// 		.text-grey{
			// 			color:#000;
			// 		}
			// 		.text-cut{
			// 			color:#000;
			// 			text-overflow:clip;
			// 			white-space:normal;
			// 			overflow:visible;
			// 		}
			// 	}
			// }
			.cu-item{
				display:flex;
				// background-color:red;
				border-bottom:2rpx solid #f5f5f5;
				padding:20rpx 0 20rpx 15rpx;
				background-color: #fff;
				.item-left{
					flex:1;
					// height:100rpx;
					// background-color:green;
					.userinfo{
						.userinfoplice{
							font-weight: bold;
							font-size:30rpx;
						}
						.userplone{
							margin:0 15rpx 0 60rpx;
						}
						.addressdefault{
							padding:6rpx 10rpx;
							background-color:#fa2342;
							color:#fff;
							border-radius:14rpx;
							font-size: 24rpx;
						}
					}
					.useraddres{
						margin-top:20rpx;
						.addrestext{
							font-size: 24rpx;
							color:#ccc;
							
						}
					}
				}
				.item-right{
					display:flex;
					justify-content: center;
					align-items: center;
					width: 15%;
					// background-color:yellow;
					.uploadaddres{
						width: 45rpx;
						height:45rpx;
						// background-color:red;
						.uploadaddres_img{
							width: 100%;
							height:100%;
						}
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
	.Longpressadd{
		color:#999;
		text-align: center;
		margin-top:30rpx;
	}
</style>
