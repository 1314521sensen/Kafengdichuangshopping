"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _package = __webpack_require__(/*! ../package.json */ 2);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;
var DIFF_TIME = 60 * 1000 * 60 * 24;

var statConfig = __webpack_require__(/*! uni-stat-config */ 3).default || __webpack_require__(/*! uni-stat-config */ 3);
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["app-plus"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var Report_Data_Time = 'Report_Data_Time';
var Report_Status = 'Report_Status';
var isReportData = function isReportData() {
  return new Promise(function (resolve, reject) {
    var start_time = '';
    var end_time = new Date().getTime();
    var diff_time = DIFF_TIME;
    var report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(function (_ref)

      {var enable = _ref.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return;
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(function (_ref2)

      {var enable = _ref2.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }

  });
};

var requestData = function requestData(done) {
  var formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: statConfig.appid }) };


  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: function success(res) {var

      data =
      res.data;
      if (data.ret === 0) {
        typeof done === 'function' && done({
          enable: data.enable });

      }
    },
    fail: function fail(e) {
      var report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      if (report_status_code === 1) {
        typeof done === 'function' && done({
          enable: res.enable });

      }
      // console.error('统计请求错误');
    } });

};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 4).default;
var statConfig$1 = __webpack_require__(/*! uni-stat-config */ 3).default || __webpack_require__(/*! uni-stat-config */ 3);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig$1.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "getIsReportData", value: function getIsReportData()

    {
      return isReportData();
    } }, { key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref3$key = _ref3.key,key = _ref3$key === void 0 ? '' : _ref3$key,_ref3$value = _ref3.value,value = _ref3$value === void 0 ? "" : _ref3$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig$1.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      this.getIsReportData().then(function () {
        uni.request({
          url: STAT_URL,
          method: 'POST',
          // header: {
          //   'content-type': 'application/json' // 默认值
          // },
          data: optionsData,
          success: function success() {
            // if (process.env.NODE_ENV === 'development') {
            //   console.log('stat request success');
            // }
          },
          fail: function fail(e) {
            if (++_this5._retry < 3) {
              setTimeout(function () {
                _this5._sendRequest(optionsData);
              }, 1000);
            }
          } });

      });
    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      this.getIsReportData().then(function () {
        var image = new Image();
        var options = getSgin(GetEncodeURIComponentOptions(data)).options;
        image.src = STAT_H5_URL + '?' + options;
      });
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();

/***/ }),
/* 2 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-27820200527001","_inBundle":false,"_integrity":"sha512-mUmsdrO9iZv5E8lpR+yZsdxjuNz3yvPfd9KQkeWAQhOfUj9LvkHifYTC8j/Hz6rdfo0Y208wqRixNq77TzxI5A==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-27820200527001.tgz","_shasum":"2324942ff6417c2319ac24cd87ea9af04a4796eb","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"2cef0c9a12c4c980acd11787d6f4632d06dc00b0","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-27820200527001"};

/***/ }),
/* 3 */
/*!************************************************************!*\
  !*** E:/Kafengdichuangshopping/pages.json?{"type":"stat"} ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"appid":"__UNI__F002EB6"});

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** E:/Kafengdichuangshopping/pages.json?{"type":"style"} ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({"pages":{},"globalStyle":{}});

/***/ }),
/* 5 */
/*!*************************************************************!*\
  !*** E:/Kafengdichuangshopping/main.js?{"type":"appStyle"} ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Vue.prototype.__$appStyle__ = {}\nVue.prototype.__merge_style && Vue.prototype.__merge_style(__webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css */ 6).default,Vue.prototype.__$appStyle__)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsMkRBQTJELG1CQUFPLENBQUMsa0RBQTJDIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18gPSB7fVxuVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3NcIikuZGVmYXVsdCxWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/*!*************************************************************************!*\
  !*** E:/Kafengdichuangshopping/App.vue?vue&type=style&index=0&lang=css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css */ 7);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 7 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/App.vue?vue&type=style&index=0&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "textcolorwrite": {
    "color": "#FFFFFF"
  },
  "textcolor-Promptreply": {
    "color": "#d9d9d9"
  },
  "textcolor-red": {
    "color": "#FF0000"
  },
  "bg-Lightgrey": {
    "backgroundColor": "#333333"
  },
  "textcolor-black": {
    "color": "#000000"
  },
  "bg-deepink": {
    "backgroundColor": "#FF1493"
  },
  "bg-write": {
    "backgroundColor": "#ffffff"
  },
  "bg-Black-gradient": {
    "backgroundColor": "rgba(51,51,51,0.6)"
  },
  "bg-gradient-white": {
    "backgroundColor": "rgba(255,255,255,0.5)"
  },
  "bg-orders-red": {
    "backgroundColor": "#ff3600"
  },
  "bg-btn-red": {
    "backgroundColor": "#de4758"
  },
  "bg-dark": {
    "backgroundColor": "rgba(0,0,0,0.4)"
  },
  "text-center": {
    "textAlign": "center"
  },
  "text-padding-plice": {
    "paddingTop": "10rpx",
    "paddingRight": 0,
    "paddingBottom": "10rpx",
    "paddingLeft": 0
  },
  "text-padding-six": {
    "paddingTop": "6rpx",
    "paddingRight": 0,
    "paddingBottom": "6rpx",
    "paddingLeft": 0
  },
  "parent-padding-leftAndright": {
    "paddingTop": 0,
    "paddingRight": "40rpx",
    "paddingBottom": 0,
    "paddingLeft": "40rpx"
  },
  "text-padding-leftshis": {
    "paddingLeft": "10rpx"
  },
  "text-paddingOrsotwenty": {
    "paddingTop": 0,
    "paddingRight": "20rpx",
    "paddingBottom": 0,
    "paddingLeft": "20rpx"
  },
  "font-size-twenty-four": {
    "fontSize": "24rpx"
  },
  "font-size-twenty-senve": {
    "fontSize": "27rpx"
  },
  "font-size-twenty-flxed": {
    "fontSize": "26rpx"
  },
  "font-size-thirty": {
    "fontSize": "30rpx"
  },
  "font-size-forty": {
    "fontSize": "40rpx"
  },
  "font-size-flivety": {
    "fontSize": "50rpx"
  },
  "border-radiusthirty": {
    "borderRadius": "30rpx"
  },
  "border-radiusfifty": {
    "borderRadius": "50rpx"
  },
  "border-radiusOnehundred": {
    "borderRadius": "100rpx"
  },
  "border-radius-topLeft": {
    "borderTopLeftRadius": "30rpx"
  },
  "border-radius-topright": {
    "borderTopRightRadius": "30rpx"
  },
  "border-size": {
    "borderBottomWidth": "2rpx"
  },
  "border-plice": {
    "borderWidth": "2rpx"
  },
  "border-styles": {
    "borderStyle": "solid"
  },
  "border-Dotted": {
    "borderStyle": "dashed"
  },
  "border-Size": {
    "borderWidth": "2rpx"
  },
  "border-Size-fith": {
    "borderWidth": "5rpx"
  },
  "text-weight": {
    "fontWeight": "bold"
  },
  "icon": {
    "width": "60rpx",
    "height": "60rpx"
  }
}

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.log = log;exports.default = formatLog;function typof(v) {
  var s = Object.prototype.toString.call(v);
  return s.substring(8, s.length - 1);
}

function isDebugMode() {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__;
}

function log(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  console[type].apply(console, args);
}

function formatLog() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args.shift();
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'));
    return console[type].apply(console, args);
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase();

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v) + '---END:JSON---';
      } catch (e) {
        v = '[object object]';
      }
    } else {
      if (v === null) {
        v = '---NULL---';
      } else if (v === undefined) {
        v = '---UNDEFINED---';
      } else {
        var vType = typof(v).toUpperCase();

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
        } else {
          v = String(v);
        }
      }
    }

    return v;
  });
  var msg = '';

  if (msgs.length > 1) {
    var lastMsg = msgs.pop();
    msg = msgs.join('---COMMA---');

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg;
    } else {
      msg += '---COMMA---' + lastMsg;
    }
  } else {
    msg = msgs[0];
  }

  console[type](msg);
}

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/*!**********************************************************************************!*\
  !*** E:/Kafengdichuangshopping/main.js?{"page":"pages%2FLivecover%2FLivecover"} ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dcloudio_uni_stat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dcloudio/uni-stat */ 1);\n/* harmony import */ var _dcloudio_uni_stat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dcloudio_uni_stat__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uni-app-style */ 5);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_Livecover_Livecover_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/Livecover/Livecover.nvue?mpType=page */ 47);\n\n        \n        \n        \n        _pages_Livecover_Livecover_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mpType = 'page'\n        _pages_Livecover_Livecover_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].route = 'pages/Livecover/Livecover'\n        _pages_Livecover_Livecover_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].el = '#root'\n        new Vue(_pages_Livecover_Livecover_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n        //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxRQUFvQztBQUNwQyxRQUE4QjtBQUM5QixRQUFzRTtBQUN0RSxRQUFRLG1GQUFHO0FBQ1gsUUFBUSxtRkFBRztBQUNYLFFBQVEsbUZBQUc7QUFDWCxnQkFBZ0IsbUZBQUciLCJmaWxlIjoiNDYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgICAgaW1wb3J0ICdAZGNsb3VkaW8vdW5pLXN0YXQnO1xuICAgICAgICBpbXBvcnQgJ3VuaS1hcHAtc3R5bGUnXG4gICAgICAgIGltcG9ydCBBcHAgZnJvbSAnLi9wYWdlcy9MaXZlY292ZXIvTGl2ZWNvdmVyLm52dWU/bXBUeXBlPXBhZ2UnXG4gICAgICAgIEFwcC5tcFR5cGUgPSAncGFnZSdcbiAgICAgICAgQXBwLnJvdXRlID0gJ3BhZ2VzL0xpdmVjb3Zlci9MaXZlY292ZXInXG4gICAgICAgIEFwcC5lbCA9ICcjcm9vdCdcbiAgICAgICAgbmV3IFZ1ZShBcHApXG4gICAgICAgICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///46\n");

/***/ }),
/* 47 */
/*!****************************************************************************!*\
  !*** E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?mpType=page ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Livecover.nvue?vue&type=template&id=6b9d24c0&mpType=page */ 48);\n/* harmony import */ var _Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Livecover.nvue?vue&type=script&lang=js&mpType=page */ 50);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 15);\n\nvar renderjs\n\n\nfunction injectStyles (context) {\n  \n  if(!this.options.style){\n          this.options.style = {}\n      }\n      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){\n        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)\n      }\n      if(Vue.prototype.__merge_style){\n                Vue.prototype.__merge_style(__webpack_require__(/*! ./Livecover.nvue?vue&type=style&index=0&lang=css&mpType=page */ 59).default, this.options.style)\n            }else{\n                Object.assign(this.options.style,__webpack_require__(/*! ./Livecover.nvue?vue&type=style&index=0&lang=css&mpType=page */ 59).default)\n            }\n\n}\n\n/* normalize component */\n\nvar component = Object(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  \"1d46e21a\",\n  false,\n  _Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ninjectStyles.call(component)\ncomponent.options.__file = \"E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBa0k7QUFDbEk7QUFDeUU7QUFDTDtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQkFBTyxDQUFDLHNFQUE4RDtBQUNsSCxhQUFhO0FBQ2IsaURBQWlELG1CQUFPLENBQUMsc0VBQThEO0FBQ3ZIOztBQUVBOztBQUVBO0FBQzhLO0FBQzlLLGdCQUFnQix1TEFBVTtBQUMxQixFQUFFLDJGQUFNO0FBQ1IsRUFBRSxnR0FBTTtBQUNSLEVBQUUseUdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsb0dBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDZSxnRiIsImZpbGUiOiI0Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vTGl2ZWNvdmVyLm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NmI5ZDI0YzAmbXBUeXBlPXBhZ2VcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0xpdmVjb3Zlci5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xpdmVjb3Zlci5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmZ1bmN0aW9uIGluamVjdFN0eWxlcyAoY29udGV4dCkge1xuICBcbiAgaWYoIXRoaXMub3B0aW9ucy5zdHlsZSl7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0ge31cbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSAmJiBWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pe1xuICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUoVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fLCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUpe1xuICAgICAgICAgICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9MaXZlY292ZXIubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJm1wVHlwZT1wYWdlXCIpLmRlZmF1bHQsIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLnN0eWxlLHJlcXVpcmUoXCIuL0xpdmVjb3Zlci5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmbXBUeXBlPXBhZ2VcIikuZGVmYXVsdClcbiAgICAgICAgICAgIH1cblxufVxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxydW50aW1lXFxcXGNvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBcIjFkNDZlMjFhXCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkU6L0thZmVuZ2RpY2h1YW5nc2hvcHBpbmcvcGFnZXMvTGl2ZWNvdmVyL0xpdmVjb3Zlci5udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///47\n");

