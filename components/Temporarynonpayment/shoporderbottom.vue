<template>
	<view class="shopoderbottom">
		<view class="shopoderbottomflex">
			<button class="cu-btn round line-grey" @click="showModal" data-target="RadioModal">取消订单</button>
			<button class="cu-btn round line-orange">付款</button>
		</view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in radiolist" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}}</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio==item?true:false"
								 :value="item"></radio>
							</label>
						</view>
						<view class="btn">
							<button class="cu-btn round bg-yellow" @tap="hideModal">暂不取消</button>
							<button class="cu-btn round bg-orange" @tap="Confirmcancel(radio)">确认取消</button>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				modalName: null,
				radio: '我不想买了',
				radiolist:[
					"我不想买了",
					"信息填写错误,重新拍",
					"卖家缺货",
					"同城见面交易",
					"其他原因"
				]
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
				// console.log(e.detail.value)
			},
			Confirmcancel(radiovalue){
				console.log(radiovalue)
				//radiovalue获取到用户当前选择的
				//当用户选择完成 将用户选择的值发送给后台数据库
				//并通过子组件传值的方式 将上面的界面发生改变
				//并关闭弹出框
				this.modalName = null
			}
		}
	}
</script>

<style lang="less" scoped>
	.shopoderbottom{
		position:fixed;
		bottom:0;
		left:0;
		width: 100%;
		background-color: #fff;
		.shopoderbottomflex{
			display:flex;
			justify-content: flex-end;
			padding-right:20rpx;
			button{
				&:first-child{
					margin-right:24rpx;
				}
			}
		}
		.btn{
			display:flex;
			// background-color:yellow;
			margin-top:10rpx;
			padding:10rpx;
			button{
				width: 50%;
			}
		}
	}
</style>
