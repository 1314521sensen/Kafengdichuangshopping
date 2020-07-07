<template>
	<view class="areaselection margin-top">
		<view class="cu-form-group" @tap="showModal" data-target="selection">
			<view class="title">{{message}}</view>
			<text v-if="Haschosen.length==3">{{Haschosen[0][0].area_name}},{{Haschosen[1][0].area_name}},{{Haschosen[2][0].area_name}}</text>
			<text class='lg text-gray cuIcon-right'></text>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='selection'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="hideModal" :data-bool="false">取消</view>
					<view class="action text-blue" @tap="hideModal" :data-bool="true">确定</view>
				</view>
				<view class="">
					<scroll-view scroll-x class="bg-white nav">
						<view class="flex text-center">
							<view class="cu-item flex-sub" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in selectionlist" :key="index" @tap="tabSelect" :data-id="index" v-if="index==TabCur">
								{{item}}
							</view>
						</view>
					</scroll-view>
					<scroll-view scroll-y class="horizontalaxissliding">
						<!-- area_id: 0 area_name -->
						<view class="Selectareashi" 
							v-for="(item,index) in selectionlistareindex[TabCur]" 
							:key="index"
							@tap="selectedaoto(item,item.area_id,index)"
							:class="index==bgindex?'Selectareashiactive':''"
						>
							{{item.area_name}}
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return {
				modalName:null,
				selectionindexbg:0,
				TabCur: 0,
				scrollLeft: 0,
				selectionlist:[
					"选择省",
					"选择市",
					"选择县"
				],
				//当用户选择完以后添加到数组中
				Haschosen:[],
				selectionlistareindex:[[],[],[]],
				bgindex:-1
			}
		},
		methods:{
			//这个是显示
			showModal(e) {
				this.bgindex = -1
				this.modalName = e.currentTarget.dataset.target
			},
			//这个是隐藏
			hideModal(e) {
				let bool = e.currentTarget.dataset.bool
				//判断bool有没有值 没值 点击了取消 有值点击确定
				if(bool){//有值的时候判断Haschosen数组中的长度 长度<3代表用户还没选择完 有值代表用户已经选择完
					if(this.Haschosen.length==3){
						console.log(this.Haschosen)
						this.modalName = null
						this.$emit("selectiondata",this.Haschosen)
					}else{
						app.globalData.showtoastsame("请选择完整地址")
					}
				}else{//当用户点击了取消 恢复成默认值
					this.TabCur = 0
					this.selectionlistareindex[1] = [];
					this.selectionlistareindex[2] = [];
					this.modalName = null
				}
				// this.modalName = null
			},
			//是弹出以后上面的nav导航
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.selectionindexbg = e.currentTarget.dataset.id
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			selectedaoto(item,area_id,index){
				this.bgindex = -1
				this.bgindex = index
				if(this.TabCur==0){
					this.Haschosen[0] = [item]
					uni.request({
						url:`${app.globalData.Requestpath}common/getAreasMinusOne`,
						data:{
							parent_id:item.area_id,
						},
						success:(res)=>{
							if(res.data.code==0){
								this.selectionlistareindex[1] = res.data.data								
								this.TabCur = 1
							}
						}
					})
				}else if(this.TabCur==1){
					this.Haschosen[1] = [this.selectionlistareindex[1][index]]
					uni.request({
						url:`${app.globalData.Requestpath}common/getAreasMinusOne`,
						data:{
							parent_id:area_id,
						},
						success:(res)=>{
							this.selectionlistareindex[2] = res.data.data
							this.TabCur = 2
							this.bgindex = -1
						}
					})
				}else if(this.TabCur==2){
					this.Haschosen[2] = [this.selectionlistareindex[2][index]]
				}
			}
		},
		created() {
			const _this = this
			//"请求市"
			uni.request({
				url:`${app.globalData.Requestpath}common/getAreasMinusOne`,
				data:{
					parent_id:-1,
				},
				success(res){
					// console.log(res)
					if(res.data.code==0){
						_this.selectionlistareindex[0] = res.data.data
						// console.log(_this.selectionlistareindex[0])
					}
				}
			})
			
			// _this.Haschosen = _this.defaultselectiondatalist
		},
		// mounted(){"defaultselectiondatalist"
		// 	// console.log(this.defaultselectiondatalist[0])
		// },
		props:["message"]
	}
</script>

<style lang="less" scoped>
	.areaselection{
		.cu-dialog{
			height:600rpx;
			.horizontalaxissliding{
				height:30vh;
				.Selectareashi{
					line-height:66rpx;
				}
				.Selectareashiactive{
					background-color:red;
					color:#fff;
				}
			}
		}
	}
	
</style>
