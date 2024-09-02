import * as React from 'react';
import type { PopupEvent, PopupInstance } from '../types';
export declare type PopupProps<OptionsT, PopupT extends PopupInstance> = OptionsT & {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    anchor?: string;
    offset?: any;
    className?: string;
    maxWidth?: string;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onOpen?: (e: PopupEvent<PopupT>) => void;
    onClose?: (e: PopupEvent<PopupT>) => void;
    children?: React.ReactNode;
};
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<{
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    anchor?: string;
    offset?: any;
    className?: string;
    maxWidth?: string;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onOpen?: (e: PopupEvent<PopupInstance>) => void;
    onClose?: (e: PopupEvent<PopupInstance>) => void;
    children?: React.ReactNode;
} & React.RefAttributes<PopupInstance>>>;
export default _default;
