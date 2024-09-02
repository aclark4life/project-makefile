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
var react_dom_1 = require("react-dom");
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var map_1 = require("./map");
var deep_equal_1 = require("../utils/deep-equal");
// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
/* eslint-disable complexity,max-statements */
function Popup(props, ref) {
    var e_1, _a, e_2, _b;
    var _c = (0, react_1.useContext)(map_1.MapContext), map = _c.map, mapLib = _c.mapLib;
    var container = (0, react_1.useMemo)(function () {
        return document.createElement('div');
    }, []);
    var thisRef = (0, react_1.useRef)({ props: props });
    thisRef.current.props = props;
    var popup = (0, react_1.useMemo)(function () {
        var options = __assign({}, props);
        var pp = new mapLib.Popup(options);
        pp.setLngLat([props.longitude, props.latitude]);
        pp.once('open', function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOpen) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return pp;
    }, []);
    (0, react_1.useEffect)(function () {
        var onClose = function (e) {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        popup.on('close', onClose);
        popup.setDOMContent(container).addTo(map.getMap());
        return function () {
            // https://github.com/visgl/react-map-gl/issues/1825
            // onClose should not be fired if the popup is removed by unmounting
            // When using React strict mode, the component is mounted twice.
            // Firing the onClose callback here would be a false signal to remove the component.
            popup.off('close', onClose);
            if (popup.isOpen()) {
                popup.remove();
            }
        };
    }, []);
    (0, react_1.useEffect)(function () {
        (0, apply_react_style_1.applyReactStyle)(popup.getElement(), props.style);
    }, [props.style]);
    (0, react_1.useImperativeHandle)(ref, function () { return popup; }, []);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([props.longitude, props.latitude]);
        }
        if (props.offset && !(0, deep_equal_1.deepEqual)(popup.options.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        if (popup.options.className !== props.className) {
            var prevClassList = getClassList(popup.options.className);
            var nextClassList = getClassList(props.className);
            try {
                for (var prevClassList_1 = __values(prevClassList), prevClassList_1_1 = prevClassList_1.next(); !prevClassList_1_1.done; prevClassList_1_1 = prevClassList_1.next()) {
                    var c = prevClassList_1_1.value;
                    if (!nextClassList.has(c)) {
                        popup.removeClassName(c);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (prevClassList_1_1 && !prevClassList_1_1.done && (_a = prevClassList_1.return)) _a.call(prevClassList_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var nextClassList_1 = __values(nextClassList), nextClassList_1_1 = nextClassList_1.next(); !nextClassList_1_1.done; nextClassList_1_1 = nextClassList_1.next()) {
                    var c = nextClassList_1_1.value;
                    if (!prevClassList.has(c)) {
                        popup.addClassName(c);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (nextClassList_1_1 && !nextClassList_1_1.done && (_b = nextClassList_1.return)) _b.call(nextClassList_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            popup.options.className = props.className;
        }
    }
    return (0, react_dom_1.createPortal)(props.children, container);
}
exports.default = (0, react_1.memo)((0, react_1.forwardRef)(Popup));
//# sourceMappingURL=popup.js.map