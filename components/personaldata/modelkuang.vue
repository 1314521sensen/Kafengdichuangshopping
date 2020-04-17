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
							 <image :src="pathurl" mode="aspectFill"></image>
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
		
		<Nickname :bool="bool" :text="text" @changebool="changebool" @changetext="changetext" :json="json"></Nickname>
	</view>
</template>

<script>
	import Nickname from "@/components/actionbar/Nickname.vue"
	export default{
		data(){
			return {
				// CustomBar: this.CustomBar,
				bool:true,
				text:"保存",
				modalName: null,
				value:"",
				imgList: [],
				pathurl:"",
				show_img_list:[],
				json:{},
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
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			ChooseImage() {
				const _self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res)
						this.imgList = res.tempFiles
						this.pathurl = res.tempFilePaths[0]
					}
				});
			},
			//点击上传
			Confirmupload(){
				this.bool = false
				this.text = "确认修改"
				// if(this.imgList[0].size>5120){
				// 	this.modalName = null
				// 	uni.showToast({
				// 		title:"图片的大小不许超过5M",
				// 		icon:"none",
				// 		duration:2000
				// 	})
				// 	return false
				// }else{
					
					uni.uploadFile({
						url:"http://hbk.huiboke.com/api/common/uploadImage?type=user",
						filePath:this.pathurl,
						name:"file",
						// header:{
						// 	'content-type':"multipart/form-data"
						// },
						fileType:"image",
						success(res){ //这里的src不能用明天搞
							this.json = JSON.parse(res.data)
							this.pathurl = this.json.data.src
						}
					})
				// }
				//这是将弹窗关闭
				this.modalName = null
			},
			//改变子组件传过来的值
			changebool(e){
				this.bool = e
			},
			changetext(e){
				this.text = e
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
