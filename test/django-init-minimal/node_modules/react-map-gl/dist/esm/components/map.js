import * as React from 'react';
import { useState, useRef, useEffect, useContext, useMemo, useImperativeHandle } from 'react';
import { MountedMapsContext } from './use-map';
import Mapbox from '../mapbox/mapbox';
import createRef from '../mapbox/create-ref';
import useIsomorphicLayoutEffect from '../utils/use-isomorphic-layout-effect';
import setGlobals from '../utils/set-globals';
export const MapContext = React.createContext(null);
export default function Map(props, ref, defaultLib) {
    const mountedMapsContext = useContext(MountedMapsContext);
    const [mapInstance, setMapInstance] = useState(null);
    const containerRef = useRef();
    const { current: contextValue } = useRef({ mapLib: null, map: null });
    useEffect(() => {
        const mapLib = props.mapLib;
        let isMounted = true;
        let mapbox;
        Promise.resolve(mapLib || defaultLib)
            .then((module) => {
            if (!isMounted) {
                return;
            }
            if (!module) {
                throw new Error('Invalid mapLib');
            }
            const mapboxgl = 'Map' in module ? module : module.default;
            if (!mapboxgl.Map) {
                throw new Error('Invalid mapLib');
            }
            // workerUrl & workerClass may change the result of supported()
            // https://github.com/visgl/react-map-gl/discussions/2027
            setGlobals(mapboxgl, props);
            if (!mapboxgl.supported || mapboxgl.supported(props)) {
                if (props.reuseMaps) {
                    mapbox = Mapbox.reuse(props, containerRef.current);
                }
                if (!mapbox) {
                    mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
                }
                contextValue.map = createRef(mapbox);
                contextValue.mapLib = mapboxgl;
                setMapInstance(mapbox);
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapMount(contextValue.map, props.id);
            }
            else {
                throw new Error('Map is not supported by this browser');
            }
        })
            .catch(error => {
            const { onError } = props;
            if (onError) {
                onError({
                    type: 'error',
                    target: null,
                    originalEvent: null,
                    error
                });
            }
            else {
                console.error(error); // eslint-disable-line
            }
        });
        return () => {
            isMounted = false;
            if (mapbox) {
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapUnmount(props.id);
                if (props.reuseMaps) {
                    mapbox.recycle();
                }
                else {
                    mapbox.destroy();
                }
            }
        };
    }, []);
    useIsomorphicLayoutEffect(() => {
        if (mapInstance) {
            mapInstance.setProps(props);
        }
    });
    useImperativeHandle(ref, () => contextValue.map, [mapInstance]);
    const style = useMemo(() => ({
        position: 'relative',
        width: '100%',
        height: '100%',
        ...props.style
    }), [props.style]);
    const CHILD_CONTAINER_STYLE = {
        height: '100%'
    };
    return (React.createElement("div", { id: props.id, ref: containerRef, style: style }, mapInstance && (React.createElement(MapContext.Provider, { value: contextValue },
        React.createElement("div", { "mapboxgl-children": "", style: CHILD_CONTAINER_STYLE }, props.children)))));
}
//# sourceMappingURL=map.js.map