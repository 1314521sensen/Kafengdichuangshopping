import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

let Requestpath = "http://hbk.huiboke.com/api/"

let state = {
	cartList:[],//购物车的数据
	allSelected:false,//购物车的全选状态
	count:0,//这是用来存储总价
	specificationslist:[],//这是规格的数据
	shopcatdeletandlistbool:false,//判断用户是否下拉还是删除
	tokey:"",
	pages:1,
	newpages:1,//用于储存pages原来的值 这样去解决购物车实时数据  
	orderlist:[],//用来存储订单的信息
	Temporarynonpaymentlist:[],//这是订单的列表
	orderlistshop:[],//这是用于存储订单内的商品列表
	ordercreatetime:"",//订单创建的时间
	tokey:"",//tokey值
	loadModal:false,//快递里面的加载图标
	kiadigongsi:false,//是否显示那个快递的文字
	Couriercompanyname:"",//快递的文字
	express_code:"",//快递公司的编码
	Traceslist:[],//这是物流的列表
	evaluationlist:[],//这是用来操作评价的列表
	evaluationlistitem:[],//用于存放每个评价列表的item
	refundreturnlist:[],//用于退货退款列表
	Notcreated:"",//这是未付款开始的毫秒值
	Notpaying:"",//这是未付款的结束的毫秒值
	sendTimes:"",//这是发货时间
	remainingTime:"",//订单剩余时间
	couponslist:[],//这是优惠券的数据
	BrandList:[],//这是品牌的数据
	Brandpage:1,//品牌的页数
	Brandloadbool:false,//用于请求请求活动的加载图标
	socketOpen:false,//判断是否链接成功
	wholeisdownload:false,//整个更新的界面
	isdownload:false,//更新app的状态是否显示的整包的更新
	doloadurl:"",//app的下载地址
	progress:"0%",//下载进度
	httpUrl:"http://hbk.huiboke.com/uploads/app/image/",
	Delete:false,
	orderpage: 1,//订单请求的页数
	liveshoplist:[],//存放主播开播前需要携带直播的商品
	livepages:1,//获取直播的商品的页数
	Customersendmsglist:[],//这是店铺或者客服的消息记录
}
//getters 用于计算
let getters = {
	//获取选中的每一件商品
	totalprice:state=>{
		//由于遍历 导致每次coune迭代增加 在增加之前先变为0
		state.count = 0
		state.cartList.forEach((item,index)=>{
			item.sub.forEach((Items,Indexs)=>{
				if(Items.checked==true){
					state.count += ((Number(Items.good_price)*Items.good_num)+Number(Items.good_freight))
				}
			})
		})
		let countarr = String(state.count).split('.')
		if(countarr[1]){
			return Number(countarr[0]+'.'+countarr[1].substr(0,2))
		}else{
			return Number(String(state.count))+'.00'
		}
	}
}
//mutations 用于存放方法 唯一改变state里面的值
let mutations = {
	/*----通用方法----*/
	//获取tokey
	gettokey(){
		uni.getStorage({
			key:"bindtokey",
			success(restokey) {
				console.log(restokey)
				state.tokey = restokey.data
			}
		})
	},
	//封装个提示框
	getshowmodel(state,modelmsg){
		let {msg} = modelmsg
		uni.showToast({
			title:msg,
			icon:"none"
		})
	},
	
	//app整包更新
	Appwholeupdate(state,wholeobj){
		const _this = this
		let {version,modelboll} = wholeobj
		uni.request({
			url:`${Requestpath}update/getUpdateInfo`,
			method:"POST",
			data:{
				type:2
			},
			success(res) {
				if(res.data.code==0){
					let returnApplicationnum = res.data.data.data.version_id.split(".").join("")
					// console.log(returnApplicationnum > version)
					if(returnApplicationnum > version){
						state.isdownload = true
						state.wholeisdownload = true
						//将下载地址存放起来
						state.doloadurl = res.data.data.data.src
					}else{
						state.isdownload = false
						state.wholeisdownload = false
						_this.commit("getshowmodel",{msg:"已经是最新版本"})
					}
				}
			}
		})
	},
	//app整包更新结束
	//app热更新--开始
	AppHotupdate(state,hotobj){
		// let {version} = hotobj
		// uni.request({
		// 	url:`${Requestpath}update/getUpdateInfo`,
		// 	method:"POST",
		// 	data:{
		// 		type:1
		// 	},
		// 	success(res) {
		// 		if(res.data.code==0){
		// 			let {version_id,src} = res.data.data.data
		// 			let returnApplicationnum = version_id.split(".").join("")
		// 			if(returnApplicationnum > version){
		// 				const downloadTask =  uni.downloadFile({
		// 					url:`http://hbk.huiboke.com${src}`,
		// 					success(resfile) {
		// 						console.log(resfile)
		// 						//当下载完强制安装
		// 						plus.runtime.install(resfile.tempFilePath, {
		// 							force:true
		// 						},function(){
		// 							plus.runtime.restart();
		// 						},function(){
									
		// 						});
		// 					},
		// 					fail(err){
								
		// 					}
		// 				})
		// 				//监听下载的进度
		// 				downloadTask.onProgressUpdate((resjindu)=>{
		// 					console.log('下载进度' + resjindu.progress);
		// 					console.log('已经下载的数据长度' + resjindu.totalBytesWritten);
		// 					// console.log('预期需要下载的数据总长度' + resjindu.totalBytesExpectedToWrite);
		// 				})
		// 			}
		// 		}
		// 	}
		// })
	},
	//app热更新--结束
	/****app更新的要执行的函数-----开始***/
	AppUpdate(state){
		state.isdownload = false
		const downloadTask = uni.downloadFile({
			url:`http://hbk.huiboke.com${state.doloadurl}`,
			success(wholeupdate){
				plus.runtime.install(wholeupdate.tempFilePath, {},function(){},function(){});
			},
			fail(err){
				console.log(err)
			}
		})
		downloadTask.onProgressUpdate((resprogress)=>{
			state.progress = `${resprogress.progress}%`
			if(parseInt(resprogress.progress)==100){
				state.wholeisdownload = false
			}
		})
	},
	Hiddenbox(){
		state.isdownload = false
		state.wholeisdownload = false
	},
	/****app更新的要执行的函数-----结束****/
	
	/***websocket---开始***/
		//建立链接
		connect(){
			uni.connectSocket({
				// wss://echo.websocket.org
				url: 'wss://echo.websocket.org',
				// #ifdef MP
				header: {
					'content-type': 'application/json'
				},
				// #endif
				// #ifdef MP-WEIXIN
				method: 'GET',
				// #endif
				success(res) {
					console.log(res)
					// 这里是接口调用成功的回调，不是连接成功的回调，请注意
					// console.log(111)
				},
				fail(err) {
					// 这里是接口调用失败的回调，不是连接失败的回调，请注意
				}
			})
			// 监听WebSocket连接打开事件。
			uni.onSocketOpen((res) => {
				state.socketOpen = true
				// this.connected = true
				// uni.hideLoading()
				uni.showToast({
					icon: 'none',
					title: '连接成功'
				})
				// console.log('onOpen', res);
			})
			//监听WebSocket接受到服务器的消息事件。
			uni.onSocketMessage((res) => {
				// this.msg = res.data
				console.log('onMessage这是服务器返回的', res)
				state.Customersendmsglist.push({'sendmsgdata':res.data,'msgtype':'serveReturn'})
				
			})
		},
	/***websocket----结束***/
	
	
	
	//封装个结束的时间戳
	getendTime(state,dateobj){
			// console.log(dateobj)
			this.commit("gettokey")
			//根据订单的状态调用不同的完成接口
			let {startTime,endTime,Completiontime,orderstatus,order_sn} = dateobj
			uni.request({
				url:`${Requestpath}order/getOrderOverTimeConfig`,
				success(res) {
					if(res.data.code==0){
						if(orderstatus==0){
							//未付款的开始的时间
							console.log(startTime)
							//这是未付款的 =  未付款的时间 *1000(得到毫秒)  + 创建时间的秒数
							state.Notpaying = (res.data.data.buy_close_time * 1000)+startTime
							let dataTime = new Date()
							//如果未付款时间等于 取消的时间 就自动取消订单
							// 订单创建时间
							 state.remainingTime = parseInt((state.Notpaying - dataTime)/1000/60)
							if(state.remainingTime<=0){
								uni.request({
									url:`${Requestpath}order/noPayOrderAutoCancelOrder`,
									method:'POST',
									data:{
										token:state.tokey,
										o_sns:[order_sn]
									},
									success(res) {
										console.log(res)
										state.remainingTime = 0
									}
								})
							}
						}else if(orderstatus==2){
							//自动收货功能
							//计算 店家发货时间+配置的收货时间 -new date时间
							//这是发货
							//这是发货的时间
							console.log(endTime)
							let sendtime = new Date(endTime.replace(/-/g, '/'))
							
							// console.log(sendtime)
							state.sendTimes = sendtime.getTime()
							state.Notpaying = ((res.data.data.auto_receiving_day * 1000) + state.sendTimes - new Date().getTime())/1000/60
							if(parseInt(state.Notpaying)==0){
								// 进行请求自动收货时间
								uni.request({
									url:`${Requestpath}order/autoConfirmPayOrder`,
									method:"POST",
									data:{
										token:state.tokey,
										o_sn:order_sn
									},
									success(res) {
										console.log(res)
									}
								})
							}
						}else if(orderstatus==3){
							//这是完成时间
							//自动评价 = 完成时间 + 配置信息 - new date  
							let CompletiontimeS = new Date(Completiontime.replace(/-/g, '/'))
							state.sendTimes = CompletiontimeS.getTime()
							state.Notpaying = parseInt((res.data.data.complete_day*1000) +  state.sendTimes - new Date().getTime())/1000/60
							if(state.Notpaying==0){
								uni.request({
									url:`${Requestpath}order/noEvaluationOrderToFinish`,
									method:"POST",
									data:{
										token:state.tokey,
										o_sns:order_sn
									},
									success(res) {
										console.log(res)
									}
								})
							}
						}
					}
				}
			})
		},
	
	
	
	/*---购物车的操作----*/
	//加入购物车
	Addcart(state,addObj){
		const _this = this
		console.log(addObj)
		let {s_name,g_name,g_pic,gid,sid,couplebool} = addObj
		uni.getStorage({
			key:"bindtokey",
			success(restokey) {
				// console.log(res.data)
				uni.request({
					url:`${Requestpath}shopping_cart/addShoppingCartInfo`,
					method:"POST",
					data:{
						token:restokey.data,
						sid,
						s_name,
						gid,
						g_name,
						g_pic,
						g_type:couplebool
					},
					success(res) {
						if(res.data.code==0){
							_this.commit("getcarlist")
							_this.commit("getshowmodel",{msg:'已加入购物车'})
						}
					}
				})
			}
		})
	},
	getcarlist(){
		//请求购物车列表的数据
		const _this = this
		uni.getStorage({
			key:"bindtokey",
			success(restokey) {
				_this.state.tokey = restokey.data
				uni.request({
					url:`${Requestpath}shopping_cart/getShoppingCartList`,
					method:"POST",
					data:{
						token:_this.state.tokey,
						page:_this.state.pages,
						pageSize:10
					},
					success(res) {
						console.log(res)
						if(res.data.code==0){
							if(_this.state.pages>1){
								_this.state.cartList = _this.state.cartList.concat(res.data.data)
							}else{
								_this.state.cartList = res.data.data
							}
						}else{
							if(res.data.code==1 && res.data.msg=="令牌错误"){
								uni.reLaunch({
									url:"/pages/login/login"
								})
								return
							}else if(state.shopcatdeletandlistbool==false && res.data.code==1){
								state.cartList = []
							}
						}
					}
				})
			}
		})
	},
	//获取每个商品的规格的数据
	getspecifications(state,specificationobj){
		// console.log(specificationobj)
		let {sid,gid} = specificationobj
		uni.request({
			url:`${Requestpath}good/getGoodSpecListOneLever`,
			data:{
				sid,
				gid
			},
			success(res) {
				if(res.data.code==0){
					state.specificationslist = res.data.data
				}
			}
		})
	},
	//每个小商品点击的选中那点击的时候
	itemscheck(state,itemObj){
		//解构子组件里面传过来的值
		let {indexs,childindex} = itemObj
		//当每个小商品选中的按钮点击时 就改变每个小按钮的状态
		let checkboxs = state.cartList[indexs].sub[[childindex]].checked
		//如果当前的小按钮的状态如果true的时候 就让变为false
		if(checkboxs){
			state.cartList[indexs].sub[[childindex]].checked  = false
		}else{
			//否则当前的小按钮的状态如果true的时候 就让变为true
			state.cartList[indexs].sub[[childindex]].checked = true
		}
	},
	//点击店铺的选中的标识时
	fathercheck(state,fatherObj){
		let {indexs} = fatherObj
		//如果当前的选中的小按钮为true的情况 就变为false
		if(state.cartList[indexs].checked){
			state.cartList[indexs].checked = false
			// console.log(state.cartList[indexs])
			state.cartList[indexs].sub.forEach((item,index)=>{
				item.checked = false
			})
		}else{
			state.cartList[indexs].checked = true
			// console.log(state.cartList[indexs])
			state.cartList[indexs].sub.forEach((item,index)=>{
				item.checked = true
			})
		}
	},
	//当每一个小商品数量点击减号时 或减号时 根据布尔值判断 点击的是加号还是减号
	Increasereduce(state,childObj){
		let {indexs,childindex,bool} = childObj
		//因为传过来的是字符串 0或者1 需要先parseInt转为整形 在进行转为bool值进行判断
		if(Boolean(parseInt(bool))){
			//为true的时候 点击了+
			state.cartList[indexs].sub[childindex].good_num++
		}else{
			//为false的时候点击了 false
			state.cartList[indexs].sub[childindex].good_num--
			if(state.cartList[indexs].sub[childindex].good_num<=1){
				uni.showToast({
					title:"数量不能小于1",
					icon:"none",
					success(){
						state.cartList[indexs].sub[childindex].good_num = 1
					}
				})
			}
		}
	},
	//当点击删除商品的时候
	deleteshop(){
		// console.log(_this.state.tokey)
		const _this = this
		//获取每一项小商品
		let arr = []
		state.cartList.forEach((item,index)=>{
			item.sub.forEach((Items,Indexs)=>{
				if(Items.checked==true){
					// console.log(Items.cart_id)
					arr.push(Items.cart_id)
				}
			})
		})
		console.log(arr)
		uni.request({
			url:`${Requestpath}shopping_cart/deleteMultiShoppingCartInfo`,
			method:"POST",
			data:{
				token:_this.state.tokey,
				cids:arr
			},
			success(res) {
				if(res.data.code==0){
					state.shopcatdeletandlistbool = false
					//调用mutations里面自身的方法
					_this.commit("getcarlist")
					
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
				}
			}
		})
	},
	//更新购物车的规格
	Updatespecifications(state,UpdatespecificationsObj){
		const _this = this
		let {gid,specificationid} = UpdatespecificationsObj
		// console.log(gid,specificationid)
		uni.request({
			url:`${Requestpath}shopping_cart/updateGoodSpec`,
			method:"POST",
			data:{
				token:_this.state.tokey,
				gid:gid,
				spec_id:specificationid
			},
			success(res) {
				// console.log(res)
				//如果更新成功 就重新加载的数据
				if(res.data.code==0){
					_this.commit("getcarlist")
				}
			}
		})
	},
	//当滚动底部的时候
	shopcarscrolltolower(){
		state.shopcatdeletandlistbool = true
		let remainder = this.state.cartList.length / 10
		if(remainder >= this.state.pages){
			this.state.pages++
		}else{
			this.commit("getcarlist")
		}
	},
	//跳到订单页面获取订单里面的值逻辑
	Saveorder(state,shopvalue){
		console.log(shopvalue)
		const _this = this
		//将传过来的值 进行结构出来
		let {fromvalue,publicShopdetails} = shopvalue
		_this.state.orderlist = []
		//判断传过来的标识 如果1就是购物车过来的 否则就是商品详情过来的
		if(parseInt(fromvalue)){
			//这里是购物车过来的
			_this.state.cartList.forEach((item,index)=>{
				item.sub.forEach((items,indexs)=>{
					if(items.checked){
						_this.state.orderlist.push(items)
					}
				})
			})
			// console.log(_this.state.orderlist)
		}else{
			//这里是商品详情过来的
			_this.state.orderlist.push(publicShopdetails)
		}
		//判断数组的长度大于1的时候证明用户选择了商品
		if(_this.state.orderlist.length>=1){
			uni.setStorage({
				key:"orderinfo",
				data:_this.state.orderlist,
				success() {
					uni.navigateTo({
						url:`/pages/Purchasepage/Purchasepage`
					})
				}
			})
		}
	},
	
	
	/*---订单----*/
	//请求订单信息的方法 29a8b269b62da603424f405be0a767dc
	getTemporarynonpayment(state,TabCurindex){
	  this.commit("gettokey")
	  let {index,geturl} = TabCurindex
	  console.log(geturl)
	  uni.request({
	   url:Requestpath+geturl,
	   method:"POST",
	   data:{
	    token:state.tokey,
	    page:state.orderpage,
	    pageSize:10
	   },
	   success(res) {
	    if(res.data.code==0){
	     state.Temporarynonpaymentlist =state.Temporarynonpaymentlist.concat(res.data.data.list)
	     if(state.Delete){
	      state.Temporarynonpaymentlist = res.data.data.list
	      state.Delete = false
	     }
	    }else{
	     state.Temporarynonpaymentlist =state.Temporarynonpaymentlist.concat(res.data.data.list)
	    }
	    console.log(state.Temporarynonpaymentlist)
	   }
	  })
	 },
	 //下拉订单刷新
	  scrollBottom(state,pagesobj){
	   let {pages} = pagesobj
	   state.orderpage = pages
	  },
	//列表外面的删除订单
	deletescollectionAndfootprint(state,delectorder){
		state.Delete = true
		const _this = this
		let {order_sn,TabCur,url} = delectorder
		
		this.commit("gettokey")
		uni.showModal({
			title:"亲!",
			content:"您确定要删除的该订单",
			showCancel:true,
			cancelText:"取消",
			cancelColor:'#f00',
			confirmText:"确认删除",
			confirmColor:'#0f0',
			success:res=>{
				if(res.confirm){
					uni.request({
						url:`${Requestpath}order/deleteOrderInfo`,
						method:"POST",
						data:{
							token:state.tokey,
							o_sn:order_sn
						},
						success(res) {
							if(res.data.code==0){
								_this.commit("getshowmodel",{msg:res.data.msg})
								_this.commit("getTemporarynonpayment",{index:TabCur,geturl:url})
							}else{
								_this.commit("getshowmodel",{msg:res.data.msg})
							}
						}
					})
				}
			}
		})
	},
	//点击跳转订单内
	linkDetails(state,orderinfo){
		// console.log(orderinfo)
		// state.order_sn = order_sn
		let {order_sn,title,dispatch_price,swift_no,address_id,buyer_name,price,create_time,send_time,finish_time,cancel_time} = orderinfo
		uni.setStorage({
			key:"ordertitle",
			data:{
				//这是商品的标题
				title,
				//这是商品的订单编号
				order_sn,
				//改价后的快递费
				dispatch_price,
				//订单流水号
				swift_no,
				//收货地址id
				address_id,
				//用户名称
				buyer_name,
				//订单总价
				price,
				//订单创建时间
				create_time,
				//发货时间
				send_time,
				//完成时间
				finish_time,
				//这是取消的时间
				cancel_time,
			}
		})
		uni.navigateTo({
			url:`/pages/Temporarynonpayment/Temporarynonpayment`
		})
	},
	//获取订单里的订单商品的列表
	getorderlist(){
		this.commit("gettokey")
		uni.getStorage({
			key:"ordertitle",
			success(res){
				uni.request({
					url:`${Requestpath}order/getOrderGoodList`,
					method:"POST",
					data:{
						token:state.tokey,
						order_sn:res.data.order_sn,
						page:1,
						pageSize:10
					},
					success(res) {
						// console.log(res.data.data.list)
						if(res.data.code==0){
							state.orderlistshop = res.data.data.list
							state.ordercreatetime = res.data.data.list[0].create_time
						}
					}
				})
			}
		})
	},
	//如果在订单付款的时候，用户点击了×号 回跳到订单里面 根据订单号进行请求信息 (后期说)
	//确认收货
	Confirmgoods(state,ordergoods){
		const _this = this
		// console.log(ordergoods)
		_this.commit("gettokey")
		let {order_sn} = ordergoods
		uni.request({
			url:`${Requestpath}order/confirmPayOrder`,
			method:"POST",
			data:{
				token:state.tokey,
				o_sn:order_sn,
			},
			success(res) {
				if(res.data.code==0){
					_this.commit("getshowmodel",{msg:res.data.msg})
					uni.redirectTo({
						url:"/pages/evaluate/evaluate"
					})
				}else{
					if(res.data.msg=="订单状态错误" && res.data.code==1){
						_this.commit("getshowmodel",{msg:"请耐心等待卖家发货"})
						return 
					}
					_this.commit("getshowmodel",{msg:res.data.msg})
				}
			}
		})
	},
	//取消订单
	Confirmcancel(state,cancelorder){
		const _this = this
		_this.commit("gettokey")
		let {order_sn} = cancelorder
		uni.request({
			url:`${Requestpath}order/unPayOrderToCancel`,
			method:"POST",
			data:{
				token:state.tokey,
				o_sn:order_sn
			},
			success(res) {
				if(res.data.code==0){
					_this.commit("getshowmodel",{msg:res.data.msg})
					setTimeout(()=>{
						uni.redirectTo({
							url:`/pages/orderpageRouter/orderpageRouter`
						})
					},1500)
				}else{
					_this.commit("getshowmodel",{msg:res.data.msg})
				}
			}
		})
	},
	//用户退款
	refundparagraph(state,refundobj){
		const _this = this
		let {o_sn,af_price,pay_pwd} = refundobj
		_this.commit("gettokey")
		uni.request({
			url:`${Requestpath}order/applyForRefundOrder`,
			method:"POST",
			data:{
				token:state.tokey,
				o_sn,
				af_price,
				pay_pwd
			},
			success(res) {
				if(res.data.code==0){
					_this.commit("getshowmodel",{msg:res.data.msg+',请耐心等待'})
				}else{
					_this.commit("getshowmodel",{msg:res.data.msg})
				}
			}
		})
	},
	
	
	
	
	/*---订单中的物流---*/
	//用户退货退款或者仅退款需要填写快递公司的信息
	Querysinglenumber(state,returnlogistics){
		const _this = this
		_this.commit("gettokey")
		// console.log(returnlogistics)
		let {value} = returnlogistics
		//如果订单不为空  否则就提示用户物流单号不能为空
		if(value!==""){
			state.kiadigongsi = true
			state.loadModal = true
			uni.request({
				url:`${Requestpath}order/getLogisticCompanyInfo`,
				method:"POST",
				data:{
					e_num:value,
					token:state.tokey
				},
				success(res) {
					if(res.data.code==0){
						state.Couriercompanyname = res.data.data.express_name
						state.loadModal = false
						state.express_code = res.data.data.express_code
					}
				}
			})
		}else{
			this.commit("getshowmodel",{msg:"请输入快递单号"})
		}
	},
	//获取物流信息
	getLogisticsin(){
		const _this = this
		_this.commit("gettokey")
		uni.getStorage({
			key:"express_sn",
			success(res){
				_this.commit("Querysinglenumber",{value:res.data[0]})
				//这是调用物流轨迹
				//定时器用于操控异步
				setTimeout(()=>{
					uni.request({
						url:`${Requestpath}order/getLogisticsInfo`,
						method:"POST",
						data:{
							token:state.tokey,
							ec_code:state.express_code,
							e_num:res.data[0]
						},
						success(res) {
							
							if(res.data.code==0){
								state.Traceslist = res.data.data.Traces
							}
						}
					})
				},1000)
			}
		})
	},
	
	
	/*----评价---*/
	//获取外面的待评价和已评价的列表
	getevaluationlist(state,evaluationobj){
		let {url} = evaluationobj
		const _this = this
		_this.commit("gettokey")
		uni.request({
			url:`${Requestpath}${url}`,
			method:"POST",
			data:{
				token:state.tokey,
				page:1,
				pageSize:10
			},
			success(res) {
				console.log(res,"请求的评价列表")
				if(res.data.code==0){
					//在根据订单号去查商品
					state.evaluationlist = res.data.data.list
					res.data.data.list.forEach((item,index)=>{
						// console.log(item)
						uni.request({
							url:`${Requestpath}order/getOrderGoodList`,
							method:"POST",
							data:{
								token:state.tokey,
								order_sn:item.order_sn,
								page:1,
								pageSize:10
							},
							success(res) {
								console.log(res)
								if(res.data.code==0){
									state.evaluationlistitem.push(res.data.data.list)
								}
							}
						})
					})
					
				}
			}
		})
	},
	
	
	/*---退款和退货退款的详情---*/
	getrefundreturn(){
		const _this = this
		_this.commit("gettokey")
		uni.request({
			url:`${Requestpath}order/getRefundOrderList`,
			method:"POST",
			data:{
				token:state.tokey,
				page:1,
				pageSize:10
			},
			success(res) {
				console.log(res)
				if(res.data.code==0){
					state.refundreturnlist = res.data.data.list
					uni.request({
						url:`${Requestpath}order/getRefundAndGoodsOrderList`,
						method:"POST",
						data:{
							token:state.tokey,
							page:1,
							pageSize:10
						},
						success(res) {
							console.log(res)
							//因为退货和退款退款两个接口同时的 所以要把他们的数据进行合并
							if(res.data.code==0){
								state.refundreturnlist.concat(res.data.data.list)
							}
						}
					})
				}
			}
		})
	},
	
	
	
	/***优惠券***/
	//请求优惠券的列表
	getallcouponslist(state,couponsobj){
		const _this = this
		_this.commit("gettokey")
		// console.log(couponsobj)
		let {topindex,bottomindex} = couponsobj
		if(bottomindex==0){
			//这是店铺的
			uni.request({
				url:`${Requestpath}activity/getUserStoreCouponList`,
				method:"POST",
				data:{
					token:state.tokey,
					sid:-2,
					page:1,
					pageSize:10
				},
				success(res) {
					if(res.data.code==0){
						state.couponslist = res.data.data.list
					}
				}
			})
		}else{
			//这是平台的
			uni.request({
				url:`${Requestpath}activity/getUserPlatformCouponList`,
				method:"POST",
				data:{
					token:state.tokey,
					page:1,
					pageSize:10
				},
				success(res) {
					if(res.data.code==0){
						state.couponslist = res.data.data.list
					}	
				}
			})
		}
	},
	
	
	/***品牌***/
	//获取品牌列表信息
	getgetBrandList(state,Brandloadobj){
		let {Brandloadbools} = Brandloadobj
		const _this = this
		//这是用于控制 加载的图标是否出来
		if(Brandloadbools){
			state.Brandloadbool = false
		}
		//这是请求品牌列表的id 通过id 去请求其他的列表
		uni.request({
			url:`${Requestpath}brand/getBrandList`,
			data:{
				page:state.Brandpage,
				pageSize:1
			},
			success(res) {
				if(res.data.code==0){
					//创建 两个变量 arrlist开始的时候等于 在state定义的数组
					//因为最后的时候 数据都会增加到state.BrandList 这样可以实现分页
					let arrlist = state.BrandList
					//新创建一个变量 用于每次存储数据
					let arr = []
					//这里是实现分页的效果
					if(state.Brandpage>1){
						// console.log(arrlist)
						arrlist = arrlist.concat(res.data.data.list)
					}else{
						arrlist = res.data.data.list
					}
					//进行遍历热卖榜单的数据
					arrlist.forEach((item,index)=>{
						arr.push(item)
						//这里请求
						uni.request({
							url:`${Requestpath}brand/getBrandGoodSalesTopList`,
							data:{
								brand_id:item.brand_id,
								limit:3
							},
							success(res) {
								//这里的判断为了判断有的数据 没有值
								if(res.data.code==0){
									arr[index].Brandonlist = res.data.data.list
								}else{
									arr[index].Brandonlist = []
								}
								//这里请求下面6个小商品的数据
								uni.request({
									url:`${Requestpath}brand/getRandomBrandGoodList`,
									data:{
										brand_id:item.brand_id,
										limit:6
									},
									success(reslist) {
										//这里的判断为了判断有的数据 没有值
										if(reslist.data.code==0){
											arr[index].Brandonlists = reslist.data.data.list
										}else{
											arr[index].Brandonlists = []
										}
										if(Brandloadbools==false){
											setTimeout(()=>{
												state.Brandloadbool = true
											},1500)
										}else{
											state.Brandloadbool = true
										}
									}
								})
							}
						})
					})
					state.BrandList = arr
				}
			}
		})
	},
	//当品牌下拉加载的时候
	scrolltolower(){
		state.Brandpage++
		this.commit("getgetBrandList",{Brandloadbools:false})
	},
	
	/******直播******/
		//获取主播在开播前要直播的商品
		getliveshoplist(){
			const _this = this 
			_this.commit("gettokey")
			setTimeout(()=>{
				uni.request({
					url:`${Requestpath}live/getAnchorGoodList`,
					method:"POST",
					data:{
						token:state.tokey,
						page:state.livepages,
						pageSize:5
					},
					success(res) {
						if(res.data.code==0){
							if(state.livepages > 1){
								state.liveshoplist = state.liveshoplist.concat(res.data.data.list)
							}else{
								state.liveshoplist = res.data.data.list
							}
						}
					}
				})
			},1500)
		},
		//当用户主播滑动商品的列表到底部的时候
		loadmore(){
			state.livepages++
			this.commit("getliveshoplist")
		},
	/******直播*****/
	
	
	
	
	
	
	
	
	/****平台或者店铺客服****/
	//客服页面点击发送按钮的时候
	Customersendmsg(state,sendmsgobj){
		const _this = this
		let {textvalue} = sendmsgobj
		if(textvalue!==""){
			//这是往服务器中发送消息
			uni.sendSocketMessage({
			      data:textvalue,
				  success(res) {
					  // Customersendmsglist
				  	console.log(res,"这是发送成功")
					state.Customersendmsglist.push({'sendmsgdata':textvalue,'msgtype':'usersend'})
				  },
				  fail(err){
					  console.log(err,"这是发送失败")
				  }
			});
			console.log(state.Customersendmsglist)
		}else{
			_this.commit('getshowmodel',{msg:"文字不能为空"})
		}
	}
	
}

//actions用于操作异步
let actions = {
	getcarlists(context){
		// context.commit("gettokey")
		context.commit('getcarlist')
	}
}

let store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
export default store