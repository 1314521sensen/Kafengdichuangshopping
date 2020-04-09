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
							<input v-model="value" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" :placeholder="value2" confirm-type="search"></input>
						</view>
						<view class="action">
							<button class="cu-btn bg-green shadow-blur round" @click="seachshijian">搜索</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="historicalrecord" v-if="list.length!=0">
			<view class="historicalrecord-title">
				<text>历史记录</text>
				<text class="lg text-gray cuIcon-deletefill" @click="delectrecord"></text>
			</view>
			<view class="historicalrecord-content">
				<text v-for="(item,index) in list" :key="index" @click="assignment(item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		
		data(){
			return {
				list:[],
				value:"",
				value2:"请搜索你的商品"
			}
		},
		methods:{
			InputFocus(e) {
				this.InputBottom = e.detail.height	
			},
			InputBlur(e) {
				this.InputBottom = 0
				this.value = e.detail.value
			},
			Returns(){
				uni.reLaunch({
				    url:"/pages/index/index"
				});
			},
			seachshijian(){
				
				//如果输入的内容为空就会走这里
				if(this.value==""){
					return this.value2="搜索内容不能为空"
				}
				//如果文本不为空就往下执行
				this.list.unshift(this.value)
				if(this.list.length==8){
					let arr = this.list.pop()
					this.list = this.list
				}
				uni.navigateTo({
					url:`/pages/Sortinglist/Sortinglist?value=${this.value}`
				})
			},
			delectrecord(){
				this.list=[]
				this.value=""
			},
			assignment(item){
				this.value=item;
			}
		},
		props:["value3"],
	}
</script>

<style lang="less" scoped>
	.searhbusiness{
		.searhbusiness-midden{
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding-left:20rpx;
			.Returnsicon{
				flex:1;
				text{
					font-size: 44rpx;
				}
			}
			.inp{
				width: 94%;
			}
		}
		.historicalrecord{
			padding:0 28rpx;
			margin-top:30rpx;
			.historicalrecord-title{
				font-size: 26rpx;
				font-weight: bold;
				display:flex;
				justify-content: space-between;
			}
			.historicalrecord-content{
				width: 70%;
				display:flex;
				flex-wrap: wrap;
				// background-color:yellow;
				margin-top:20rpx;
				font-size: 20rpx;
				text{
					padding:6rpx;
					background-color:rgba(0,0,0,0.5);
					border-radius:16rpx;
					color:#fff;
					margin:0 10rpx 10rpx 0;
				}
			}
		}
	}
</style>
