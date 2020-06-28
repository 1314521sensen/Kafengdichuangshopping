<template>
	<view class="Resetloginpassword">
		<view class="orders">
			<view class="orders-title-name" @tap="showModal" data-target="RadioModal">
				<text>修改密码</text>
				<view class="mintext">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in list" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.name}}</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
								 :value="'radio' + index"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="returnlogin(radio,tokey,userid)" data-target="RadioModal" :style="{'width':'100%'}">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				modalName: null,
				radio: 'radio1',
				list:[
					{
						name:"修改登录密码",
					},
					{
						name:"通过手机重置登录密码",
					},
					{
						name:"通过邮箱登录密码",
					}
				],
				useremail_is_null_list:[
					{
						name:"修改登录密码",
					},
					{
						name:"通过手机重置登录密码",
					}
				]
			}
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				//这个判断是判断用户有没有邮箱绑定
				// console.log(this.useremail)
				if(this.useremail){
					this.list = this.list
				}else{
					this.list = this.useremail_is_null_list
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			//当用户点击了登录
			returnlogin(index,tokey,userid){//index是下标
				uni.navigateTo({
					url:`/components/setcenter/returnloginpasswordall?index=${index}&tokey=${tokey}&id=${userid}`,
					success:()=>{
						this.hideModal()
					}
				})
			}
		},
		created() {
			const _this = this
			
		},
		props:["userphone","useremail","tokey","userid"]
	}
</script>

<style lang="less" scoped>
	.orders{
		background-color: #fff;
		// padding-bottom:30rpx;
		margin-top:10rpx;
		.orders-title-name{
		// width: ;
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
			padding:0 20rpx;
			// background-color:yellow;
				text{
					font-size: 30rpx;
					font-weight: bold;
				}
				.mintext{
					display: flex;
					color:#999;
					text{
						font-size: 25rpx;
						font-weight: normal;
					}
				}
		}
	}
</style>
