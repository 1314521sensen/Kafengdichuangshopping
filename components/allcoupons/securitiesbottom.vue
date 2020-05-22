<template>
	<view class="securitiesbottom">
		<view v-for="(item,index) in couponslist" :key="index">
			<!-- {{item}} -->
			<view class="couponstitle">
				<view class="couponstitletext">{{item.couponstitle}}</view>
			</view>
			<view class="securitiesbottomitem" v-for="(items,indexs) in item.list" :key="indexs">
				<view class="securities">
					<view class="securities-left">
						<view class="securities-left-imgs">
							<image :src="items.coupon_img"></image>
						</view>
						<view class="securities-left-right">
							<view class="securities-left-right-top">
								<text>{{items.store_name}}</text>
								<text>{{items.rules?items.rules:'平台自主提供'}}</text>
							</view>
							<view class="securities-left-right-bottom">
								<text>¥{{items.coupon_name}}</text>
							</view>
						</view>
					</view>
					<view class="securities-right">
						<view class="securities-right-top">
							<text>¥</text>
							<text v-text="items.money"></text>
						</view>
						<text>{{items.at_full=='0.00'?'无门槛':'满'+items.at_full}}使用</text>
						<button class="cu-btn round bg-red" @tap="receive" :data-storeid="items.store_id">立即使用</button>
					</view>
				</view>
		</view>
		</view> 
	</view>
</template>

<script>
	const app = getApp()
	export default{
		//这是卷的下面
		data(){
			return {
			}
		},
		methods:{
			receive(e){
				let storeid = parseInt(e.currentTarget.dataset.storeid);
				// console.log(typeof storeid)
				if(storeid!==0){
					uni.reLaunch({
						url:`/pages/Store/store?storeid=${storeid}`
					})
				}else{
					uni.reLaunch({
						url:`/pages/index/index`
					})
				}
				
				// this.addlist.push(this.couponslist[this.modalName])
				// //将数据发送到父级 allcoupons中
				// this.$emit("getchildlist",this.addlist)
			},
			// hideModal(e) {
			// 	//隐藏窗口
			// 	//当用户点击了确定 将提示框关闭
			// 	this.modalName = null;
			// 	// 关闭以后在来个我文本提示框
			// 	uni.showToast({
			// 		title:"优惠券领取成功",
			// 		icon:"none"
			// 	})
			// },
		},
		props:["couponslist"]
	}
</script>

<style lang="less" scoped>
	.securitiesbottom{
	  
	  margin-top:15rpx;
	  padding-bottom:20rpx;
	  .couponstitle{
		  .couponstitletext{
			  text-align:center;
			  font-weight: bold;
			  font-size: 32rpx;
			  color:#c20e22;
		  }
	  }
	  .securitiesbottomitem{
	   
	   margin: 0 auto;
	   margin-top:20rpx;
	   background-color: #c41225;
	   color: white;
	   width: 95%;
	   height: 160rpx;
	  }
	  .full-text{
	   font-size: 10rpx;
	  }
	  .securities{
	   display:flex;
	   // background-color: #fff;
	   // padding:15rpx 10rpx;
	   .securities-left{
	    display:flex;
	    width: 80%;
	    // height:50rpx;
	    // background-color:red;
	    .securities-left-imgs{
	     width: 40%;
	     height:160rpx;
	     // background-color:green;
	     image{
	      width: 100%;
	      height:100%;
	     }
	    }
	    .securities-left-right{
	     overflow: hidden;
	     display:flex;
	     flex-wrap: wrap;
	     align-items: center;
	     width: 60%;
	     // background-color:pink;
	     padding-left:20rpx;
	     .securities-left-right-top{
	      overflow:hidden;
	      font-size: 30rpx;
	      font-weight: bold;
	      text{
	       display:block;
	       white-space:nowrap;
	       // overflow:hidden;
	       // text-overflow:ellipsis;
	       &:last-child{
	        font-size: 27rpx;
	        // color:#FF5706;
	        margin-top:14rpx;
	       }
	       // #e02e24
	      }
	     }
	     .securities-left-right-bottom{
	      // color:#e02e24;
	      display:flex;
	      text{
	       font-size:24rpx;
	       margin-top:3rpx;
	       &:last-child{
	        font-size: 36rpx;
	        font-weight: bold;
	        margin:0 0 0 10rpx;
	       }
	      }
	     }
	    }
	   }
	   .securities-right{
	    display:flex;
	    align-items: center;
	    flex-wrap: wrap;
	    justify-content: center;
	    width: 30%;
	    // background-color:yellow;
	    border-left:2rpx dashed #ccc;
	    text-align:center;
	    // color:#e02e24;
	    .securities-right-top{
	     display:flex;
	     justify-content: center;
	     text{
	      font-weight: bold;
	      font-size: 25rpx;
	      margin-top:10rpx;
	      &:last-child{
	       font-size: 36rpx;
	       margin-top:0rpx;
	      }
	     }
	    }
	    button{
	     width: 90%;
	     height:52rpx;
	     font-size: 20rpx;
	     padding:0;
	    }
	   }
	  }
	  
	 }
</style>
