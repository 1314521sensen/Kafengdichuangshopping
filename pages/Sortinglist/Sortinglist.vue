<template>
	<view class="sortinglist">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="seachinput">
			<view class="searhbusiness-midden">
				<view class="Returnsicon" @click="Returns">
					<text class="cuIcon-back text-gray"></text>
				</view>
				<view class="inp">
					<view class="cu-bar search xiaoheight">
						<view class="search-form round inpheight">
							<text class="cuIcon-search"></text>
							<input :value="value" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" :placeholder="value2" confirm-type="search"></input>
						</view>
					</view>
				</view>
			</view>
		</view>
		<sorting></sorting>
		<horizontallylist :horizontallylist="horizontallylist"></horizontallylist>
	</view>
</template>

<script>
	import sorting from "@/components/sortinglist/sorting.vue"
	import horizontallylist from "@/components/sortinglist/horizontallylist.vue"
	const app = getApp();
	export default {
		//这是商品排序列表大组件
		data() {
			return {
				value:"",
				value2:"",
				statusBar:0,
				//这是横排的显示数据
				horizontallylist:[
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:88
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:888
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:66
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:99
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:108
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:99
					},
					{
						imgs:"/static/horizontally/1.jpg",
						title:"【德州市热卖】富贵鸟 2019春秋皮衣男 时尚修身保暖外套立领飞行员夹克机车衣服",
						price:66
					}]
			}
		},
		methods: {
			InputFocus(){
				this.returnstopone(`/pages/SearchTo/SearchTo?value=${this.value}`)
			},
			InputBlur(){
				
			},
			Returns(){
				//"
				this.returnstopone("/pages/SearchTo/SearchTo")
			},
			returnstopone(url){
				//封装一个方法 返回上一级
				uni.navigateTo({
					url
				})
			}
		},
		components:{
			sorting,
			horizontallylist
		},
		onLoad(opctry){
			this.value = opctry.value
			this.statusBar = app.globalData.statusBar
		}
	}
</script>

<style lang="less" scoped>
	.sortinglist{
		.searhbusiness-midden{
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding-left:20rpx;
			.Returnsicon{
				flex:1;
				text{
					font-size: 44rpx;
				}
			}
			.inp{
				width: 94%;
				.xiaoheight{
					min-height:80rpx;
					.inpheight{
						height:50rpx;
						line-height:50rpx;
					}
				}
			}
		}
	}
</style>
