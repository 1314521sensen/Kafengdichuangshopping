<template>
	<view class="serviceBox">
		<view class="service">
			<view class="servicetext">
				<text>服务</text>
			</view>
			<view class="spotGoods">
				<text>现货</text>
			</view>
			<view class="delivery-time">
				<text>23:10前下单，预计({{date}})送达</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getMonth:'',
				getDate:''
			};
		},
		methods:{
			GetDateStr(AddDayCount) {
				var dd = new Date();
				dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
				var y = dd.getFullYear();
				var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
				var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
				//return y+"-"+m+"-"+d;年月日
				this.date = m+"月"+d+"日"
				// return m+"-"+d;
			}
		},
		created() {
			// let date = new Date()
			// let getFullYear = date.getFullYear()
			// let getMonth = date.getMonth() + 1
			// let getDate = date.getDate()
			// let newdate = new Date(getFullYear, getMonth, getDate + 3)
			// // console.log(newdate.getDate())
			// this.getMonth=newdate.getMonth()
			// this.getDate=newdate.getDate()
			this.GetDateStr(3)
		}
	}
</script>

<style lang="less" scoped>
	.serviceBox {
		background-color: #FFFFFF;
		margin-top: 10rpx;

		.service {
			padding: 0 30rpx;
			height: 80rpx;
			display: flex;
			justify-content: left;
			line-height: 80rpx;

			.servicetext {
				text {
					letter-spacing: 30rpx;
					color: #999999;
				}
			}
			.spotGoods{
				padding: 0 10rpx;
				text{
					font-weight: bold;
					color: #FF0000;
				}
			}
			.delivery-time{
				text{
					font-size: 24;
				}
			}
		}
	}
</style>
