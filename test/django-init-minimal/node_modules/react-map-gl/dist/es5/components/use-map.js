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
exports.useMap = exports.MapProvider = exports.MountedMapsContext = void 0;
var React = require("react");
var react_1 = require("react");
var map_1 = require("./map");
exports.MountedMapsContext = React.createContext(null);
var MapProvider = function (props) {
    var _a = __read((0, react_1.useState)({}), 2), maps = _a[0], setMaps = _a[1];
    var onMapMount = (0, react_1.useCallback)(function (map, id) {
        if (id === void 0) { id = 'default'; }
        setMaps(function (currMaps) {
            var _a;
            if (id === 'current') {
                throw new Error("'current' cannot be used as map id");
            }
            if (currMaps[id]) {
                throw new Error("Multiple maps with the same id: ".concat(id));
            }
            return __assign(__assign({}, currMaps), (_a = {}, _a[id] = map, _a));
        });
    }, []);
    var onMapUnmount = (0, react_1.useCallback)(function (id) {
        if (id === void 0) { id = 'default'; }
        setMaps(function (currMaps) {
            if (currMaps[id]) {
                var nextMaps = __assign({}, currMaps);
                delete nextMaps[id];
                return nextMaps;
            }
            return currMaps;
        });
    }, []);
    return (React.createElement(exports.MountedMapsContext.Provider, { value: {
            maps: maps,
            onMapMount: onMapMount,
            onMapUnmount: onMapUnmount
        } }, props.children));
};
exports.MapProvider = MapProvider;
function useMap() {
    var _a;
    var maps = (_a = (0, react_1.useContext)(exports.MountedMapsContext)) === null || _a === void 0 ? void 0 : _a.maps;
    var currentMap = (0, react_1.useContext)(map_1.MapContext);
    var mapsWithCurrent = (0, react_1.useMemo)(function () {
        return __assign(__assign({}, maps), { current: currentMap === null || currentMap === void 0 ? void 0 : currentMap.map });
    }, [maps, currentMap]);
    return mapsWithCurrent;
}
exports.useMap = useMap;
//# sourceMappingURL=use-map.js.map