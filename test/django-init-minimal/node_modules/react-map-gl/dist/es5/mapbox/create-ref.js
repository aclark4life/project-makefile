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
/** These methods may break the react binding if called directly */
var skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
function createRef(mapInstance) {
    var e_1, _a;
    if (!mapInstance) {
        return null;
    }
    var map = mapInstance.map;
    var result = {
        getMap: function () { return map; },
        // Overwrite getters to use our shadow transform
        getCenter: function () { return mapInstance.transform.center; },
        getZoom: function () { return mapInstance.transform.zoom; },
        getBearing: function () { return mapInstance.transform.bearing; },
        getPitch: function () { return mapInstance.transform.pitch; },
        getPadding: function () { return mapInstance.transform.padding; },
        getBounds: function () { return mapInstance.transform.getBounds(); },
        project: function (lnglat) {
            var tr = map.transform;
            map.transform = mapInstance.transform;
            var result = map.project(lnglat);
            map.transform = tr;
            return result;
        },
        unproject: function (point) {
            var tr = map.transform;
            map.transform = mapInstance.transform;
            var result = map.unproject(point);
            map.transform = tr;
            return result;
        },
        // options diverge between mapbox and maplibre
        queryTerrainElevation: function (lnglat, options) {
            var tr = map.transform;
            map.transform = mapInstance.transform;
            var result = map.queryTerrainElevation(lnglat, options);
            map.transform = tr;
            return result;
        },
        queryRenderedFeatures: function (geometry, options) {
            var tr = map.transform;
            map.transform = mapInstance.transform;
            var result = map.queryRenderedFeatures(geometry, options);
            map.transform = tr;
            return result;
        }
    };
    try {
        for (var _b = __values(getMethodNames(map)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            // @ts-expect-error
            if (!(key in result) && !skipMethods.includes(key)) {
                result[key] = map[key].bind(map);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
exports.default = createRef;
function getMethodNames(obj) {
    var e_2, _a;
    var result = new Set();
    var proto = obj;
    while (proto) {
        try {
            for (var _b = (e_2 = void 0, __values(Object.getOwnPropertyNames(proto))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (key[0] !== '_' &&
                    typeof obj[key] === 'function' &&
                    key !== 'fire' &&
                    key !== 'setEventedParent') {
                    result.add(key);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
}
//# sourceMappingURL=create-ref.js.map