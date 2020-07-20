<template>
	<view>
		<view class="commodityBox" v-if="shoplinknew=='storeshop' && shopbool==false">
			<!-- 这是用户店铺进来的时候 -->
				<view class="commodity">
					<view class="img">
						<image :src="'http://hbk.huiboke.com'+JSON.parse(shopopction.shopimg)" mode=""></image>
					</view>
					<view class="particulars">
						<view class="presentation">
							<text>{{shopopction.shoptitle}}</text>
						</view>
						<view class="pic">
							<!--如果商品的价格和促销的价格一致 那就采用促销价格 如果不一样的 促销价格肯定低至商品的价格 -->
							<text>
								￥{{shopopction.shopprice==shopopction.shoppromotion_price?shopopction.shoppromotion_price:shopopction.shoppromotion_price+'-'+shopopction.shopprice}}
								</text>
						</view>
						<view class="send">
							<button class="cu-btn round" @tap="sendCustomershop">发给客服</button>
						</view>
					</view>
				</view>
			</view>
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom> -->
		<view class="blurbshopdefault" v-if="shopbool">
			<view class="blurbBox">
					<view class="img">
						<image :src="'http://hbk.huiboke.com'+JSON.parse(shopopction.shopimg)" mode=""></image>
					</view>
					<view class="pic">
						<text>
							￥{{shopopction.shopprice==shopopction.shoppromotion_price?shopopction.shoppromotion_price:shopopction.shoppromotion_price+'-'+shopopction.shopprice}}
							</text>
					</view>
					<view class="letter">
						<text>{{shopopction.shoptitle}}</text>
					</view>
					<view class="discounts">
						<text>店铺劵满80送20</text>
					</view>
					<view class="commodityshop">
						<text class="cuIcon-shopfill"></text><text>{{shopopction.storename}}</text>
					</view>
			</view>
		</view>
		<view class="cu-chat">
			<!-- 如果是用户发送的就给外面加一个self类名 -->
			<view 
				class="cu-item" 
				v-for="(item,index) in this.$store.state.Customersendmsglist" 
				:key="index"
				:class="item.msgtype=='usersend'?'self':''"
			>
				<!-- 这是客服的头像 -->
				<view 
					class="cu-avatar radius" 
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg)"
					v-if="item.msgtype=='serveReturn'"
				></view>
				<!-- 这是两个人发送的内容 -->
				<view class="main">
					<!-- 两个发送内容的气泡 -->
					<view 
						class="content shadow"
						:class="item.msgtype=='usersend'?'bg-green':''"
					>
						<text v-html="item.sendmsgdata"></text>
					</view>
				</view>
				<!-- 这是用户的头像 -->
				<view 
					class="cu-avatar radius" 
					style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg)"
					v-if="item.msgtype=='usersend'"
				></view>
				<!-- <view class="date">2018年3月23日 13:23</view> -->
			</view>
			<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view> -->
			<!-- 这是用户把另一个用户删了出来的提示 -->
			<!-- <view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view>
			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view> -->
			<!-- 这是发送的图片 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view> -->
			<!-- 这是语音 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- 这是右边的用户向左边的用户发送的消息 -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- 这是左边的用户 向右边的用户发送的消息 -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view>-->
		</view>
		<view class="bottom_input foot input" :style="[{bottom:InputBottom+'px'}]">
			<!-- 这是input旁边的那些dom -->
			<view class="cu-bar">
				<view class="action" @tap="showModal" data-target="Modal">
					<text class="cuIcon-pic text-grey"></text>
				</view>
				<input class="solid-bottom" :adjust-position="false" :focus="inputshow" maxlength="300" cursor-spacing="10"
				 @focus="InputFocus" @blur="InputBlur" v-model="inpvalue" @input="inputvalue"></input>
				<view class="action">
					<text class="cuIcon-emojifill text-grey" @tap="expression"></text>
				</view>
				<button class="cu-btn bg-green shadow" @tap="sendmsg">发送</button>
			</view>
			<!-- 这是表情 -->
			<view class="expression" v-if="bool">
					<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
						:autoplay="false" interval="5000" duration="500">
						<swiper-item 
							v-for="(items,index) in swiperList" 
							:key="index"
							class="swiper-item"
						>
							<view class="meme_list" >
								<image 
									v-for="(item,indexs) in 21" 
									:key="indexs" 
									:data-imgIndex="indexs"
									:data-swiperItemIndex="index"
									:src="'http://hbk.huiboke.com/uploads/app/image/Expressionpackage/'+(indexs+items.bigurl)+'.gif'" 
									:data-src="'http://hbk.huiboke.com/uploads/app/image/Expressionpackage/'+(indexs+items.bigurl)+'.gif'"
									@tap="Meme"
									class="cover-images"
								></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
		</view>
		<!-- 这是模态框 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="padding-xl cameraphotoAndalbum">
					<view 
						class="Photoalbum Photo" 
						v-for="(item,index) in Photo" 
						:key="index" 
						@tap.stop="choosePhoto"
						:data-indexs="index"
					>
						<image :src="item.img" class="img"></image>
						<text class="titlename">{{item.titleName}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//这是客服
	export default {
		data() {
			return {
				shopopction:"",//这是商品跳进来的
				shoplinknew:"",//判断是在过来的
				InputBottom: 0,
				inpvalue:"",
				inpvaluestr:"",//这是带image标签的
				shopbool:false,//判断是不是点击了发给客服按钮
				focusautomatic:false,//控制键盘是否自动弹出来
				inputshow:false,
				modalName: null,
				Photo:[
					{
						img:"/static/chat/Photoalbum.png",
						titleName:"相册"
					},
					{
						img:"/static/chat/camera.png",
						titleName:"相机"
					}
				],
				imgList:[],//相册
				bool:false,
				swiperList: [{
					id: 0,
					type: 'image',
					bigurl:0
				}, {
					id: 1,
					type: 'image',
					bigurl:21,
				},
				{
					id:2,
					type:'image',
					bigurl:42
				},
				{
					id:3,
					type:'image',
					bigurl:63
				}],
				dotStyle: false,
				expressionlist:[
					[
						{name:'微笑'},{name:'呲牙'},{name:'大笑'},{name:'快乐'},{name:'可怜'},{name:'抠鼻'},{name:'惊讶'},
						{name:'害羞'},{name:'调皮'},{name:'闭嘴'},{name:'鄙视'},{name:'爱你'},{name:'大哭'},{name:'偷笑'},
						{name:'亲亲'},{name:'难过'},{name:'高兴'},{name:'糗大了'},{name:'右哼哼'},{name:'左哼哼'},{name:'嘘'}
					],
					[
						{name:'哀'},{name:'委屈'},{name:'想吐'},{name:'哈欠'},{name:'开心'},{name:'发火'},{name:'疑问'},
						{name:'饥饿'},{name:'拜拜'},{name:'思考'},{name:'汗'},{name:'困'},{name:'睡觉'},{name:'钱'},
						{name:'快哭了'},{name:'酷'},{name:'色'},{name:'愤怒'},{name:'鼓掌'},{name:'晕'},{name:'哭'}
					],
					[
						{name:'抓狂'},{name:'擦汗'},{name:'坏笑'},{name:'争吵'},{name:'互粉'},{name:'爱心'},{name:'心碎'},
						{name:'猪头'},{name:'熊猫'},{name:'兔子'},{name:'好的'},{name:'耶'},{name:'强'},{name:'不行'},
						{name:'厉害'},{name:'勾引'},{name:'弱'},{name:'羊驼'},{name:'神马'},{name:'囧'},{name:'云'}
					],
					[
						{name:'给力'},{name:'人们'},{name:'VIP'},{name:'奥特曼'},{name:'礼物'},{name:'时间'},{name:'麦克风'},
						{name:'蜡烛'},{name:'蛋糕'}
					]
				],
			}
		},
		methods: {
			InputFocus(e) {
				this.bool = false
				this.InputBottom = e.detail.height
				//将系统的键盘高度存起来
				uni.setStorage({
					key:"KeyboardHeight",
					data:this.InputBottom
				})
			},
			// 当用户点击 商品发送给客服的时候触发该事件
			sendCustomershop(){
				this.shopbool = true
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			//当用户点击发送消息的时候
			sendmsg(){
				const _this = this
				
				_this.$store.commit("Customersendmsg",{textvalue:_this.inpvalue,inpvaluestr:_this.inpvaluestr})
				_this.inpvalue = ""
				// console.log(this.inpvalue)
			},
			
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.bool = false
			},
			hideModal() {
				this.modalName = null
			},
			//用户选择相机或者相册  进行不同的操作
			choosePhoto(e){
				let {indexs} = e.currentTarget.dataset
				if(parseInt(indexs)==0){
					//这是相册
					this.ChooseImage("album")
				}else{
					//这是相机
					this.ChooseImage("camera")
				}
			},
			//封装调用相机还是相册
			ChooseImage(choosePhotoaAnd) {
				uni.chooseImage({
					count:1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [choosePhotoaAnd], //通过传参不同调用不同的 相册或者相机
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						this.hideModal()
					}
				});
			},
			expression(){
					this.bool = !(this.bool)
			},
			//当用户输入值的时候
			inputvalue(e){
				this.inpvaluestr = e.detail.value
			},
			Meme(e){
				// console.log(e.currentTarget.dataset)
				let {imgindex,swiperitemindex,src} = e.currentTarget.dataset
				// console.log(this.expressionlist[swiperitemindex][imgindex].name)
				this.inpvalue = this.inpvalue+this.expressionlist[swiperitemindex][imgindex].name+'<image src="'+src+'"></image>'
			}
		},
		onLoad(opction){
			const _this = this
			let {shoplink} = opction
			_this.shoplinknew = shoplink
			// 这里是商品详情跳转过来的 就不用了解构了  直接用  为了少定义变量
			_this.shopopction = opction
			//当用户已进入页面的时候  在缓存中 取值如果没有  就让键盘自动弹出来  获取用户的键盘的高度 
			//如果取出来的时候就不需要在弹出来
			uni.getStorage({
				key:"KeyboardHeight",
				success(reskey){
					_this.focusautomatic = false
					// console.log(reskey,"获取成功")
				},
				fail(err){
					_this.focusautomatic = true
					uni.setStorage({
						key:"KeyboardHeight",
						data:100
					})
				}
			})
		}
	}
