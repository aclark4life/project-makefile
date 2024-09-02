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
Object.defineProperty(exports, "__esModule", { value: true });
/* global document */
var React = require("react");
var react_dom_1 = require("react-dom");
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var map_1 = require("./map");
var deep_equal_1 = require("../utils/deep-equal");
/* eslint-disable complexity,max-statements */
function Marker(props, ref) {
    var _a = (0, react_1.useContext)(map_1.MapContext), map = _a.map, mapLib = _a.mapLib;
    var thisRef = (0, react_1.useRef)({ props: props });
    thisRef.current.props = props;
    var marker = (0, react_1.useMemo)(function () {
        var hasChildren = false;
        React.Children.forEach(props.children, function (el) {
            if (el) {
                hasChildren = true;
            }
        });
        var options = __assign(__assign({}, props), { element: hasChildren ? document.createElement('div') : null });
        var mk = new mapLib.Marker(options);
        mk.setLngLat([props.longitude, props.latitude]);
        mk.getElement().addEventListener('click', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'click',
                target: mk,
                originalEvent: e
            });
        });
        mk.on('dragstart', function (e) {
            var _a, _b;
            var evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('drag', function (e) {
            var _a, _b;
            var evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDrag) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('dragend', function (e) {
            var _a, _b;
            var evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragEnd) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        return mk;
    }, []);
    (0, react_1.useEffect)(function () {
        marker.addTo(map.getMap());
        return function () {
            marker.remove();
        };
    }, []);
    var longitude = props.longitude, latitude = props.latitude, offset = props.offset, style = props.style, _b = props.draggable, draggable = _b === void 0 ? false : _b, _c = props.popup, popup = _c === void 0 ? null : _c, _d = props.rotation, rotation = _d === void 0 ? 0 : _d, _e = props.rotationAlignment, rotationAlignment = _e === void 0 ? 'auto' : _e, _f = props.pitchAlignment, pitchAlignment = _f === void 0 ? 'auto' : _f;
    (0, react_1.useEffect)(function () {
        (0, apply_react_style_1.applyReactStyle)(marker.getElement(), style);
    }, [style]);
    (0, react_1.useImperativeHandle)(ref, function () { return marker; }, []);
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
        marker.setLngLat([longitude, latitude]);
    }
    if (offset && !(0, deep_equal_1.arePointsEqual)(marker.getOffset(), offset)) {
        marker.setOffset(offset);
    }
    if (marker.isDraggable() !== draggable) {
        marker.setDraggable(draggable);
    }
    if (marker.getRotation() !== rotation) {
        marker.setRotation(rotation);
    }
    if (marker.getRotationAlignment() !== rotationAlignment) {
        marker.setRotationAlignment(rotationAlignment);
    }
    if (marker.getPitchAlignment() !== pitchAlignment) {
        marker.setPitchAlignment(pitchAlignment);
    }
    if (marker.getPopup() !== popup) {
        marker.setPopup(popup);
    }
    return (0, react_dom_1.createPortal)(props.children, marker.getElement());
}
exports.default = (0, react_1.memo)((0, react_1.forwardRef)(Marker));
//# sourceMappingURL=marker.js.map