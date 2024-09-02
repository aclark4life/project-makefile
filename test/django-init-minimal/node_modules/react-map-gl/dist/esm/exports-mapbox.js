import * as React from 'react';
import { default as _Map } from './components/map';
import { default as _Marker } from './components/marker';
import { default as _Popup } from './components/popup';
import { default as _AttributionControl } from './components/attribution-control';
import { default as _FullscreenControl } from './components/fullscreen-control';
import { default as _GeolocateControl } from './components/geolocate-control';
import { default as _NavigationControl } from './components/navigation-control';
import { default as _ScaleControl } from './components/scale-control';
import { default as _Layer } from './components/layer';
import { default as _Source } from './components/source';
import { useMap as _useMap } from './components/use-map';
export function useMap() {
    return _useMap();
}
const mapLib = import('mapbox-gl');
export const Map = (() => {
    return React.forwardRef(function Map(props, ref) {
        return _Map(props, ref, mapLib);
    });
})();
export const Marker = _Marker;
export const Popup = _Popup;
export const AttributionControl = _AttributionControl;
export const FullscreenControl = _FullscreenControl;
export const NavigationControl = _NavigationControl;
export const GeolocateControl = _GeolocateControl;
export const ScaleControl = _ScaleControl;
export const Layer = _Layer;
export const Source = _Source;
export { default as useControl } from './components/use-control';
export { MapProvider } from './components/use-map';
export default Map;
// Types
export * from './types/public';
export * from './types/style-spec-mapbox';
//# sourceMappingURL=exports-mapbox.js.map