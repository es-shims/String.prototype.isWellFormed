'use strict';

var v = require('es-value-fixtures');
var forEach = require('for-each');
var inspect = require('object-inspect');

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

module.exports = function (isWellFormed, t) {
	t.test('well-formed strings', function (st) {
		forEach(v.nonStrings.concat(v.strings, wholePoo), function (str) {
			if (str != null) { // eslint-disable-line eqeqeq
				st.ok(isWellFormed(String(str)), inspect(str) + ' is well-formed');
			}
		});

		st.end();
	});

	t.test('not well-formed strings', function (st) {
		st.notOk(isWellFormed(leadingPoo), 'a string with a leading surrogate but no trailing surrogate is not well-formed');
		st.notOk(isWellFormed(trailingPoo), 'a string with a trailing surrogate but no leading surrogate is not well-formed');

		st.end();
	});
};
