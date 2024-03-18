'use strict';

var v = require('es-value-fixtures');
var forEach = require('for-each');
var inspect = require('object-inspect');
var SymbolDescriptiveString = require('es-abstract/2024/SymbolDescriptiveString');
var mockProperty = require('mock-property');
var hasBigInts = require('has-bigints')();
var hasSymbols = require('has-symbols')();

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

module.exports = function (isWellFormed, t) {
	t.test('does not call prototype toString methods on primitives', function (st) {
		st.teardown(mockProperty(Boolean.prototype, 'toString', function fakeToString() {
			st.fail('Boolean.prototype.toString should not be called');
		}));
		st.teardown(mockProperty(Number.prototype, 'toString', function fakeToString() {
			st.fail('Number.prototype.toString should not be called');
		}));
		if (hasBigInts) {
			st.teardown(mockProperty(BigInt.prototype, 'toString', function fakeToString() {
				st.fail('BigInt.prototype.toString should not be called');
			}));
		}
		if (hasSymbols) {
			st.teardown(mockProperty(Symbol.prototype, 'toString', function fakeToString() {
				st.fail('Symbol.prototype.toString should not be called');
			}));
		}

		forEach(v.nonNullPrimitives, function (nonNullPrimitive) {
			if (typeof nonNullPrimitive === 'symbol') {
				st['throws'](
					function () { isWellFormed(nonNullPrimitive); },
					inspect(nonNullPrimitive) + ' throws when implicitly coerced to a string, and does not call the proto method'
				);
			} else if (typeof nonNullPrimitive !== 'string') {
				st.equal(isWellFormed(nonNullPrimitive), true, inspect(nonNullPrimitive) + ' stringifies without calling the proto method');
			}
		});

		st.end();
	});

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
