<template>
	<view class="bottomModal" v-if="loading">
		<view class="action">
			<input type="text" 
				placeholder="请选择店铺分类" 
				:value='list[index].grade_name?list[index].grade_name:list[index].gc_title'  
				@tap="showModal" 
				data-target="bottomModal"/>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<!-- <view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="hideModal">确定</view>
				</view> -->
				<view class="padding-xl">
					<view 
						class="item-text" 
						@tap="clicktext" 
						:data-indexs="index" 
						v-for="(item,index) in list" 
						:key='index' 
						:class="index == bgindex ? 'bgtext' : '' "
					>
						{{item.grade_name?item.grade_name:item.gc_title}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				index:0,
				bgindex:-1,
				titletext:""
			};
		},
		methods:{
			Businessbtn(){
				uni.navigateTo({
					url:"/pages/contractsigning/contractsigning"
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			clicktext(e){
				let index = e.currentTarget.dataset.indexs
				this.index = index
				this.bgindex = index
				this.$emit("indexs",this.list[index])
				this.hideModal()
			}
		},
		props:["list","loading"]
	}
	
</script>

<style lang="less">
	.item-text{
		padding: 10rpx 0;
	}
	.bgtext{
		background-color: red;
		color:#fff;
	}
</style>
