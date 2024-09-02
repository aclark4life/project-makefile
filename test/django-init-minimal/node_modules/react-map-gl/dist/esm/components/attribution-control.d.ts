import * as React from 'react';
import type { ControlPosition, AttributionControlInstance } from '../types';
export declare type AttributionControlProps<OptionsT> = OptionsT & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function AttributionControl<AttributionControlOptions, ControlT extends AttributionControlInstance>(props: AttributionControlProps<AttributionControlOptions>): null;
declare const _default: React.MemoExoticComponent<typeof AttributionControl>;
export default _default;
