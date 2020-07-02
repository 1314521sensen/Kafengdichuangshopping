<template>
	<view class="cu-modal bottom-modal immediately">
		<view class="cu-dialog">
			<view class="immediately-top">
				<view class="immediately-top-image">
					<image :src="'http://hbk.huiboke.com'+pic.good_pic"></image>
				</view>
				<view class="immediately-top-describe">
					<view class="price">
						<text v-if="price!==''">¥{{price}}</text>
						<text class="lg text-gray cuIcon-close" @tap="Shutdown"></text>
					</view>
					<view class="describe" v-html="text">
					</view>
				</view>
			</view>
			<view class="immediately-midden-scrollarea">
				<scroll-view scroll-y="true" class="scrollarea">
					<view class="scrollareapagespecifications">
						<view class="scrollareapagespecifications-item" v-for="(item,index) in immediatelylist" :key="index">
							<view class="item-text">
								{{item.spec_name}}
							</view>
							<!-- v-for="(items,indexs) in item.spec_value" 
									:key="indexs" :style="{'color':color}"  
									@tap="choose(items,index,indexs,item)"items,index,indexs,item -->
							<view class="item-specifications" @tap="choose" :data-specid="item.id" :data-index="index">
								<text class="test" :class="index==indexs?'active':''">{{item.spec_value}}</text>  
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 这里购买数量没写 -->
			<view class="numberof" v-if="bool==false">
				<view>购买数量</view>
				<view class="adder">
					<button @tap="shopingnum(false)">-</button>
					<input type="text" v-model="num" disabled="true">
					<button @tap="shopingnum(true)">+</button>
				</view>
			</view>
			<button 
				class="cu-btn bg-red lg" 
				:style="{'width':'100%','border-radius':'32rpx'}" 
				@tap="buy">{{bool?'确定':'立即购买'}}</button>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				color:"#000",
				num:1,//这是购买数量的数据
				selectedlist:[],
				selectedlistnamelist:[],
				text:"",
				datalist:[],
				price:"",
				specid:0,
				indexs:-1,
			}
		},
		methods:{
			//这是当用户点击规格items,index,indexs,item
			choose(e){
				this.specid = e.currentTarget.dataset.specid
				this.indexs = e.currentTarget.dataset.index
				//这是存储用户点击规格的值
				// this.selectedlist[index] = items
				// //这是用来存储用户的规格的名称
				// this.selectedlistnamelist[index]=item.spec_name
				// //用来保存用户选择的规格方便传给后台----开始
				// this.datalist[index] = {spec_name:item.spec_name,spec_value:items}
				// // this.selectedlistindex.push({"spec_name":`${this.selectedlistnamelist[index]}`,"spec_value":`${this.selectedlist[index]}`})
				// //用来保存用户选择的规格方便传给后台----结束
				// // console.log(items)
				// let str = ""
				// this.selectedlist.forEach((itemsitem,indexsindex)=>{
				// 	str += itemsitem+"&nbsp;&nbsp;&nbsp;"
				// })
				// this.text = str
				// //去请求每个商品规格的对应的数据
				uni.request({
					url:`${app.globalData.Requestpath}good/getGoodSpecInfoOneLeval`,
					data:{
						spec_id:e.currentTarget.dataset.specid,
					},
					success:(res)=>{
						// console.log(res)
						if(res.data.code==0){
							this.text = res.data.data.spec_value
							this.price = res.data.data.spec_price
						}
					}
				})
			},
			//这是用户点击了数量+还是-
			shopingnum(bool){
				if(bool){//true就是+
					this.num++
				}else{//-
					if(this.num<=1){
						app.globalData.showtoastsame("数量不能小于1")
						return 
					}
					this.num--
				}
			},
			//这是当用户点击了立即购买的按钮
			buy(){
				//获取tokey值 为了小程序考虑
				uni.getStorage({
					key:"bindtokey",
					success(res){
						app.globalData.Detectionupdatetokey(res.data)
					}
				})
				if(this.text!==""){
					// console.log(this.specid)
					// console.log(this.gid,this.datalist,this.num)
					// uni.navigateTo({
					// 	url:`/pages/Purchasepage/Purchasepage?gid=${this.gid}&spec_id=${this.specid}&specname=${JSON.stringify(this.datalist)}&num=${this.num}&way=2&img=${JSON.stringify(this.pic.good_pic)}&storename=${this.pic.store_name}&price=${this.price}&goodtitle=${this.pic.good_title}&storeid=${this.storeid}&freight=${this.pic.good_freight}`
					// })
					// console.log(this.datalist)
					console.log(this.couplebool)
					let SpecificationShopdetails = {
						good_id:this.gid,
						spec_id:this.specid,
						good_num:this.num,
						way:2,
						good_pic:this.pic.good_pic,
						store_name:this.pic.store_name,
						good_price:this.price,
						good_name:this.pic.good_title,
						store_id:this.storeid,
						good_freight:this.pic.good_freight,
						good_type:this.couplebool
					}
					
					this.$store.commit("Saveorder",{fromvalue:0,publicShopdetails:SpecificationShopdetails})
				}
				//这些先留着 为后期用
				// if(this.selectedlist.length<this.immediatelylist.length){
				// 	app.globalData.showtoastsame("请选择完整规格")
				// }else{
				// 	if(this.bool){
				// 		let arr = []
				// 		for(let i=0;i<this.selectedlist.length;i++){
				// 			//将每个值进行字符串拼接 这样就可以传给后端了
				// 			arr.push({"spec_name":`${this.selectedlistnamelist[i]}`,"spec_value":`${this.selectedlist[i]}`})
				// 		}
				// 		this.$emit("guigedata",arr)
				// 		this.$emit("hiddends",null)
				// 	}else{
				// 		// console.log(this.pic.good_freight)
				// 		//跳转到购买页面
				
				// 	}
				// }
			},
			//当用户点击了×
			Shutdown(){
				this.$emit("hiddends",null)
			}
		},
		props:["immediatelylist","bool","gid","pic","storeid","couplebool"],
		created() {
			// console.log(this.immediatelylist)
		}
	}
