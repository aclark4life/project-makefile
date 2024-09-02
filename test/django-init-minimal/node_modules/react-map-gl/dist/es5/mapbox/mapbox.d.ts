import type { Transform, ViewState, ViewStateChangeEvent, PointLike, PaddingOptions, MapStyle, ImmutableLike, LngLatBoundsLike, Callbacks, MapEvent, MapMouseEvent, MapInstance, MapInstanceInternal } from '../types';
export declare type MapboxProps<StyleT extends MapStyle = MapStyle, CallbacksT extends Callbacks = {}> = Partial<ViewState> & CallbacksT & {
    mapboxAccessToken?: string;
    /** Camera options used when constructing the Map instance */
    initialViewState?: Partial<ViewState> & {
        /** The initial bounds of the map. If bounds is specified, it overrides longitude, latitude and zoom options. */
        bounds?: LngLatBoundsLike;
        /** A fitBounds options object to use only when setting the bounds option. */
        fitBoundsOptions?: {
            offset?: PointLike;
            minZoom?: number;
            maxZoom?: number;
            padding?: number | PaddingOptions;
        };
    };
    /** If provided, render into an external WebGL context */
    gl?: WebGLRenderingContext;
    /** For external controller to override the camera state */
    viewState?: ViewState & {
        width: number;
        height: number;
    };
    /** Mapbox style */
    mapStyle?: string | StyleT | ImmutableLike<StyleT>;
    /** Enable diffing when the map style changes
     * @default true
     */
    styleDiffing?: boolean;
    /** The fog property of the style. Must conform to the Fog Style Specification .
     * If `undefined` is provided, removes the fog from the map. */
    fog?: StyleT['fog'];
    /** Light properties of the map. */
    light?: StyleT['light'];
    /** Terrain property of the style. Must conform to the Terrain Style Specification .
     * If `undefined` is provided, removes terrain from the map. */
    terrain?: StyleT['terrain'];
    /** Default layers to query on pointer events */
    interactiveLayerIds?: string[];
    /** CSS cursor */
    cursor?: string;
};
/**
 * A wrapper for mapbox-gl's Map class
 */
export default class Mapbox<StyleT extends MapStyle = MapStyle, CallbacksT extends Callbacks = {}, MapT extends MapInstance = MapInstance> {
    private _MapClass;
    private _map;
    props: MapboxProps<StyleT, CallbacksT>;
    private _renderTransform;
    private _internalUpdate;
    private _inRender;
    private _hoveredFeatures;
    private _deferredEvents;
    static savedMaps: Mapbox[];
    constructor(MapClass: {
        new (options: any): MapInstance;
    }, props: MapboxProps<StyleT, CallbacksT>, container: HTMLDivElement);
    get map(): MapT;
    get transform(): Transform;
    setProps(props: MapboxProps<StyleT, CallbacksT>): void;
    static reuse<StyleT extends MapStyle, CallbacksT extends Callbacks, MapT extends MapInstance>(props: MapboxProps<StyleT, CallbacksT>, container: HTMLDivElement): Mapbox<StyleT, CallbacksT, MapT>;
    _initialize(container: HTMLDivElement): void;
    recycle(): void;
    destroy(): void;
    redraw(): void;
    _createShadowTransform(map: any): void;
    _updateSize(nextProps: MapboxProps<StyleT>): boolean;
    _updateViewState(nextProps: MapboxProps<StyleT>, triggerEvents: boolean): boolean;
    _updateSettings(nextProps: MapboxProps<StyleT>, currProps: MapboxProps<StyleT>): boolean;
    _updateStyle(nextProps: MapboxProps<StyleT>, currProps: MapboxProps<StyleT>): boolean;
    _updateStyleComponents(nextProps: MapboxProps<StyleT>, currProps: MapboxProps<StyleT>): boolean;
    _updateHandlers(nextProps: MapboxProps<StyleT>, currProps: MapboxProps<StyleT>): boolean;
    _onEvent: (e: MapEvent<MapT>) => void;
    private _queryRenderedFeatures;
    _updateHover(e: MapMouseEvent<MapT>): void;
    _onPointerEvent: (e: MapMouseEvent<MapT> | MapMouseEvent<MapT>) => void;
    _onCameraEvent: (e: ViewStateChangeEvent<MapT>) => void;
    _fireEvent(baseFire: Function, event: string | MapEvent<MapT>, properties?: object): MapInstanceInternal<MapT>;
    _onBeforeRepaint(): void;
    _onAfterRepaint: () => void;
}
