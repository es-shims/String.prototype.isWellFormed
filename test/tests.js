'use strict';

var v = require('es-value-fixtures');
var forEach = require('for-each');
var inspect = require('object-inspect');
var SymbolDescriptiveString = require('es-abstract/2022/SymbolDescriptiveString');

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

module.exports = function (isWellFormed, t) {
	t.test('well-formed strings', function (st) {
		forEach(v.nonStrings.concat(
			v.strings,
			wholePoo, // a concatenated surrogate pair
			'abc', // a latin-1 string
			'a💩c', // a surrogate pair using a literal code point
			'a\uD83D\uDCA9c', // a surrogate pair formed by escape sequences
			'a' + leadingPoo + trailingPoo + 'd', // a surrogate pair formed by concatenation
			'a\u25A8c' // a non-ASCII character
		), function (str) {
			if (str != null) { // eslint-disable-line eqeqeq
				st.ok(isWellFormed(typeof str === 'symbol' ? SymbolDescriptiveString(str) : String(str)), inspect(str) + ' is well-formed');
			}
		});

		st.end();
	});

	t.test('not well-formed strings', function (st) {
		forEach([
			[leadingPoo, 'a string with a leading surrogate but no trailing surrogate'],
			[trailingPoo, 'a string with a trailing surrogate but no leading surrogate'],
			['a' + leadingPoo + 'c' + leadingPoo + 'e', 'leading lone surrogates'],
			['a' + trailingPoo + 'c' + trailingPoo + 'e', 'trailing lone surrogates'],
			['a' + trailingPoo + leadingPoo + 'd', 'a wrong-ordered surrogate pair'],
			[wholePoo.slice(0, 1), 'a surrogate pair sliced to the leading surrogate'],
			[wholePoo.slice(1), 'a surrogate pair sliced to the trailing surrogate is not well-formed']
		], function (arr) {
			var str = arr[0];
			var msg = arr[1];

			st.notOk(isWellFormed(str), msg + ' is not well-formed');
		});

		st.end();
	});
};
