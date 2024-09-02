import * as React from 'react';
import type { ControlPosition, GeolocateControlInstance, GeolocateEvent, GeolocateResultEvent, GeolocateErrorEvent } from '../types';
export declare type GeolocateControlProps<OptionsT, ControlT extends GeolocateControlInstance> = OptionsT & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    /** Called on each Geolocation API position update that returned as success. */
    onGeolocate?: (e: GeolocateResultEvent<ControlT>) => void;
    /** Called on each Geolocation API position update that returned as an error. */
    onError?: (e: GeolocateErrorEvent<ControlT>) => void;
    /** Called on each Geolocation API position update that returned as success but user position
     * is out of map `maxBounds`. */
    onOutOfMaxBounds?: (e: GeolocateResultEvent<ControlT>) => void;
    /** Called when the GeolocateControl changes to the active lock state. */
    onTrackUserLocationStart?: (e: GeolocateEvent<ControlT>) => void;
    /** Called when the GeolocateControl changes to the background state. */
    onTrackUserLocationEnd?: (e: GeolocateEvent<ControlT>) => void;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    /** Called on each Geolocation API position update that returned as success. */
    onGeolocate?: (e: GeolocateResultEvent<GeolocateControlInstance>) => void;
    /** Called on each Geolocation API position update that returned as an error. */
    onError?: (e: GeolocateErrorEvent<GeolocateControlInstance>) => void;
    /** Called on each Geolocation API position update that returned as success but user position
     * is out of map `maxBounds`. */
    onOutOfMaxBounds?: (e: GeolocateResultEvent<GeolocateControlInstance>) => void;
    /** Called when the GeolocateControl changes to the active lock state. */
    onTrackUserLocationStart?: (e: GeolocateEvent<GeolocateControlInstance>) => void;
    /** Called when the GeolocateControl changes to the background state. */
    onTrackUserLocationEnd?: (e: GeolocateEvent<GeolocateControlInstance>) => void;
} & React.RefAttributes<GeolocateControlInstance>>>;
export default _default;
