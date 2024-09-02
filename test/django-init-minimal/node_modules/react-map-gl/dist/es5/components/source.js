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
var React = require("react");
var react_1 = require("react");
var react_2 = require("react");
var map_1 = require("./map");
var assert_1 = require("../utils/assert");
var deep_equal_1 = require("../utils/deep-equal");
var sourceCounter = 0;
function createSource(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded) {
        var options = __assign({}, props);
        delete options.id;
        delete options.children;
        // @ts-ignore
        map.addSource(id, options);
        return map.getSource(id);
    }
    return null;
}
/* eslint-disable complexity */
function updateSource(source, props, prevProps) {
    (0, assert_1.default)(props.id === prevProps.id, 'source id changed');
    (0, assert_1.default)(props.type === prevProps.type, 'source type changed');
    var changedKey = '';
    var changedKeyCount = 0;
    for (var key in props) {
        if (key !== 'children' && key !== 'id' && !(0, deep_equal_1.deepEqual)(prevProps[key], props[key])) {
            changedKey = key;
            changedKeyCount++;
        }
    }
    if (!changedKeyCount) {
        return;
    }
    var type = props.type;
    if (type === 'geojson') {
        source.setData(props.data);
    }
    else if (type === 'image') {
        source.updateImage({
            url: props.url,
            coordinates: props.coordinates
        });
    }
    else if ('setCoordinates' in source && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(props.coordinates);
    }
    else if ('setUrl' in source) {
        // Added in 1.12.0:
        // vectorTileSource.setTiles
        // vectorTileSource.setUrl
        switch (changedKey) {
            case 'url':
                source.setUrl(props.url);
                break;
            case 'tiles':
                source.setTiles(props.tiles);
                break;
            default:
        }
    }
    else {
        // eslint-disable-next-line
        console.warn("Unable to update <Source> prop: ".concat(changedKey));
    }
}
/* eslint-enable complexity */
function Source(props) {
    var map = (0, react_1.useContext)(map_1.MapContext).map.getMap();
    var propsRef = (0, react_1.useRef)(props);
    var _a = __read((0, react_1.useState)(0), 2), setStyleLoaded = _a[1];
    var id = (0, react_1.useMemo)(function () { return props.id || "jsx-source-".concat(sourceCounter++); }, []);
    (0, react_1.useEffect)(function () {
        if (map) {
            /* global setTimeout */
            var forceUpdate_1 = function () { return setTimeout(function () { return setStyleLoaded(function (version) { return version + 1; }); }, 0); };
            map.on('styledata', forceUpdate_1);
            forceUpdate_1();
            return function () {
                var e_1, _a;
                var _b;
                map.off('styledata', forceUpdate_1);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getSource(id)) {
                    // Parent effects are destroyed before child ones, see
                    // https://github.com/facebook/react/issues/16728
                    // Source can only be removed after all child layers are removed
                    var allLayers = (_b = map.getStyle()) === null || _b === void 0 ? void 0 : _b.layers;
                    if (allLayers) {
                        try {
                            for (var allLayers_1 = __values(allLayers), allLayers_1_1 = allLayers_1.next(); !allLayers_1_1.done; allLayers_1_1 = allLayers_1.next()) {
                                var layer = allLayers_1_1.value;
                                // @ts-ignore (2339) source does not exist on all layer types
                                if (layer.source === id) {
                                    map.removeLayer(layer.id);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (allLayers_1_1 && !allLayers_1_1.done && (_a = allLayers_1.return)) _a.call(allLayers_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    map.removeSource(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    var source = map && map.style && map.getSource(id);
    if (source) {
        updateSource(source, props, propsRef.current);
    }
    else {
        source = createSource(map, id, props);
    }
    propsRef.current = props;
    return ((source &&
        React.Children.map(props.children, function (child) {
            return child &&
                (0, react_2.cloneElement)(child, {
                    source: id
                });
        })) ||
        null);
}
exports.default = Source;
//# sourceMappingURL=source.js.map