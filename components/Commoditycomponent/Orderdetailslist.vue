<template>
	<view class="list">
		<view class="cu-list menu-avatar">
				<!-- 这是背景图片 -->
				<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
				<!-- <button class="cu-btn bg-red margin-tb-sm lg" :style="{'display':display}">删除你不想要的商品</button> -->
				<view class="cu-item" v-for="(item,index) in list" :key="index">
					<view class="cu-item-left" @tap="linkDetails(item.order_id,item.order_sn)">
						<!--为什么这么写 因为组件是相互引用的  再加上后台 返回的数据值可能不一样只能用三目去判断哪个有值 goods_image -->
						<view 
							class="cu-avatar round lg" 
							:style="{'background-image':'url('+'http://hbk.huiboke.com'+(item.store_logo)+')'}"></view>
					</view>
					<view class="cu-item-right">
						<view class="content">
							<!-- goods_name这个值和上面的值一样的返回的不一样 -->
							<view class="text-grey">{{item.store_name}}</view>
							<view class="price">
								￥{{item.good_price}}
								<text class="lg text-gray cuIcon-delete" :style="{'display':display}" @tap="deletescollectionAndfootprint(index)"></text>
							</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		methods:{
			linkDetails(orderid,ordersn){
				//orderid----订单id
				//ordersn----订单编号
				//当点击的时候跳转到订单详情页
				//根据index和我的组件中传过来的url 判断跳到哪里
					uni.navigateTo({
						url:`/pages/Temporarynonpayment/Temporarynonpayment?order=${btoa(orderid)}&ordersnSerial=${btoa(ordersn)}`
					})
			},
			// deletescollectionAndfootprint(index){
			// 	let deleteid = this.deletelist[index].fav_id?this.deletelist[index].fav_id:this.deletelist[index].track_id
			// 	uni.showModal({
			// 		title:"确定要删除该商品吗",
			// 		cancelText:true,
			// 		cancelText:"确认取消",
			// 		cancelColor:"#ff0000",
			// 		confirmText:"确认删除",
			// 		success:(res)=>{
			// 			if(res.confirm){
			// 				uni.request({
			// 					url:this.deleteurl,
			// 					method:"POST",
			// 					data:{
			// 						token:this.tokey,
			// 						fav_id:deleteid,
			// 						track_id:deleteid
			// 					},
			// 					success(res) {
			// 						console.log(res)
			// 						if(res.data.code==0){//这后期需要更改
			// 							uni.switchTab({
			// 								url:"/pages/PersonalMy/PersonalMy"
			// 							})
			// 						}
			// 					}
			// 				})
			// 			}else{
			// 				return false
			// 			}
			// 		}
			// 	})
			// }
		},
		props:["list","display","deleteurl","tokey","deletelist"]
	}
</script>

<style lang="less" scoped>
	.list{
		.shopping-title{
			//由于背景图片没高度 给来一个高度
			height:70rpx;
			background-color:deeppink ;//背景图片没有 先用颜色替代
			// background-image:url() //这里背景图片到时候有图片在渲染  先把图片的其他属性写上
			// background:no-repeat 0 0;
			// background-size: 100% 100%;
		}
		.cu-list.menu-avatar>.cu-item{
			height:200rpx;
			align-items: center;
			margin-bottom:20rpx;
			&:last-child{
				margin-bottom:0;
			}
			.cu-avatar{
				position: static !important;
			}
			.cu-item-left{
				
			}
			.cu-item-right{
					width: calc(100% - 20px - 30px - 60px - 10px) !important;
				 .content{
				 	position: static !important;
				 	width: 100% !important;
				 	left:0 !important;
					display: flex;
					flex-wrap: wrap;
					align-items: stretch !important;
				 	.text-grey{
				 		line-height:28rpx;
				 		color:#000;
				 		font-size: 28rpx;
				 	}
				 	.price{
						display:flex;
						width: 100%;
				 		color:red;
				 		font-weight: bold;
				 		font-size: 30rpx;
						margin-top:60rpx;
						justify-content: space-between;
				 	}
				 }
			}
		}
		.cu-avatar.lg{
			width: 200rpx;
			height:190rpx;
			border-radius:8rpx;
		}
		.cu-btn.lg{
			line-height:80rpx;
		}
	}
</style>
