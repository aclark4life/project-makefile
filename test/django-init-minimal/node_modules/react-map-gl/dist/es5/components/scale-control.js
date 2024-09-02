"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var use_control_1 = require("./use-control");
function ScaleControl(props) {
    var ctrl = (0, use_control_1.default)(function (_a) {
        var mapLib = _a.mapLib;
        return new mapLib.ScaleControl(props);
    }, {
        position: props.position
    });
    var propsRef = (0, react_1.useRef)(props);
    var prevProps = propsRef.current;
    propsRef.current = props;
    var style = props.style;
    if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
        ctrl.options.maxWidth = props.maxWidth;
    }
    if (props.unit !== undefined && props.unit !== prevProps.unit) {
        ctrl.setUnit(props.unit);
    }
    (0, react_1.useEffect)(function () {
        (0, apply_react_style_1.applyReactStyle)(ctrl._container, style);
    }, [style]);
    return null;
}
exports.default = (0, react_1.memo)(ScaleControl);
//# sourceMappingURL=scale-control.js.map