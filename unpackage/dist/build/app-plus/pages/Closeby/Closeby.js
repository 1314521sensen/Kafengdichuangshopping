!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=77)}({0:function(t,e,i){"use strict";function n(t,e,i,n,r,o,a,s,u,c){var l,p="function"==typeof t?t.options:t;if(u&&(p.components=Object.assign(u,p.components||{})),c&&((c.beforeCreate||(c.beforeCreate=[])).unshift(function(){this[c.__module]=this}),(p.mixins||(p.mixins=[])).push(c)),e&&(p.render=e,p.staticRenderFns=i,p._compiled=!0),n&&(p.functional=!0),o&&(p._scopeId="data-v-"+o),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},p._ssrRegister=l):r&&(l=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(p.functional){p._injectStyles=l;var d=p.render;p.render=function(t,e){return l.call(e),d(t,e)}}else{var f=p.beforeCreate;p.beforeCreate=f?[].concat(f,l):[l]}return{exports:t,options:p}}i.d(e,"a",function(){return n})},1:function(t,e){t.exports={textcolorwrite:{color:"#FFFFFF"},"textcolor-Promptreply":{color:"#d9d9d9"},"textcolor-red":{color:"#FF0000"},"bg-Lightgrey":{backgroundColor:"#333333"},"bg-deepink":{backgroundColor:"#FF1493"},"bg-write":{backgroundColor:"#ffffff"},"bg-Black-gradient":{backgroundColor:"rgba(51,51,51,0.6)"},"bg-gradient-white":{backgroundColor:"rgba(255,255,255,0.5)"},"bg-orders-red":{backgroundColor:"#ff3600"},"bg-btn-red":{backgroundColor:"#de4758"},"bg-dark":{backgroundColor:"rgba(0,0,0,0.4)"},"text-center":{textAlign:"center"},"text-padding-plice":{paddingTop:"10rpx",paddingRight:0,paddingBottom:"10rpx",paddingLeft:0},"text-padding-six":{paddingTop:"6rpx",paddingRight:0,paddingBottom:"6rpx",paddingLeft:0},"parent-padding-leftAndright":{paddingTop:0,paddingRight:"40rpx",paddingBottom:0,paddingLeft:"40rpx"},"text-padding-leftshis":{paddingLeft:"10rpx"},"font-size-twenty-four":{fontSize:"24rpx"},"font-size-twenty-senve":{fontSize:"27rpx"},"font-size-twenty-flxed":{fontSize:"26rpx"},"font-size-thirty":{fontSize:"30rpx"},"font-size-forty":{fontSize:"40rpx"},"font-size-flivety":{fontSize:"50rpx"},"border-radiusthirty":{borderRadius:"30rpx"},"border-radiusfifty":{borderRadius:"50rpx"},"border-radiusOnehundred":{borderRadius:"100rpx"},"border-radius-topLeft":{borderTopLeftRadius:"30rpx"},"border-radius-topright":{borderTopRightRadius:"30rpx"},"border-size":{borderBottomWidth:"2rpx"},"border-plice":{borderWidth:"2rpx"},"border-styles":{borderStyle:"solid"},"border-Dotted":{borderStyle:"dashed"},"border-Size":{borderWidth:"2rpx"},"border-Size-fith":{borderWidth:"5rpx"},"text-weight":{fontWeight:"bold"},icon:{width:"60rpx",height:"60rpx"}}},15:function(t,e,i){"use strict";function n(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,i){return e&&s(t.prototype,e),i&&s(t,i),t}var c=i(16).version,l="__DC_STAT_UUID",p="__DC_UUID_VALUE";function d(){var t="";if("n"===g()){try{t=plus.runtime.getDCloudId()}catch(e){t=""}return t}try{t=uni.getStorageSync(l)}catch(e){t=p}if(!t){t=Date.now()+""+Math.floor(1e7*Math.random());try{uni.setStorageSync(l,t)}catch(t){uni.setStorageSync(l,p)}}return t}var f,h=function(){return parseInt((new Date).getTime()/1e3)},g=function(){return"n"},_=function(){var t="";return"wx"!==g()&&"qq"!==g()||uni.canIUse("getAccountInfoSync")&&(t=uni.getAccountInfoSync().miniProgram.appId||""),t},v=function(){return"n"===g()?plus.runtime.version:""},y=function(){var t="";return"n"===g()&&(t=plus.runtime.channel),t},m=0,b=0,x=function(){return m=h(),"n"===g()&&uni.setStorageSync("__page__residence__time",h()),m},w=0,S=0,D=function(){var t=(new Date).getTime();return w=t,S=0,t},C=function(){var t=(new Date).getTime();return S=t,t},T=function(t){var e=0;return 0!==w&&(e=S-w),e=(e=parseInt(e/1e3))<1?1:e,"app"===t?{residenceTime:e,overtime:e>300}:"page"===t?{residenceTime:e,overtime:e>1800}:{residenceTime:e}},k=function(t){var e=getCurrentPages(),i=e[e.length-1].$vm,n=t._query,r=n&&"{}"!==JSON.stringify(n)?"?"+JSON.stringify(n):"";return t._query="","bd"===g()?i.$mp&&i.$mp.page.is+r:i.$scope&&i.$scope.route+r||i.$mp&&i.$mp.page.route+r},R=function(t){return!!("page"===t.mpType||t.$mp&&"page"===t.$mp.mpType||"page"===t.$options.mpType)},q=i(17).default,O=i(2).default||i(2),P=uni.getSystemInfoSync(),j=function(){function t(){a(this,t),this.self="",this._retry=0,this._platform="",this._query={},this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._operatingTime=0,this._reportingRequestData={1:[],11:[]},this.__prevent_triggering=!1,this.__licationHide=!1,this.__licationShow=!1,this._lastPageRoute="",this.statData={uuid:d(),ut:g(),mpn:_(),ak:O.appid,usv:c,v:v(),ch:y(),cn:"",pn:"",ct:"",t:h(),tt:"",p:"android"===P.platform?"a":"i",brand:P.brand||"",md:P.model,sv:P.system.replace(/(Android|iOS)\s/,""),mpsdk:P.SDKVersion||"",mpv:P.version||"",lang:P.language,pr:P.pixelRatio,ww:P.windowWidth,wh:P.windowHeight,sw:P.screenWidth,sh:P.screenHeight}}return u(t,[{key:"_applicationShow",value:function(){if(this.__licationHide){if(C(),T("app").overtime){var t={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(t)}this.__licationHide=!1}}},{key:"_applicationHide",value:function(t,e){this.__licationHide=!0,C();var i=T();D();var n=k(this);this._sendHideRequest({urlref:n,urlref_ts:i.residenceTime},e)}},{key:"_pageShow",value:function(){var t,e,i=k(this),n=(t=getCurrentPages(),e=t[t.length-1].$vm,"bd"===g()?e.$mp&&e.$mp.page.is:e.$scope&&e.$scope.route||e.$mp&&e.$mp.page.route);if(this._navigationBarTitle.config=q&&q.pages[n]&&q.pages[n].titleNView&&q.pages[n].titleNView.titleText||q&&q.pages[n]&&q.pages[n].navigationBarTitleText||"",this.__licationShow)return D(),this.__licationShow=!1,void(this._lastPageRoute=i);if(C(),this._lastPageRoute=i,T("page").overtime){var r={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(r)}D()}},{key:"_pageHide",value:function(){if(!this.__licationHide){C();var t=T("page");return this._sendPageRequest({url:this._lastPageRoute,urlref:this._lastPageRoute,urlref_ts:t.residenceTime}),void(this._navigationBarTitle={config:"",page:"",report:"",lt:""})}}},{key:"_login",value:function(){this._sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this._sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(t){this._sendEventRequest({key:t},0)}},{key:"_sendReportRequest",value:function(t){this._navigationBarTitle.lt="1";var e,i,n=t.query&&"{}"!==JSON.stringify(t.query)?"?"+JSON.stringify(t.query):"";this.statData.lt="1",this.statData.url=t.path+n||"",this.statData.t=h(),this.statData.sc=function(t){var e=g(),i="";return t||("wx"===e&&(i=uni.getLaunchOptionsSync().scene),i)}(t.scene),this.statData.fvts=(e=uni.getStorageSync("First__Visit__Time"),i=0,e?i=e:(i=h(),uni.setStorageSync("First__Visit__Time",i),uni.removeStorageSync("Last__Visit__Time")),i),this.statData.lvts=function(){var t=uni.getStorageSync("Last__Visit__Time"),e=0;return e=t||"",uni.setStorageSync("Last__Visit__Time",h()),e}(),this.statData.tvc=function(){var t=uni.getStorageSync("Total__Visit__Count"),e=1;return t&&(e=t,e++),uni.setStorageSync("Total__Visit__Count",e),e}(),"n"===g()?this.getProperty():this.getNetworkInfo()}},{key:"_sendPageRequest",value:function(t){var e=t.url,i=t.urlref,n=t.urlref_ts;this._navigationBarTitle.lt="11";var r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:i,urlref_ts:n,ch:this.statData.ch,usv:this.statData.usv,t:h(),p:this.statData.p};this.request(r)}},{key:"_sendHideRequest",value:function(t,e){var i=t.urlref,n=t.urlref_ts,r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"3",ut:this.statData.ut,urlref:i,urlref_ts:n,ch:this.statData.ch,usv:this.statData.usv,t:h(),p:this.statData.p};this.request(r,e)}},{key:"_sendEventRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.key,i=void 0===e?"":e,n=t.value,r=void 0===n?"":n,o=this._lastPageRoute,a={ak:this.statData.ak,uuid:this.statData.uuid,lt:"21",ut:this.statData.ut,url:o,ch:this.statData.ch,e_n:i,e_v:"object"==typeof r?JSON.stringify(r):r.toString(),usv:this.statData.usv,t:h(),p:this.statData.p};this.request(a)}},{key:"getNetworkInfo",value:function(){var t=this;uni.getNetworkType({success:function(e){t.statData.net=e.networkType,t.getLocation()}})}},{key:"getProperty",value:function(){var t=this;plus.runtime.getProperty(plus.runtime.appid,function(e){t.statData.v=e.version||"",t.getNetworkInfo()})}},{key:"getLocation",value:function(){var t=this;O.getLocation?uni.getLocation({type:"wgs84",geocode:!0,success:function(e){e.address&&(t.statData.cn=e.address.country,t.statData.pn=e.address.province,t.statData.ct=e.address.city),t.statData.lat=e.latitude,t.statData.lng=e.longitude,t.request(t.statData)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData))}},{key:"request",value:function(t,e){var i=this,n=h(),r=this._navigationBarTitle;t.ttn=r.page,t.ttpj=r.config,t.ttc=r.report;var o=this._reportingRequestData;if("n"===g()&&(o=uni.getStorageSync("__UNI__STAT__DATA")||{}),o[t.lt]||(o[t.lt]=[]),o[t.lt].push(t),"n"===g()&&uni.setStorageSync("__UNI__STAT__DATA",o),b=h(),"n"===g()&&(m=uni.getStorageSync("__page__residence__time")),!(b-m<10)||e){var a=this._reportingRequestData;"n"===g()&&(a=uni.getStorageSync("__UNI__STAT__DATA")),x();var s=[],u=[],l=[],p=function(t){a[t].forEach(function(e){var i=function(t){var e="";for(var i in t)e+=i+"="+t[i]+"&";return e.substr(0,e.length-1)}(e);0===t?s.push(i):3===t?l.push(i):u.push(i)})};for(var d in a)p(d);s.push.apply(s,u.concat(l));var f={usv:c,t:n,requests:JSON.stringify(s)};this._reportingRequestData={},"n"===g()&&uni.removeStorageSync("__UNI__STAT__DATA"),"h5"!==t.ut?"n"!==g()||"a"!==this.statData.p?this._sendRequest(f):setTimeout(function(){i._sendRequest(f)},200):this.imageRequest(f)}}},{key:"_sendRequest",value:function(t){var e=this;uni.request({url:"https://tongji.dcloud.io/uni/stat",method:"POST",data:t,success:function(){},fail:function(i){++e._retry<3&&setTimeout(function(){e._sendRequest(t)},1e3)}})}},{key:"imageRequest",value:function(t){var e=new Image,i=function(t){var e=Object.keys(t).sort(),i={},n="";for(var r in e)i[e[r]]=t[e[r]],n+=e[r]+"="+t[e[r]]+"&";return{sign:"",options:n.substr(0,n.length-1)}}(function(t){var e={};for(var i in t)e[i]=encodeURIComponent(t[i]);return e}(t)).options;e.src="https://tongji.dcloud.io/uni/stat.gif?"+i}},{key:"sendEvent",value:function(t,e){var i,n;(n=e,(i=t)?"string"!=typeof i?(console.error("uni.report [eventName] 参数类型错误,只能为 String 类型"),1):i.length>255?(console.error("uni.report [eventName] 参数长度不能大于 255"),1):"string"!=typeof n&&"object"!=typeof n?(console.error("uni.report [options] 参数类型错误,只能为 String 或 Object 类型"),1):"string"==typeof n&&n.length>255?(console.error("uni.report [options] 参数长度不能大于 255"),1):"title"===i&&"string"!=typeof n?(console.error("uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型"),1):void 0:(console.error("uni.report 缺少 [eventName] 参数"),1))||("title"!==t?this._sendEventRequest({key:t,value:"object"==typeof e?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),t}(),I=function(t){function e(){var t;return a(this,e),(t=n(this,r(e).call(this))).instance=null,"function"==typeof uni.addInterceptor&&(t.addInterceptorInit(),t.interceptLogin(),t.interceptShare(!0),t.interceptRequestPayment()),t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(e,j),u(e,null,[{key:"getInstance",value:function(){return this.instance||(this.instance=new e),this.instance}}]),u(e,[{key:"addInterceptorInit",value:function(){var t=this;uni.addInterceptor("setNavigationBarTitle",{invoke:function(e){t._navigationBarTitle.page=e.title}})}},{key:"interceptLogin",value:function(){var t=this;uni.addInterceptor("login",{complete:function(){t._login()}})}},{key:"interceptShare",value:function(t){var e=this;t?uni.addInterceptor("share",{success:function(){e._share()},fail:function(){e._share()}}):e._share()}},{key:"interceptRequestPayment",value:function(){var t=this;uni.addInterceptor("requestPayment",{success:function(){t._payment("pay_success")},fail:function(){t._payment("pay_fail")}})}},{key:"report",value:function(t,e){this.self=e,x(),this.__licationShow=!0,this._sendReportRequest(t,!0)}},{key:"load",value:function(t,e){if(!e.$scope&&!e.$mp){var i=getCurrentPages();e.$scope=i[i.length-1]}this.self=e,this._query=t}},{key:"show",value:function(t){this.self=t,R(t)?this._pageShow(t):this._applicationShow(t)}},{key:"ready",value:function(t){}},{key:"hide",value:function(t){this.self=t,R(t)?this._pageHide(t):this._applicationHide(t,!0)}},{key:"error",value:function(t){this._platform;var e="";e=t.message?t.stack:JSON.stringify(t);var i={ak:this.statData.ak,uuid:this.statData.uuid,lt:"31",ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:h(),p:this.statData.p};this.request(i)}}]),e}().getInstance(),$=!1,N={onLaunch:function(t){I.report(t,this)},onReady:function(){I.ready(this)},onLoad:function(t){if(I.load(t,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(t){return I.interceptShare(!1),e.call(this,t)}}},onShow:function(){$=!1,I.show(this)},onHide:function(){$=!0,I.hide(this)},onUnload:function(){$?$=!1:I.hide(this)},onError:function(t){I.error(t)}};((f=i(18)).default||f).mixin(N),uni.report=function(t,e){I.sendEvent(t,e)}},16:function(t){t.exports={_from:"@dcloudio/uni-stat@next",_id:"@dcloudio/uni-stat@2.0.0-26420200313001",_inBundle:!1,_integrity:"sha512-7dPuazTiDmUyRcw+WW+UlWGKH0eeCUB+p0P4pJVKEHjpdXnXgvDQCSdJk764NH99TfsUycnuxecP5oHckVa88g==",_location:"/@dcloudio/uni-stat",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"@dcloudio/uni-stat@next",name:"@dcloudio/uni-stat",escapedName:"@dcloudio%2funi-stat",scope:"@dcloudio",rawSpec:"next",saveSpec:null,fetchSpec:"next"},_requiredBy:["#USER","/","/@dcloudio/vue-cli-plugin-uni"],_resolved:"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26420200313001.tgz",_shasum:"a006e329e033cd412accfa635f8933dbb822a9c3",_spec:"@dcloudio/uni-stat@next",_where:"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli",author:"",bugs:{url:"https://github.com/dcloudio/uni-app/issues"},bundleDependencies:!1,deprecated:!1,description:"",devDependencies:{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5",eslint:"^6.1.0",rollup:"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},files:["dist","package.json","LICENSE"],gitHead:"b1fdbafab5dd4673cff64188a5203d0c947e4f50",homepage:"https://github.com/dcloudio/uni-app#readme",license:"Apache-2.0",main:"dist/index.js",name:"@dcloudio/uni-stat",repository:{type:"git",url:"git+https://github.com/dcloudio/uni-app.git",directory:"packages/uni-stat"},scripts:{build:"NODE_ENV=production rollup -c rollup.config.js",dev:"NODE_ENV=development rollup -w -c rollup.config.js"},version:"2.0.0-26420200313001"}},17:function(t,e,i){"use strict";i.r(e),e.default={pages:{},globalStyle:{}}},18:function(t,e){t.exports=Vue},19:function(t,e,i){Vue.prototype.__$appStyle__={},Vue.prototype.__merge_style&&Vue.prototype.__merge_style(i(20).default,Vue.prototype.__$appStyle__)},2:function(t,e,i){"use strict";i.r(e),e.default={appid:"__UNI__F002EB6"}},20:function(t,e,i){"use strict";i.r(e);var n=i(1),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e.default=r.a},25:function(t,e,i){"use strict";var n=i(56),r=i(29),o=i(0);var a=Object(o.a)(r.default,n.b,n.c,!1,null,null,"273168aa",!1,n.a,void 0);(function(t){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(i(68).default,this.options.style):Object.assign(this.options.style,i(68).default)}).call(a),e.default=a.exports},29:function(t,e,i){"use strict";var n=i(30),r=i.n(n);e.default=r.a},30:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{windowwidth:"",windowheight:"",statusBarHeight:"",clonselist:[{nums:3055,title:"观看人数"},{nums:3055,title:"本次直播总收入"},{nums:5,title:"新增粉丝数"}]}},methods:{},created:function(){var t=this;uni.getSystemInfo({success:function(e){t.statusBarHeight=e.statusBarHeight,t.windowwidth=e.windowWidth,t.windowheight=e.windowHeight}})}};e.default=n},31:function(t,e){t.exports={Closeby:{backgroundColor:"rgb(0,0,0)"},cha:{width:"60rpx",height:"60rpx"},"Close-headersection":{alignItems:"center",marginTop:"40rpx"},"headersection-top-imgs":{width:"240rpx",height:"240rpx",borderRadius:"120rpx"},headersectionshopname:{marginTop:"40rpx"},"headersection-bottom":{marginTop:"100rpx"},"Closeby-time":{flexDirection:"row",marginTop:"20rpx"},"Close-min":{marginLeft:"20rpx"},"Close-nums":{flexDirection:"row",justifyContent:"space-between",marginTop:"40rpx",marginRight:0,marginBottom:"60rpx",marginLeft:0},"Close-nums-item":{paddingBottom:"60rpx"},nums:{marginTop:"60rpx"},"rich-title":{marginTop:"40rpx",marginRight:0,marginBottom:"40rpx",marginLeft:0},"rich-text":{height:"200rpx",borderColor:"#CCCCCC"},btn:{height:"80rpx",borderWidth:0,marginTop:"40rpx",marginRight:0,marginBottom:"40rpx",marginLeft:0}}},56:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("scroll-view",{staticStyle:{flexDirection:"column"},attrs:{scrollY:!0,enableBackToTop:!0,bubble:"true"}},[i("cover-view",{staticClass:["Closeby","parent-padding-leftAndright"],style:{width:t.windowwidth+"px",height:t.windowheight+"px","padding-top":t.statusBarHeight+"px"}},[i("cover-view",{staticClass:["Shutdown"]},[i("u-image",{staticClass:["cha"],attrs:{src:"/static/Pushflow/cha.png"}})],1),i("cover-view",{staticClass:["Close-headersection"]},[i("cover-view",{staticClass:["headersection-top"]},[i("u-image",{staticClass:["headersection-top-imgs"],attrs:{src:"/static/logo.png"}}),i("u-text",{staticClass:["textcolorwrite","font-size-forty","text-center","headersectionshopname"]},[t._v("老海家农产品")])],1),i("cover-view",{staticClass:["headersection-bottom"]},[i("u-text",{staticClass:["textcolorwrite","font-size-flivety","text-center"]},[t._v("直播已结束")]),i("cover-view",{staticClass:["Closeby-time"]},[i("u-text",{staticClass:["textcolor-Promptreply","font-size-thirty"]},[t._v("16:32~16:32")]),i("u-text",{staticClass:["textcolor-Promptreply","font-size-thirty","Close-min"]},[t._v("共一分钟")])])],1)],1),i("cover-view",{staticClass:["Close-nums","parent-padding-leftAndright","border-radiusthirty","bg-Black-gradient"]},t._l(t.clonselist,function(e,n){return i("cover-view",{key:n,staticClass:["Close-nums-item"]},[i("u-text",{staticClass:["textcolorwrite","nums","text-center","font-size-forty","text-weight"]},[t._v(t._s(e.nums))]),i("u-text",{staticClass:["textcolorwrite","nums","font-size-thirty","text-center"]},[t._v(t._s(e.title))])])}),1),i("cover-view",{staticClass:["close-problem","bg-Black-gradient","border-radiusthirty","parent-padding-leftAndright"]},[i("cover-view",{staticClass:["rich-title"]},[i("u-text",{staticClass:["textcolorwrite","font-size-thirty"]},[t._v("您在本次直播中遇到了哪些问题?")])]),i("cover-view",{staticClass:["rich-text","border-radiusthirty","border-styles","border-plice"]},[i("u-textarea",{staticClass:["textcolorwrite","font-size-thirty","text-padding-plice","text-padding-leftshis"],attrs:{cols:"30",rows:"10",placeholder:"请描述你的问题..."}})],1),i("button",{staticClass:["btn","bg-Lightgrey"]},[i("u-text",{staticClass:["textcolorwrite"]},[t._v("提交")])])],1)],1)],1)},r=[];i.d(e,"b",function(){return n}),i.d(e,"c",function(){return r}),i.d(e,"a",function(){})},68:function(t,e,i){"use strict";i.r(e);var n=i(31),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e.default=r.a},77:function(t,e,i){"use strict";i.r(e);i(15),i(19);var n=i(25);n.default.mpType="page",n.default.route="pages/Closeby/Closeby",n.default.el="#root",new Vue(n.default)}});