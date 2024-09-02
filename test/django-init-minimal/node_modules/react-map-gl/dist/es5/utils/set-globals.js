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
var globalSettings = [
    'baseApiUrl',
    'maxParallelImageRequests',
    'workerClass',
    'workerCount',
    'workerUrl'
];
function setGlobals(mapLib, props) {
    var e_1, _a;
    try {
        for (var globalSettings_1 = __values(globalSettings), globalSettings_1_1 = globalSettings_1.next(); !globalSettings_1_1.done; globalSettings_1_1 = globalSettings_1.next()) {
            var key = globalSettings_1_1.value;
            if (key in props) {
                mapLib[key] = props[key];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (globalSettings_1_1 && !globalSettings_1_1.done && (_a = globalSettings_1.return)) _a.call(globalSettings_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _b = props.RTLTextPlugin, RTLTextPlugin = _b === void 0 ? 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js' : _b;
    if (RTLTextPlugin &&
        mapLib.getRTLTextPluginStatus &&
        mapLib.getRTLTextPluginStatus() === 'unavailable') {
        mapLib.setRTLTextPlugin(RTLTextPlugin, function (error) {
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, true);
    }
}
exports.default = setGlobals;
//# sourceMappingURL=set-globals.js.map