</script>

<style lang="less" scoped>
	.immediately{
		text-align:left;
		// height:50vh;
		.cu-dialog{
			height:70vh;
			padding:0 20rpx;
			.immediately-top{
				display:flex;
				justify-content: space-between;
				margin-top:30rpx;
				padding:0 20rpx;
				.immediately-top-image{
					width: 27%;
					height:176rpx;
					image{
						width: 100%;
						height:100%;
					}
				}
				.immediately-top-describe{
					align-items: center;
					flex:.95;
					.price{
						display:flex;
						justify-content: space-between;
					}
					text{
						display:block;
						color:#f00;
						font-weight: bold;
						font-size: 34rpx;
						margin:20rpx 0 15rpx;
						&:last-child{
							color:#999;
							font-size: 28rpx;
						}
					}
					.describe{
						overflow:hidden;
						width: 100%;
						height: 68rpx;
						font-size: 22rpx;
					}
				}
			}
		}
		.immediately-midden-scrollarea{
			font-size: 30rpx;
			font-weight: bold;
			margin:44rpx 0;
			padding: 0 20rpx;
			.scrollarea{
				height:34vh;
				//这是midden中间的规格
				.scrollareaspecifications{
					text{
						color:#7f7f7f;
						
					}
				}
				//这是midden一些配置规格
				.scrollareapagespecifications{
					.scrollareapagespecifications-item{
						margin-top:20px;
						.item-text{
							
						}
						.item-specifications{
							display: flex;
							flex-wrap: wrap;
							margin-top:20rpx;
							text{
								padding:12rpx;
								border:2rpx solid #ccc;
								border-radius:16rpx;
								margin:0 22rpx 10rpx 0;
							}
							.active{
								border-color:red;
								color:red;
							}
						}
					}
				}
			}
		}
		.numberof{
			display:flex;
			justify-content: space-between;
			margin-bottom:36rpx;
			.adder{
				display:flex;
				button{
					width: 50rpx;
					margin:0;
					padding:0;
					line-height:50rpx;
				}
				input{
					width: 100rpx;
					border:2rpx solid #ccc;
					text-align:center;
				}
			}
		}
	}
</style>
