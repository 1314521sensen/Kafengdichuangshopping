
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/classification/classification","pages/shoppingCart/shoppingCart","pages/PersonalMy/PersonalMy","pages/bannerRouter/bannerRouter","pages/Details/Details","pages/SearchTo/SearchTo","pages/Sortinglist/Sortinglist","pages/Personaldata/Personaldata","pages/orderpageRouter/orderpageRouter","pages/addressTo/addressTo","components/address/address","components/collection/collection","pages/login/login","pages/Allcoupons/allcoupons","pages/Store/store","pages/SMSlogin/SMSlogin","pages/Freeregistration/Freeregistration","pages/Purchasepage/Purchasepage","pages/Temporarynonpayment/Temporarynonpayment","pages/Paysuccess/Paysuccess","pages/Allevaluation/Allevaluation"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F2F2F2","navigationStyle":"custom"},"tabBar":{"color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabber/indexwei.png","selectedIconPath":"static/tabber/index.png","text":"首页"},{"pagePath":"pages/classification/classification","iconPath":"static/tabber/classificationwei.png","selectedIconPath":"static/tabber/classification.png","text":"分类"},{"pagePath":"pages/shoppingCart/shoppingCart","iconPath":"static/tabber/carwei.png","selectedIconPath":"static/tabber/car.png","text":"购物车"},{"pagePath":"pages/PersonalMy/PersonalMy","iconPath":"static/tabber/mywei.png","selectedIconPath":"static/tabber/my.png","text":"我的"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"CardElectricity","compilerVersion":"2.6.5","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/classification/classification","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/shoppingCart/shoppingCart","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/PersonalMy/PersonalMy","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/bannerRouter/bannerRouter","meta":{},"window":{}},{"path":"/pages/Details/Details","meta":{},"window":{}},{"path":"/pages/SearchTo/SearchTo","meta":{},"window":{}},{"path":"/pages/Sortinglist/Sortinglist","meta":{},"window":{}},{"path":"/pages/Personaldata/Personaldata","meta":{},"window":{}},{"path":"/pages/orderpageRouter/orderpageRouter","meta":{},"window":{}},{"path":"/pages/addressTo/addressTo","meta":{},"window":{}},{"path":"/components/address/address","meta":{},"window":{}},{"path":"/components/collection/collection","meta":{},"window":{}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/Allcoupons/allcoupons","meta":{},"window":{}},{"path":"/pages/Store/store","meta":{},"window":{}},{"path":"/pages/SMSlogin/SMSlogin","meta":{},"window":{}},{"path":"/pages/Freeregistration/Freeregistration","meta":{},"window":{}},{"path":"/pages/Purchasepage/Purchasepage","meta":{},"window":{}},{"path":"/pages/Temporarynonpayment/Temporarynonpayment","meta":{},"window":{}},{"path":"/pages/Paysuccess/Paysuccess","meta":{},"window":{}},{"path":"/pages/Allevaluation/Allevaluation","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0}}}});
