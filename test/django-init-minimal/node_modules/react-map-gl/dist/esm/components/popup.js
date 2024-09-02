import { createPortal } from 'react-dom';
import { useImperativeHandle, useEffect, useMemo, useRef, useContext, forwardRef, memo } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import { MapContext } from './map';
import { deepEqual } from '../utils/deep-equal';
// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
/* eslint-disable complexity,max-statements */
function Popup(props, ref) {
    const { map, mapLib } = useContext(MapContext);
    const container = useMemo(() => {
        return document.createElement('div');
    }, []);
    const thisRef = useRef({ props });
    thisRef.current.props = props;
    const popup = useMemo(() => {
        const options = { ...props };
        const pp = new mapLib.Popup(options);
        pp.setLngLat([props.longitude, props.latitude]);
        pp.once('open', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOpen) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return pp;
    }, []);
    useEffect(() => {
        const onClose = e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        popup.on('close', onClose);
        popup.setDOMContent(container).addTo(map.getMap());
        return () => {
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
    useEffect(() => {
        applyReactStyle(popup.getElement(), props.style);
    }, [props.style]);
    useImperativeHandle(ref, () => popup, []);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([props.longitude, props.latitude]);
        }
        if (props.offset && !deepEqual(popup.options.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        if (popup.options.className !== props.className) {
            const prevClassList = getClassList(popup.options.className);
            const nextClassList = getClassList(props.className);
            for (const c of prevClassList) {
                if (!nextClassList.has(c)) {
                    popup.removeClassName(c);
                }
            }
            for (const c of nextClassList) {
                if (!prevClassList.has(c)) {
                    popup.addClassName(c);
                }
            }
            popup.options.className = props.className;
        }
    }
    return createPortal(props.children, container);
}
export default memo(forwardRef(Popup));
//# sourceMappingURL=popup.js.map