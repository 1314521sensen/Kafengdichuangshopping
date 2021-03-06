import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

let Requestpath = "http://www.huiboke.com/api/"

let state = {
	Request: "http://www.huiboke.com/api/",
	imgyuming: "http://www.huiboke.com", //http://hbk.huiboke.com
	detailsbool: false, //首页显示隐藏详情
	bannerbool: true, //详情页显示信息判断
	cartList: [], //购物车的数据
	cartListBool:false,//购物车暂无数据的判断
	allSelected: false, //购物车的全选状态
	count: 0, //这是用来存储总价
	specificationslist: [], //这是规格的数据
	shopcatdeletandlistbool: false, //判断用户是否下拉还是删除
	tokey: "",
	pages: 1,
	newpages: 1, //用于储存pages原来的值 这样去解决购物车实时数据  
	orderlist: [], //用来存储订单的信息
	Temporarynonpaymentlist: [], //这是订单的列表
	orderlistshop: [], //这是用于存储订单内的商品列表
	ordercreatetime: "", //订单创建的时间
	tokey: "", //tokey值
	loadModal: false, //快递里面的加载图标
	kiadigongsi: false, //是否显示那个快递的文字
	Couriercompanyname: "", //快递的文字
	express_code: "", //快递公司的编码
	Traceslist: [], //这是物流的列表
	evaluationlist: [], //这是用来操作评价的列表
	evaluationlistitem: [], //用于存放每个评价列表的item
	refundreturnlist: [], //用于退货退款列表
	Notcreated: "", //这是未付款开始的毫秒值
	Notpaying: "", //这是未付款的结束的毫秒值
	sendTimes: "", //这是发货时间
	remainingTime: "", //订单剩余时间
	ordercode: "", //订单里面的code码
	couponslist: [], //这是优惠券的数据
	couponspages:1,//优惠券的页数
	BrandList: [], //这是品牌的数据
	Brandpage: 1, //品牌的页数
	Brandloadbool: false, //用于请求请求活动的加载图标
	socketOpen: false, //判断是否链接成功
	wholeisdownload: false, //整个更新的界面
	isdownload: false, //更新app的状态是否显示的整包的更新
	doloadurl: "", //app的下载地址
	progress: "0%", //下载进度
	httpUrl: "http://www.huiboke.com/uploads/app/image/", //http://hbk.3call.net
	Delete: false,
	orderpage: 1, //订单请求的页数
	liveshoplist: [], //存放主播开播前需要携带直播的商品
	livepages: 1, //获取直播的商品的页数
	userlivepages: 1, //这是用户直播的商品页数
	userliveid: "", //这是用户点击进去直播间主播的id
	liveshopspecifications: [], //直播商品的规格
	livespecificationsbool: false, //规格的布尔值 显示还是不显示
	Customersendmsglist: [], //这是店铺或者客服的消息记录
	//客服的值
	uid: "", //用户的id
	uname: "", //用户的名称
	avatar: "", //用户的头像
	linkstate: "", //链接的状态值
	kf_id: "", //这是后台返回来的客服id
	kf_name: "", //这是后台返回来的客服名字
	sokettime: null, //客服的长连接定时器
	hiensoketime: null, //当用户黑屏的时候 继续定时器
	isconnectserver: false, //联系客服的是否显示 
	chatpages: 0, //聊天记录的那一页
	chattotal: 0, //聊天记录的总条数
	chatlist: [], //聊天记录
	Qrcodeurl: "", //生成分享二维码的地址
	liveuserlist: [], //这是直播聊天记录
	verifyStatus: '', //直播状态显示权限
	indexpopupbool: true, //首页弹窗是不是显示
	firstOrderbool: false,
	is_newuser: false, //判断是不是新用户 0是 1不是
	NewExclusivebool:true,
	is_receive:0,//判断是否领取过
	uuid:0,//用于存储用户手机的唯一标识
}
//getters 用于计算
let getters = {
	//获取选中的每一件商品
	totalprice: state => {
		//由于遍历 导致每次coune迭代增加 在增加之前先变为0
		state.count = 0
		state.cartList.forEach((item, index) => {
			item.sub.forEach((Items, Indexs) => {
				if (Items.checked == true) {
					state.count += ((Number(Items.good_price) * Items.good_num) + Number(Items.good_freight))
				}
			})
		})
		let countarr = String(state.count).split('.')
		if (countarr[1]) {
			return (Number(countarr[0] + '.' + countarr[1])).toFixed(2)
			// .substr(0, 2)
		} else {
			return (Number(String(state.count))).toFixed(2)
		}
	}
}
//mutations 用于存放方法 唯一改变state里面的值
let mutations = {
	/*----通用方法----*/
	//获取tokey
	gettokey() {
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				state.tokey = restokey.data
			}
		})
	},
	//封装个提示框
	getshowmodel(state, modelmsg) {
		let {
			msg
		} = modelmsg
		uni.showToast({
			title: msg,
			icon: "none"
		})
	},

	//app整包更新
	Appwholeupdate(state, wholeobj) {
		const _this = this
		let {
			version,
			modelboll
		} = wholeobj
		// console.log(version,modelboll)
		uni.request({
			url: `${Requestpath}update/getUpdateInfo`,
			method: "POST",
			data: {
				type: 2
			},
			success(res) {
				// console.log(res)
				if (res.data.code == 0) {
					let returnApplicationnum = res.data.data.data.version_id.split(".").join("")
					// console.log(returnApplicationnum,"这是后台的版本号")

					state.Qrcodeurl = state.imgyuming + res.data.data.data.src
					// console.log(state.Qrcodeurl,"这是下载地址")
					// console.log(returnApplicationnum > version)
					if (returnApplicationnum > version) {
						state.isdownload = true
						state.wholeisdownload = true
						//将下载地址存放起来
						state.doloadurl = res.data.data.data.src
					} else {
						state.isdownload = false
						state.wholeisdownload = false
						// _this.commit("getshowmodel",{msg:"已经是最新版本"})
					}
				}
			}
		})
	},
	//app整包更新结束
	//app热更新--开始
	AppHotupdate(state, hotobj) {
		let {
			version
		} = hotobj
		uni.request({
			url: `${Requestpath}update/getUpdateInfo`,
			method: "POST",
			data: {
				type: 1
			},
			success(res) {
				if (res.data.code == 0) {
					let {
						version_id,
						src
					} = res.data.data.data
					let returnApplicationnum = version_id.split(".").join("")
					if (returnApplicationnum > version) {
						const downloadTask = uni.downloadFile({
							url: `http://hbk.huiboke.com${src}`,
							success(resfile) {
								// console.log(resfile)
								//当下载完强制安装
								plus.runtime.install(resfile.tempFilePath, {
									force: true
								}, function() {}, function() {

								});
							},
							fail(err) {
								// console.log(err)
							}
						})
						//监听下载的进度
						downloadTask.onProgressUpdate((resjindu) => {
							// console.log('下载进度' + resjindu.progress);
							// console.log('已经下载的数据长度' + resjindu.totalBytesWritten);
							// console.log('预期需要下载的数据总长度' + resjindu.totalBytesExpectedToWrite);
						})
					}
				}
			}
		})
	},
	//app热更新--结束
	/****app更新的要执行的函数-----开始***/
	AppUpdate(state) {
		state.isdownload = false
		const downloadTask = uni.downloadFile({
			url: `${state.imgyuming}${state.doloadurl}`,
			success(wholeupdate) {
				plus.runtime.install(wholeupdate.tempFilePath, {}, function() {}, function() {});
			},
			fail(err) {
				// console.log(err)
			}
		})
		downloadTask.onProgressUpdate((resprogress) => {
			state.progress = `${resprogress.progress}%`
			if (parseInt(resprogress.progress) == 100) {
				state.wholeisdownload = false
			}
		})
	},
	Hiddenbox() {
		state.isdownload = false
		state.wholeisdownload = false
	},
	/****app更新的要执行的函数-----结束****/

	/***websocket---开始***/
	//建立链接
	connect(state, typestoreobj) {
		let {
			typestore,
			expressionlist
		} = typestoreobj
		// #ifdef APP-PLUS
		state.isconnectserver = true
		// #endif
		const _this = this
		//先获取tokey 通过tokey去获取用户的详情 把用户的信息
		_this.commit("gettokey")
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				// console.debug(restokey)
				uni.request({
					url: `${Requestpath}user/getUserDetail`,
					method: "POST",
					data: {
						token: restokey.data
					},
					success(res) {
						// console.log(res)
						if (res.data.code == 0) {
							// console.log("先进入请求者")
							let {
								user_id,
								user_nick,
								user_pic
							} = res.data.data
							state.uid = user_id
							state.uname = user_nick
							state.avatar = user_pic
							uni.connectSocket({
								// ws://49.232.153.178:7272  192.168.0.14
								url: 'ws://49.232.153.178:7272',
								// #ifdef MP
								header: {
									'content-type': 'application/json'
								},
								// #endif
								// #ifdef MP-WEIXIN
								method: 'GET',
								// #endif
								success(res) {
									// console.log(res, "开始创建连接")
									// console.log(state.uid)
									state.linkstate = "正在创建连接...."
									// 这里是接口调用成功的回调，不是连接成功的回调，请注意
									let initobj = {
										type: "userInit",
										uid: state.uid,
										name: state.uname,
										avatar: state.imgyuming + state.avatar,
										group: 1,
										store: typestore,
									}
									// console.log(initobj)
									setTimeout(() => {
										// console.log("已进入一次性定时器")

										uni.sendSocketMessage({
											data: JSON.stringify(initobj),
											success(resinit) {
												// console.log(resinit)
												state.linkstate = "正在连接中"
												state.isconnectserver = false
											},
											fail(err) {
												// console.log(err)
												state.linkstate = "连接中断"
												state.isconnectserver = true
											}
										})
									}, 3000)
								},
								fail(err) {
									// console.log(err)
									state.linkstate = "连接失败"
									state.isconnectserver = true
									// 这里是接口调用失败的回调，不是连接失败的回调，请注意
								}
							})
						}
					}
				})
			},
			fail(err) {
				// console.log(err)
			}
		})
		// 监听WebSocket连接打开事件。
		_this.commit("ContinuousSendPing")
		//监听WebSocket接受到服务器的消息事件。
		uni.onSocketMessage((res) => {
			// this.msg = res.data
			// console.log('onMessage这是服务器返回的', res)
			//根据类型进行存储值
			//这是处理表情的正则
			let regexpression = /face\[.*?\]/gi
			let resparse = JSON.parse(res.data)
			//这是处理图片的正则
			let regimg = /img[\S]/gi
			// console.log(resparse)
			if (resparse.message_type == 'wait') {
				state.linkstate = resparse.data.content
			} else if (resparse.message_type == 'kf_offline') {
				state.linkstate = "客服已下班"
			} else if (resparse.message_type == 'relinkMessage') {
				state.linkstate = "正在转接对应客服"
			} else if (resparse.message_type == "chatMessage") {
				if (regimg.test(resparse.data.content)) {
					//这是处理图片的
					let imgstr = resparse.data.content.substring(4, resparse.data.content.length - 1)
					state.Customersendmsglist.push({
						'sendmsgdata': `<image src=${imgstr} style='width:80px'></image>`,
						'msgtype': 'serveReturn',
						'avatar': resparse.data.avatar
					})
				} else if (resparse.data.content.match(regexpression) !== null) {
					//这是处理表情的
					let arr = resparse.data.content.match(regexpression)
					expressionlist.forEach((item, index) => {
						item.forEach((items, indexs) => {
							arr.forEach((itemss, indexss) => {
								if (itemss == items.name) {
									return resparse.data.content = resparse.data.content.replace(itemss, `<img src=${items.url}></img>`)
								}
							})
						})
					})
					state.Customersendmsglist.push({
						'sendmsgdata': resparse.data.content,
						'msgtype': 'serveReturn',
						'avatar': resparse.data.avatar
					})
				} else {
					//这是处理纯文本的
					state.Customersendmsglist.push({
						'sendmsgdata': resparse.data.content,
						'msgtype': 'serveReturn',
						'avatar': resparse.data.avatar
					})
				}
			} else if (resparse.message_type == "connect") {
				// console.log(resparse)
				state.linkstate = `客服${resparse.data.kf_name}为您服务`
				state.isconnectserver = false
				state.kf_id = resparse.data.kf_id
				state.kf_name = resparse.data.kf_name
				//获取聊天记录
				uni.request({
					url: `http://hbk.3call.net/api/customer_service/getChatLogs`,
					method: "POST",
					data: {
						token: 'e32919f0b07eb62442bf4ab802d959ad',
						kid: state.kf_id,
						page: 1,
						limit: 10
					},
					success(res) {
						// console.log(res, 789)
						if (res.data.code == 0) {
							state.chattotal = res.data.data.total
							state.chatpages = (parseInt(state.chattotal / 10)) + 1
							mutations.record(state, state.chatpages)
						}
					}
				})
			} else if (resparse.message_type == "kf_online") {
				state.linkstate = "客服以上班"
				state.isconnectserver = false
			}
		})
		//链接失败
		uni.onSocketError(function(resError) {
			// console.log(resError)
		}, function(errError) {
			// console.log(errError)
		})
		uni.onSocketClose(function(resClose) {
			// console.log(resClose)
			state.linkstate = "链接已断开"
		}, function(errClose) {
			// console.log(errClose)
		})
	},
	soketclose() {
		uni.closeSocket({
			code: 1000,
			success(res) {
				// console.log(res, "关闭成功")
				clearInterval(state.sokettime)
			}
		})
	},

	//链接客服持续发送ping
	ContinuousSendPing() {
		// console.log("执行这个函数了")
		uni.onSocketOpen((res) => {
			// console.log(res)
			// console.log("执行这")
			state.socketOpen = true
			state.isconnectserver = false
			state.sokettime = setInterval(function() {
				let pingobj = {
					type: 'ping'
				}
				uni.sendSocketMessage({
					data: JSON.stringify(pingobj),
					success(res) {
						// console.log(res)
					},
					fail(err) {
						// console.log(err)
					}
				})
			}, 30000)

			// console.log('onOpen', res);
		}, (err) => {
			// console.log(err)
		})
	},

	hiendsocket() {
		//hiensoketime
		state.socketOpen = true
		state.isconnectserver = false
		state.hiensoketime = setInterval(function() {
			let pingobj = {
				type: 'ping'
			}
			uni.sendSocketMessage({
				data: JSON.stringify(pingobj),
				success(res) {
					console.log(res)
				},
				fail(err) {
					console.log(err)
				}
			})
		}, 30000)
	},

	record(state, pages) {
		const _this = this
		uni.request({
			url: `http://hbk.3call.net/api/customer_service/getChatLogs`,
			method: "POST",
			data: {
				token: 'e32919f0b07eb62442bf4ab802d959ad',
				kid: state.kf_id,
				page: pages,
				limit: 7
			},
			success(res) {
				// console.log(state.kf_id)
				// console.log(res, 789)
				if (res.data.code == 0) {
					let tl = (parseInt(res.data.data.total / 7)) + 1
					if (pages == tl) {
						state.chatlist = res.data.data.list
						if (res.data.data.list.length < 7) {
							state.chatpages--
							mutations.record(state, state.chatpages)
						}
					} else {
						let length = res.data.data.list.length
						for (var i = length - 1; i > -1; i--) {
							state.chatlist.unshift(res.data.data.list[i])
						}
					}
				}
			}
		})
	},
	/***websocket----结束***/



	//封装个结束的时间戳
	getendTime(state, dateobj) {
		// console.log(dateobj)
		this.commit("gettokey")
		//根据订单的状态调用不同的完成接口
		let {
			startTime,
			endTime,
			Completiontime,
			orderstatus,
			order_sn
		} = dateobj
		uni.request({
			url: `${Requestpath}order/getOrderOverTimeConfig`,
			success(res) {
				if (res.data.code == 0) {
					if (orderstatus == 0) {
						//未付款的开始的时间
						// console.log(startTime)
						//这是未付款的 =  未付款的时间 *1000(得到毫秒)  + 创建时间的秒数
						state.Notpaying = (res.data.data.buy_close_time * 1000) + startTime
						let dataTime = new Date()
						//如果未付款时间等于 取消的时间 就自动取消订单
						// 订单创建时间
						state.remainingTime = parseInt((state.Notpaying - dataTime) / 1000 / 60)
						if (state.remainingTime <= 0) {
							uni.request({
								url: `${Requestpath}order/noPayOrderAutoCancelOrder`,
								method: 'POST',
								data: {
									token: state.tokey,
									o_sns: [order_sn]
								},
								success(res) {
									// console.log(res)
									state.remainingTime = 0
								}
							})
						}
					} else if (orderstatus == 2) {
						//自动收货功能
						//计算 店家发货时间+配置的收货时间 -new date时间
						//这是发货
						//这是发货的时间
						// console.log(endTime)
						let sendtime = new Date(endTime.replace(/-/g, '/'))

						// console.log(sendtime)
						state.sendTimes = sendtime.getTime()
						state.Notpaying = ((res.data.data.auto_receiving_day * 1000) + state.sendTimes - new Date().getTime()) / 1000 /
							60
						if (parseInt(state.Notpaying) == 0) {
							// 进行请求自动收货时间
							uni.request({
								url: `${Requestpath}order/autoConfirmPayOrder`,
								method: "POST",
								data: {
									token: state.tokey,
									o_sn: order_sn
								},
								success(res) {
									// console.log(res)
								}
							})
						}
					} else if (orderstatus == 3) {
						//这是完成时间
						//自动评价 = 完成时间 + 配置信息 - new date  
						let CompletiontimeS = new Date(Completiontime.replace(/-/g, '/'))
						state.sendTimes = CompletiontimeS.getTime()
						state.Notpaying = parseInt((res.data.data.complete_day * 1000) + state.sendTimes - new Date().getTime()) /
							1000 / 60
						if (state.Notpaying == 0) {
							uni.request({
								url: `${Requestpath}order/noEvaluationOrderToFinish`,
								method: "POST",
								data: {
									token: state.tokey,
									o_sns: order_sn
								},
								success(res) {
									// console.log(res)
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
	Addcart(state, addObj) {
		const _this = this
		// console.log(addObj)
		let {
			s_name,
			g_name,
			g_pic,
			gid,
			sid,
			couplebool
		} = addObj
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				// console.log(res.data)
				uni.request({
					url: `${Requestpath}shopping_cart/addShoppingCartInfo`,
					method: "POST",
					data: {
						token: restokey.data,
						sid,
						s_name,
						gid,
						g_name,
						g_pic,
						g_type: couplebool
					},
					success(res) {
						if (res.data.code == 0) {
							_this.commit("getcarlist")
							_this.commit("getshowmodel", {
								msg: '已加入购物车'
							})
						}
					}
				})
			}
		})
	},
	getcarlist() {
		//请求购物车列表的数据
		const _this = this
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				_this.state.tokey = restokey.data
				uni.request({
					url: `${Requestpath}shopping_cart/getShoppingCartList`,
					method: "POST",
					data: {
						token: _this.state.tokey,
						page: _this.state.pages,
						pageSize: 10
					},
					success(res) {
						// console.log(res)
						if (res.data.code == 0) {
							state.cartListBool = false
							if (_this.state.pages > 1) {
								_this.state.cartList = _this.state.cartList.concat(res.data.data)
							} else {
								_this.state.cartList = res.data.data
							}
						} else {
							if (res.data.code == 1 && res.data.msg == "令牌错误") {
								uni.navigateTo({
									url: "/pages/login/login"
								})
								return
							} else if (state.shopcatdeletandlistbool == false && res.data.code == 1) {
								state.cartList = []
							}
							if(_this.state.pages==1){
								state.cartListBool = true
							}
						}
					}
				})
			}
		})
	},
	//获取每个商品的规格的数据
	getspecifications(state, specificationobj) {
		// console.log(specificationobj)
		let {
			sid,
			gid
		} = specificationobj
		uni.request({
			url: `${Requestpath}good/getGoodSpecListOneLever`,
			data: {
				sid,
				gid
			},
			success(res) {
				if (res.data.code == 0) {
					state.specificationslist = res.data.data
				}
			}
		})
	},
	//每个小商品点击的选中那点击的时候
	itemscheck(state, itemObj) {
		//解构子组件里面传过来的值
		let {
			indexs,
			childindex
		} = itemObj
		// console.log(state.cartList[indexs].sub)
		//当每个小商品选中的按钮点击时 就改变每个小按钮的状态
		let checkboxs = state.cartList[indexs].sub[[childindex]].checked
		//如果当前的小按钮的状态如果true的时候 就让变为false
		if (checkboxs) {
			state.cartList[indexs].sub[[childindex]].checked = false
		} else {
			//否则当前的小按钮的状态如果true的时候 就让变为true
			state.cartList[indexs].sub[[childindex]].checked = true
		}
	},
	//点击店铺的选中的标识时
	fathercheck(state, fatherObj) {
		let {
			indexs
		} = fatherObj
		//如果当前的选中的小按钮为true的情况 就变为false
		if (state.cartList[indexs].checked) {
			state.cartList[indexs].checked = false
			// console.log(state.cartList[indexs])
			state.cartList[indexs].sub.forEach((item, index) => {
				item.checked = false
			})
		} else {
			state.cartList[indexs].checked = true
			// console.log(state.cartList[indexs])
			state.cartList[indexs].sub.forEach((item, index) => {
				item.checked = true
			})
		}
	},
	//封装个更改购物车数量的接口
	getcartnum(state, childObj) {
		const _this = this
		// console.log(childObj)
		//解构函数
		let {
			goodnum
		} = childObj
		let {
			gid,
			spec_id,
			spec_value,
		} = childObj.childsdata
		//请求数据接口
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				uni.request({
					url: `${Requestpath}shopping_cart/updateGoodSpec`,
					method: "POST",
					data: {
						token: restokey.data,
						gid,
						spec_id: spec_value ? spec_id : 0,
						quantity: goodnum
					},
					success(res) {
						// console.log(res)
						if (parseInt(res.data.code) !== 0) {
							_this.commit("getshowmodel", {
								msg: res.data.msg
							})
						}
					}
				})
			}
		})
	},
	//当每一个小商品数量点击减号时 或减号时 根据布尔值判断 点击的是加号还是减号
	Increasereduce(state, childObj) {
		const _this = this
		let {
			indexs,
			childindex,
			bool,
			spec_value
		} = childObj
		//因为传过来的是字符串 0或者1 需要先parseInt转为整形 在进行转为bool值进行判断
		if (Boolean(parseInt(bool))) {
			//为true的时候 点击了+
			state.cartList[indexs].sub[childindex].good_num++
			_this.commit("getcartnum", {
				childsdata: childObj,
				goodnum: state.cartList[indexs].sub[childindex].good_num
			})
		} else {
			//为false的时候点击了 false
			state.cartList[indexs].sub[childindex].good_num--
			if (state.cartList[indexs].sub[childindex].good_num < 1) {
				uni.showToast({
					title: "数量不能小于1",
					icon: "none",
					success() {
						state.cartList[indexs].sub[childindex].good_num = 1
						_this.commit("getcartnum", {
							childsdata: childObj,
							goodnum: state.cartList[indexs].sub[childindex].good_num
						})
					}
				})
			} else {
				_this.commit("getcartnum", {
					childsdata: childObj,
					goodnum: state.cartList[indexs].sub[childindex].good_num
				})
			}
		}
	},
	//当点击删除商品的时候
	deleteshop() {
		// console.log(_this.state.tokey)
		const _this = this
		//获取每一项小商品
		let arr = []
		state.cartList.forEach((item, index) => {
			item.sub.forEach((Items, Indexs) => {
				if (Items.checked == true) {
					// console.log(Items.cart_id)
					arr.push(Items.cart_id)
				}
			})
		})
		// console.log(arr)
		if (arr.length <= 0) {
			return _this.commit("getshowmodel", {
				msg: "请选中商品删除"
			})
		}
		// console.log( _this.state.tokey)
		uni.request({
			url: `${Requestpath}shopping_cart/deleteMultiShoppingCartInfo`,
			method: "POST",
			data: {
				token: _this.state.tokey,
				cids: arr
			},
			success(res) {
				// console.log(res)
				if (res.data.code == 0) {
					state.shopcatdeletandlistbool = false
					//调用mutations里面自身的方法
					_this.commit("getcarlist")

				} else {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
				}
			}
		})
	},
	//更新购物车的规格
	Updatespecifications(state, UpdatespecificationsObj) {
		const _this = this
		let {
			gid,
			specificationid
		} = UpdatespecificationsObj
		// console.log(gid,specificationid)
		uni.request({
			url: `${Requestpath}shopping_cart/updateGoodSpec`,
			method: "POST",
			data: {
				token: _this.state.tokey,
				gid: gid,
				spec_id: specificationid,
				quantity: 0
			},
			success(res) {
				// console.log(res)
				//如果更新成功 就重新加载的数据
				if (res.data.code == 0) {
					_this.commit("getcarlist")
				}
			}
		})
	},
	//当滚动底部的时候
	shopcarscrolltolower() {
		state.shopcatdeletandlistbool = true
		let remainder = this.state.cartList.length / 10
		if (remainder >= this.state.pages) {
			this.state.pages++
		} else {
			this.state.pages++
			this.commit("getcarlist")
		}
	},
	//跳到订单页面获取订单里面的值逻辑
	Saveorder(state, shopvalue) {
		const _this = this
		//将传过来的值 进行结构出来
		let {
			fromvalue,
			publicShopdetails
		} = shopvalue
		_this.state.orderlist = []

		//判断传过来的标识 如果1就是购物车过来的 否则就是商品详情过来的
		if (parseInt(fromvalue)) {
			let couponsstrId = []
			//这里是购物车过来的
			// console.log(_this.state.cartList)
			_this.state.cartList.forEach((item, index) => {
				item.sub.forEach((items, indexs) => {
					if (items.checked) {
						/* 这里为了处理 优惠券的gc_id的值 ---开始*/
						if (items.gc_id3) {
							if (items.gc_id2) {
								if (items.gc_id1) {
									couponsstrId[index] = items.gc_id1 + '-' + items.gc_id2 + '-' + items.gc_id3
								}
							} else {
								if (items.gc_id1) {
									couponsstrId[index] = items.gc_id1
								}
							}
						} else {
							if (items.gc_id2) {
								if (items.gc_id1) {
									couponsstrId[index] = items.gc_id1 + '-' + items.gc_id2
								}
							} else {
								couponsstrId[index] = items.gc_id1
							}
						}
						/* 这里为了处理 优惠券的gc_id的值 ---结束*/
						_this.state.orderlist.push(items)
					}
				})
			})
			// console.log(couponsstrId)
			if (_this.state.orderlist.length >= 1) {
				_this.state.orderlist[0].limit_gcategory = couponsstrId
			}
			

			// _this.state.orderlist[0].limit_gcategory = couponsstrId
			/* console.log(_this.state.orderlist) */
		} else {
			//这里是商品详情过来的
			_this.state.orderlist.push(publicShopdetails)
		}
		//判断数组的长度大于1的时候证明用户选择了商品
		if (_this.state.orderlist.length >= 1) {
			uni.setStorage({
				key: "orderinfo",
				data: _this.state.orderlist,
				success() {
					uni.navigateTo({
						url: `/pages/Purchasepage/Purchasepage?fromvalue=${fromvalue}`
					})
				}
			})
		} else {
			_this.commit("getshowmodel", {
				msg: "请选中商品进行结算"
			})
		}
	},


	/*---订单----*/
	//请求订单信息的方法 29a8b269b62da603424f405be0a767dc
	getTemporarynonpayment(state, TabCurindex) {
		this.commit("gettokey")
		uni.getStorage({
			key: "bindtokey",
			success(ures) {
				let {
					index,
					geturl
				} = TabCurindex
				// console.log(geturl)
				uni.request({
					url: Requestpath + geturl,
					method: "POST",
					data: {
						token: ures.data,
						page: state.orderpage,
						pageSize: 10,
					},
					success(res) {
						// console.log(res.data.code)
						//   .$forceUpdate()  
						if (res.data.code == 0) {
							// console.log('令牌正确')
							// console.log(state.tokey)
							// console.log(state.tokey)   
							// console.log(state.orderpage)
							state.Temporarynonpaymentlist = state.Temporarynonpaymentlist.concat(res.data.data.list)
							// console.log(state.Temporarynonpaymentlist,'成功')  	
							if (state.Delete) {
								state.Temporarynonpaymentlist = res.data.data.list
								state.Delete = false
							}
						} else {
							//  state.Temporarynonpaymentlist =state.Temporarynonpaymentlist.concat(res.data.data.list)  
							// console.log(state.tokey)
							// console.log(state.orderpage)   
							// console.log(res.data.msg)
						}
					},
				})
			}
		})
	},
	//下拉订单刷新
	scrollBottom(state, pagesobj) {
		let {
			pages
		} = pagesobj
		state.orderpage = pages
	},
	//列表外面的删除订单
	deletescollectionAndfootprint(state, delectorder) {
		state.Delete = true
		const _this = this
		let {
			order_sn,
			TabCur,
			url
		} = delectorder

		this.commit("gettokey")
		uni.showModal({
			title: "亲!",
			content: "您确定要删除该订单嘛？",
			showCancel: true,
			cancelText: "取消",
			cancelColor: '#f00',
			confirmText: "确认删除",
			confirmColor: '#0f0',
			success: res => {
				if (res.confirm) {
					uni.request({
						url: `${Requestpath}order/deleteOrderInfo`,
						method: "POST",
						data: {
							token: state.tokey,
							o_sn: order_sn
						},
						success(res) {
							if (res.data.code == 0) {
								_this.commit("getshowmodel", {
									msg: res.data.msg
								})
								_this.commit("getTemporarynonpayment", {
									index: TabCur,
									geturl: url
								})
							} else {
								_this.commit("getshowmodel", {
									msg: res.data.msg
								})
							}
						}
					})
				}
			}
		})
	},
	//点击跳转订单内
	linkDetails(state, orderinfo) {
		// state.order_sn = order_sn
		let {
			order_sn,
			title,
			dispatch_price,
			swift_no,
			address_id,
			buyer_name,
			price,
			create_time,
			send_time,
			finish_time,
			cancel_time
		} = orderinfo
		uni.setStorage({
			key: "ordertitle",
			data: {
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
			url: `/pages/Temporarynonpayment/Temporarynonpayment`
		})
	},
	//获取订单里的订单商品的列表
	getorderlist() {
		this.commit("gettokey")
		uni.getStorage({
			key: "ordertitle",
			success(res) {
				uni.request({
					url: `${Requestpath}order/getOrderGoodList`,
					method: "POST",
					data: {
						token: state.tokey,
						order_sn: res.data.order_sn,
						page: 1,
						pageSize: 99
					},
					success(res) {
						// console.log(res.data.data.list)
						if (res.data.code == 0) {
							state.orderlistshop = res.data.data.list
							// console.log(state.orderlistshop)
							state.ordercreatetime = res.data.data.list[0].create_time
							state.ordercode = res.data.data.list[0].share_code
						}
					}
				})
			}
		})
	},
	//如果在订单付款的时候，用户点击了×号 回跳到订单里面 根据订单号进行请求信息 (后期说)
	//确认收货
	Confirmgoods(state, ordergoods) {
		const _this = this
		// console.log(ordergoods)
		_this.commit("gettokey")
		let {
			order_sn
		} = ordergoods
		uni.request({
			url: `${Requestpath}order/confirmPayOrder`,
			method: "POST",
			data: {
				token: state.tokey,
				o_sn: order_sn,
			},
			success(res) {
				// console.log(res)
				if (res.data.code == 0) {
					_this.commit("getshowmodel", {
						msg: res.data.msg
					})
					uni.redirectTo({
						url: "/pages/evaluate/evaluate"
					})
					uni.request({
						url: `${Requestpath}cmssettlement/practicalCmsSettleAccounts`,
						method: "POST",
						data: {
							token: state.tokey,
							order_sn: order_sn,
							good_id: state.orderlistshop[0].good_id
						},
						success(res) {
							// console.log(res)
						}
					})
				} else {
					if (res.data.msg == "订单状态错误" && res.data.code == 1) {
						_this.commit("getshowmodel", {
							msg: "请耐心等待卖家发货"
						})
						return
					}
					_this.commit("getshowmodel", {
						msg: res.data.msg
					})
				}
			}
		})
	},
	//取消订单
	Confirmcancel(state, cancelorder) {
		const _this = this
		_this.commit("gettokey")
		let {
			order_sn
		} = cancelorder
		uni.request({
			url: `${Requestpath}order/unPayOrderToCancel`,
			method: "POST",
			data: {
				token: state.tokey,
				o_sn: order_sn
			},
			success(res) {
				if (res.data.code == 0) {
					_this.commit("getshowmodel", {
						msg: res.data.msg
					})
					setTimeout(() => {
						// uni.redirectTo({
						// 	url: `/pages/orderpageRouter/orderpageRouter`
						// })
						uni.navigateBack()
					}, 1500)
				} else {
					_this.commit("getshowmodel", {
						msg: res.data.msg
					})
				}
			}
		})
	},
	//用户退款
	refundparagraph(state, refundobj) {
		const _this = this
		let {
			o_sn,
			af_price,
			pay_pwd,
			r_text
		} = refundobj
		_this.commit("gettokey")
		uni.request({
			url: `${Requestpath}order/applyForRefundOrder`,
			method: "POST",
			data: {
				token: state.tokey,
				o_sn,
				af_price,
				pay_pwd,
				r_text
			},
			success(res) {
				if (res.data.code == 0) {
					_this.commit("getshowmodel", {
						msg: res.data.msg + ',请耐心等待'
					})
				} else {
					_this.commit("getshowmodel", {
						msg: res.data.msg
					})
				}
			}
		})
	},




	/*---订单中的物流---*/
	//用户退货退款或者仅退款需要填写快递公司的信息
	Querysinglenumber(state, returnlogistics) {
		const _this = this
		_this.commit("gettokey")
		// console.log(returnlogistics)
		let {
			value
		} = returnlogistics
		//如果订单不为空  否则就提示用户物流单号不能为空
		if (value !== "") {
			state.kiadigongsi = true
			state.loadModal = true
			uni.request({
				url: `${Requestpath}order/getLogisticCompanyInfo`,
				method: "POST",
				data: {
					e_num: value,
					token: state.tokey
				},
				success(res) {
					if (res.data.code == 0) {
						state.Couriercompanyname = res.data.data.express_name
						state.loadModal = false
						state.express_code = res.data.data.express_code
					}
				}
			})
		} else {
			this.commit("getshowmodel", {
				msg: "请输入快递单号"
			})
		}
	},
	//获取物流信息
	getLogisticsin() {
		const _this = this
		_this.commit("gettokey")
		uni.getStorage({
			key: "express_sn",
			success(res) {
				_this.commit("Querysinglenumber", {
					value: res.data[0]
				})
				//这是调用物流轨迹
				//定时器用于操控异步
				setTimeout(() => {
					uni.request({
						url: `${Requestpath}order/getLogisticsInfo`,
						method: "POST",
						data: {
							token: state.tokey,
							ec_code: state.express_code,
							e_num: res.data[0]
						},
						success(res) {

							if (res.data.code == 0) {
								state.Traceslist = res.data.data.Traces
							}
						}
					})
				}, 1000)
			}
		})
	},


	/*----评价---*/
	//获取外面的待评价和已评价的列表
	getevaluationlist(state, evaluationobj) {
		const _this = this
		let {
			url,
			pages
		} = evaluationobj
		// state.evaluationlistitem = []
		// console.log(evaluationobj,111)
		_this.commit("gettokey")
		//这是请求的订单评价超时的时间
		uni.request({
			url: `${Requestpath}order/getOrderOverTimeConfig`,
			success(resTime) {
				if (resTime.data.code == 0) {
					let arr = [] //这是订单超时的数组 为了存放订单编号
					// console.log(resTime.data.data.complete_day,"这是完成时间")
					//这是请求 未评价的列表或者 已评价的列表
					uni.request({
						url: `${Requestpath}${url}`,
						method: "POST",
						data: {
							token: state.tokey,
							page: pages,
							pageSize: 10
						},
						success(res) {
							// console.log(res)//自动评价 = 完成时间 + 配置信息 - new date  
							if (res.data.code == 0) {
								//这是 获取店铺的的订单列表

								if (pages == 1) {
									state.evaluationlist = res.data.data.list
								} else {
									state.evaluationlist = state.evaluationlist.concat(res.data.data.list)
								}



								// console.log(CompletiontimeS)
								res.data.data.list.forEach((item, index) => {
									// console.log(item.finish_time)
									// console.log(resTime.data.data.complete_day * 1000)
									//自动评价 = 完成时间 + 配置信息 - new date

									if (new Date(item.finish_time.replace(/-/g, '/')).getTime() + parseInt(resTime.data.data.complete_day *
											1000) - new Date().getTime() <= 0) {
										// console.log(item.order_sn)750
										arr.push(item.order_sn)
										// console.log(arr)
										//自动评价
										uni.request({
											url: `${Requestpath}order/noEvaluationOrderToFinish`,
											method: "POST",
											data: {
												tokey: state.tokey,
												o_sns: arr
											},
											success(res) {
												// console.log(res)
											}
										})
									}
									//这是请求的评价里面的订单商品
									uni.request({
										url: `${Requestpath}order/getOrderGoodList`,
										method: "POST",
										data: {
											token: state.tokey,
											order_sn: item.order_sn,
											page: 1,
											pageSize: 10
										},
										success(resshop) {
											// console.log(resshop,23222)
											if (resshop.data.code == 0) {
												//订单号比对
												// console.log(index)
												state.evaluationlistitem.push(resshop.data.data.list)

											}

										}
									})
								})
							}
							//原来的位置
						}
					})
				}
			}
		})
	},



	/*---退款和退货退款的详情---*/
	// getrefundreturn() {
	// 	const _this = this
	// 	_this.commit("gettokey")
	// 	uni.request({
	// 		url: `${Requestpath}order/getRefundOrderList`,
	// 		method: "POST",
	// 		data: {
	// 			token: state.tokey,
	// 			page: 1,
	// 			pageSize: 10
	// 		}, 
	// 		success(res) {
	// 			// console.log(res)
	// 			if (res.data.code == 0) {
	// 				state.refundreturnlist = res.data.data.list
	// 				uni.request({
	// 					url: `${Requestpath}order/getRefundAndGoodsOrderList`,
	// 					method: "POST",
	// 					data: {
	// 						token: state.tokey,
	// 						page: 1,
	// 						pageSize: 10
	// 					},
	// 					success(res) {
	// 						// console.log(res)
	// 						//因为退货和退款退款两个接口同时的 所以要把他们的数据进行合并
	// 						if (res.data.code == 0) {
	// 							state.refundreturnlist.concat(res.data.data.list)
	// 						}
	// 					}
	// 				})
	// 			}
	// 		}
	// 	})
	// },
	/*---订单退款的列表+---*/
	OrderrefundList() {
		const _this = this
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				uni.request({
					url: `${Requestpath}order/getRefundOrderList`,
					method: "POST",
					data: {
						token: restokey.data,
						page: 1,
						pageSize: 7
					},
					success(res) {
						// console.log(res,'退款订单列表')
						if (res.data.code == 0) {
							state.refundreturnlist = res.data.data.list
							// console.log(state.refundreturnlist,1111)
						}
					}
				})
			}
		})

	},
	// 订单退款退货列表  
	Orderefundreturnlist() {
		const _this = this
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				uni.request({
					url: `${Requestpath}order/getRefundAndGoodsOrderList`,
					method: "POST",
					data: {
						token: restokey.data,
						page: 1,
						pageSize: 7
					},
					success(res) {
						if (res.data.code == 0) {
							state.refundreturnlist = res.data.data.list
						}
					}
				})
			}
		})

	},



	/***优惠券***/
	//请求优惠券的列表
	getallcouponslist(state, couponsobj) {
		const _this = this
		_this.commit("gettokey")
		// console.log(couponsobj)
		let {
			topindex,
			bottomindex,
			pages
		} = couponsobj
		// if (bottomindex == 0) {
		//这是店铺的
		uni.getStorage({
			key: "bindtokey",
			success(restokey) {
				uni.request({
					url: `${Requestpath}activity/getUserCouponList`,
					method: "POST",
					data: {
						token: restokey.data,
						type: topindex,
						page: pages,
						pageSize: 10
					},
					success(res) {
						if (res.data.code == 0) {
							if (pages == 1) {
								state.couponslist = res.data.data.list
							} else {
								state.couponslist = state.couponslist.concat(res.data.data.list)
							}
						}
					}
				})
			}
		})
	},


	/***品牌***/
	//获取品牌列表信息
	getgetBrandList(state, Brandloadobj) {
		let {
			Brandloadbools
		} = Brandloadobj
		const _this = this
		//这是用于控制 加载的图标是否出来
		if (Brandloadbools) {
			state.Brandloadbool = false
		}
		//这是请求品牌列表的id 通过id 去请求其他的列表
		uni.request({
			url: `${Requestpath}brand/getBrandList`,
			data: {
				page: state.Brandpage,
				pageSize: 3
			},
			success(res) {
				// console.log(res)
				if (res.data.code == 0) {
					//创建 两个变量 arrlist开始的时候等于 在state定义的数组
					//因为最后的时候 数据都会增加到state.BrandList 这样可以实现分页
					let arrlist = state.BrandList
					//新创建一个变量 用于每次存储数据
					let arr = []
					//这里是实现分页的效果
					if (state.Brandpage > 1) {
						// console.log(arrlist)
						arrlist = arrlist.concat(res.data.data.list)
					} else {
						arrlist = res.data.data.list
					}
					//进行遍历热卖榜单的数据
					arrlist.forEach((item, index) => {
						arr.push(item)
						//这里请求
						uni.request({
							url: `${Requestpath}brand/getBrandGoodSalesTopList`,
							data: {
								brand_id: item.brand_id,
								limit: 3
							},
							success(res) {
								//这里的判断为了判断有的数据 没有值
								if (res.data.code == 0) {
									arr[index].Brandonlist = res.data.data.list


								} else {
									arr[index].Brandonlist = []
									state.Brandloadbool = true
								}
								//这里请求下面6个小商品的数据
								// uni.request({
								// 	url: `${Requestpath}brand/getRandomBrandGoodList`,
								// 	data: {
								// 		brand_id: item.brand_id,
								// 		limit: 6
								// 	},
								// 	success(reslist) {
								// 		//这里的判断为了判断有的数据 没有值
								// 		if (reslist.data.code == 0) {
								// 			arr[index].Brandonlists = reslist.data.data.list
								// 		} else {
								// 			arr[index].Brandonlists = []
								// 		}
								// 		if (Brandloadbools == false) {
								// 			setTimeout(() => {
								// 				state.Brandloadbool = true
								// 			}, 1500)
								// 		} else {
								// 			state.Brandloadbool = true
								// 		}
								// 	}
								// })
							}
						})

					})
					setTimeout(() => {
						state.BrandList = arr
						state.Brandloadbool = true
					}, 1000)
				} else {
					state.Brandloadbool = true
				}
			}
		})
	},
	//当品牌下拉加载的时候
	scrolltolower() {
		state.Brandpage++
		this.commit("getgetBrandList", {
			Brandloadbools: true
		})
	},

	/******直播******/
	//获取主播在开播前要直播的商品
	getliveshoplist() {
		const _this = this
		_this.commit("gettokey")
		setTimeout(() => {
			uni.request({
				url: `${Requestpath}live/getAnchorGoodList`,
				method: "POST",
				data: {
					token: state.tokey,
					page: state.livepages,
					pageSize: 5
				},
				success(res) {
					if (res.data.code == 0) {
						if (state.livepages > 1) {
							state.liveshoplist = state.liveshoplist.concat(res.data.data.list)
						} else {
							state.liveshoplist = res.data.data.list
						}
					}
				}
			})
		}, 1500)
	},
	//当用户主播滑动商品的列表到底部的时候
	loadmore() {
		state.livepages++
		state.userlivepages++
		this.commit("getliveshoplist")
		this.commit("userliveshoplist", state.userliveid)
	},
	userliveshoplist(state, userliveobj) {
		state.userliveid = userliveobj
		// console.log(userliveobj)
		uni.request({
			url: `${Requestpath}live/getAnchorGoodListNoToken`,
			data: {
				uid: userliveobj,
				page: state.userlivepages,
				pageSize: 3,
			},
			success(res) {
				// console.log(res)
				if (res.data.code == 0) {
					if (state.userlivepages > 1) {
						state.liveshoplist = state.liveshoplist.concat(res.data.data.list)
					} else {
						state.liveshoplist = res.data.data.list
					}
				}
			}
		})
	},

	//当用户点击了马上抢
	Immediatelygrab(state, Immediateobj) {
		const _this = this
		//liveshopspecifications
		let liveshopobj = {}
		let {
			gid,
			s_id,
			g_le,
			g_price,
			g_pic,
			tokey,
			store_name,
			share_code,
			good_freight
		} = Immediateobj
		uni.request({
			url: `${Requestpath}good/getGoodSpecListOneLever`,
			data: {
				sid: s_id,
				gid: gid
			},
			success(res) {
				// console.log(res,"商品规格信息")
				//因为有些没规格的所以不管失败成功都要变成true
				if (res.data.code == 0) {
					state.livespecificationsbool = true
					liveshopobj.g_pic = g_pic
					liveshopobj.gid = gid
					liveshopobj.liveImmediatelist = res.data.data
					liveshopobj.sid = s_id
					liveshopobj.g_le = g_le
					// liveshopobj.g_price = g_price
					liveshopobj.store_name = store_name
					liveshopobj.share_code = share_code
					liveshopobj.good_freight = good_freight
					state.liveshopspecifications[0] = liveshopobj
					// console.log(state.liveshopspecifications)
				} else {
					// console.log(gid,g_pic,store_name,g_price,g_le,s_id,share_code,"这是没规格的")
					let SpecificationShopdetails = {
						good_id: gid,
						spec_id: 0,
						good_num: 1,
						way: 2,
						good_pic: g_pic,
						store_name: store_name,
						good_price: g_price,
						good_name: g_le,
						store_id: s_id,
						share_code: share_code,
						good_freight: good_freight,
						share_from: 1
					}
					// console.log(SpecificationShopdetails)
					_this.commit("Saveorder", {
						fromvalue: 0,
						publicShopdetails: SpecificationShopdetails
					})
				}
			}
		})
	},
	//当用户点击×以后
	liveshopclose() {
		state.livespecificationsbool = false
	},
	//当前端接收到服务端的消息的时候
	livereceivemsg(state, livemsgobj) {
		let {
			msg
		} = livemsgobj
		state.liveuserlist.push(msg)
		// console.log(state.liveuserlist)
		// console.log(state.liveuserlist, "这是index.js里面的")
		// const length = state.liveuserlist.length
		// console.log(length)
	},
	/******直播*****/








	/****平台或者店铺客服****/
	//客服页面点击发送按钮的时候
	Customersendmsg(state, sendmsgobj) {
		const _this = this
		let aa = sendmsgobj.textvalue
		let bb = aa.substring(4,6)
		if( bb !=="br"){
			let {
				textvalue
			} = sendmsgobj
			console.log(JSON.stringify({
				textvalue
			}))
			
			if (textvalue !== "") {
				let obj = {
					type: "chatMessage",
					data: {
						to_id: state.kf_id,
						to_name: state.kf_name,
						content: textvalue,
						from_name: state.uname,
						from_id: state.uid,
						from_avatar: state.imgyuming + state.avatar
					}
				}
				//这是往服务器中发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(obj),
					success(res) {
						// Customersendmsglist
						// console.log(res, "这是发送成功")
						state.Customersendmsglist.push({
							'sendmsgdata': textvalue,
							'msgtype': 'usersend',
							'avatar': state.imgyuming + state.avatar
						})
					},
					fail(err) {
						// console.log(err, "这是发送失败")
					}
				});
				// console.log(state.Customersendmsglist)
			} else {
				_this.commit('getshowmodel', {
					msg: "文字不能为空"
				})
			}
		}
	},
	
	// *****店铺客服发送商品*****
	Sendproductlink(state,cgid){
		const _this = this
		let {gid} = cgid
		let obj = {
			type: "currentGood",
			  uid: state.uid,//用户ID
			  gid,//商品ID      
			  group: 1,//客服分组 1售前 2售后  
			  kf_id: state.kf_id,//客服ID  
		}
		uni.sendSocketMessage({
			data: JSON.stringify(obj),
			success(res) {
				// console.log(JSON.stringify(obj))	
				// console.log(res,'返回')
			},
			fail(res) {
				// console.log(res,"返回值")
			}
		});
	}

}

//actions用于操作异步
let actions = {
	getcarlists(context) {
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
