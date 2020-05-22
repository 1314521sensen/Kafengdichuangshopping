<template>
	<view class="list">
		<view class="cu-list menu-avatar">
				<!-- 这是背景图片 -->
				<!-- <view class="shopping-title">这里是背景图片 先用颜色替代</view> -->
				<!-- <button class="cu-btn bg-red margin-tb-sm lg" :style="{'display':display}">删除你不想要的商品</button> -->
				<view class="cu-item" v-for="(item,index) in list" :key="index">
					<view class="cu-item-left" @tap="linkDetails(item.good_id?item.good_id:item.goods_id,item.store_id)">
						<!--为什么这么写 因为组件是相互引用的  再加上后台 返回的数据值可能不一样只能用三目去判断哪个有值 goods_image -->
						<view 
							class="cu-avatar round lg" 
							:style="{'background-image':'url('+'http://hbk.huiboke.com'+(item.good_pic?item.good_pic:item.goods_image)+')'}"></view>
					</view>
					<view class="cu-item-right">
						<view class="content">
							<!-- goods_name这个值和上面的值一样的返回的不一样 -->
							<view class="text-grey">{{item.good_title?item.good_title:item.goods_name}}</view>
							<view class="price">
								￥{{item.good_price?item.good_price:(item.fav_price?item.fav_price:item.track_price)}}
								<text 
									class="lg text-gray cuIcon-delete"  
									:style="{'display':display}" 
									@tap="deletescollectionAndfootprint"
									:data-index="index"
								></text>
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
			linkDetails(id,storeid){
				// console.log(storeid)
				//当点击的时候跳转到详情页
				//根据index和我的组件中传过来的url 判断跳到哪里
					uni.navigateTo({
						url:`/pages/Details/Details?id=${id}&storeid=${storeid}`
					})
			},
			deletescollectionAndfootprint(e){
				let index = e.currentTarget.dataset.index
				let deleteid = this.deletelist[index].fav_id?this.deletelist[index].fav_id:this.deletelist[index].track_id
				uni.showModal({
					title:"确定要在收藏中删除该商品吗",
					content:"删除以后不影响在次添加",
					cancelText:true,
					cancelText:"确认取消",
					cancelColor:"#ff0000",
					confirmText:"确认删除",
					success:(res)=>{
						if(res.confirm){
							uni.request({
								url:this.deleteurl,
								method:"POST",
								data:{
									token:this.tokey,
									fav_id:deleteid,
									track_id:deleteid
								},
								success(res) {
									if(res.data.code==0){//这后期需要更改
										uni.switchTab({
											url:"/pages/PersonalMy/PersonalMy"
										})
									}
								}
							})
						}else{
							return false
						}
					}
				})
			}
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
	  .cu-list{
	   margin-bottom:20rpx;
	   display: flex;
	   flex-wrap:wrap;
	   justify-content:space-between;
	   padding: 0 36rpx;
	   
	   
	  }
	  .cu-list.menu-avatar>.cu-item{
	   display:block;
	   height:490rpx;
	   width: 320rpx;
	   // border: 2rpx solid red;
	   margin-bottom: 18rpx;
	   border-radius: 20rpx;
	   overflow: hidden;
	   box-shadow: 10rpx 10rpx 10rpx #C0C0C0;
	   
	   // box-shadow: 0rpx 0rpx 0rpx 5rpx;
	   // align-items: center;
	   // margin-bottom:20rpx;
	   // &:last-child{
	   //  margin-bottom:0;
	   // }
	   .cu-avatar{
	    position: static !important;
	   }
	   .cu-item-left{
	    
	   }
	   .cu-item-right{
	    margin-top:18rpx;
	    // background-color: ;
	     // width:100%;
	     .content{
	      position: static !important;
	      width: 100% !important;
	      left:0 !important;
	     display: flex;
	     flex-wrap: wrap;
	     align-items: stretch !important;
	     /* #ifdef APP-PLUS */
	      .text-grey{
	       line-height:28rpx;
	       color:#000;
	       font-size: 28rpx;
	      overflow : hidden;
	       text-overflow: ellipsis;
	       display: -webkit-box;
	       -webkit-line-clamp: 2;
	       -webkit-box-orient: vertical;
	      
	      }
	     /* #endif*/
	      /* #ifdef H5 */
	      .text-grey{
	       // height: 50rpx;
	       // overflow: hidden;
	       line-height:28rpx;
	       color:#000;
	       font-size: 22rpx;
	       height: 50rpx;
	       overflow: hidden;
	       text-overflow:ellipsis;
	       white-space: nowrap;
	      }
	     /* #endif */
	      .price{
	      margin-top: 20rpx;
	      display:flex;
	      width: 100%;
	       color:red;
	       font-weight: bold;
	       font-size: 30rpx;
	      
	      // margin-top:60rpx;
	      justify-content: space-between;
	      }
	     }
	   }
	  }
	  .cu-avatar.lg{
	   width: 318rpx;
	   height:330rpx;
	   border-radius:18rpx;
	  }
		.cu-btn.lg{
			line-height:80rpx;
		}
	}
</style>
