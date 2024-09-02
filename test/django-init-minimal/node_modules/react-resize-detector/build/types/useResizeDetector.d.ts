import type { UseResizeDetectorReturn, useResizeDetectorProps } from './types';
declare function useResizeDetector<T extends HTMLElement = any>({ skipOnMount, refreshMode, refreshRate, refreshOptions, handleWidth, handleHeight, targetRef, observerOptions, onResize }?: useResizeDetectorProps<T>): UseResizeDetectorReturn<T>;
export default useResizeDetector;
