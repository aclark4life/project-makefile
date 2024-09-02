import * as React from 'react';
import type { ControlPosition, ScaleControlInstance } from '../types';
export declare type ScaleControlProps<OptionsT> = OptionsT & {
    unit?: string;
    maxWidth?: number;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function ScaleControl<ScaleControlOptions, ControlT extends ScaleControlInstance>(props: ScaleControlProps<ScaleControlOptions>): null;
declare const _default: React.MemoExoticComponent<typeof ScaleControl>;
export default _default;
