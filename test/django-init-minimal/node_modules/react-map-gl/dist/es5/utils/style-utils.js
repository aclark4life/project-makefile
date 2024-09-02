"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.normalizeStyle = void 0;
var refProps = ['type', 'source', 'source-layer', 'minzoom', 'maxzoom', 'filter', 'layout'];
// Prepare a map style object for diffing
// If immutable - convert to plain object
// Work around some issues in older styles that would fail Mapbox's diffing
function normalizeStyle(style) {
    var e_1, _a;
    if (!style) {
        return null;
    }
    if (typeof style === 'string') {
        return style;
    }
    if ('toJS' in style) {
        style = style.toJS();
    }
    if (!style.layers) {
        return style;
    }
    var layerIndex = {};
    try {
        for (var _b = __values(style.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var layer = _c.value;
            layerIndex[layer.id] = layer;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var layers = style.layers.map(function (layer) {
        var e_2, _a;
        var normalizedLayer = null;
        if ('interactive' in layer) {
            normalizedLayer = Object.assign({}, layer);
            // Breaks style diffing :(
            // @ts-ignore legacy field not typed
            delete normalizedLayer.interactive;
        }
        // Style diffing doesn't work with refs so expand them out manually before diffing.
        // @ts-ignore legacy field not typed
        var layerRef = layerIndex[layer.ref];
        if (layerRef) {
            normalizedLayer = normalizedLayer || Object.assign({}, layer);
            // @ts-ignore
            delete normalizedLayer.ref;
            try {
                // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
                for (var refProps_1 = __values(refProps), refProps_1_1 = refProps_1.next(); !refProps_1_1.done; refProps_1_1 = refProps_1.next()) {
                    var propName = refProps_1_1.value;
                    if (propName in layerRef) {
                        normalizedLayer[propName] = layerRef[propName];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (refProps_1_1 && !refProps_1_1.done && (_a = refProps_1.return)) _a.call(refProps_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return normalizedLayer || layer;
    });
    // Do not mutate the style object provided by the user
    return __assign(__assign({}, style), { layers: layers });
}
exports.normalizeStyle = normalizeStyle;
//# sourceMappingURL=style-utils.js.map