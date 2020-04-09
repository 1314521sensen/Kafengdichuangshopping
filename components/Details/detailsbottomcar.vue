<template>
	<view class="detailscar">
		<view class="cu-bar bg-white tabbar border shop">
				<button class="action" open-type="contact" @tap="Enterthestore">
					<view class="cuIcon-shop text-green">
						<!-- <view class="cu-tag badge"></view> -->
					</view> 店铺
				</button>
				<view class="action" @tap="shoppingcart">
					<view class="cuIcon-cart">
						<!-- cu-tag这个是角标 -->
						<view class="badge" :class="len?'cu-tag badge':'badge'">{{len}}</view>
					</view>
					购物车
				</view>
				<view class="btn-group">
					<button class="cu-btn bg-orange round shadow-blur" @tap="Addcart(pic,imgs)">加入购物车</button>
					<button class="cu-btn bg-red round shadow-blur" @tap="Skiporder">立即订购</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				newscarobj:{},
				newcararr:[],
				len:""
			}
		},
		methods:{
			//进入店铺
			Enterthestore(){
				uni.navigateTo({
					url:"/pages/Store/store"
				})
			},
			shoppingcart(){
				uni.switchTab({
					url:"/pages/shoppingCart/shoppingCart"
				})
			},
			Addcart(obj,img){
				//当点击加入到购物车 就加入到缓存中 获取店铺名字 商品的图片 商品的标题 商品的参数(可有可无) 商品的价格
				let {newscarobj,newcararr} = this.$data
				
				newscarobj = obj
				newscarobj.img = img
				this.newscarobj = newscarobj
				newcararr.unshift(newscarobj)
				this.newcararr = newcararr
				if(newcararr.length==0){
					this.len=""
				}else{
					this.len = newcararr.length
				}
				uni.setStorage({
				    key:"Addcart",
				    data:this.newcararr,
				    success:(res)=>{
						console.log(res)
				    },
					fail(err){
						console.log(err)
					}
				});
			},
			Skiporder(){
				//跳转到购买页面
				uni.navigateTo({
					url:"/pages/Purchasepage/Purchasepage"
				})
			}
		},
		props:["pic","imgs"]
	}
</script>

<style lang="less" scoped>
	.detailscar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		left: 0;
		z-index: 1;
	}
</style>
