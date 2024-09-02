import * as React from 'react';
import type { MarkerEvent, MarkerDragEvent, PointLike, MarkerInstance } from '../types';
export declare type MarkerProps<OptionsT, MarkerT extends MarkerInstance> = OptionsT & {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    draggable?: boolean;
    offset?: PointLike;
    pitchAlignment?: string;
    rotation?: number;
    rotationAlignment?: string;
    popup?: any;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onClick?: (e: MarkerEvent<MarkerT, MouseEvent>) => void;
    onDragStart?: (e: MarkerDragEvent<MarkerT>) => void;
    onDrag?: (e: MarkerDragEvent<MarkerT>) => void;
    onDragEnd?: (e: MarkerDragEvent<MarkerT>) => void;
    children?: React.ReactNode;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    draggable?: boolean;
    offset?: PointLike;
    pitchAlignment?: string;
    rotation?: number;
    rotationAlignment?: string;
    popup?: any;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onClick?: (e: MarkerEvent<MarkerInstance, MouseEvent>) => void;
    onDragStart?: (e: MarkerDragEvent<MarkerInstance>) => void;
    onDrag?: (e: MarkerDragEvent<MarkerInstance>) => void;
    onDragEnd?: (e: MarkerDragEvent<MarkerInstance>) => void;
    children?: React.ReactNode;
} & React.RefAttributes<MarkerInstance>>>;
export default _default;
