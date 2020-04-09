<template>
	<view class="modelkuang">
		<!-- 这是头像 -->
		<view class="Uploadpicture">
			<view class="cu-bar bg-white margin-top" @tap="showModal" data-target="Image">
				<view class="action">
					<text>头像</text> 
				</view>
				<view class="action">
					<view class="cu-avatar sm round margin-left" :style="{'background-image':'url('+imgList[0]+')'}"></view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Image'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							头像上传
						</view>
					</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>
							 <!-- 这是那× -->
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="Confirmupload">确认上传</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 这是昵称 -->
		
		<Nickname></Nickname>
	</view>
</template>

<script>
	import Nickname from "@/components/actionbar/Nickname.vue"
	export default{
		data(){
			return {
				// CustomBar: this.CustomBar,
				modalName: null,
				value:"",
				imgList: []
			}
		},
		components:{
			Nickname,
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Modify(){
				this.value = this.value
				this.modalName = null
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '亲!!!',
					content: '确定要删除这个头像吗？',
					cancelText: '再看看',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			Confirmupload(){
				this.imgList = this.imgList
				this.modalName = null
			}
		}
	}
</script>

<style lang="less" scoped>
	.modelkuang{
	}
	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
</style>
