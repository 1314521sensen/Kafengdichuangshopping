<template>
	<view class="searhbusiness">
		<view class="seachinput">
			<view class="searhbusiness-midden">
				<view class="Returnsicon" @click="Returns">
					<text class="cuIcon-back text-gray"></text>
				</view>
				<view class="inp">
					<view class="cu-bar search bg-white">
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input  :focus="focusbool" @confirm="Enter" @focus="InputFocus" @blur="InputBlur"
							 :adjust-position="false" type="text" :placeholder="value2" confirm-type="search" v-model="values"></input>
						</view>
						<!-- #ifdef APP-PLUS || H5 -->
						<view class="action">
							<button class="cu-btn bg-green shadow-blur round" @tap="seachshijian">搜索</button>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<view class="historicalrecord" v-if="list.length!=0">
			<view class="historicalrecord-title">
				<text>历史记录</text>
				<text class="lg text-gray cuIcon-deletefill" @tap="delectrecord"></text>
			</view>
			<view class="historicalrecord-content">
				<text v-for="(item,index) in list" :key="index" @tap="assignment(item)">{{item}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				// list: [],
				value: "",
				value2: "请搜索你的商品",
				focusbool: true,
				values:''
			}
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
				// this.focusbool = true
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.value = e.detail.value
				// this.focusbool = false
				//仅微信端调用 不加的话 手机端 会重复搜索
				// #ifdef MP-WEIXIN
				this.Enter()
				// #endif
			},
			Returns() {
				uni.reLaunch({
					url: "/pages/index/index"
				});
			},
			//因为微信小程序 有个胶囊阻碍 故加个键盘事件
			Enter() {
				this.enterseach()
			},
			//封装个方法 同时使用
			enterseach() {
				//如果输入的内容为空就会走这里
				if (this.value == "") {
					return this.value2 = "搜索内容不能为空"
				}
				//如果文本不为空就往下执行
				this.list.unshift(this.value)
				// this.focusbool = false
				if (this.list.length == 8) {
					let arr = this.list.pop()
					this.list = this.list
				}
				uni.setStorage({
					key: 'searchArr',
					data: this.list
				});
				uni.navigateTo({
					url: `/pages/Sortinglist/Sortinglist?value=${this.value}`
				})
			},
			seachshijian() {
				const _this = this
				_this.values = ""
				_this.enterseach()
			},
			delectrecord() {
				const _this = this
				//搜索这 加了确认操作
				uni.showModal({
					title:"确定要删除历史记录吗??",
					content:"删除后将无法恢复该记录",
					showCancel:true,
					cancelText:"取消删除",
					cancelColor:"#ff0000",
					confirmText:"确定删除",
					confirmColor:"#00ff00",
					success(res) {
						if(res.confirm){
							_this.list = []
							_this.value = ""
							uni.removeStorage({
								key: "searchArr",
								success(res) {
									// console.log(res)
								}
							})
						}
					}
				})
			},
			assignment(item) {
				this.value = item;
				const _this = this
				uni.navigateTo({
					url: `/pages/Sortinglist/Sortinglist?value=${_this.value}`
				})
			}
		},
		props: ["value3","list"],
		// created() {
		// 	const _this = this
			
		// 	uni.getStorage({
		// 		key: "searchArr",
		// 		success(res) {
		// 			let arr = res.data
		// 			_this.list = [...new Set(arr)]
		// 		}
		// 	})
		// }
	}
</script>

<style lang="less" scoped>
	.searhbusiness {
		.searhbusiness-midden {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 20rpx;

			.Returnsicon {
				flex: 1;

				text {
					font-size: 44rpx;
				}
			}

			.inp {
				width: 94%;
			}
		}

		.historicalrecord {
			padding: 0 28rpx;
			margin-top: 30rpx;

			.historicalrecord-title {
				font-size: 26rpx;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
			}

			.historicalrecord-content {
				width: 70%;
				display: flex;
				flex-wrap: wrap;
				// background-color:yellow;
				margin-top: 20rpx;
				font-size: 30rpx;
				text {
					padding: 6rpx;
					background-color: rgba(0, 0, 0, 0.5);
					border-radius: 16rpx;
					color: #fff;
					margin: 0 20rpx 10rpx 0;
				}
			}
		}
	}
</style>