</script>

<style lang="less" scoped>
  page{
    background-color: #F5F5F5;
    padding-bottom: 100rpx;
  }
  .cameraphotoAndalbum{
	  display:flex;
	  justify-content: space-between;
	  
	  .Photo{
		  width: 35%;
		  height:200rpx;
		  border:2rpx solid #ccc; 
		  // background-color:green;
		  .img{
			  width: 60%;
			  height:60%;
			  margin:20rpx 0 10rpx;
		  }
		  .titlename{
			display:block;  
		  }
	  }
  }
  .bottom_input{
     position: fixed;
     bottom: 0;
     width: 100%;
    }
  .expression{
	   .meme_list{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
		.cover-images{
			 width: 60rpx;
			 height: 60rpx;
			 margin: 20rpx;
			 // position: relative;
			 // z-index: 99999 !important;
			 pointer-events:auto;
		}
	   }
  }
  .commodityBox{
  		width: 100%;
  		height: 208rpx;
  		margin-top: 50rpx;
  		padding: 0 20rpx;
  		.commodity{
  			width: 100%;
  			height: 100%;
  			background-color: #FFFFFF;
  			padding: 20rpx;
  			display: flex;
  			border-radius: 20rpx;
  			justify-content: space-between;
  			.img{
  				height: 167rpx;
  				width: 167rpx ;
  				image{ 
  					width: 100%;
  					height: 100%;
  					border-radius: 10rpx;
  				}
  			}
  			.particulars{
  				width: 460rpx;
  				.presentation{
  					width: 100%;
  					text{
  						font-size: 30rpx;
  					}
  				}
  				.pic{
  					width: 100%;
  					text{
  						color: #ff4e14;
  						font-size: 34rpx;
  						font-weight: bold;
  					}
  				}
  				.send{
  					width: 100%;
  					display: flex;
  					flex-direction:row-reverse;
  					padding: 4rpx 0;
  					.cu-btn{
  						margin-top: -10rpx;
  						background-color: #fe8000;
  						color: #FFFFFF;
  						height: 50rpx !important;
  						padding: 0 20rpx;
  					}
  				}
  			}
  		}
  	}
	.blurbshopdefault{
		display:flex;
		justify-content: center;
		.blurbBox{
				width: 400rpx;
				background-color: #ffffff;
				border-radius: 30rpx;
				.img{
					width: 100%;
					image{
						width: 100%;
						height: 400rpx;
					}
				}
				.pic{
					width: 100%;
					padding: 8rpx 20rpx;
					text{
						color: #ff4f06;
						font-weight: bold;
						font-size: 32rpx;
					}
				}
				.letter{
					width: 100%;
					padding: 10rpx 20rpx;
					text{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.discounts{
					padding: 10rpx 20rpx;
					text{
						display: block;
						width: 180rpx;
						background-color: #fee5e3;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #bd683a;
						padding: 4rpx 10rpx;
					}
				}
				.commodityshop{
					padding: 10rpx 20rpx 20rpx 20rpx;
					text{
						color: #969696;
					}
				}
			}
		}
</style>
