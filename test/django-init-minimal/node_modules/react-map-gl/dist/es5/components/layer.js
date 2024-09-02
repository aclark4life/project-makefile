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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var map_1 = require("./map");
var assert_1 = require("../utils/assert");
var deep_equal_1 = require("../utils/deep-equal");
/* eslint-disable complexity, max-statements */
function updateLayer(map, id, props, prevProps) {
    (0, assert_1.default)(props.id === prevProps.id, 'layer id changed');
    (0, assert_1.default)(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') {
        return;
    }
    var _a = props.layout, layout = _a === void 0 ? {} : _a, _b = props.paint, paint = _b === void 0 ? {} : _b, filter = props.filter, minzoom = props.minzoom, maxzoom = props.maxzoom, beforeId = props.beforeId;
    if (beforeId !== prevProps.beforeId) {
        map.moveLayer(id, beforeId);
    }
    if (layout !== prevProps.layout) {
        var prevLayout = prevProps.layout || {};
        for (var key in layout) {
            if (!(0, deep_equal_1.deepEqual)(layout[key], prevLayout[key])) {
                map.setLayoutProperty(id, key, layout[key]);
            }
        }
        for (var key in prevLayout) {
            if (!layout.hasOwnProperty(key)) {
                map.setLayoutProperty(id, key, undefined);
            }
        }
    }
    if (paint !== prevProps.paint) {
        var prevPaint = prevProps.paint || {};
        for (var key in paint) {
            if (!(0, deep_equal_1.deepEqual)(paint[key], prevPaint[key])) {
                map.setPaintProperty(id, key, paint[key]);
            }
        }
        for (var key in prevPaint) {
            if (!paint.hasOwnProperty(key)) {
                map.setPaintProperty(id, key, undefined);
            }
        }
    }
    if (!(0, deep_equal_1.deepEqual)(filter, prevProps.filter)) {
        map.setFilter(id, filter);
    }
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
        map.setLayerZoomRange(id, minzoom, maxzoom);
    }
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        var options = __assign(__assign({}, props), { id: id });
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */
var layerCounter = 0;
function Layer(props) {
    var map = (0, react_1.useContext)(map_1.MapContext).map.getMap();
    var propsRef = (0, react_1.useRef)(props);
    var _a = __read((0, react_1.useState)(0), 2), setStyleLoaded = _a[1];
    var id = (0, react_1.useMemo)(function () { return props.id || "jsx-layer-".concat(layerCounter++); }, []);
    (0, react_1.useEffect)(function () {
        if (map) {
            var forceUpdate_1 = function () { return setStyleLoaded(function (version) { return version + 1; }); };
            map.on('styledata', forceUpdate_1);
            forceUpdate_1();
            return function () {
                map.off('styledata', forceUpdate_1);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getLayer(id)) {
                    map.removeLayer(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    var layer = map && map.style && map.getLayer(id);
    if (layer) {
        try {
            updateLayer(map, id, props, propsRef.current);
        }
        catch (error) {
            console.warn(error); // eslint-disable-line
        }
    }
    else {
        createLayer(map, id, props);
    }
    // Store last rendered props
    propsRef.current = props;
    return null;
}
exports.default = Layer;
//# sourceMappingURL=layer.js.map