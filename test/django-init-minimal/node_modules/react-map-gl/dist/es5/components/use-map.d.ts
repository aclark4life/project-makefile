import * as React from 'react';
import { MapRef } from '../mapbox/create-ref';
import { MapInstance } from '../types';
declare type MountedMapsContextValue = {
    maps: {
        [id: string]: MapRef<MapInstance>;
    };
    onMapMount: (map: MapRef<MapInstance>, id: string) => void;
    onMapUnmount: (id: string) => void;
};
export declare const MountedMapsContext: React.Context<MountedMapsContextValue>;
export declare const MapProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare type MapCollection<MapT extends MapInstance> = {
    [id: string]: MapRef<MapT> | undefined;
    current?: MapRef<MapT>;
};
export declare function useMap<MapT extends MapInstance>(): MapCollection<MapT>;
export {};
