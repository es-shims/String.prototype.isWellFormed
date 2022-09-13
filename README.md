# string.prototype.iswellformed <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `String.prototype.isWellFormed` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.es/proposal-is-usv-string/).

Because `String.prototype.isWellFormed` depends on a receiver (the `this` value), the main export takes the string to operate on as the first argument.

## Getting started

```sh
npm install --save string.prototype.iswellformed
```

## Usage/Examples

```js
var isWellFormed = require('string.prototype.iswellformed');
var assert = require('assert');

var leadingPoo = '\uD83D';
var trailingPoo = '\uDCA9';
var wholePoo = leadingPoo + trailingPoo;

assert.ok(isWellFormed(wholePoo));
assert.notOk(isWellFormed(leadingPoo));
assert.notOk(isWellFormed(trailingPoo));
```

```js
var isWellFormed = require('string.prototype.iswellformed');
var assert = require('assert');
/* when String#isWellFormed is not present */
delete String.prototype.isWellFormed;
var shimmed = isWellFormed.shim();

assert.equal(shimmed, isWellFormed.getPolyfill());
assert.deepEqual(wholePoo.isWellFormed(), isWellFormed(wholePoo));
```

```js
var isWellFormed = require('string.prototype.iswellformed');
var assert = require('assert');
/* when String#at is present */
var shimmed = isWellFormed.shim();

assert.equal(shimmed, String.prototype.isWellFormed);
assert.deepEqual(wholePoo.isWellFormed(), isWellFormed(wholePoo));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/string.prototype.iswellformed
[npm-version-svg]: https://versionbadg.es/es-shims/String.prototype.isWellFormed.svg
[deps-svg]: https://david-dm.org/es-shims/String.prototype.isWellFormed.svg
[deps-url]: https://david-dm.org/es-shims/String.prototype.isWellFormed
[dev-deps-svg]: https://david-dm.org/es-shims/String.prototype.isWellFormed/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/String.prototype.isWellFormed#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/string.prototype.iswellformed.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/string.prototype.iswellformed.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/string.prototype.iswellformed.svg
[downloads-url]: https://npm-stat.com/charts.html?package=string.prototype.iswellformed
[codecov-image]: https://codecov.io/gh/es-shims/String.prototype.isWellFormed/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/String.prototype.isWellFormed/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/String.prototype.isWellFormed
[actions-url]: https://github.com/es-shims/String.prototype.isWellFormed/actions
