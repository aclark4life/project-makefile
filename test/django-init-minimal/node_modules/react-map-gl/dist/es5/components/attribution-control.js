"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var apply_react_style_1 = require("../utils/apply-react-style");
var use_control_1 = require("./use-control");
function AttributionControl(props) {
    var ctrl = (0, use_control_1.default)(function (_a) {
        var mapLib = _a.mapLib;
        return new mapLib.AttributionControl(props);
    }, {
        position: props.position
    });
    (0, react_1.useEffect)(function () {
        (0, apply_react_style_1.applyReactStyle)(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
exports.default = (0, react_1.memo)(AttributionControl);
//# sourceMappingURL=attribution-control.js.map