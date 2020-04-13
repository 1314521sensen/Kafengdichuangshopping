<template>
	<view class="securitiesbottom">
		<view class="securitiesbottomitem" v-for="(item,index) in couponslist" :key="index">
			<view class="securities">
				<view class="securities-left">
					<view class="securities-left-imgs">
						<image :src="item.imgs"></image>
					</view>
					<view class="securities-left-right">
						<view class="securities-left-right-top">
							<text>{{item.title}}</text>
							<text>{{item.rules}}</text>
						</view>
						<view class="securities-left-right-bottom">
							<text>{{item.Aftetvolumetext}}</text>
							<text>¥{{item.Aftetvolumepic}}</text>
						</view>
					</view>
				</view>
				<view class="securities-right">
					<view class="securities-right-top">
						<text>¥</text>
						<text v-text="item.Broughtvolumepic"></text>
					</view>
					<text>{{item.Broughtvolumerules}}</text>
					<button class="cu-btn round bg-red" @tap="receive" :data-target="item.id">立即领取</button>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modalName==item.id?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-green" @tap="hideModal">确定</view>
					</view>
					<view class="padding-xl" :style="{'color':'#e02e24','font-size':35+'rpx','font-weight':'bold'}">
						<!-- 测试的时候显示多少钱 后期只显示领劵成功 -->
						{{item.Aftetvolumepic}}领卷成功
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		//这是卷的下面
		data(){
			return {
				modalName: null,
				couponslist:[
					{
						id:0,
						imgs:"/static/securities/01.webp",
						title:"无线蓝牙音响外放无线蓝牙音响外放",
						rules:"退货包运费",
						Aftetvolumetext:"领劵后",
						Aftetvolumepic:9.8,//这是领劵后的金额
						Broughtvolumepic:1.5,//这是优惠卷的金额
						Broughtvolumerules:"满48可用",//这是领取卷使用的规则
					},
					{
						id:1,
						imgs:"/static/securities/01.webp",
						title:"无线蓝牙音响外放无线蓝牙音响外放",
						rules:"退货包运费",
						Aftetvolumetext:"领劵后",
						Aftetvolumepic:20,//这是领劵后的金额
						Broughtvolumepic:5,//这是优惠卷的金额
						Broughtvolumerules:"满98可用",//这是领取卷使用的规则
					},
					{
						id:2,
						imgs:"/static/securities/01.webp",
						title:"无线蓝牙音响外放无线蓝牙音响外放",
						rules:"退货包运费",
						Aftetvolumetext:"领劵后",
						Aftetvolumepic:30,//这是领劵后的金额
						Broughtvolumepic:10,//这是优惠卷的金额
						Broughtvolumerules:"满77可用",//这是领取卷使用的规则
					}
				],
				//这个空数组是用来存储用户领取了哪张优惠卷
				addlist:[]
			}
		},
		methods:{
			receive(e){
				this.modalName = e.currentTarget.dataset.target;
				this.addlist.push(this.couponslist[this.modalName])
				//将数据发送到父级 allcoupons中
				this.$emit("getchildlist",this.addlist)
			},
			hideModal(e) {
				//隐藏窗口
				//当用户点击了确定 将提示框关闭
				this.modalName = null;
				// 关闭以后在来个我文本提示框
				uni.showToast({
					title:"优惠券领取成功",
					icon:"none"
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.securitiesbottom{
		margin-top:15rpx;
		.securitiesbottomitem{
			margin-top:20rpx;
		}
		.securities{
			display:flex;
			background-color: #fff;
			padding:15rpx 10rpx;
			.securities-left{
				display:flex;
				width: 80%;
				// height:50rpx;
				// background-color:red;
				.securities-left-imgs{
					width: 40%;
					height:220rpx;
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
								color:#FF5706;
								margin-top:14rpx;
							}
							// #e02e24
						}
					}
					.securities-left-right-bottom{
						color:#e02e24;
						display:flex;
						text{
							font-size:24rpx;
							margin-top:6rpx;
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
				width: 20%;
				// background-color:yellow;
				border-left:2rpx dashed #ccc;
				text-align:center;
				color:#e02e24;
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