/***/ }),
/* 48 */
/*!**********************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?vue&type=template&id=6b9d24c0&mpType=page ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./Livecover.nvue?vue&type=template&id=6b9d24c0&mpType=page */ 49);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_template_id_6b9d24c0_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 49 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?vue&type=template&id=6b9d24c0&mpType=page ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "scroll-view",
    {
      staticStyle: { flexDirection: "column" },
      attrs: {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true"
      }
    },
    [
      _c(
        "view",
        {
          staticClass: ["livecover"],
          style: {
            width: _vm.windowWidth + "px",
            height: _vm.windowHeight + "px"
          }
        },
        [
          _c("live-pusher", {
            ref: "livePusher",
            style: {
              width: _vm.windowWidth + "px",
              height: _vm.windowHeight + "px"
            },
            attrs: {
              id: "livePusher",
              url: "",
              mode: "SD",
              aspect: "3:2",
              muted: false,
              enableCamera: true,
              autoFocus: true,
              beauty: _vm.beauty,
              whiteness: _vm.whiteness,
              orientation: "vertical",
              audioQuality: "high",
              devicePosition: "front",
              audioReverbType: 1,
              enableMic: true,
              enableAns: true,
              audioVolumeType: "media",
              localMirror: "enable"
            }
          }),
          _c(
            "cover-view",
            {
              staticClass: ["coverfather"],
              style: {
                width: _vm.windowWidth + "px",
                height: _vm.windowHeight + "px",
                "padding-top": _vm.statusBarHeight + "px"
              }
            },
            [
              _c(
                "cover-view",
                { staticClass: ["livecovetop"] },
                [
                  _c(
                    "cover-view",
                    { staticClass: ["livecovetop-left"] },
                    _vm._l(_vm.righticon, function(item, index) {
                      return _c(
                        "cover-view",
                        {
                          key: index,
                          staticClass: ["icon", "iconmargin"],
                          attrs: { dataIndex: index },
                          on: { click: _vm.cameraimgs }
                        },
                        [
                          _c("cover-image", {
                            staticClass: ["icon-imgs"],
                            attrs: { src: item.url }
                          })
                        ],
                        1
                      )
                    }),
                    1
                  ),
                  _c(
                    "cover-view",
                    {
                      staticClass: ["livecovetop-right"],
                      on: { click: _vm.Shutdown }
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["icon-imgs"],
                        attrs: { src: "/static/Pushflow/cha.png" }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _c("livecovemidden", {
                attrs: { windowWidth: _vm.windowWidth },
                on: {
                  coverurl: _vm.coverurl,
                  inpvalue: _vm.inpvalue,
                  nickname: _vm.nickname
                }
              }),
              _c(
                "cover-view",
                {
                  staticClass: [
                    "livecover-bottom",
                    "parent-padding-leftAndright"
                  ],
                  style: {
                    width: _vm.windowWidth + "px",
                    "padding-bottom": _vm.windowBottom + 5 + "px"
                  }
                },
                [
                  _c(
                    "button",
                    {
                      staticClass: [
                        "livecover-btn",
                        "border-radiusOnehundred",
                        "bg-btn-red"
                      ],
                      on: { click: _vm.Begintolive }
                    },
                    [
                      _c(
                        "u-text",
                        { staticClass: ["textcolorwrite", "text-weight"] },
                        [_vm._v("开始直播")]
                      )
                    ]
                  )
                ],
                1
              ),
              _vm.Skincare
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["slider"],
                      style: { top: _vm.windowHeight / 2 + "px" }
                    },
                    [
                      _c(
                        "u-text",
                        {
                          staticClass: [
                            "textcolorwrite",
                            "font-size-thirty",
                            "slidertitletext"
                          ]
                        },
                        [_vm._v("美颜")]
                      ),
                      _c(
                        "button",
                        {
                          staticClass: ["sliderbtn", "bg-btn-red"],
                          attrs: { dataIndextext: "1" },
                          on: { click: _vm.Increaseskin }
                        },
                        [
                          _c(
                            "u-text",
                            {
                              staticClass: ["textcolorwrite", "font-size-forty"]
                            },
                            [_vm._v("+")]
                          )
                        ]
                      ),
                      _c("u-input", {
                        staticClass: [
                          "sliderinp",
                          "textcolorwrite",
                          "text-center",
                          "font-size-thirty",
                          "border-styles",
                          "border-Size"
                        ],
                        attrs: {
                          type: "text",
                          disabled: true,
                          value: _vm.beauty
                        },
                        on: {
                          input: function($event) {
                            _vm.beauty = $event.detail.value
                          }
                        }
                      }),
                      _c(
                        "button",
                        {
                          staticClass: [
                            "sliderbtn",
                            "bg-btn-red",
                            "textcolorwrite"
                          ],
                          attrs: { dataIndextext: "1" },
                          on: { click: _vm.Reduceskin }
                        },
                        [
                          _c(
                            "u-text",
                            {
                              staticClass: ["textcolorwrite", "font-size-forty"]
                            },
                            [_vm._v("-")]
                          )
                        ]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm.Skincare
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["slider"],
                      style: { top: _vm.windowHeight / 2 + "px", right: 0 }
                    },
                    [
                      _c(
                        "u-text",
                        {
                          staticClass: [
                            "textcolorwrite",
                            "font-size-thirty",
                            "slidertitletext"
                          ]
                        },
                        [_vm._v("美白")]
                      ),
                      _c(
                        "button",
                        {
                          staticClass: ["sliderbtn", "bg-btn-red"],
                          attrs: { dataIndextext: "2" },
                          on: { click: _vm.Increaseskin }
                        },
                        [
                          _c(
                            "u-text",
                            {
                              staticClass: ["textcolorwrite", "font-size-forty"]
                            },
                            [_vm._v("+")]
                          )
                        ]
                      ),
                      _c("u-input", {
                        staticClass: [
                          "sliderinp",
                          "textcolorwrite",
                          "text-center",
                          "font-size-thirty",
                          "border-styles",
                          "border-Size"
                        ],
                        attrs: {
                          type: "text",
                          disabled: true,
                          value: _vm.whiteness
                        },
                        on: {
                          input: function($event) {
                            _vm.whiteness = $event.detail.value
                          }
                        }
                      }),
                      _c(
                        "button",
                        {
                          staticClass: [
                            "sliderbtn",
                            "bg-btn-red",
                            "textcolorwrite"
                          ],
                          attrs: { dataIndextext: "2" },
                          on: { click: _vm.Reduceskin }
                        },
                        [
                          _c(
                            "u-text",
                            {
                              staticClass: ["textcolorwrite", "font-size-forty"]
                            },
                            [_vm._v("-")]
                          )
                        ]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 50 */
/*!****************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?vue&type=script&lang=js&mpType=page ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./Livecover.nvue?vue&type=script&lang=js&mpType=page */ 51);\n/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThjLENBQWdCLHVmQUFHLEVBQUMiLCJmaWxlIjoiNTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kIGZyb20gXCItIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/cmVmLS00LTAhRDpcXFxcdW5pLWFwcFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNC0xIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTGl2ZWNvdmVyLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSFEOlxcXFx1bmktYXBwXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3JlZi0tNC0wIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTQtMSFEOlxcXFx1bmktYXBwXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpdmVjb3Zlci5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///50\n");

/***/ }),
/* 51 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?vue&type=script&lang=js&mpType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _livecovemidden = _interopRequireDefault(__webpack_require__(/*! @/components/Livecoverfengmian/livecovemidden.nvue */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n// import livecovetop from \"@/components/Livecoverfengmian/livecovetop.nvue\" \nvar app = getApp();var _default = { //这是直播的封面\n  data: function data() {return { windowWidth: 0, //可使用屏幕的宽度\n      windowHeight: 0, //克数用屏幕的高度\n      beauty: 5, //美颜，取值范围 0-9（iOS取值范围为1） ，0 表示关闭\n      whiteness: 5, //\t美白，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。\n      statusBarHeight: 0, //拿到状态栏高度\n      windowBottom: 0, //距离底部的距离\n      Backcoverurl: \"\", //这是传回来的图片\n      Backinpvalue: \"\", //这是穿回来的value\n      righticon: [{ url: \"/static/Pushflow/Skincare.png\" }, { url: \"/static/Pushflow/Cameratransformation.png\" }], Skincare: false, // 临时变量\n      indexlinshi: 0, storeid: \"\", //为了获得店铺id\n      tokey: \"\", //用户的tokey\n      livenickname: \"\" //用户直播的昵称\n    };}, methods: { dianji: function dianji(e) {e.stopPropagation();}, cameraimgs: function cameraimgs(e) {var indexs = e.currentTarget.dataset.index; // console.log(indexs)\n      if (indexs == 0) {//代表点击了美颜\n        if (this.Skincare) {this.Skincare = false;} else {this.Skincare = true;}} else {//切换前后摄像头\n        this.context.switchCamera();}}, covermodel: function covermodel(msgtitle, msgcotent) {var _this = this;uni.showModal({ title: msgtitle, content: msgcotent, showCancel: true, cancelText: \"稍后直播\", cancelColor: \"#f00\", confirmText: \"继续直播\", confirmColor: \"#0f0\", success: function success(res) {if (res.confirm) {//关闭摄像头预览\n            _this.context.stopPreview(); //开启推流\n            // _this.context.start()\n            // 后面添加参数的是临时的\n            _this.getliveinforoom();}} });}, //封装一个执行上面的模态框的方法\n    Detectionlive: function Detectionlive(_this) {if (_this.Backcoverurl !== \"\" && _this.Backinpvalue !== \"\" && _this.livenickname !== \"\") {//如果两个值不为空的情况下\n        //关闭摄像头预览\n        _this.context.stopPreview(); //开启推流\n        // _this.context.start()\n        //这里为了保存 用户开直播的信息\n        // console.log(_this.tokey)\n        _this.getliveinforoom();} else if (_this.Backcoverurl == \"\") {//如果图片的为空\n        // _this.covermodel('封面图片未选择',\"为了让其他人更好的关注您,请设置封面图片\")\n        app.globalData.showtoastsame(\"封面图片未选择\");return;} else if (_this.Backinpvalue == \"\") {//如果描述为空的情况下\n        // _this.covermodel(\"标题未填写\",\"为了让其他人更好的关注您,请填写标题\")\n        app.globalData.showtoastsame(\"标题未填写\");return;} else if (_this.livenickname == \"\") {// _this.covermodel(\"昵称未填写\",\"为了让其他人更好的关注您,请填写昵称\")\n        app.globalData.showtoastsame(\"昵称未填写\");return;}}, //开始直播\n    Begintolive: function Begintolive() {var _this = this;uni.getNetworkType({ success: function success(res) {if (res.networkType !== \"wifi\" && res.networkType !== \"none\") {//判断用户在不在wifi情况下 并且判断用户的网不在none的情况下\n            uni.showModal({ title: \"\\u60A8\\u6B63\\u5728\\u4F7F\\u7528\".concat(res.networkType, \"\\u7F51\"), content: \"确定要继续直播吗\", showCancel: true, cancelText: \"稍后直播\", cancelColor: \"#f00\", confirmText: \"继续直播\", confirmColor: \"#0f0\", success: function success(reslut) {if (reslut.confirm) {//如果用户选择了继续播放 \n                  _this.Detectionlive(_this);}} });\n\n          } else if (res.networkType == \"none\") {//如果是在美网的情况下\n            app.globalData.showtoastsame(\"网络连接失败,请检查您的网络\");\n          } else {\n            _this.Detectionlive(_this);\n          }\n        },\n        fail: function fail(err) {\n\n        } });\n\n\n    },\n    //点击×的时候\n    Shutdown: function Shutdown() {\n      uni.navigateBack();\n    },\n    //封装个方法 用于请求后台的信息 保存直播间\n    getliveinforoom: function getliveinforoom() {\n      var _this = this;\n      // console.log(_this.tokey,_this.livenickname,_this.Backcoverurl,_this.Backinpvalue,\"这是最后要更改的值\")\n      uni.request({\n        url: \"\".concat(app.globalData.Requestpath, \"live_user/updateLiveUserInfo\"),\n        method: \"POST\",\n        data: {\n          token: _this.tokey,\n          live_nick: _this.livenickname,\n          live_pic: _this.Backcoverurl,\n          live_desc: _this.Backinpvalue,\n          is_living: 1 },\n\n        success: function success(res) {\n          if (res.data.code == 0) {\n            uni.request({\n              url: \"\".concat(app.globalData.Requestpath, \"live_user/getLiveUserInfo\"),\n              method: \"POST\",\n              data: {\n                token: _this.tokey },\n\n              success: function success(resinfo) {\n                // console.log(resinfo)\n                if (resinfo.data.code == 0) {\n                  // console.log(\"已经进来了\")\n                  var _resinfo$data$data = resinfo.data.data,live_url = _resinfo$data$data.live_url,room_id = _resinfo$data$data.room_id,live_nick = _resinfo$data$data.live_nick,live_pic = _resinfo$data$data.live_pic;\n                  // console.log(live_url,room_id,live_nick,live_pic)\n                  uni.redirectTo({\n                    // 后面添加参数的是临时的\n                    url: \"/pages/livestudio/livestudio?storeid=\".concat(_this.storeid, \"&index=\").concat(_this.indexlinshi, \"&beauty=\").concat(_this.beauty, \"&whiteness=\").concat(_this.whiteness, \"&url=\").concat(live_url, \"&roomid=\").concat(room_id, \"&livenick=\").concat(live_nick, \"&livepic=\").concat(live_pic) });\n\n                }\n              } });\n\n          }\n        } });\n\n    },\n\n\n    //这是子组件穿回来的值\n    coverurl: function coverurl(e) {\n      this.Backcoverurl = e;\n      // console.log(this.Backcoverurl)\n    },\n    inpvalue: function inpvalue(e) {\n      this.Backinpvalue = e;\n    },\n    nickname: function nickname(e) {\n      // console.log(e)\n      this.livenickname = e;\n      // console.log(this.livenickname)\n    },\n    //增加美颜\n    Increaseskin: function Increaseskin(e) {\n      var indexs = parseInt(e.currentTarget.dataset.indextext);\n      if (indexs == 1) {//代表美颜\n        this.beauty++;\n        if (this.beauty >= 9) {\n          this.beauty = 9;\n          app.globalData.showtoastsame(\"美颜取值0~9,9代表最高美颜\");\n        }\n      } else {//代表美白\n        this.whiteness++;\n        if (this.whiteness >= 9) {\n          this.whiteness = 9;\n          app.globalData.showtoastsame(\"美白取值0~9,9代表最高美白\");\n        }\n      }\n    },\n    //减少美颜\n    Reduceskin: function Reduceskin(e) {\n      var indexs = parseInt(e.currentTarget.dataset.indextext);\n      if (indexs == 1) {//代表美颜\n        this.beauty--;\n        if (this.beauty <= 0) {\n          this.beauty = 0;\n          app.globalData.showtoastsame(\"美颜取值0~9,0代表无美颜\");\n        }\n      } else {//代表美白\n        this.whiteness--;\n        if (this.whiteness <= 0) {\n          this.whiteness = 0;\n          app.globalData.showtoastsame(\"美白取值0~9,0代表无美白\");\n        }\n      }\n    } },\n\n  created: function created() {\n    var _this = this;\n    uni.getSystemInfo({\n      success: function success(res) {\n        _this.statusBarHeight = res.statusBarHeight;\n        _this.windowWidth = res.screenWidth;\n        _this.windowHeight = res.screenHeight;\n        _this.windowBottom = res.windowBottom;\n      } });\n\n    // uni.getLocation({\n    // \tsuccess(res) {\n    // \t\t// console.log(res)\n    // \t\t uni.openLocation({\n    // \t\t\t latitude:res.latitude,\n    // \t\t\t longitude:res.longitude,\n    // \t\t\t success(reslocationicon) {\n    // \t\t\t \tconsole.log(reslocationicon)\n    // \t\t\t }\n    // \t\t })\n    // \t}\n    // })\n  },\n  onShow: function onShow() {\n\n  },\n  onReady: function onReady() {\n    this.context = uni.createLivePusherContext(\"livePusher\", this);\n    // console.log(this.context)\n    // console.log(this.context)\n    //开启推流\n    // this.context.start()\n    //开启摄像头预览\n    this.context.startPreview();\n\n  },\n  components: {\n    livecovemidden: _livecovemidden.default },\n\n  onLoad: function onLoad(opction) {\n    var _this = this;var\n    index = opction.index,storeid = opction.storeid;\n    _this.storeid = storeid;\n    _this.indexlinshi = index;\n    uni.getStorage({\n      key: \"bindtokey\",\n      success: function success(restokey) {\n        _this.tokey = restokey.data;\n      } });\n\n  } };exports.default = _default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvTGl2ZWNvdmVyL0xpdmVjb3Zlci5udnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThFQSxnSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREE7QUFFQSxtQixlQUNBO0FBQ0EsTUFEQSxrQkFDQSxDQUNBLFNBQ0EsY0FEQSxFQUNBO0FBQ0EscUJBRkEsRUFFQTtBQUNBLGVBSEEsRUFHQTtBQUNBLGtCQUpBLEVBSUE7QUFDQSx3QkFMQSxFQUtBO0FBQ0EscUJBTkEsRUFNQTtBQUNBLHNCQVBBLEVBT0E7QUFDQSxzQkFSQSxFQVFBO0FBQ0Esa0JBQ0EsRUFDQSxvQ0FEQSxFQURBLEVBSUEsRUFDQSxnREFEQSxFQUpBLENBVEEsRUFpQkEsZUFqQkEsRUFrQkE7QUFDQSxvQkFuQkEsRUFvQkEsV0FwQkEsRUFvQkE7QUFDQSxlQXJCQSxFQXFCQTtBQUNBLHNCQXRCQSxDQXNCQTtBQXRCQSxNQXdCQSxDQTFCQSxFQTJCQSxXQUNBLE1BREEsa0JBQ0EsQ0FEQSxFQUNBLENBQ0Esb0JBQ0EsQ0FIQSxFQUlBLFVBSkEsc0JBSUEsQ0FKQSxFQUlBLENBQ0EsMkNBREEsQ0FFQTtBQUNBO0FBQ0EsNEJBQ0Esc0JBQ0EsQ0FGQSxNQUVBLENBQ0EscUJBQ0EsQ0FDQSxDQU5BLE1BTUEsQ0FDQTtBQUNBLG9DQUNBLENBQ0EsQ0FqQkEsRUFrQkEsVUFsQkEsc0JBa0JBLFFBbEJBLEVBa0JBLFNBbEJBLEVBa0JBLENBQ0EsaUJBQ0EsZ0JBQ0EsZUFEQSxFQUVBLGtCQUZBLEVBR0EsZ0JBSEEsRUFJQSxrQkFKQSxFQUtBLG1CQUxBLEVBTUEsbUJBTkEsRUFPQSxvQkFQQSxFQVFBLE9BUkEsbUJBUUEsR0FSQSxFQVFBLENBQ0Esa0JBQ0E7QUFDQSx3Q0FGQSxDQUdBO0FBQ0E7QUFDQTtBQUNBLG9DQUNBLENBQ0EsQ0FqQkEsSUFtQkEsQ0F2Q0EsRUF3Q0E7QUFDQSxpQkF6Q0EseUJBeUNBLEtBekNBLEVBeUNBLENBQ0E7QUFDQTtBQUNBLG9DQUZBLENBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FDQSxDQVJBLE1BUUE7QUFDQTtBQUNBLGdEQUNBLE9BQ0EsQ0FKQSxNQUlBO0FBQ0E7QUFDQSw4Q0FDQSxPQUNBLENBSkEsTUFJQSwrQkFDQTtBQUNBLDhDQUNBLE9BQ0EsQ0FDQSxDQS9EQSxFQWdFQTtBQUNBLGVBakVBLHlCQWlFQSxDQUNBLGlCQUNBLHFCQUNBLE9BREEsbUJBQ0EsR0FEQSxFQUNBLENBQ0E7QUFDQSw0QkFDQSx5RUFEQSxFQUVBLG1CQUZBLEVBR0EsZ0JBSEEsRUFJQSxrQkFKQSxFQUtBLG1CQUxBLEVBTUEsbUJBTkEsRUFPQSxvQkFQQSxFQVFBLE9BUkEsbUJBUUEsTUFSQSxFQVFBLENBQ0E7QUFDQSw2Q0FDQSxDQUNBLENBWkE7O0FBY0EsV0FmQSxNQWVBO0FBQ0E7QUFDQSxXQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EsU0F0QkE7QUF1QkEsWUF2QkEsZ0JBdUJBLEdBdkJBLEVBdUJBOztBQUVBLFNBekJBOzs7QUE0QkEsS0EvRkE7QUFnR0E7QUFDQSxZQWpHQSxzQkFpR0E7QUFDQTtBQUNBLEtBbkdBO0FBb0dBO0FBQ0EsbUJBckdBLDZCQXFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQURBO0FBRUEsc0JBRkE7QUFHQTtBQUNBLDRCQURBO0FBRUEsdUNBRkE7QUFHQSxzQ0FIQTtBQUlBLHVDQUpBO0FBS0Esc0JBTEEsRUFIQTs7QUFVQSxlQVZBLG1CQVVBLEdBVkEsRUFVQTtBQUNBO0FBQ0E7QUFDQSxxRkFEQTtBQUVBLDRCQUZBO0FBR0E7QUFDQSxrQ0FEQSxFQUhBOztBQU1BLHFCQU5BLG1CQU1BLE9BTkEsRUFNQTtBQUNBO0FBQ0E7QUFDQTtBQURBLDJDQUVBLGlCQUZBLENBRUEsUUFGQSxzQkFFQSxRQUZBLENBRUEsT0FGQSxzQkFFQSxPQUZBLENBRUEsU0FGQSxzQkFFQSxTQUZBLENBRUEsUUFGQSxzQkFFQSxRQUZBO0FBR0E7QUFDQTtBQUNBO0FBQ0EsdVRBRkE7O0FBSUE7QUFDQSxlQWpCQTs7QUFtQkE7QUFDQSxTQWhDQTs7QUFrQ0EsS0ExSUE7OztBQTZJQTtBQUNBLFlBOUlBLG9CQThJQSxDQTlJQSxFQThJQTtBQUNBO0FBQ0E7QUFDQSxLQWpKQTtBQWtKQSxZQWxKQSxvQkFrSkEsQ0FsSkEsRUFrSkE7QUFDQTtBQUNBLEtBcEpBO0FBcUpBLFlBckpBLG9CQXFKQSxDQXJKQSxFQXFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBekpBO0FBMEpBO0FBQ0EsZ0JBM0pBLHdCQTJKQSxDQTNKQSxFQTJKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FOQSxNQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0ExS0E7QUEyS0E7QUFDQSxjQTVLQSxzQkE0S0EsQ0E1S0EsRUE0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BTkEsTUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBM0xBLEVBM0JBOztBQXdOQSxTQXhOQSxxQkF3TkE7QUFDQTtBQUNBO0FBQ0EsYUFEQSxtQkFDQSxHQURBLEVBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BTkE7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0E5T0E7QUErT0EsUUEvT0Esb0JBK09BOztBQUVBLEdBalBBO0FBa1BBLFNBbFBBLHFCQWtQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBM1BBO0FBNFBBO0FBQ0EsMkNBREEsRUE1UEE7O0FBK1BBLFFBL1BBLGtCQStQQSxPQS9QQSxFQStQQTtBQUNBLHFCQURBO0FBRUEsU0FGQSxHQUVBLE9BRkEsQ0FFQSxLQUZBLENBRUEsT0FGQSxHQUVBLE9BRkEsQ0FFQSxPQUZBO0FBR0E7QUFDQTtBQUNBO0FBQ0Esc0JBREE7QUFFQSxhQUZBLG1CQUVBLFFBRkEsRUFFQTtBQUNBO0FBQ0EsT0FKQTs7QUFNQSxHQTFRQSxFIiwiZmlsZSI6IjUxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gPCEtLSAjaWZkZWYgQVBQLVBMVVMgLS0+XG5cdDx2aWV3IGNsYXNzPVwibGl2ZWNvdmVyXCIgOnN0eWxlPVwie3dpZHRoOndpbmRvd1dpZHRoKydweCcsaGVpZ2h0OndpbmRvd0hlaWdodCsncHgnfVwiPlxyXG5cdFx0PCEtLei/meaYr+ebtOaSreaOqOa1gee7hOS7tiAtLT5cblx0XHQ8bGl2ZS1wdXNoZXIgXHJcblx0XHRcdGlkPSdsaXZlUHVzaGVyJyBcclxuXHRcdFx0cmVmPVwibGl2ZVB1c2hlclwiXHJcblx0XHRcdHVybD1cIlwiXHJcblx0XHRcdG1vZGU9XCJTRFwiXHJcblx0XHRcdGFzcGVjdD1cIjM6MlwiXHJcblx0XHRcdDptdXRlZD1cImZhbHNlXCJcclxuXHRcdFx0OmVuYWJsZS1jYW1lcmE9XCJ0cnVlXCJcclxuXHRcdFx0OmF1dG8tZm9jdXM9XCJ0cnVlXCJcclxuXHRcdFx0OmJlYXV0eT1cImJlYXV0eVwiXHJcblx0XHRcdDp3aGl0ZW5lc3M9XCJ3aGl0ZW5lc3NcIlxyXG5cdFx0XHRvcmllbnRhdGlvbj1cInZlcnRpY2FsXCJcclxuXHRcdFx0YXVkaW8tcXVhbGl0eT1cImhpZ2hcIlxyXG5cdFx0XHRkZXZpY2UtcG9zaXRpb249XCJmcm9udFwiXHJcblx0XHRcdDphdWRpby1yZXZlcmItdHlwZT1cIjFcIlxyXG5cdFx0XHQ6ZW5hYmxlLW1pYz1cInRydWVcIlxyXG5cdFx0XHQ6ZW5hYmxlLWFucz1cInRydWVcIlxyXG5cdFx0XHRhdWRpby12b2x1bWUtdHlwZT1cIm1lZGlhXCJcclxuXHRcdFx0bG9jYWwtbWlycm9yPVwiZW5hYmxlXCJcclxuXHRcdFx0OnN0eWxlPVwie3dpZHRoOndpbmRvd1dpZHRoKydweCcsaGVpZ2h0OndpbmRvd0hlaWdodCsncHgnfVwiXHJcblx0XHQ+XHJcblx0XHQ8L2xpdmUtcHVzaGVyPlxyXG5cdFx0PGNvdmVyLXZpZXcgY2xhc3M9XCJjb3ZlcmZhdGhlclwiIDpzdHlsZT1cInt3aWR0aDp3aW5kb3dXaWR0aCsncHgnLGhlaWdodDp3aW5kb3dIZWlnaHQrJ3B4JywncGFkZGluZy10b3AnOnN0YXR1c0JhckhlaWdodCsncHgnfVwiPlxyXG5cdFx0XHQ8IS0tIDxsaXZlY292ZXRvcD48L2xpdmVjb3ZldG9wPiAtLT5cclxuXHRcdFx0PGNvdmVyLXZpZXcgY2xhc3M9XCJsaXZlY292ZXRvcFwiPlxyXG5cdFx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwibGl2ZWNvdmV0b3AtbGVmdFwiPlxyXG5cdFx0XHRcdFx0PGNvdmVyLXZpZXcgY2xhc3M9XCJpY29uIGljb25tYXJnaW5cIiB2LWZvcj1cIihpdGVtLGluZGV4KSBpbiByaWdodGljb25cIiA6a2V5PVwiaW5kZXhcIiA6ZGF0YS1pbmRleD1cImluZGV4XCIgQGNsaWNrPVwiY2FtZXJhaW1nc1wiPlxyXG5cdFx0XHRcdFx0XHQ8Y292ZXItaW1hZ2UgY2xhc3M9XCJpY29uLWltZ3NcIiA6c3JjPVwiaXRlbS51cmxcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHRcdFx0PC9jb3Zlci12aWV3PlxyXG5cdFx0XHRcdDwvY292ZXItdmlldz5cclxuXHRcdFx0XHQ8Y292ZXItdmlldyBjbGFzcz1cImxpdmVjb3ZldG9wLXJpZ2h0XCIgQGNsaWNrPVwiU2h1dGRvd25cIj5cclxuXHRcdFx0XHRcdDxjb3Zlci1pbWFnZSBzcmM9XCIvc3RhdGljL1B1c2hmbG93L2NoYS5wbmdcIiBjbGFzcz1cImljb24taW1nc1wiPjwvY292ZXItaW1hZ2U+XHJcblx0XHRcdFx0PC9jb3Zlci12aWV3PlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxsaXZlY292ZW1pZGRlbiA6d2luZG93V2lkdGg9XCJ3aW5kb3dXaWR0aFwiIEBjb3ZlcnVybD1cImNvdmVydXJsXCIgQGlucHZhbHVlPVwiaW5wdmFsdWVcIiBAbmlja25hbWU9XCJuaWNrbmFtZVwiPjwvbGl2ZWNvdmVtaWRkZW4+XHJcblx0XHRcdDwhLS0g5LiK6Z2i55qE5Lik5Liq57uE5Lu25pyA5ZCO57uZ54i257uE5Lu2IOaKiuaOpeS4i+adpeeahOaMiemSrueVmee7meeItue7hOS7tiDov5nmoLflsLHog73lsJHkuobkuIDmraXkvKDlgLwgLS0+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwibGl2ZWNvdmVyLWJvdHRvbSBwYXJlbnQtcGFkZGluZy1sZWZ0QW5kcmlnaHRcIiA6c3R5bGU9XCJ7d2lkdGg6d2luZG93V2lkdGgrJ3B4JywncGFkZGluZy1ib3R0b20nOih3aW5kb3dCb3R0b20rNSkrJ3B4J31cIj5cclxuXHRcdFx0XHQ8IS0tIDxjb3Zlci12aWV3IGNsYXNzPVwibG9jYXRpb25cIj5cclxuXHRcdFx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cImxvY2F0aW9uaWNvbiBpY29uXCIgc3JjPVwiL3N0YXRpYy9QdXNoZmxvdy9sb2NhdGlvbi5wbmdcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJsb2NhdGlvbmljb250ZXh0IHRleHRjb2xvcndyaXRlIGZvbnQtc2l6ZS10aGlydHlcIj7lvrflt57luII8L3RleHQ+XHJcblx0XHRcdFx0PC9jb3Zlci12aWV3PiAtLT5cclxuXHRcdFx0XHQ8IS0tIOi/meaYr+ebtOaSreeahOaMiemSriAtLT5cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwibGl2ZWNvdmVyLWJ0biBib3JkZXItcmFkaXVzT25laHVuZHJlZCBiZy1idG4tcmVkXCIgQHRhcD1cIkJlZ2ludG9saXZlXCI+XHJcblx0XHRcdFx0XHQ8dGV4dCBjbGFzcz1cInRleHRjb2xvcndyaXRlIHRleHQtd2VpZ2h0XCI+5byA5aeL55u05pKtPC90ZXh0PlxyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwic2xpZGVyXCIgOnN0eWxlPVwie3RvcDood2luZG93SGVpZ2h0LzIpKydweCd9XCIgIHYtaWY9XCJTa2luY2FyZVwiPlxyXG5cdFx0XHRcdDx0ZXh0IGNsYXNzPVwidGV4dGNvbG9yd3JpdGUgZm9udC1zaXplLXRoaXJ0eSBzbGlkZXJ0aXRsZXRleHRcIj7nvo7popw8L3RleHQ+XHJcblx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInNsaWRlcmJ0biBiZy1idG4tcmVkXCIgQGNsaWNrPVwiSW5jcmVhc2Vza2luXCIgZGF0YS1pbmRleHRleHQ9XCIxXCI+XHJcblx0XHRcdFx0XHQ8dGV4dCBjbGFzcz1cInRleHRjb2xvcndyaXRlIGZvbnQtc2l6ZS1mb3J0eVwiPis8L3RleHQ+XHJcblx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzbGlkZXJpbnAgdGV4dGNvbG9yd3JpdGUgdGV4dC1jZW50ZXIgZm9udC1zaXplLXRoaXJ0eSBib3JkZXItc3R5bGVzIGJvcmRlci1TaXplXCIgdi1tb2RlbD1cImJlYXV0eVwiIDpkaXNhYmxlZD1cInRydWVcIiAvPlxyXG5cdFx0XHRcdDxidXR0b24gY2xhc3M9XCJzbGlkZXJidG4gYmctYnRuLXJlZCB0ZXh0Y29sb3J3cml0ZVwiIEBjbGljaz1cIlJlZHVjZXNraW5cIiBkYXRhLWluZGV4dGV4dD1cIjFcIj5cclxuXHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwidGV4dGNvbG9yd3JpdGUgZm9udC1zaXplLWZvcnR5XCI+LTwvdGV4dD5cclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9jb3Zlci12aWV3PlxyXG5cdFx0XHQ8Y292ZXItdmlldyBjbGFzcz1cInNsaWRlclwiIDpzdHlsZT1cInt0b3A6KHdpbmRvd0hlaWdodC8yKSsncHgnLHJpZ2h0OjB9XCIgdi1pZj1cIlNraW5jYXJlXCI+XHJcblx0XHRcdFx0PHRleHQgY2xhc3M9XCJ0ZXh0Y29sb3J3cml0ZSBmb250LXNpemUtdGhpcnR5IHNsaWRlcnRpdGxldGV4dFwiPue+jueZvTwvdGV4dD5cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwic2xpZGVyYnRuIGJnLWJ0bi1yZWRcIiBAY2xpY2s9XCJJbmNyZWFzZXNraW5cIiBkYXRhLWluZGV4dGV4dD1cIjJcIj5cclxuXHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwidGV4dGNvbG9yd3JpdGUgZm9udC1zaXplLWZvcnR5XCI+KzwvdGV4dD5cclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInNsaWRlcmlucCB0ZXh0Y29sb3J3cml0ZSB0ZXh0LWNlbnRlciBmb250LXNpemUtdGhpcnR5IGJvcmRlci1zdHlsZXMgYm9yZGVyLVNpemVcIiB2LW1vZGVsPVwid2hpdGVuZXNzXCIgOmRpc2FibGVkPVwidHJ1ZVwiIC8+XHJcblx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInNsaWRlcmJ0biBiZy1idG4tcmVkIHRleHRjb2xvcndyaXRlXCIgQGNsaWNrPVwiUmVkdWNlc2tpblwiIGRhdGEtaW5kZXh0ZXh0PVwiMlwiPlxyXG5cdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJ0ZXh0Y29sb3J3cml0ZSBmb250LXNpemUtZm9ydHlcIj4tPC90ZXh0PlxyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHQ8L2NvdmVyLXZpZXc+XG5cdDwvdmlldz5cclxuXHQ8IS0tICNlbmRpZiAtLT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XHJcblx0Ly8gI2lmZGVmIEFQUC1QTFVTXHJcblx0Ly8gaW1wb3J0IGxpdmVjb3ZldG9wIGZyb20gXCJAL2NvbXBvbmVudHMvTGl2ZWNvdmVyZmVuZ21pYW4vbGl2ZWNvdmV0b3AubnZ1ZVwiIFxyXG5cdGltcG9ydCBsaXZlY292ZW1pZGRlbiBmcm9tIFwiQC9jb21wb25lbnRzL0xpdmVjb3ZlcmZlbmdtaWFuL2xpdmVjb3ZlbWlkZGVuLm52dWVcIlxyXG5cdGNvbnN0IGFwcCA9IGdldEFwcCgpXG5cdGV4cG9ydCBkZWZhdWx0IHsvL+i/meaYr+ebtOaSreeahOWwgemdolxuXHRcdGRhdGEoKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR3aW5kb3dXaWR0aDowLC8v5Y+v5L2/55So5bGP5bmV55qE5a695bqmXHJcblx0XHRcdFx0d2luZG93SGVpZ2h0OjAsLy/lhYvmlbDnlKjlsY/luZXnmoTpq5jluqZcclxuXHRcdFx0XHRiZWF1dHk6NSwvL+e+juminO+8jOWPluWAvOiMg+WbtCAwLTnvvIhpT1Plj5blgLzojIPlm7TkuLox77yJIO+8jDAg6KGo56S65YWz6ZetXHJcblx0XHRcdFx0d2hpdGVuZXNzOjUsLy9cdOe+jueZve+8jOWPluWAvOiMg+WbtCAwLTnvvIhpT1Plj5blgLzojIPlm7TkuLox77yJIO+8jDAg6KGo56S65YWz6Zet44CCXHJcblx0XHRcdFx0c3RhdHVzQmFySGVpZ2h0OjAsLy/mi7/liLDnirbmgIHmoI/pq5jluqZcclxuXHRcdFx0XHR3aW5kb3dCb3R0b206MCwvL+i3neemu+W6lemDqOeahOi3neemu1xyXG5cdFx0XHRcdEJhY2tjb3ZlcnVybDpcIlwiLC8v6L+Z5piv5Lyg5Zue5p2l55qE5Zu+54mHXHJcblx0XHRcdFx0QmFja2lucHZhbHVlOlwiXCIsLy/ov5nmmK/nqb/lm57mnaXnmoR2YWx1ZVxyXG5cdFx0XHRcdHJpZ2h0aWNvbjpbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHVybDpcIi9zdGF0aWMvUHVzaGZsb3cvU2tpbmNhcmUucG5nXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHVybDpcIi9zdGF0aWMvUHVzaGZsb3cvQ2FtZXJhdHJhbnNmb3JtYXRpb24ucG5nXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdLFxyXG5cdFx0XHRcdFNraW5jYXJlOmZhbHNlLFxyXG5cdFx0XHRcdC8vIOS4tOaXtuWPmOmHj1xyXG5cdFx0XHRcdGluZGV4bGluc2hpOjAsXHJcblx0XHRcdFx0c3RvcmVpZDpcIlwiLC8v5Li65LqG6I635b6X5bqX6ZO6aWRcclxuXHRcdFx0XHR0b2tleTpcIlwiLC8v55So5oi355qEdG9rZXlcclxuXHRcdFx0XHRsaXZlbmlja25hbWU6XCJcIiwvL+eUqOaIt+ebtOaSreeahOaYteensFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0bWV0aG9kczoge1xuXHRcdFx0ZGlhbmppKGUpe1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FtZXJhaW1ncyhlKXtcclxuXHRcdFx0XHRsZXQgaW5kZXhzID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhpbmRleHMpXHJcblx0XHRcdFx0aWYoaW5kZXhzPT0wKXsvL+S7o+ihqOeCueWHu+S6hue+juminFxyXG5cdFx0XHRcdFx0aWYodGhpcy5Ta2luY2FyZSl7XHJcblx0XHRcdFx0XHRcdHRoaXMuU2tpbmNhcmUgPSBmYWxzZVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdHRoaXMuU2tpbmNhcmUgPSB0cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHQvL+WIh+aNouWJjeWQjuaRhOWDj+WktFxyXG5cdFx0XHRcdFx0dGhpcy5jb250ZXh0LnN3aXRjaENhbWVyYSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb3Zlcm1vZGVsKG1zZ3RpdGxlLG1zZ2NvdGVudCl7XHJcblx0XHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzXHJcblx0XHRcdFx0dW5pLnNob3dNb2RhbCh7XHJcblx0XHRcdFx0XHR0aXRsZTptc2d0aXRsZSxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6bXNnY290ZW50LFxyXG5cdFx0XHRcdFx0c2hvd0NhbmNlbDp0cnVlLFxyXG5cdFx0XHRcdFx0Y2FuY2VsVGV4dDpcIueojeWQjuebtOaSrVwiLFxyXG5cdFx0XHRcdFx0Y2FuY2VsQ29sb3I6XCIjZjAwXCIsXHJcblx0XHRcdFx0XHRjb25maXJtVGV4dDpcIue7p+e7reebtOaSrVwiLFxyXG5cdFx0XHRcdFx0Y29uZmlybUNvbG9yOlwiIzBmMFwiLFxyXG5cdFx0XHRcdFx0c3VjY2VzcyhyZXMpe1xyXG5cdFx0XHRcdFx0XHRpZihyZXMuY29uZmlybSl7XHJcblx0XHRcdFx0XHRcdFx0Ly/lhbPpl63mkYTlg4/lpLTpooTop4hcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jb250ZXh0LnN0b3BQcmV2aWV3KClcclxuXHRcdFx0XHRcdFx0XHQvL+W8gOWQr+aOqOa1gVxyXG5cdFx0XHRcdFx0XHRcdC8vIF90aGlzLmNvbnRleHQuc3RhcnQoKVxyXG5cdFx0XHRcdFx0XHRcdC8vIOWQjumdoua3u+WKoOWPguaVsOeahOaYr+S4tOaXtueahFxyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmdldGxpdmVpbmZvcm9vbSgpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL+WwgeijheS4gOS4quaJp+ihjOS4iumdoueahOaooeaAgeahhueahOaWueazlVxyXG5cdFx0XHREZXRlY3Rpb25saXZlKF90aGlzKXtcclxuXHRcdFx0XHRpZihfdGhpcy5CYWNrY292ZXJ1cmwhPT1cIlwiICYmIF90aGlzLkJhY2tpbnB2YWx1ZSE9PVwiXCIgJiYgX3RoaXMubGl2ZW5pY2tuYW1lIT09XCJcIil7Ly/lpoLmnpzkuKTkuKrlgLzkuI3kuLrnqbrnmoTmg4XlhrXkuItcclxuXHRcdFx0XHRcdC8v5YWz6Zet5pGE5YOP5aS06aKE6KeIXHJcblx0XHRcdFx0XHRfdGhpcy5jb250ZXh0LnN0b3BQcmV2aWV3KClcclxuXHRcdFx0XHRcdC8v5byA5ZCv5o6o5rWBXHJcblx0XHRcdFx0XHQvLyBfdGhpcy5jb250ZXh0LnN0YXJ0KClcclxuXHRcdFx0XHRcdC8v6L+Z6YeM5Li65LqG5L+d5a2YIOeUqOaIt+W8gOebtOaSreeahOS/oeaBr1xyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coX3RoaXMudG9rZXkpXHJcblx0XHRcdFx0XHRfdGhpcy5nZXRsaXZlaW5mb3Jvb20oKVxyXG5cdFx0XHRcdH1lbHNlIGlmKF90aGlzLkJhY2tjb3ZlcnVybD09XCJcIil7Ly/lpoLmnpzlm77niYfnmoTkuLrnqbpcclxuXHRcdFx0XHRcdC8vIF90aGlzLmNvdmVybW9kZWwoJ+WwgemdouWbvueJh+acqumAieaLqScsXCLkuLrkuoborqnlhbbku5bkurrmm7Tlpb3nmoTlhbPms6jmgqgs6K+36K6+572u5bCB6Z2i5Zu+54mHXCIpXHJcblx0XHRcdFx0XHRhcHAuZ2xvYmFsRGF0YS5zaG93dG9hc3RzYW1lKFwi5bCB6Z2i5Zu+54mH5pyq6YCJ5oupXCIpXHJcblx0XHRcdFx0XHRyZXR1cm4gXHJcblx0XHRcdFx0fWVsc2UgaWYoX3RoaXMuQmFja2lucHZhbHVlPT1cIlwiKXsvL+WmguaenOaPj+i/sOS4uuepuueahOaDheWGteS4i1xyXG5cdFx0XHRcdFx0Ly8gX3RoaXMuY292ZXJtb2RlbChcIuagh+mimOacquWhq+WGmVwiLFwi5Li65LqG6K6p5YW25LuW5Lq65pu05aW955qE5YWz5rOo5oKoLOivt+Whq+WGmeagh+mimFwiKVxyXG5cdFx0XHRcdFx0YXBwLmdsb2JhbERhdGEuc2hvd3RvYXN0c2FtZShcIuagh+mimOacquWhq+WGmVwiKVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fWVsc2UgaWYoX3RoaXMubGl2ZW5pY2tuYW1lPT1cIlwiKXtcclxuXHRcdFx0XHRcdC8vIF90aGlzLmNvdmVybW9kZWwoXCLmmLXnp7DmnKrloavlhplcIixcIuS4uuS6huiuqeWFtuS7luS6uuabtOWlveeahOWFs+azqOaCqCzor7floavlhpnmmLXnp7BcIilcclxuXHRcdFx0XHRcdGFwcC5nbG9iYWxEYXRhLnNob3d0b2FzdHNhbWUoXCLmmLXnp7DmnKrloavlhplcIilcclxuXHRcdFx0XHRcdHJldHVybiBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdC8v5byA5aeL55u05pKtXHJcblx0XHRcdEJlZ2ludG9saXZlKCl7XHJcblx0XHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzXHJcblx0XHRcdFx0dW5pLmdldE5ldHdvcmtUeXBlKHtcclxuXHRcdFx0XHRcdHN1Y2Nlc3MocmVzKSB7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5uZXR3b3JrVHlwZSE9PVwid2lmaVwiICYmIHJlcy5uZXR3b3JrVHlwZSE9PVwibm9uZVwiKXsvL+WIpOaWreeUqOaIt+WcqOS4jeWcqHdpZmnmg4XlhrXkuIsg5bm25LiU5Yik5pat55So5oi355qE572R5LiN5Zyobm9uZeeahOaDheWGteS4i1xyXG5cdFx0XHRcdFx0XHRcdHVuaS5zaG93TW9kYWwoe1xyXG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6YOaCqOato+WcqOS9v+eUqCR7cmVzLm5ldHdvcmtUeXBlfee9kWAsXHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZW50Olwi56Gu5a6a6KaB57un57ut55u05pKt5ZCXXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRzaG93Q2FuY2VsOnRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRjYW5jZWxUZXh0Olwi56iN5ZCO55u05pKtXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRjYW5jZWxDb2xvcjpcIiNmMDBcIixcclxuXHRcdFx0XHRcdFx0XHRcdGNvbmZpcm1UZXh0Olwi57un57ut55u05pKtXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRjb25maXJtQ29sb3I6XCIjMGYwXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzKHJlc2x1dCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZihyZXNsdXQuY29uZmlybSl7Ly/lpoLmnpznlKjmiLfpgInmi6nkuobnu6fnu63mkq3mlL4gXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMuRGV0ZWN0aW9ubGl2ZShfdGhpcylcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH1lbHNlIGlmKHJlcy5uZXR3b3JrVHlwZT09XCJub25lXCIpey8v5aaC5p6c5piv5Zyo576O572R55qE5oOF5Ya15LiLXHJcblx0XHRcdFx0XHRcdFx0YXBwLmdsb2JhbERhdGEuc2hvd3RvYXN0c2FtZShcIue9kee7nOi/nuaOpeWksei0pSzor7fmo4Dmn6XmgqjnmoTnvZHnu5xcIilcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuRGV0ZWN0aW9ubGl2ZShfdGhpcylcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGZhaWwoZXJyKXtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRcclxuXHRcdFx0fSxcclxuXHRcdFx0Ly/ngrnlh7vDl+eahOaXtuWAmVxyXG5cdFx0XHRTaHV0ZG93bigpe1xyXG5cdFx0XHRcdHVuaS5uYXZpZ2F0ZUJhY2soKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL+WwgeijheS4quaWueazlSDnlKjkuo7or7fmsYLlkI7lj7DnmoTkv6Hmga8g5L+d5a2Y55u05pKt6Ze0XHJcblx0XHRcdGdldGxpdmVpbmZvcm9vbSgpe1xyXG5cdFx0XHRcdGNvbnN0IF90aGlzID0gdGhpc1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKF90aGlzLnRva2V5LF90aGlzLmxpdmVuaWNrbmFtZSxfdGhpcy5CYWNrY292ZXJ1cmwsX3RoaXMuQmFja2lucHZhbHVlLFwi6L+Z5piv5pyA5ZCO6KaB5pu05pS555qE5YC8XCIpXHJcblx0XHRcdFx0dW5pLnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0dXJsOmAke2FwcC5nbG9iYWxEYXRhLlJlcXVlc3RwYXRofWxpdmVfdXNlci91cGRhdGVMaXZlVXNlckluZm9gLFxyXG5cdFx0XHRcdFx0bWV0aG9kOlwiUE9TVFwiLFxyXG5cdFx0XHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0XHRcdHRva2VuOl90aGlzLnRva2V5LFxyXG5cdFx0XHRcdFx0XHRsaXZlX25pY2s6X3RoaXMubGl2ZW5pY2tuYW1lLFxyXG5cdFx0XHRcdFx0XHRsaXZlX3BpYzpfdGhpcy5CYWNrY292ZXJ1cmwsXHJcblx0XHRcdFx0XHRcdGxpdmVfZGVzYzpfdGhpcy5CYWNraW5wdmFsdWUsXHJcblx0XHRcdFx0XHRcdGlzX2xpdmluZzoxXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0c3VjY2VzcyhyZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYocmVzLmRhdGEuY29kZT09MCl7XHJcblx0XHRcdFx0XHRcdFx0dW5pLnJlcXVlc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdFx0dXJsOmAke2FwcC5nbG9iYWxEYXRhLlJlcXVlc3RwYXRofWxpdmVfdXNlci9nZXRMaXZlVXNlckluZm9gLFxyXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kOlwiUE9TVFwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRva2VuOl90aGlzLnRva2V5XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0c3VjY2VzcyhyZXNpbmZvKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc2luZm8pXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKHJlc2luZm8uZGF0YS5jb2RlPT0wKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcIuW3sue7j+i/m+adpeS6hlwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCB7bGl2ZV91cmwscm9vbV9pZCxsaXZlX25pY2ssbGl2ZV9waWN9ID0gcmVzaW5mby5kYXRhLmRhdGFcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhsaXZlX3VybCxyb29tX2lkLGxpdmVfbmljayxsaXZlX3BpYylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1bmkucmVkaXJlY3RUbyh7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyDlkI7pnaLmt7vliqDlj4LmlbDnmoTmmK/kuLTml7bnmoRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVybDpgL3BhZ2VzL2xpdmVzdHVkaW8vbGl2ZXN0dWRpbz9zdG9yZWlkPSR7X3RoaXMuc3RvcmVpZH0maW5kZXg9JHtfdGhpcy5pbmRleGxpbnNoaX0mYmVhdXR5PSR7X3RoaXMuYmVhdXR5fSZ3aGl0ZW5lc3M9JHtfdGhpcy53aGl0ZW5lc3N9JnVybD0ke2xpdmVfdXJsfSZyb29taWQ9JHtyb29tX2lkfSZsaXZlbmljaz0ke2xpdmVfbmlja30mbGl2ZXBpYz0ke2xpdmVfcGljfWBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0Ly/ov5nmmK/lrZDnu4Tku7bnqb/lm57mnaXnmoTlgLxcclxuXHRcdFx0Y292ZXJ1cmwoZSl7XHJcblx0XHRcdFx0dGhpcy5CYWNrY292ZXJ1cmwgPSBlXHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2codGhpcy5CYWNrY292ZXJ1cmwpXHJcblx0XHRcdH0sXHJcblx0XHRcdGlucHZhbHVlKGUpe1xyXG5cdFx0XHRcdHRoaXMuQmFja2lucHZhbHVlID0gZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRuaWNrbmFtZShlKXtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhlKVxyXG5cdFx0XHRcdHRoaXMubGl2ZW5pY2tuYW1lID0gZVxyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMubGl2ZW5pY2tuYW1lKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL+WinuWKoOe+juminFxyXG5cdFx0XHRJbmNyZWFzZXNraW4oZSl7XHJcblx0XHRcdFx0bGV0IGluZGV4cyA9IHBhcnNlSW50KCBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleHRleHQpXHJcblx0XHRcdFx0aWYoaW5kZXhzPT0xKXsvL+S7o+ihqOe+juminFxyXG5cdFx0XHRcdFx0dGhpcy5iZWF1dHkrK1xyXG5cdFx0XHRcdFx0aWYodGhpcy5iZWF1dHk+PTkpe1xyXG5cdFx0XHRcdFx0XHR0aGlzLmJlYXV0eSA9IDlcclxuXHRcdFx0XHRcdFx0YXBwLmdsb2JhbERhdGEuc2hvd3RvYXN0c2FtZShcIue+juminOWPluWAvDB+OSw55Luj6KGo5pyA6auY576O6aKcXCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWVsc2V7Ly/ku6Pooajnvo7nmb1cclxuXHRcdFx0XHRcdHRoaXMud2hpdGVuZXNzKytcclxuXHRcdFx0XHRcdGlmKHRoaXMud2hpdGVuZXNzPj05KXtcclxuXHRcdFx0XHRcdFx0dGhpcy53aGl0ZW5lc3MgPSA5XHJcblx0XHRcdFx0XHRcdGFwcC5nbG9iYWxEYXRhLnNob3d0b2FzdHNhbWUoXCLnvo7nmb3lj5blgLwwfjksOeS7o+ihqOacgOmrmOe+jueZvVwiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Ly/lh4/lsJHnvo7popxcclxuXHRcdFx0UmVkdWNlc2tpbihlKXtcclxuXHRcdFx0XHRsZXQgaW5kZXhzID0gcGFyc2VJbnQoIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4dGV4dClcclxuXHRcdFx0XHRpZihpbmRleHM9PTEpey8v5Luj6KGo576O6aKcXHJcblx0XHRcdFx0XHR0aGlzLmJlYXV0eS0tXHJcblx0XHRcdFx0XHRpZih0aGlzLmJlYXV0eTw9MCl7XHJcblx0XHRcdFx0XHRcdHRoaXMuYmVhdXR5ID0gMFxyXG5cdFx0XHRcdFx0XHRhcHAuZ2xvYmFsRGF0YS5zaG93dG9hc3RzYW1lKFwi576O6aKc5Y+W5YC8MH45LDDku6Pooajml6Dnvo7popxcIilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9ZWxzZXsvL+S7o+ihqOe+jueZvVxyXG5cdFx0XHRcdFx0dGhpcy53aGl0ZW5lc3MtLVxyXG5cdFx0XHRcdFx0aWYodGhpcy53aGl0ZW5lc3M8PTApe1xyXG5cdFx0XHRcdFx0XHR0aGlzLndoaXRlbmVzcyA9IDBcclxuXHRcdFx0XHRcdFx0YXBwLmdsb2JhbERhdGEuc2hvd3RvYXN0c2FtZShcIue+jueZveWPluWAvDB+OSww5Luj6KGo5peg576O55m9XCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XG5cdFx0fSxcclxuXHRcdGNyZWF0ZWQoKSB7XHJcblx0XHRcdGNvbnN0IF90aGlzID0gdGhpc1xyXG5cdFx0XHR1bmkuZ2V0U3lzdGVtSW5mbyh7XHJcblx0XHRcdFx0c3VjY2VzcyhyZXMpIHtcclxuXHRcdFx0XHRcdF90aGlzLnN0YXR1c0JhckhlaWdodCA9IHJlcy5zdGF0dXNCYXJIZWlnaHRcclxuXHRcdFx0XHRcdF90aGlzLndpbmRvd1dpZHRoID0gcmVzLnNjcmVlbldpZHRoXHJcblx0XHRcdFx0XHRfdGhpcy53aW5kb3dIZWlnaHQgPSByZXMuc2NyZWVuSGVpZ2h0XHJcblx0XHRcdFx0XHRfdGhpcy53aW5kb3dCb3R0b20gPSByZXMud2luZG93Qm90dG9tXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQvLyB1bmkuZ2V0TG9jYXRpb24oe1xyXG5cdFx0XHQvLyBcdHN1Y2Nlc3MocmVzKSB7XHJcblx0XHRcdC8vIFx0XHQvLyBjb25zb2xlLmxvZyhyZXMpXHJcblx0XHRcdC8vIFx0XHQgdW5pLm9wZW5Mb2NhdGlvbih7XHJcblx0XHRcdC8vIFx0XHRcdCBsYXRpdHVkZTpyZXMubGF0aXR1ZGUsXHJcblx0XHRcdC8vIFx0XHRcdCBsb25naXR1ZGU6cmVzLmxvbmdpdHVkZSxcclxuXHRcdFx0Ly8gXHRcdFx0IHN1Y2Nlc3MocmVzbG9jYXRpb25pY29uKSB7XHJcblx0XHRcdC8vIFx0XHRcdCBcdGNvbnNvbGUubG9nKHJlc2xvY2F0aW9uaWNvbilcclxuXHRcdFx0Ly8gXHRcdFx0IH1cclxuXHRcdFx0Ly8gXHRcdCB9KVxyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gfSlcclxuXHRcdH0sXHJcblx0XHRvblNob3coKXtcclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0b25SZWFkeSgpe1xyXG5cdFx0XHR0aGlzLmNvbnRleHQgPSB1bmkuY3JlYXRlTGl2ZVB1c2hlckNvbnRleHQoXCJsaXZlUHVzaGVyXCIsIHRoaXMpO1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLmNvbnRleHQpXHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuY29udGV4dClcclxuXHRcdFx0Ly/lvIDlkK/mjqjmtYFcclxuXHRcdFx0Ly8gdGhpcy5jb250ZXh0LnN0YXJ0KClcclxuXHRcdFx0Ly/lvIDlkK/mkYTlg4/lpLTpooTop4hcclxuXHRcdFx0dGhpcy5jb250ZXh0LnN0YXJ0UHJldmlldygpXHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGNvbXBvbmVudHM6e1xyXG5cdFx0XHRsaXZlY292ZW1pZGRlblxyXG5cdFx0fSxcclxuXHRcdG9uTG9hZChvcGN0aW9uKSB7XHJcblx0XHRcdGNvbnN0IF90aGlzID0gdGhpc1xyXG5cdFx0XHRsZXQge2luZGV4LHN0b3JlaWR9ID0gb3BjdGlvblxyXG5cdFx0XHRfdGhpcy5zdG9yZWlkID0gc3RvcmVpZFxyXG5cdFx0XHRfdGhpcy5pbmRleGxpbnNoaSA9IGluZGV4XHJcblx0XHRcdHVuaS5nZXRTdG9yYWdlKHtcclxuXHRcdFx0XHRrZXk6XCJiaW5kdG9rZXlcIixcclxuXHRcdFx0XHRzdWNjZXNzKHJlc3Rva2V5KSB7XHJcblx0XHRcdFx0XHRfdGhpcy50b2tleSA9IHJlc3Rva2V5LmRhdGFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9LFxuXHR9XHJcblx0Ly8gI2VuZGlmXG48L3NjcmlwdD5cblxuPHN0eWxlPlxyXG5cdC8qICNpZmRlZiBBUFAtUExVUyAqL1xuXHQubGl2ZWNvdmVye1xyXG5cdFx0LyogYmFja2dyb3VuZC1jb2xvcjp5ZWxsb3c7ICovXHJcblx0fVxyXG5cdC5jb3ZlcmZhdGhlcntcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDowO1xyXG5cdFx0bGVmdDowO1xyXG5cdFx0LyogYmFja2dyb3VuZC1jb2xvcjpyZWQ7ICovXHJcblx0fVxyXG5cdC5saXZlY292ZXRvcHtcclxuXHRcdC8qIGhlaWdodDozMHB4OyAqL1xyXG5cdFx0LyogYmFja2dyb3VuZC1jb2xvcjpyZWQ7ICovXHJcblx0XHRmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cdFx0cGFkZGluZzowIDQwcnB4O1xyXG5cdH1cclxuXHQubGl2ZWNvdmV0b3AtbGVmdHtcclxuXHRcdGZsZXg6MTtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0XHQvKiBiYWNrZ3JvdW5kLWNvbG9yOnBpbms7ICovXHJcblx0fVxyXG5cdC5saXZlY292ZXRvcC1yaWdodHtcclxuXHRcdHdpZHRoOiA2MHJweDtcclxuXHRcdC8qIGJhY2tncm91bmQtY29sb3I6eWVsbG93OyAqL1xyXG5cdH1cclxuXHQuaWNvbi1pbWdze1xyXG5cdFx0d2lkdGg6IDYwcnB4O1xyXG5cdFx0aGVpZ2h0OjYwcnB4O1xyXG5cdH1cclxuXHQuaWNvbm1hcmdpbntcclxuXHRcdG1hcmdpbi1yaWdodDo0MHJweDtcclxuXHR9XHJcblx0Lmljb25tYXJnaW46bGFzdC1jaGlsZHtcclxuXHRcdG1hcmdpbi1yaWdodDowO1xyXG5cdH1cclxuXHQubGl2ZWNvdmVyLWJvdHRvbXtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdGJvdHRvbTowO1xyXG5cdFx0bGVmdDowO1xyXG5cdFx0Lyogd2lkdGg6IDEwMHB4OyAqL1xyXG5cdFx0aGVpZ2h0OjEwMHB4O1xyXG5cdFx0LyogYmFja2dyb3VuZC1jb2xvcjpyZWQ7ICovXHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHR9XHJcblx0LmxvY2F0aW9ue1xyXG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHR9XHJcblx0LmxvY2F0aW9uaWNvbntcclxuXHRcdC8qIGJhY2tncm91bmQtY29sb3I6eWVsbG93OyAqL1xyXG5cdH1cclxuXHQubG9jYXRpb25pY29udGV4dHtcclxuXHRcdG1hcmdpbjoxMHJweCAwIDAgMTBycHg7XHJcblx0fVxyXG5cdC5saXZlY292ZXItYnRue1xyXG5cdFx0aGVpZ2h0OjExMHJweDtcclxuXHRcdGJvcmRlci13aWR0aDowO1xyXG5cdH1cclxuXHQuc2xpZGVye1xyXG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHdpZHRoOiAxMDBycHg7XHJcblx0XHQvKiBoZWlnaHQ6NjBycHg7ICovXHJcblx0XHQvKiBiYWNrZ3JvdW5kLWNvbG9yOnJlZDsgKi9cclxuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdH1cclxuXHQuc2xpZGVydGl0bGV0ZXh0e1xyXG5cdFx0bWFyZ2luLWJvdHRvbToxMHJweDtcclxuXHR9XHJcblx0LnNsaWRlcmJ0bntcclxuXHRcdHdpZHRoOjgwcnB4O1xyXG5cdFx0aGVpZ2h0OjUwcnB4O1xyXG5cdFx0Ym9yZGVyLXdpZHRoOjA7XHJcblx0XHRib3JkZXItcmFkaXVzOiAyMHJweDtcclxuXHR9XHJcblx0LnNsaWRlcmlucHtcclxuXHRcdHdpZHRoOiAxMDBycHg7XHJcblx0XHRoZWlnaHQ6NDBycHg7XHJcblx0XHRib3JkZXItY29sb3I6I2RlNDc1ODtcclxuXHRcdG1hcmdpbjoxNXJweCAwO1xyXG5cdFx0Ym9yZGVyLXJhZGl1czoyMHJweDtcclxuXHR9XHJcbi8qICNlbmRpZiAqL1xuPC9zdHlsZT5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///51\n");

/***/ }),
/* 52 */
/*!**********************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./livecovemidden.nvue?vue&type=template&id=83dfe6b8& */ 53);\n/* harmony import */ var _livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./livecovemidden.nvue?vue&type=script&lang=js& */ 55);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 15);\n\nvar renderjs\n\n\nfunction injectStyles (context) {\n  \n  if(!this.options.style){\n          this.options.style = {}\n      }\n      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){\n        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)\n      }\n      if(Vue.prototype.__merge_style){\n                Vue.prototype.__merge_style(__webpack_require__(/*! ./livecovemidden.nvue?vue&type=style&index=0&lang=css& */ 57).default, this.options.style)\n            }else{\n                Object.assign(this.options.style,__webpack_require__(/*! ./livecovemidden.nvue?vue&type=style&index=0&lang=css& */ 57).default)\n            }\n\n}\n\n/* normalize component */\n\nvar component = Object(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  \"5661537a\",\n  false,\n  _livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ninjectStyles.call(component)\ncomponent.options.__file = \"E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBNEg7QUFDNUg7QUFDbUU7QUFDTDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQkFBTyxDQUFDLGdFQUF3RDtBQUM1RyxhQUFhO0FBQ2IsaURBQWlELG1CQUFPLENBQUMsZ0VBQXdEO0FBQ2pIOztBQUVBOztBQUVBO0FBQzhLO0FBQzlLLGdCQUFnQix1TEFBVTtBQUMxQixFQUFFLHFGQUFNO0FBQ1IsRUFBRSwwRkFBTTtBQUNSLEVBQUUsbUdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsOEZBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDZSxnRiIsImZpbGUiOiI1Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vbGl2ZWNvdmVtaWRkZW4ubnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD04M2RmZTZiOCZcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2xpdmVjb3ZlbWlkZGVuLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2xpdmVjb3ZlbWlkZGVuLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmZ1bmN0aW9uIGluamVjdFN0eWxlcyAoY29udGV4dCkge1xuICBcbiAgaWYoIXRoaXMub3B0aW9ucy5zdHlsZSl7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0ge31cbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSAmJiBWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pe1xuICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUoVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fLCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUpe1xuICAgICAgICAgICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9saXZlY292ZW1pZGRlbi5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIpLmRlZmF1bHQsIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLnN0eWxlLHJlcXVpcmUoXCIuL2xpdmVjb3ZlbWlkZGVuLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIikuZGVmYXVsdClcbiAgICAgICAgICAgIH1cblxufVxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxydW50aW1lXFxcXGNvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBcIjU2NjE1MzdhXCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkU6L0thZmVuZ2RpY2h1YW5nc2hvcHBpbmcvY29tcG9uZW50cy9MaXZlY292ZXJmZW5nbWlhbi9saXZlY292ZW1pZGRlbi5udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///52\n");

/***/ }),
/* 53 */
/*!*****************************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue?vue&type=template&id=83dfe6b8& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./livecovemidden.nvue?vue&type=template&id=83dfe6b8& */ 54);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_template_id_83dfe6b8___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 54 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue?vue&type=template&id=83dfe6b8& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "cover-view",
    { staticClass: ["livecovemidden"] },
    [
      _c(
        "cover-view",
        {
          staticClass: ["livecovemiddenborder", "border-Size", "border-Dotted"],
          style: { width: _vm.windowWidth / 2 + "px" },
          on: { click: _vm.uploadimgs }
        },
        [
          _vm.fengmianbool == false
            ? _c(
                "u-text",
                {
                  staticClass: [
                    "textcolorwrite",
                    "text-center",
                    "covertext",
                    "font-size-forty"
                  ]
                },
                [_vm._v("添加封面")]
              )
            : _vm._e(),
          _vm.fengmianbool
            ? _c("cover-image", {
                staticClass: ["covermidden-imgs"],
                attrs: { src: _vm.imgurl }
              })
            : _vm._e()
        ],
        1
      ),
      _c("cover-view", { staticClass: ["cover-imgsbottomtext"] }, [
        _c(
          "u-text",
          { staticClass: ["textcolorwrite", "text-center", "font-size-forty"] },
          [_vm._v("您要直播什么呢?")]
        )
      ]),
      _c(
        "cover-view",
        {
          staticClass: ["cover-infotext"],
          style: { width: _vm.windowWidth / 2 + "px" }
        },
        [
          _c("u-input", {
            staticClass: [
              "infotextinp",
              "font-size-twenty-four",
              "textcolorwrite",
              "text-center"
            ],
            attrs: {
              type: "text",
              placeholder: "请输入直播描述,最多10个字符",
              value: _vm.value
            },
            on: {
              blur: _vm.inpLivedescribe,
              input: function($event) {
                _vm.value = $event.detail.value
              }
            }
          })
        ],
        1
      ),
      _c("cover-view", { staticClass: ["cover-imgsbottomtext"] }, [
        _c(
          "u-text",
          { staticClass: ["textcolorwrite", "text-center", "font-size-forty"] },
          [_vm._v("您要设置的直播昵称")]
        )
      ]),
      _c(
        "cover-view",
        {
          staticClass: ["cover-infotext"],
          style: { width: _vm.windowWidth / 2 + "px" }
        },
        [
          _c("u-input", {
            staticClass: [
              "infotextinp",
              "font-size-twenty-four",
              "textcolorwrite",
              "text-center"
            ],
            attrs: {
              type: "text",
              placeholder: "请输入直播的昵称(姓名)",
              value: _vm.value2
            },
            on: {
              blur: _vm.inpLivenickname,
              input: function($event) {
                _vm.value2 = $event.detail.value
              }
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 55 */
/*!***********************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./livecovemidden.nvue?vue&type=script&lang=js& */ 56);\n/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdjLENBQWdCLGlmQUFHLEVBQUMiLCJmaWxlIjoiNTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kIGZyb20gXCItIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/cmVmLS00LTAhRDpcXFxcdW5pLWFwcFxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNC0xIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbGl2ZWNvdmVtaWRkZW4ubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSFEOlxcXFx1bmktYXBwXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3JlZi0tNC0wIUQ6XFxcXHVuaS1hcHBcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTQtMSFEOlxcXFx1bmktYXBwXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xpdmVjb3ZlbWlkZGVuLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///55\n");

/***/ }),
/* 56 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0; //\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\nvar app = getApp();var _default =\n{\n  data: function data() {\n    return {\n      fengmianbool: false,\n      value: \"\",\n      // value2:\"\",\n      imgurl: \"\" };\n\n  },\n  methods: {\n    uploadimgs: function uploadimgs() {\n      var _this = this;\n      uni.chooseImage({\n        count: 1,\n        sizeType: [\"compressed\"],\n        sourceType: [\"album\"],\n        success: function success(res) {\n          _this.imgurl = res.tempFilePaths[0];\n          // console.log(res.tempFilePaths[0],\"本地的\")\n          if (res.tempFilePaths[0] !== \"\") {\n            uni.uploadFile({\n              url: \"\".concat(app.globalData.Requestpath, \"common/uploadImage?type=liveuser\"),\n              filePath: res.tempFilePaths[0],\n              name: \"file\",\n              fileType: \"image\",\n              success: function success(resimg) {\n                __f__(\"log\", resimg, \"这是返回的\", \" at components/Livecoverfengmian/livecovemidden.nvue:60\");\n                // console.log(JSON.parse(resimg.data))\n                var json = JSON.parse(resimg.data);\n                if (json.code == 0) {\n                  _this.fengmianbool = true;\n                  _this.$emit('coverurl', json.data.src);\n                  _this.$emit(\"inpvalue\", _this.value);\n                } else {\n                  app.globalData.showtoastsame(\"上传失败,请重新上传\");\n                }\n              } });\n\n          }\n        } });\n\n    },\n    //这是直播的描述\n    inpLivedescribe: function inpLivedescribe() {\n      if (this.value.length <= 10) {\n        this.$emit('inpvalue', this.value);\n      } else {\n        app.globalData.showtoastsame(\"最大只能输入10个字符\");\n      }\n    },\n    // //你要直播的昵称\n    inpLivenickname: function inpLivenickname() {\n      //名字控制到5个字\n      if (this.value2.length <= 5) {\n        this.$emit('nickname', this.value2);\n      } else {\n        app.globalData.showtoastsame(\"建议输入5个字符\");\n      }\n    } },\n\n  props: [\"windowWidth\"] };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 22)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vY29tcG9uZW50cy9MaXZlY292ZXJmZW5nbWlhbi9saXZlY292ZW1pZGRlbi5udnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLG1CO0FBQ0E7QUFDQSxNQURBLGtCQUNBO0FBQ0E7QUFDQSx5QkFEQTtBQUVBLGVBRkE7QUFHQTtBQUNBLGdCQUpBOztBQU1BLEdBUkE7QUFTQTtBQUNBLGNBREEsd0JBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBREE7QUFFQSxnQ0FGQTtBQUdBLDZCQUhBO0FBSUEsZUFKQSxtQkFJQSxHQUpBLEVBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQURBO0FBRUEsNENBRkE7QUFHQSwwQkFIQTtBQUlBLCtCQUpBO0FBS0EscUJBTEEsbUJBS0EsTUFMQSxFQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFKQSxNQUlBO0FBQ0E7QUFDQTtBQUNBLGVBaEJBOztBQWtCQTtBQUNBLFNBM0JBOztBQTZCQSxLQWhDQTtBQWlDQTtBQUNBLG1CQWxDQSw2QkFrQ0E7QUFDQTtBQUNBO0FBQ0EsT0FGQSxNQUVBO0FBQ0E7QUFDQTtBQUNBLEtBeENBO0FBeUNBO0FBQ0EsbUJBMUNBLDZCQTBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BRkEsTUFFQTtBQUNBO0FBQ0E7QUFDQSxLQWpEQSxFQVRBOztBQTREQSx3QkE1REEsRSIsImZpbGUiOiI1Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cblx0PGNvdmVyLXZpZXcgY2xhc3M9XCJsaXZlY292ZW1pZGRlblwiPlxyXG5cdFx0PGNvdmVyLXZpZXcgY2xhc3M9XCJsaXZlY292ZW1pZGRlbmJvcmRlciBib3JkZXItU2l6ZSBib3JkZXItRG90dGVkXCIgOnN0eWxlPVwie3dpZHRoOih3aW5kb3dXaWR0aC8yKSsncHgnfVwiIEBjbGljaz1cInVwbG9hZGltZ3NcIj5cclxuXHRcdFx0PHRleHQgY2xhc3M9XCJ0ZXh0Y29sb3J3cml0ZSB0ZXh0LWNlbnRlciBjb3ZlcnRleHQgZm9udC1zaXplLWZvcnR5XCIgdi1pZj1cImZlbmdtaWFuYm9vbD09ZmFsc2VcIj7mt7vliqDlsIHpnaI8L3RleHQ+XHJcblx0XHRcdDxjb3Zlci1pbWFnZSA6c3JjPVwiaW1ndXJsXCIgY2xhc3M9XCJjb3Zlcm1pZGRlbi1pbWdzXCIgdi1pZj1cImZlbmdtaWFuYm9vbFwiPjwvY292ZXItaW1hZ2U+XHJcblx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHQ8Y292ZXItdmlldyBjbGFzcz1cImNvdmVyLWltZ3Nib3R0b210ZXh0XCI+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwidGV4dGNvbG9yd3JpdGUgdGV4dC1jZW50ZXIgZm9udC1zaXplLWZvcnR5XCI+5oKo6KaB55u05pKt5LuA5LmI5ZGiPzwvdGV4dD5cclxuXHRcdDwvY292ZXItdmlldz5cclxuXHRcdDxjb3Zlci12aWV3IGNsYXNzPVwiY292ZXItaW5mb3RleHRcIiA6c3R5bGU9XCJ7d2lkdGg6KHdpbmRvd1dpZHRoLzIpKydweCd9XCI+XHJcblx0XHRcdDxpbnB1dCBcclxuXHRcdFx0XHR0eXBlPVwidGV4dFwiIFxyXG5cdFx0XHRcdGNsYXNzPVwiaW5mb3RleHRpbnAgZm9udC1zaXplLXR3ZW50eS1mb3VyIHRleHRjb2xvcndyaXRlIHRleHQtY2VudGVyXCIgXHJcblx0XHRcdFx0di1tb2RlbD1cInZhbHVlXCIgXHJcblx0XHRcdFx0cGxhY2Vob2xkZXI9XCLor7fovpPlhaXnm7Tmkq3mj4/ov7As5pyA5aSaMTDkuKrlrZfnrKZcIiAgXHJcblx0XHRcdFx0QGJsdXI9XCJpbnBMaXZlZGVzY3JpYmVcIi8+XHJcblx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHQ8Y292ZXItdmlldyBjbGFzcz1cImNvdmVyLWltZ3Nib3R0b210ZXh0XCI+XHJcblx0XHRcdDx0ZXh0IGNsYXNzPVwidGV4dGNvbG9yd3JpdGUgdGV4dC1jZW50ZXIgZm9udC1zaXplLWZvcnR5XCI+5oKo6KaB6K6+572u55qE55u05pKt5pi156ewPC90ZXh0PlxyXG5cdFx0PC9jb3Zlci12aWV3PlxyXG5cdFx0PGNvdmVyLXZpZXcgY2xhc3M9XCJjb3Zlci1pbmZvdGV4dFwiIDpzdHlsZT1cInt3aWR0aDood2luZG93V2lkdGgvMikrJ3B4J31cIj5cclxuXHRcdFx0PGlucHV0IFxyXG5cdFx0XHRcdHR5cGU9XCJ0ZXh0XCIgXHJcblx0XHRcdFx0Y2xhc3M9XCJpbmZvdGV4dGlucCBmb250LXNpemUtdHdlbnR5LWZvdXIgdGV4dGNvbG9yd3JpdGUgdGV4dC1jZW50ZXJcIiBcclxuXHRcdFx0XHR2LW1vZGVsPVwidmFsdWUyXCIgXHJcblx0XHRcdFx0cGxhY2Vob2xkZXI9XCLor7fovpPlhaXnm7Tmkq3nmoTmmLXnp7Ao5aeT5ZCNKVwiICBcclxuXHRcdFx0XHRAYmx1cj1cImlucExpdmVuaWNrbmFtZVwiLz5cclxuXHRcdDwvY292ZXItdmlldz5cclxuXHQ8L2NvdmVyLXZpZXc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxyXG5cdGNvbnN0IGFwcCA9IGdldEFwcCgpXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGRhdGEoKXtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRmZW5nbWlhbmJvb2w6ZmFsc2UsXHJcblx0XHRcdFx0dmFsdWU6XCJcIixcclxuXHRcdFx0XHQvLyB2YWx1ZTI6XCJcIixcclxuXHRcdFx0XHRpbWd1cmw6XCJcIlxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0bWV0aG9kczp7XHJcblx0XHRcdHVwbG9hZGltZ3MoKXtcclxuXHRcdFx0XHRjb25zdCBfdGhpcyA9IHRoaXNcclxuXHRcdFx0XHR1bmkuY2hvb3NlSW1hZ2Uoe1xyXG5cdFx0XHRcdFx0Y291bnQ6MSxcclxuXHRcdFx0XHRcdHNpemVUeXBlOltcImNvbXByZXNzZWRcIl0sXHJcblx0XHRcdFx0XHRzb3VyY2VUeXBlOltcImFsYnVtXCJdLFxyXG5cdFx0XHRcdFx0c3VjY2VzcyhyZXMpe1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5pbWd1cmwgPSByZXMudGVtcEZpbGVQYXRoc1swXVxyXG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoc1swXSxcIuacrOWcsOeahFwiKVxyXG5cdFx0XHRcdFx0XHRpZihyZXMudGVtcEZpbGVQYXRoc1swXSE9PVwiXCIpe1xyXG5cdFx0XHRcdFx0XHRcdHVuaS51cGxvYWRGaWxlKHtcclxuXHRcdFx0XHRcdFx0XHRcdHVybDpgJHthcHAuZ2xvYmFsRGF0YS5SZXF1ZXN0cGF0aH1jb21tb24vdXBsb2FkSW1hZ2U/dHlwZT1saXZldXNlcmAsXHJcblx0XHRcdFx0XHRcdFx0XHRmaWxlUGF0aDpyZXMudGVtcEZpbGVQYXRoc1swXSxcclxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6XCJmaWxlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRmaWxlVHlwZTpcImltYWdlXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzKHJlc2ltZyl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc2ltZyxcIui/meaYr+i/lOWbnueahFwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKHJlc2ltZy5kYXRhKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGpzb24gPSBKU09OLnBhcnNlKHJlc2ltZy5kYXRhKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZihqc29uLmNvZGU9PTApe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzLmZlbmdtaWFuYm9vbCA9IHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpcy4kZW1pdCgnY292ZXJ1cmwnLGpzb24uZGF0YS5zcmMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMuJGVtaXQoXCJpbnB2YWx1ZVwiLF90aGlzLnZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhcHAuZ2xvYmFsRGF0YS5zaG93dG9hc3RzYW1lKFwi5LiK5Lyg5aSx6LSlLOivt+mHjeaWsOS4iuS8oFwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdC8v6L+Z5piv55u05pKt55qE5o+P6L+wXHJcblx0XHRcdGlucExpdmVkZXNjcmliZSgpe1xyXG5cdFx0XHRcdGlmKHRoaXMudmFsdWUubGVuZ3RoPD0xMCl7XHJcblx0XHRcdFx0XHR0aGlzLiRlbWl0KCdpbnB2YWx1ZScsdGhpcy52YWx1ZSlcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGFwcC5nbG9iYWxEYXRhLnNob3d0b2FzdHNhbWUoXCLmnIDlpKflj6rog73ovpPlhaUxMOS4quWtl+esplwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Ly8gLy/kvaDopoHnm7Tmkq3nmoTmmLXnp7BcclxuXHRcdFx0aW5wTGl2ZW5pY2tuYW1lKCl7XHJcblx0XHRcdFx0Ly/lkI3lrZfmjqfliLbliLA15Liq5a2XXHJcblx0XHRcdFx0aWYodGhpcy52YWx1ZTIubGVuZ3RoPD01KXtcclxuXHRcdFx0XHRcdHRoaXMuJGVtaXQoJ25pY2tuYW1lJyx0aGlzLnZhbHVlMilcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGFwcC5nbG9iYWxEYXRhLnNob3d0b2FzdHNhbWUoXCLlu7rorq7ovpPlhaU15Liq5a2X56ymXCIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxuXHRcdHByb3BzOltcIndpbmRvd1dpZHRoXCJdXG5cdH1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4ubGl2ZWNvdmVtaWRkZW57XHJcblx0Y29sb3I6I2ZmZjtcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdG1hcmdpbi10b3A6NjBycHg7XHJcbn1cclxuLmxpdmVjb3ZlbWlkZGVuYm9yZGVye1xyXG5cdGhlaWdodDozNjBycHg7XHJcblx0LyogYmFja2dyb3VuZC1jb2xvcjp5ZWxsb3c7ICovXHJcblx0Ym9yZGVyLWNvbG9yOiNGRkZGRkY7XHJcbn1cclxuLmNvdmVydGV4dHtcclxuXHRsaW5lLWhlaWdodDozNjBycHg7XHJcblx0XHJcbn1cclxuLmNvdmVybWlkZGVuLWltZ3N7XHJcblx0aGVpZ2h0OjM2MHJweDtcclxufVxyXG4uY292ZXItaW1nc2JvdHRvbXRleHR7XHJcblx0bWFyZ2luLXRvcDozMHJweDtcclxufVxyXG4uY292ZXItaW5mb3RleHR7XHJcblx0LyogYmFja2dyb3VuZC1jb2xvcjpyZWQ7ICovXHJcblx0aGVpZ2h0OjYwcnB4O1xyXG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5pbmZvdGV4dGlucHtcclxuXHQvKiBiYWNrZ3JvdW5kLWNvbG9yOnBpbms7ICovXHJcbn1cbjwvc3R5bGU+XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///56\n");

/***/ }),
/* 57 */
/*!*******************************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./livecovemidden.nvue?vue&type=style&index=0&lang=css& */ 58);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_livecovemidden_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 58 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/components/Livecoverfengmian/livecovemidden.nvue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "livecovemidden": {
    "color": "#ffffff",
    "alignItems": "center",
    "marginTop": "60rpx"
  },
  "livecovemiddenborder": {
    "height": "360rpx",
    "borderColor": "#FFFFFF"
  },
  "covertext": {
    "lineHeight": "360rpx"
  },
  "covermidden-imgs": {
    "height": "360rpx"
  },
  "cover-imgsbottomtext": {
    "marginTop": "30rpx"
  },
  "cover-infotext": {
    "height": "60rpx",
    "justifyContent": "center"
  }
}

