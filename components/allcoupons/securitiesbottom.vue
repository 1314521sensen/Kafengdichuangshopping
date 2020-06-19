<template>
	<view class="securitiesbottom">
		<!-- v-for="(item,index) in couponslist" :key="index" -->
		
			<!-- {{item}} -->
			<view class="couponstitle">
				<view 
					class="couponstitletext" 
					v-for="(item,index) in couponstitlelist" 
					:key="index"
					:class="couponstindex==index?'couponstitletextactive':''"
					@tap="CouponClassification"
					:data-indexs="index"
				>{{item}}</view>
			</view>
			<view class="discount_coupon">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="demo_fa" v-for="(item,index) in couponslist" :key="index">
						<view class="discount_coupon_demo">
							<view class="demo_left">
								<view class="demo_left_price">
									<text class="price_left" v-text="item.money"></text>
									<text class="price_right">元</text>
								</view>
								
									<view class="demo_left_time">
										<view class="left_indate ">
											<text>有效期至:</text>
										<text>{{item.stop_time}}</text>
										</view>
										
										<view class="right_bottom">
											<!-- 这里在判断是0元还是必须满多少钱使用 如果是0元===无限制 -->
											<text v-text="item.at_full!=='0.00'?'满'+item.at_full+'使用':'无门槛使用'"></text>
										</view>
										<view class="arrows">
											<text class="arrows-text" @tap="particularsClick" :data-indexs="index">▼</text>
										</view>
									</view>
									
								
							</view>
							<view class="demo_right">
								<text class="right_center">
									立即使用
								</text>
							</view>
						</view>
						<view class="particulars" v-if="index==tabcurindex">
							<p><text>优惠券用途:</text><text>卡时间来得及法拉盛京东</text></p>
							<p><text>优惠券号：</text><text>asdfaasdf</text></p>
						</view>
					</view>
				</scroll-view>
			</view>
		
	</view>
</template>

<script>
	const app = getApp()
	export default{
		//这是卷的下面
		data(){
			return {
				couponstitlelist:[
					"店铺优惠券",
					"平台优惠券"
				],
				couponstindex:0,
				show:false,
				tabcurindex:-1
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
			CouponClassification(e){
				let indexs = e.currentTarget.dataset.indexs
				this.couponstindex = indexs
				this.$emit("indexs",this.couponstindex)
			},
			particularsClick(e){
				// let indexs = e.currentTarget.dataset.indexs
				this.tabcurindex = e.currentTarget.dataset.indexs
				this.show = !this.show
				console.log(this.show)
				
			}
		},
		props:["couponslist"]
	}
</script>

<style lang="less" scoped>
	
	.securitiesbottom{
		background-color: white;
	 width: 100%;
	  // margin-top:15rpx;
	  // padding-bottom:20rpx;
	  .couponstitle{
		  width: 100%;
		display: flex;
		justify-content: space-between;
		text-align: center;
		  .couponstitletext{
			  background-color: #EEEEEE;
			  width: 50% ;
			  height: 100rpx;
			  line-height: 100rpx;
			  text-align:center;
			  font-weight: bold;
			  font-size: 32rpx;
			  color:#999;
		  }
		  .couponstitletextactive{
			  color:#f9734d;
		  }
	  }
	.scroll-Y{
		height: 78vh;
	}
	  .discount_coupon_demo{
		  
		  width: 95%;
		  height: 175rpx;
		  // background-color: red;
		  margin: 20rpx auto 0;
		  display: flex;
		  justify-content: space-between;
		  background: linear-gradient(to left,#eb480e,#f1952b,#ec661c);
		  .demo_left{
				width: 80%;
				height: 175rpx;
				display: flex;
				justify-content: space-between;
				.demo_left_price{
					height: 100%;
					width: 40%;
					line-height: 175rpx;
					text-align: center;
					color: white;
					font-weight: bold;
					.price_left{
						text-align: center;
						font-size: 80rpx;
					}
				}
				.demo_left_time{
					color: white;
					width: 60%;
					height: 100%;
					margin-left: 10rpx;
					.left_indate {
						font-size: 24rpx;
						margin-top: 40rpx;
					}
					.right_top{
						font-size:12rpx;
						height: 40%;
						line-height: 87rpx;
					}
					.right_bottom{
						font-size: 40rpx;
						font-weight: bold;
					}
					.arrows{
						width: 100%;
						text-align: center;
						margin-top: 10rpx;
					}
				}
		  }
		  .demo_right{
			  width: 20%;
			  height: 175rpx;
			  border-left: 2rpx dashed #EEEEEE;
			  text-align: center;
			  .right_center{
				  -webkit-writing-mode: vertical-rl;
				  writing-mode: vertical-rl;
				  margin-top: 26rpx;
				  color: white;
				  font-weight: bold;
				  font-size: 30rpx;
			  }
			  // background: linear-gradient(to left,#ed6117,#eb480e);
		  }
	  }
		.particulars{
			// border: 1rpx solid #CCCCCC;
			// border-top: 1rpx dashed #CCCCCC;
			width: 95%;
			margin: 0 auto ;
			padding: 4rpx;
			overflow: hidden;
		  	animation:mymove .5s ;
		  	/*Safari 和 Chrome:*/
		  	-webkit-animation:mymove .5s ;
		  }
		  
		  @keyframes mymove{
		  	from {height: 0rpx;}
		  	to {height: 76rpx;}
		  }
		  p{
			  font-size: 24rpx;
			  color: #9c9c9c;
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
