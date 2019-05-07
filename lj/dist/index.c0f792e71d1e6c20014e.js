(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {})(_utils2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
    array: function array(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(0);
        }
        return arr;
    },
    testTime: function testTime(fn) {
        var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

        var start = +new Date();
        for (var i = 0; i < o; i++) {
            fn(arg);
        }
        return (+new Date() - start) / o;
    },
    curry: function curry(fn) {
        var args = [];
        var length = fn.length;
        return function () {
            args = [].concat(_toConsumableArray(args), Array.prototype.slice.call(arguments));
            return length == args.length ? fn.apply(this, args) : arguments.callee;
        };
    },
    sleep: function sleep(time) {
        for (var i = +new Date(); i + time > +new Date();) {}
    }
};

/***/ })
],[[0,0]]]);