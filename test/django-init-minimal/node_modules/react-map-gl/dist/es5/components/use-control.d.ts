import type { IControl, ControlPosition } from '../types';
import type { MapContextValue } from './map';
declare type ControlOptions = {
    position?: ControlPosition;
};
declare function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, opts?: ControlOptions): T;
declare function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, onRemove: (context: MapContextValue) => void, opts?: ControlOptions): T;
declare function useControl<T extends IControl>(onCreate: (context: MapContextValue) => T, onAdd: (context: MapContextValue) => void, onRemove: (context: MapContextValue) => void, opts?: ControlOptions): T;
export default useControl;
