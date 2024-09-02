import * as React from 'react';
import type { ControlPosition, NavigationControlInstance } from '../types';
export declare type NavigationControlProps<OptionsT> = OptionsT & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function NavigationControl<NavigationControlOptions, ControlT extends NavigationControlInstance>(props: NavigationControlProps<NavigationControlOptions>): null;
declare const _default: React.MemoExoticComponent<typeof NavigationControl>;
export default _default;