/***/ }),
/* 59 */
/*!************************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?vue&type=style&index=0&lang=css&mpType=page ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./Livecover.nvue?vue&type=style&index=0&lang=css&mpType=page */ 60);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Livecover_nvue_vue_type_style_index_0_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 60 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!E:/Kafengdichuangshopping/pages/Livecover/Livecover.nvue?vue&type=style&index=0&lang=css&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "coverfather": {
    "position": "absolute",
    "top": 0,
    "left": 0
  },
  "livecovetop": {
    "flexDirection": "row",
    "paddingTop": 0,
    "paddingRight": "40rpx",
    "paddingBottom": 0,
    "paddingLeft": "40rpx"
  },
  "livecovetop-left": {
    "flex": 1,
    "flexDirection": "row"
  },
  "livecovetop-right": {
    "width": "60rpx"
  },
  "icon-imgs": {
    "width": "60rpx",
    "height": "60rpx"
  },
  "iconmargin": {
    "marginRight": "40rpx",
    "marginRight:last-child": 0
  },
  "livecover-bottom": {
    "position": "absolute",
    "bottom": 0,
    "left": 0,
    "height": "100",
    "justifyContent": "center"
  },
  "location": {
    "flexDirection": "row"
  },
  "locationicontext": {
    "marginTop": "10rpx",
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": "10rpx"
  },
  "livecover-btn": {
    "height": "110rpx",
    "borderWidth": 0
  },
  "slider": {
    "alignItems": "center",
    "position": "absolute",
    "width": "100rpx",
    "justifyContent": "center"
  },
  "slidertitletext": {
    "marginBottom": "10rpx"
  },
  "sliderbtn": {
    "width": "80rpx",
    "height": "50rpx",
    "borderWidth": 0,
    "borderRadius": "20rpx"
  },
  "sliderinp": {
    "width": "100rpx",
    "height": "40rpx",
    "borderColor": "#de4758",
    "marginTop": "15rpx",
    "marginRight": 0,
    "marginBottom": "15rpx",
    "marginLeft": 0,
    "borderRadius": "20rpx"
  }
}

/***/ })
/******/ ]);