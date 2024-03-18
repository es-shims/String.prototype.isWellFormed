'use strict';

var IsStringWellFormedUnicode = require('es-abstract/2024/IsStringWellFormedUnicode');
var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');
var ToString = require('es-abstract/2024/ToString');

module.exports = function isWellFormed() {
	var O = RequireObjectCoercible(this);

	var S = ToString(O);

	return IsStringWellFormedUnicode(S);
};
