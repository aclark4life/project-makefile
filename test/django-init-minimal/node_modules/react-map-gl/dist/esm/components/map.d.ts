import * as React from 'react';
import { MapboxProps } from '../mapbox/mapbox';
import { MapRef } from '../mapbox/create-ref';
import type { CSSProperties } from 'react';
import { GlobalSettings } from '../utils/set-globals';
import type { MapLib, MapInstance, MapStyle, Callbacks } from '../types';
export declare type MapContextValue<MapT extends MapInstance = MapInstance> = {
    mapLib: MapLib<MapT>;
    map: MapRef<MapT>;
};
export declare const MapContext: React.Context<MapContextValue<MapInstance>>;
declare type MapInitOptions<MapOptions> = Omit<MapOptions, 'style' | 'container' | 'bounds' | 'fitBoundsOptions' | 'center'>;
export declare type MapProps<MapOptions, StyleT extends MapStyle, CallbacksT extends Callbacks, MapT extends MapInstance> = MapInitOptions<MapOptions> & MapboxProps<StyleT, CallbacksT> & GlobalSettings & {
    mapLib?: MapLib<MapT> | Promise<MapLib<MapT>>;
    reuseMaps?: boolean;
    /** Map container id */
    id?: string;
    /** Map container CSS style */
    style?: CSSProperties;
    children?: any;
};
export default function Map<MapOptions, StyleT extends MapStyle, CallbacksT extends Callbacks, MapT extends MapInstance>(props: MapProps<MapOptions, StyleT, CallbacksT, MapT>, ref: React.Ref<MapRef<MapT>>, defaultLib: MapLib<MapT> | Promise<MapLib<MapT>>): JSX.Element;
export {};
