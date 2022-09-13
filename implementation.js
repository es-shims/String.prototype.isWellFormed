'use strict';

var IsStringWellFormedUnicode = require('es-abstract/2022/IsStringWellFormedUnicode');
var RequireObjectCoercible = require('es-abstract/2022/RequireObjectCoercible');
var ToString = require('es-abstract/2022/ToString');

module.exports = function isWellFormed() {
	var O = RequireObjectCoercible(this);

	var S = ToString(O);

	return IsStringWellFormedUnicode(S);
};
