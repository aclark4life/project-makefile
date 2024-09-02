import { default as React, PureComponent } from 'react';
import { Ords, XYOrds, Crop, PixelCrop, PercentCrop } from './types';

interface EVData {
    startClientX: number;
    startClientY: number;
    startCropX: number;
    startCropY: number;
    clientX: number;
    clientY: number;
    isResize: boolean;
    ord?: Ords;
}
interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ReactCropProps {
    /** An object of labels to override the built-in English ones */
    ariaLabels?: {
        cropArea: string;
        nwDragHandle: string;
        nDragHandle: string;
        neDragHandle: string;
        eDragHandle: string;
        seDragHandle: string;
        sDragHandle: string;
        swDragHandle: string;
        wDragHandle: string;
    };
    /** The aspect ratio of the crop, e.g. `1` for a square or `16 / 9` for landscape. */
    aspect?: number;
    /** Classes to pass to the `ReactCrop` element. */
    className?: string;
    /** The elements that you want to perform a crop on. For example
     * an image or video. */
    children?: React.ReactNode;
    /** Show the crop area as a circle. If your aspect is not 1 (a square) then the circle will be warped into an oval shape. Defaults to false. */
    circularCrop?: boolean;
    /** Since v10 all crop params are required except for aspect. Omit the entire crop object if you don't want a crop. See README on how to create an aspect crop with a % crop. */
    crop?: Crop;
    /** If true then the user cannot resize or draw a new crop. A class of `ReactCrop--disabled` is also added to the container for user styling. */
    disabled?: boolean;
    /** If true then the user cannot create or resize a crop, but can still drag the existing crop around. A class of `ReactCrop--locked` is also added to the container for user styling. */
    locked?: boolean;
    /** If true is passed then selection can't be disabled if the user clicks outside the selection area. */
    keepSelection?: boolean;
    /** A minimum crop width, in pixels. */
    minWidth?: number;
    /** A minimum crop height, in pixels. */
    minHeight?: number;
    /** A maximum crop width, in pixels. */
    maxWidth?: number;
    /** A maximum crop height, in pixels. */
    maxHeight?: number;
    /** A callback which happens for every change of the crop. You should set the crop to state and pass it back into the library via the `crop` prop. */
    onChange: (crop: PixelCrop, percentageCrop: PercentCrop) => void;
    /** A callback which happens after a resize, drag, or nudge. Passes the current crop state object in pixels and percent. */
    onComplete?: (crop: PixelCrop, percentageCrop: PercentCrop) => void;
    /** A callback which happens when a user starts dragging or resizing. It is convenient to manipulate elements outside this component. */
    onDragStart?: (e: PointerEvent) => void;
    /** A callback which happens when a user releases the cursor or touch after dragging or resizing. */
    onDragEnd?: (e: PointerEvent) => void;
    /** Render a custom element in crop selection. */
    renderSelectionAddon?: (state: ReactCropState) => React.ReactNode;
    /** Show rule of thirds lines in the cropped area. Defaults to false. */
    ruleOfThirds?: boolean;
    /** Inline styles object to be passed to the `ReactCrop` element. */
    style?: React.CSSProperties;
}
export interface ReactCropState {
    cropIsActive: boolean;
    newCropIsBeingDrawn: boolean;
}
export declare class ReactCrop extends PureComponent<ReactCropProps, ReactCropState> {
    static xOrds: string[];
    static yOrds: string[];
    static xyOrds: string[];
    static nudgeStep: number;
    static nudgeStepMedium: number;
    static nudgeStepLarge: number;
    static defaultProps: {
        ariaLabels: {
            cropArea: string;
            nwDragHandle: string;
            nDragHandle: string;
            neDragHandle: string;
            eDragHandle: string;
            seDragHandle: string;
            sDragHandle: string;
            swDragHandle: string;
            wDragHandle: string;
        };
    };
    get document(): Document;
    docMoveBound: boolean;
    mouseDownOnCrop: boolean;
    dragStarted: boolean;
    evData: EVData;
    componentRef: React.RefObject<HTMLDivElement>;
    mediaRef: React.RefObject<HTMLDivElement>;
    resizeObserver?: ResizeObserver;
    initChangeCalled: boolean;
    instanceId: string;
    state: ReactCropState;
    getBox(): Rectangle;
    componentDidUpdate(prevProps: ReactCropProps): void;
    componentWillUnmount(): void;
    bindDocMove(): void;
    unbindDocMove(): void;
    onCropPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onComponentPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onDocPointerMove: (e: PointerEvent) => void;
    onComponentKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onHandlerKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, ord: Ords) => void;
    onDocPointerDone: (e: PointerEvent) => void;
    onDragFocus: () => void;
    getCropStyle(): {
        top: string;
        left: string;
        width: string;
        height: string;
    } | undefined;
    dragCrop(): PixelCrop;
    getPointRegion(box: Rectangle, origOrd: Ords | undefined, minWidth: number, minHeight: number): XYOrds;
    resolveMinDimensions(box: Rectangle, aspect: number, minWidth?: number, minHeight?: number): number[];
    resizeCrop(): PixelCrop;
    renderCropSelection(): React.JSX.Element | undefined;
    makePixelCrop(box: Rectangle): PixelCrop;
    render(): React.JSX.Element;
}
export {};
