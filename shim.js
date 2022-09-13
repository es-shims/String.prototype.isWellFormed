'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringPrototypeIsWellFormed() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ isWellFormed: polyfill },
		{ isWellFormed: function () { return String.prototype.isWellFormed !== polyfill; } }
	);
	return polyfill;
};
