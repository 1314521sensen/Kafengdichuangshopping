
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/classification/classification","pages/shoppingCart/shoppingCart","pages/PersonalMy/PersonalMy","pages/bannerRouter/bannerRouter","pages/Details/Details","pages/SearchTo/SearchTo","pages/Sortinglist/Sortinglist","pages/Personaldata/Personaldata","pages/orderpageRouter/orderpageRouter","pages/addressTo/addressTo","components/address/address","components/collection/collection","pages/login/login","pages/Allcoupons/allcoupons","pages/Store/store","pages/SMSlogin/SMSlogin","pages/Freeregistration/Freeregistration","pages/Purchasepage/Purchasepage","pages/Temporarynonpayment/Temporarynonpayment","pages/Paysuccess/Paysuccess","pages/Allevaluation/Allevaluation","components/setcenter/setcenter","components/indexcomponents/indexbindinfo","components/setcenter/returnloginpasswordall","components/setcenter/SetChangeResetpassword","pages/Allrightsreserved/Allrightsreserved","pages/integral/integral","pages/logistics/logistics","pages/balance/balance","pages/Newgift/Newgift","pages/evaluate/evaluate","pages/starevaluation/starevaluation","pages/Liveplatform/Liveplatform","pages/Liveplatformlist/Liveplatformlist","pages/Livecover/Livecover","pages/livestudio/livestudio","pages/livereport/returnsthe","pages/Closeby/Closeby","pages/discount/discount","pages/help/help","pages/grouppurchase/grouppurchase"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F2F2F2","navigationStyle":"custom"},"tabBar":{"color":"#7A7E83","selectedColor":"#eb246d","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabber/indexwei.png","selectedIconPath":"static/tabber/index.png","text":"首页"},{"pagePath":"pages/classification/classification","iconPath":"static/tabber/classificationwei.png","selectedIconPath":"static/tabber/classification.png","text":"分类"},{"pagePath":"pages/Liveplatformlist/Liveplatformlist","iconPath":"static/tabber/Liveplatform.png","selectedIconPath":"static/tabber/Liveplatform.gif","text":"直播"},{"pagePath":"pages/shoppingCart/shoppingCart","iconPath":"static/tabber/carwei.png","selectedIconPath":"static/tabber/car.png","text":"购物车"},{"pagePath":"pages/PersonalMy/PersonalMy","iconPath":"static/tabber/mywei.png","selectedIconPath":"static/tabber/my.png","text":"我的"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"惠播客","compilerVersion":"2.6.5","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/classification/classification","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/shoppingCart/shoppingCart","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true}},{"path":"/pages/PersonalMy/PersonalMy","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/bannerRouter/bannerRouter","meta":{},"window":{}},{"path":"/pages/Details/Details","meta":{},"window":{}},{"path":"/pages/SearchTo/SearchTo","meta":{},"window":{}},{"path":"/pages/Sortinglist/Sortinglist","meta":{},"window":{}},{"path":"/pages/Personaldata/Personaldata","meta":{},"window":{}},{"path":"/pages/orderpageRouter/orderpageRouter","meta":{},"window":{}},{"path":"/pages/addressTo/addressTo","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/components/address/address","meta":{},"window":{}},{"path":"/components/collection/collection","meta":{},"window":{}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/Allcoupons/allcoupons","meta":{},"window":{}},{"path":"/pages/Store/store","meta":{},"window":{}},{"path":"/pages/SMSlogin/SMSlogin","meta":{},"window":{}},{"path":"/pages/Freeregistration/Freeregistration","meta":{},"window":{}},{"path":"/pages/Purchasepage/Purchasepage","meta":{},"window":{}},{"path":"/pages/Temporarynonpayment/Temporarynonpayment","meta":{},"window":{}},{"path":"/pages/Paysuccess/Paysuccess","meta":{},"window":{}},{"path":"/pages/Allevaluation/Allevaluation","meta":{},"window":{}},{"path":"/components/setcenter/setcenter","meta":{},"window":{}},{"path":"/components/indexcomponents/indexbindinfo","meta":{},"window":{}},{"path":"/components/setcenter/returnloginpasswordall","meta":{},"window":{}},{"path":"/components/setcenter/SetChangeResetpassword","meta":{},"window":{}},{"path":"/pages/Allrightsreserved/Allrightsreserved","meta":{},"window":{}},{"path":"/pages/integral/integral","meta":{},"window":{}},{"path":"/pages/logistics/logistics","meta":{},"window":{}},{"path":"/pages/balance/balance","meta":{},"window":{}},{"path":"/pages/Newgift/Newgift","meta":{},"window":{}},{"path":"/pages/evaluate/evaluate","meta":{},"window":{}},{"path":"/pages/starevaluation/starevaluation","meta":{},"window":{}},{"path":"/pages/Liveplatform/Liveplatform","meta":{"isNVue":true},"window":{}},{"path":"/pages/Liveplatformlist/Liveplatformlist","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/Livecover/Livecover","meta":{"isNVue":true},"window":{}},{"path":"/pages/livestudio/livestudio","meta":{"isNVue":true},"window":{}},{"path":"/pages/livereport/returnsthe","meta":{},"window":{}},{"path":"/pages/Closeby/Closeby","meta":{"isNVue":true},"window":{}},{"path":"/pages/discount/discount","meta":{},"window":{}},{"path":"/pages/help/help","meta":{},"window":{}},{"path":"/pages/grouppurchase/grouppurchase","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0}}}});
