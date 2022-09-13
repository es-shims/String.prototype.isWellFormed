'use strict';

var define = require('define-properties');
var RequireObjectCoercible = require('es-abstract/2022/RequireObjectCoercible');
var callBind = require('call-bind');

var implementation = require('./implementation');

var getPolyfill = require('./polyfill');
var bound = callBind(getPolyfill());

var shim = require('./shim');

var boundShim = function isWellFormed(string) {
	RequireObjectCoercible(string);
	return bound(string);
};
define(boundShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundShim;
