import * as React from 'react';
import type { ControlPosition, FullscreenControlInstance } from '../types';
export declare type FullscreenControlProps<OptionsT> = Omit<OptionsT, 'container'> & {
    /** Id of the DOM element which should be made full screen. By default, the map container
     * element will be made full screen. */
    containerId?: string;
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
};
declare function FullscreenControl<FullscreenControlOptions, ControlT extends FullscreenControlInstance>(props: FullscreenControlProps<FullscreenControlOptions>): null;
declare const _default: React.MemoExoticComponent<typeof FullscreenControl>;
export default _default;
