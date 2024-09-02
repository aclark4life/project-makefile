import type { MapInstance, MapStyle, Callbacks } from '../types';
import type Mapbox from './mapbox';
/** These methods may break the react binding if called directly */
declare const skipMethods: readonly ["setMaxBounds", "setMinZoom", "setMaxZoom", "setMinPitch", "setMaxPitch", "setRenderWorldCopies", "setProjection", "setStyle", "addSource", "removeSource", "addLayer", "removeLayer", "setLayerZoomRange", "setFilter", "setPaintProperty", "setLayoutProperty", "setLight", "setTerrain", "setFog", "remove"];
export declare type MapRef<MapT extends MapInstance> = {
    getMap(): MapT;
} & Omit<MapT, typeof skipMethods[number]>;
export default function createRef<StyleT extends MapStyle, CallbacksT extends Callbacks, MapT extends MapInstance>(mapInstance: Mapbox<StyleT, CallbacksT, MapT>): MapRef<MapT> | null;
export {};
