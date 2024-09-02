"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapProvider = exports.useControl = exports.Source = exports.Layer = exports.ScaleControl = exports.GeolocateControl = exports.NavigationControl = exports.FullscreenControl = exports.AttributionControl = exports.Popup = exports.Marker = exports.Map = exports.useMap = void 0;
var React = require("react");
var map_1 = require("./components/map");
var marker_1 = require("./components/marker");
var popup_1 = require("./components/popup");
var attribution_control_1 = require("./components/attribution-control");
var fullscreen_control_1 = require("./components/fullscreen-control");
var geolocate_control_1 = require("./components/geolocate-control");
var navigation_control_1 = require("./components/navigation-control");
var scale_control_1 = require("./components/scale-control");
var layer_1 = require("./components/layer");
var source_1 = require("./components/source");
var use_map_1 = require("./components/use-map");
function useMap() {
    return (0, use_map_1.useMap)();
}
exports.useMap = useMap;
var mapLib = Promise.resolve().then(function () { return require('maplibre-gl'); });
exports.Map = (function () {
    return React.forwardRef(function Map(props, ref) {
        return (0, map_1.default)(props, ref, mapLib);
    });
})();
exports.Marker = marker_1.default;
exports.Popup = popup_1.default;
exports.AttributionControl = attribution_control_1.default;
exports.FullscreenControl = fullscreen_control_1.default;
exports.NavigationControl = navigation_control_1.default;
exports.GeolocateControl = geolocate_control_1.default;
exports.ScaleControl = scale_control_1.default;
exports.Layer = layer_1.default;
exports.Source = source_1.default;
var use_control_1 = require("./components/use-control");
Object.defineProperty(exports, "useControl", { enumerable: true, get: function () { return use_control_1.default; } });
var use_map_2 = require("./components/use-map");
Object.defineProperty(exports, "MapProvider", { enumerable: true, get: function () { return use_map_2.MapProvider; } });
exports.default = exports.Map;
// Types
__exportStar(require("./types/public"), exports);
__exportStar(require("./types/style-spec-maplibre"), exports);
//# sourceMappingURL=exports-maplibre.js.map