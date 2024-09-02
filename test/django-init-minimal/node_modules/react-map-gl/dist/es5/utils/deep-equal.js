"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEqual = exports.arePointsEqual = void 0;
/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */
function arePointsEqual(a, b) {
    var ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
    var ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
    var bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
    var by = Array.isArray(b) ? b[1] : b ? b.y : 0;
    return ax === bx && ay === by;
}
exports.arePointsEqual = arePointsEqual;
/* eslint-disable complexity */
/**
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */
function deepEqual(a, b) {
    var e_1, _a;
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(b)) {
        return false;
    }
    if (typeof a === 'object' && typeof b === 'object') {
        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        try {
            for (var aKeys_1 = __values(aKeys), aKeys_1_1 = aKeys_1.next(); !aKeys_1_1.done; aKeys_1_1 = aKeys_1.next()) {
                var key = aKeys_1_1.value;
                if (!b.hasOwnProperty(key)) {
                    return false;
                }
                if (!deepEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (aKeys_1_1 && !aKeys_1_1.done && (_a = aKeys_1.return)) _a.call(aKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    }
    return false;
}
exports.deepEqual = deepEqual;
//# sourceMappingURL=deep-equal.js.map