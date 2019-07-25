(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function shortestSubarray(array, K) {
	var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	var len = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;

	var current = array[0];
	while (end <= array.length) {
		var tmpstart = start;
		var tempcurrent = current;
		while (tmpstart < end) {
			if (tempcurrent >= K) {
				len = len > end - tmpstart || len == -1 ? end - tmpstart : len;
				start = tmpstart;
				current = tempcurrent;
			}
			tempcurrent = tempcurrent - array[tmpstart];
			tmpstart += 1;
		}
		if (len == -1) {
			current += array[end];
		} else {
			current += array[end];
			current -= array[start];
			start += 1;
		}
		end += 1;
	}
	return len;
}

module.exports = shortestSubarray;

/***/ })

}]);