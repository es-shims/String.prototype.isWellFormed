import callBind from 'call-bind';
import RequireObjectCoercible from 'es-abstract/2023/RequireObjectCoercible.js';

import getPolyfill from 'string.prototype.iswellformed/polyfill';

const bound = callBind(getPolyfill());

export default function isWellFormed(string) {
	RequireObjectCoercible(string);
	return bound(string);
}

export { default as getPolyfill } from 'string.prototype.iswellformed/polyfill';
export { default as implementation } from 'string.prototype.iswellformed/implementation';
export { default as shim } from 'string.prototype.iswellformed/shim';
