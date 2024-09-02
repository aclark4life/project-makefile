"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// From https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
// useLayoutEffect but does not trigger warning in server-side rendering
var react_1 = require("react");
var useIsomorphicLayoutEffect = typeof document !== 'undefined' ? react_1.useLayoutEffect : react_1.useEffect;
exports.default = useIsomorphicLayoutEffect;
//# sourceMappingURL=use-isomorphic-layout-effect.js.map