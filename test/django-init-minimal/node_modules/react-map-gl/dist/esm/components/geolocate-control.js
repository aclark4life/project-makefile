import { useImperativeHandle, useRef, useEffect, forwardRef, memo } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
function GeolocateControl(props, ref) {
    const thisRef = useRef({ props });
    const ctrl = useControl(({ mapLib }) => {
        const gc = new mapLib.GeolocateControl(props);
        // Hack: fix GeolocateControl reuse
        // When using React strict mode, the component is mounted twice.
        // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
        // @ts-expect-error private method
        const setupUI = gc._setupUI;
        // @ts-expect-error private method
        gc._setupUI = args => {
            if (!gc._container.hasChildNodes()) {
                setupUI(args);
            }
        };
        gc.on('geolocate', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onGeolocate) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('error', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('outofmaxbounds', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOutOfMaxBounds) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationstart', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationStart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationend', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationEnd) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return gc;
    }, { position: props.position });
    thisRef.current.props = props;
    useImperativeHandle(ref, () => ctrl, []);
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export default memo(forwardRef(GeolocateControl));
//# sourceMappingURL=geolocate-control.js.map