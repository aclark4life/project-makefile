import type { ViewState, Point, LngLat, MapGeoJSONFeature } from './common';
import type { MapInstance, Evented, MarkerInstance, PopupInstance, GeolocateControlInstance } from './lib';
export interface Callbacks {
    [key: `on${string}`]: Function;
}
export interface MapEvent<SourceT extends Evented, OriginalEventT = undefined> {
    type: string;
    target: SourceT;
    originalEvent: OriginalEventT;
}
export declare type ErrorEvent<MapT extends MapInstance> = MapEvent<MapT> & {
    type: 'error';
    error: Error;
};
export declare type MapMouseEvent<MapT extends MapInstance> = MapEvent<MapT, MouseEvent> & {
    point: Point;
    lngLat: LngLat;
    features?: MapGeoJSONFeature[];
};
export declare type ViewStateChangeEvent<MapT extends MapInstance> = (MapEvent<MapT, MouseEvent | TouchEvent | WheelEvent | undefined> & {
    type: 'movestart' | 'move' | 'moveend' | 'zoomstart' | 'zoom' | 'zoomend';
    viewState: ViewState;
}) | (MapEvent<MapT, MouseEvent | TouchEvent | undefined> & {
    type: 'rotatestart' | 'rotate' | 'rotateend' | 'dragstart' | 'drag' | 'dragend' | 'pitchstart' | 'pitch' | 'pitchend';
    viewState: ViewState;
});
export declare type PopupEvent<PopupT extends PopupInstance> = {
    type: 'open' | 'close';
    target: PopupT;
};
export declare type MarkerEvent<MarkerT extends MarkerInstance, OriginalEventT = undefined> = MapEvent<MarkerT, OriginalEventT>;
export declare type MarkerDragEvent<MarkerT extends MarkerInstance> = MarkerEvent<MarkerT> & {
    type: 'dragstart' | 'drag' | 'dragend';
    target: MarkerT;
    lngLat: LngLat;
};
export declare type GeolocateEvent<GeolocateControlT extends GeolocateControlInstance> = MapEvent<GeolocateControlT>;
export declare type GeolocateResultEvent<GeolocateControlT extends GeolocateControlInstance> = GeolocateEvent<GeolocateControlT> & GeolocationPosition;
export declare type GeolocateErrorEvent<GeolocateControlT extends GeolocateControlInstance> = GeolocateEvent<GeolocateControlT> & GeolocationPositionError;
