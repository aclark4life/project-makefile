"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var map_1 = require("./map");
function useControl(onCreate, arg1, arg2, arg3) {
    var context = (0, react_1.useContext)(map_1.MapContext);
    var ctrl = (0, react_1.useMemo)(function () { return onCreate(context); }, []);
    (0, react_1.useEffect)(function () {
        var opts = (arg3 || arg2 || arg1);
        var onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
        var onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
        var map = context.map;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, opts === null || opts === void 0 ? void 0 : opts.position);
            if (onAdd) {
                onAdd(context);
            }
        }
        return function () {
            if (onRemove) {
                onRemove(context);
            }
            // Map might have been removed (parent effects are destroyed before child ones)
            if (map.hasControl(ctrl)) {
                map.removeControl(ctrl);
            }
        };
    }, []);
    return ctrl;
}
exports.default = useControl;
//# sourceMappingURL=use-control.js.map