"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var use_control_1 = require("./use-control");
function GeolocateControl(props, ref) {
    var thisRef = (0, react_1.useRef)({ props: props });
    var ctrl = (0, use_control_1.default)(function (_a) {
        var mapLib = _a.mapLib;
        var gc = new mapLib.GeolocateControl(props);
        // Hack: fix GeolocateControl reuse
        // When using React strict mode, the component is mounted twice.
        // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
        // @ts-expect-error private method
        var setupUI = gc._setupUI;
        // @ts-expect-error private method
        gc._setupUI = function (args) {
            if (!gc._container.hasChildNodes()) {
                setupUI(args);
            }
        };
        gc.on('geolocate', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onGeolocate) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('error', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('outofmaxbounds', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOutOfMaxBounds) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationstart', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationStart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationend', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationEnd) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return gc;
    }, { position: props.position });
    thisRef.current.props = props;
    (0, react_1.useImperativeHandle)(ref, function () { return ctrl; }, []);
    (0, react_1.useEffect)(function () {
        (0, apply_react_style_1.applyReactStyle)(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
exports.default = (0, react_1.memo)((0, react_1.forwardRef)(GeolocateControl));
//# sourceMappingURL=geolocate-control.js.map