"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyReactStyle = void 0;
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
var unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
function applyReactStyle(element, styles) {
    if (!element || !styles) {
        return;
    }
    var style = element.style;
    for (var key in styles) {
        var value = styles[key];
        if (Number.isFinite(value) && !unitlessNumber.test(key)) {
            style[key] = "".concat(value, "px");
        }
        else {
            style[key] = value;
        }
    }
}
exports.applyReactStyle = applyReactStyle;
//# sourceMappingURL=apply-react-style.js.map