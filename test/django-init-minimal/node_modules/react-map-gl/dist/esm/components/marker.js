/* global document */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useImperativeHandle, useEffect, useMemo, useRef, useContext, forwardRef, memo } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import { MapContext } from './map';
import { arePointsEqual } from '../utils/deep-equal';
/* eslint-disable complexity,max-statements */
function Marker(props, ref) {
    const { map, mapLib } = useContext(MapContext);
    const thisRef = useRef({ props });
    thisRef.current.props = props;
    const marker = useMemo(() => {
        let hasChildren = false;
        React.Children.forEach(props.children, el => {
            if (el) {
                hasChildren = true;
            }
        });
        const options = {
            ...props,
            element: hasChildren ? document.createElement('div') : null
        };
        const mk = new mapLib.Marker(options);
        mk.setLngLat([props.longitude, props.latitude]);
        mk.getElement().addEventListener('click', (e) => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'click',
                target: mk,
                originalEvent: e
            });
        });
        mk.on('dragstart', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('drag', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDrag) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('dragend', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragEnd) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        return mk;
    }, []);
    useEffect(() => {
        marker.addTo(map.getMap());
        return () => {
            marker.remove();
        };
    }, []);
    const { longitude, latitude, offset, style, draggable = false, popup = null, rotation = 0, rotationAlignment = 'auto', pitchAlignment = 'auto' } = props;
    useEffect(() => {
        applyReactStyle(marker.getElement(), style);
    }, [style]);
    useImperativeHandle(ref, () => marker, []);
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
        marker.setLngLat([longitude, latitude]);
    }
    if (offset && !arePointsEqual(marker.getOffset(), offset)) {
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
    return createPortal(props.children, marker.getElement());
}
export default memo(forwardRef(Marker));
//# sourceMappingURL=marker.js.map