'use strict';

var bound = require('../');
var test = require('tape');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad receiver', function (st) {
		st['throws'](bound.bind(null, undefined), TypeError, 'undefined is not an object');
		st['throws'](bound.bind(null, null), TypeError, 'null is not an object');
		st.end();
	});

	runTests(bound, t);

	t.end();
});
