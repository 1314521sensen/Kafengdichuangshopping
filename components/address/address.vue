<template>
	<view class="address">
		<pageheight :statusBar="statusBar"></pageheight>
		<view class="from">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input v-model="value1" placeholder="姓名" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input v-model="value2" placeholder="手机号" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<!-- <view class="cu-form-group" @tap="Addressselection"> -->
				<areaselection @selectiondata="selectiondata" message="收货地址"></areaselection>
			<!-- </view> -->
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input v-model="value4" placeholder="请输入详细地址" name="input"></input>
			</view>
		</view>
		<view class="confirm-box">
			<view class="confirm">
				<view class="cu-bar btn-group">
					<button class="cu-btn bg-red shadow-blur round" @tap="Addresscancel">取消</button>
					<button class="cu-btn bg-green shadow-blur round" @tap="submits">保存</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import areaselection from "@/components/actionbar/areaselection.vue"
	const app = getApp();
	export default{
		data(){
			return {
				show: false,
				value1:"",
				value2:"",
				value3:"",
				value4:"",
				statusBar:0,
				selectiondatalist:[],
				tokey:0,
			}
		},
		methods:{
			
			// Addressselection(){
			// 	this.show = true
			// },
			submits(){
				let userphone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
				// console.log(this.value2.match(userphone))
				// console.log(this.value1,this.value2,this.value3,this.value4)
				if(this.value1 && this.value2.match(userphone)!==null && this.value4 && this.selectiondatalist.length>=3){
					//这是跳转上页
					// console.log(this.tokey)
					uni.request({
						url:`${app.globalData.Requestpath}user/addShippingAddress`,
						method:"POST",
						data:{
							token:this.tokey,
							province:this.selectiondatalist[0][0].area_id,
							city:this.selectiondatalist[1][0].area_id,
							area:this.selectiondatalist[2][0].area_id,
							street_number:this.value4,
							postal_code:253000,//这到明天需要改
							consignee_name:this.value1,
							consignee_phone:this.value2,
							is_default:0
						},
						success(res) {
							if(res.data.code==0){
								//pages/addressTo/addressTo?title=收货地址
								uni.redirectTo({
									url:"/pages/addressTo/addressTo?title=收货地址"
								})
							}
						}
					})
					//当点击的时候把值加入到把数据提交到数据库当中 在另一个页面进行数据的请求 渲染
				}else{
					uni.showToast({
						title:"请输入完整信息",
						mask:true,
						icon:"none"
					})
				}
				
			},
			//这是取消的
			Addresscancel(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//这是用来接受子组件传过来的值---弹出地址的组件
			selectiondata(e){
				// console.log(e)
				this.selectiondatalist = e
			}
		},
		components:{
			areaselection,
		},
		onLoad(){
			this.statusBar = app.globalData.statusBar
		},
		
		created() {
			const _this = this
			uni.getStorage({
				key:"bindtokey",
				success(res){
					// console.log(res.data)
					_this.tokey = res.data
				}
			})
		}
	}
</script>

<style lang="less" scoped>
	.address{
		.confirm-box{
			.confirm{
				position: fixed;
				width: 100%;
				// height:70rpx;
				left:0;
				bottom:0;
				.cu-btn{
					height:80rpx;
				}
			}	
		}
	}
	//插件的css
	.cu-bar{
		min-height:86rpx;
	}
	.cu-bar.btn-group uni-button{
		margin:0;
	}
</style>
