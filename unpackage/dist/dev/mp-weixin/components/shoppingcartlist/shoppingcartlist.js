(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/shoppingcartlist/shoppingcartlist"],{

/***/ 334:
/*!**********************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shoppingcartlist.vue?vue&type=template&id=60d057d8&scoped=true& */ 335);
/* harmony import */ var _shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shoppingcartlist.vue?vue&type=script&lang=js& */ 337);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shoppingcartlist.vue?vue&type=style&index=0&id=60d057d8&lang=less&scoped=true& */ 339);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "60d057d8",
  null,
  false,
  _shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 335:
/*!*****************************************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue?vue&type=template&id=60d057d8&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./shoppingcartlist.vue?vue&type=template&id=60d057d8&scoped=true& */ 336);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_template_id_60d057d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 336:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue?vue&type=template&id=60d057d8&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 337:
/*!***********************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./shoppingcartlist.vue?vue&type=script&lang=js& */ 338);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 338:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var app = getApp();var immediatelypopup = function immediatelypopup() {return __webpack_require__.e(/*! import() | components/Details/immediatelypopup */ "components/Details/immediatelypopup").then(__webpack_require__.bind(null, /*! @/components/Details/immediatelypopup.vue */ 628));};

// import tanchuang from "@/components/Details/immediatelypopup.vue"
var _default = {
  data: function data() {
    return {
      total: 0,
      checkedbool: true,
      modalName: null,
      radio: 'radio1',
      id: "",
      immediatelylist: [],
      bool: true,
      newslist: [],
      str: "",
      onloadbool: false, //设置开关
      numlistxiabiao: [], //获取用户商品的数量
      checkbool: false,
      idbool: "",
      toals: 0,
      shopcheckboxindex: 0,
      shopcheckboxindexs: 0 };

  },
  methods: {
    //封装一个数量增加 减少功能
    Adddeletepublic: function Adddeletepublic(getid, index, indexs, adddeletebool, unitprice) {
      if (adddeletebool) {
        ++this.numlistxiabiao[index][indexs].good_num;
        if (this.numlistxiabiao[index][indexs].checked) {
          // console.log(this.numlistxiabiao[index][indexs].good_num) //这里把用户购买的数量 传给父级
          this.$emit("Purchasequantity", this.numlistxiabiao[index][indexs].good_num);
          //当用户选中时 点击的+号的时候 用来计算价格
          this.totals(unitprice, this.numlistxiabiao[index][indexs].good_num);
        } else {
          this.toals = 0;
        }
      } else {
        if (this.numlistxiabiao[index][indexs].good_num <= 1) {
          app.globalData.showtoastsame("数量不能小于1");
        } else {
          --this.numlistxiabiao[index][indexs].good_num;
          //当用户选中是时 点击-号时 用来减
          if (this.numlistxiabiao[index][indexs].checked) {
            this.$emit("Purchasequantity", this.numlistxiabiao[index][indexs].good_num);
            this.totals(unitprice, this.numlistxiabiao[index][indexs].good_num);
          } else {
            this.toals = 0;
          }
        }
      }
    },
    //封装个总价
    totals: function totals(unitprice, num) {//unitprice单价  num数量
      // 单价*数量
      this.toals = unitprice * num;
      this.$emit("price", this.toals);
    },
    CheckboxChange: function CheckboxChange(e) {var _this2 = this;var _e$currentTarget$data =
      e.currentTarget.dataset,index = _e$currentTarget$data.index,indexs = _e$currentTarget$data.indexs,id = _e$currentTarget$data.id,unitprice = _e$currentTarget$data.unitprice,num = _e$currentTarget$data.num,carid = _e$currentTarget$data.carid,storeid = _e$currentTarget$data.storeid;
      this.idbool = id;
      // //开始先让他们都为false
      this.numlistxiabiao.forEach(function (item, itemindex) {
        item.forEach(function (itemitem, itemsindexs) {
          _this2.numlistxiabiao[itemindex][itemsindexs].checked = false;
          _this2.checkbool = false;
        });
      });
      if (this.idbool == id) {
        //如果当前的没有为true 在点击其他的 就让他为false
        if (this.checkbool) {
          this.numlistxiabiao[index][indexs].checked = false;
          this.checkbool = false;
        } else {//否则都为true
          this.numlistxiabiao[index][indexs].checked = true;
          this.checkbool = true;
          //把选中的数组发送过去
          var _this$numlistxiabiao$ =
          this.numlistxiabiao[index][indexs],good_id = _this$numlistxiabiao$.good_id,store_name = _this$numlistxiabiao$.store_name,good_name = _this$numlistxiabiao$.good_name,good_pic = _this$numlistxiabiao$.good_pic,good_price = _this$numlistxiabiao$.good_price,good_freight = _this$numlistxiabiao$.good_freight;
          // console.log(good_pic)
          // console.log(this.numlistxiabiao[index][indexs])
          //向父组件传递 用于结算用---开始  这么写后期改小程序用
          this.$emit("datagoodid", good_id); //商品的id
          this.$emit("datastorename", store_name); //店铺名称
          this.$emit("datagoodname", good_name); //商品的标题
          this.$emit("datagoodimg", good_pic); //商品的图片
          this.$emit("datagoodprice", good_price); //商品的单价
          this.$emit("Purchasequantity", this.numlistxiabiao[index][indexs].good_num); //商品的数量
          this.$emit("freight", good_freight); //商品运费
          //向父组件传递 用于结算用---结束
          // console.log(this.numlistxiabiao[index])
          this.$emit("datalist", this.numlistxiabiao[index]);
          this.$emit("dataindex", indexs);
          this.$emit("datacarid", carid);
          this.$emit("datastoreid", storeid);
          this.totals(unitprice, num);
        }
      }

    },
    showModal: function showModal(e) {
      //获取id值用来获取商品的规格
      this.id = e.currentTarget.dataset.id;

      this.modalName = e.currentTarget.dataset.target;
      console.log(e.currentTarget.dataset.target);
      // http://hbk.huiboke.com/api/
      // uni.request({
      // 	url:"http://hbk.huiboke.com/api/good/getGoodSpecList",
      // 	data:{
      // 		gid:this.id
      // 	},
      // 	success:(res)=>{
      // 		if(res.data.code==0){
      // 			this.immediatelylist = res.data.data
      // 			// this.modalName = e.currentTarget.dataset.target
      // 			// console.log(this.modalName)
      // 		}
      // 	}
      // })
    },
    hiddends: function hiddends(e) {
      this.modalName = e;
    },
    RadioChange: function RadioChange(e) {
      this.radio = e.detail.value;
    },
    //这是子组件传给父组件的值
    guigedata: function guigedata(e) {
      var _this = this;
      //当用户点击了规格这 就让下拉刷新的状态为true
      this.onloadbool = true;
      // console.log(e)
      uni.request({
        url: "http://hbk.huiboke.com/api/shopping_cart/updateGoodSpec",
        method: "POST",
        data: {
          token: this.tokey,
          gid: this.id,
          spec: e },

        success: function success(res) {
          if (res.data.code == 0) {
            if (_this.onloadbool) {//如果为true的话就开启下拉刷新
              uni.startPullDownRefresh(); //开启下拉刷新
              _this.UpdateShoppingCart(_this);
              _this.onloadbool = false;
            }
          } else {
            console.log(_this.onloadbool);
            console.log("修改失败");
          }
        } });

    },
    //更新购物车
    UpdateShoppingCart: function UpdateShoppingCart(_this) {
      console.log(_this.tokey);
      console.log(_this.shopinglist);
      if (_this.shopinglist.length <= 0) {
        uni.request({
          url: "http://hbk.huiboke.com/api/shopping_cart/getShoppingCartList",
          method: "POST",
          data: {
            token: _this.tokey,
            page: 1,
            pageSize: 10 },

          success: function success(res) {
            console.log(res);
            if (res.data.code == 0) {//代表获取成功
              if (_this.onloadbool == false) {
                // console.log(res.data.data)
                _this.shopinglist = res.data.data;
                uni.stopPullDownRefresh(); //关闭下拉刷新
              }
            } else {
              console.log("重新登录");
            }
            //这个遍历为了拿到购物车的数量
            _this.shopinglist.forEach(function (item, index) {
              _this.numlistxiabiao[index] = item.sub;
            });
          } });

      } else {
        console.log("数组里面有值");
        _this.shopinglist = _this.shopinglist;
      }
    } },

  components: {
    immediatelypopup: immediatelypopup
    // tanchuang
  },
  props: ["tokey", "shopinglist", "delatestaticbool"], //这是传过来啊的下标
  created: function created() {
    // console.log(111)
    // console.log(this.shopinglist)
    var _this = this;
    if (_this.tokey == "") {
      uni.getStorage({
        key: "bindtokey",
        success: function success(res) {
          console.log(res);
          _this.tokey = res.data;
          // console.log(_this.tokey)
          _this.UpdateShoppingCart(_this);
        } });

    } else {
      _this.UpdateShoppingCart(_this);
    }
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 339:
/*!********************************************************************************************************************************************!*\
  !*** E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue?vue&type=style&index=0&id=60d057d8&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./shoppingcartlist.vue?vue&type=style&index=0&id=60d057d8&lang=less&scoped=true& */ 340);
/* harmony import */ var _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_uni_app_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_shoppingcartlist_vue_vue_type_style_index_0_id_60d057d8_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 340:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Kafengdichuangshopping/components/shoppingcartlist/shoppingcartlist.vue?vue&type=style&index=0&id=60d057d8&lang=less&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/shoppingcartlist/shoppingcartlist.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/shoppingcartlist/shoppingcartlist-create-component',
    {
        'components/shoppingcartlist/shoppingcartlist-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(334))
        })
    },
    [['components/shoppingcartlist/shoppingcartlist-create-component']]
]);
