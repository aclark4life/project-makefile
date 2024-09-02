"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var transform_1 = require("../utils/transform");
var style_utils_1 = require("../utils/style-utils");
var deep_equal_1 = require("../utils/deep-equal");
var DEFAULT_STYLE = { version: 8, sources: {}, layers: [] };
var pointerEvents = {
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    click: 'onClick',
    dblclick: 'onDblClick',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mouseout: 'onMouseOut',
    contextmenu: 'onContextMenu',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchcancel: 'onTouchCancel'
};
var cameraEvents = {
    movestart: 'onMoveStart',
    move: 'onMove',
    moveend: 'onMoveEnd',
    dragstart: 'onDragStart',
    drag: 'onDrag',
    dragend: 'onDragEnd',
    zoomstart: 'onZoomStart',
    zoom: 'onZoom',
    zoomend: 'onZoomEnd',
    rotatestart: 'onRotateStart',
    rotate: 'onRotate',
    rotateend: 'onRotateEnd',
    pitchstart: 'onPitchStart',
    pitch: 'onPitch',
    pitchend: 'onPitchEnd'
};
var otherEvents = {
    wheel: 'onWheel',
    boxzoomstart: 'onBoxZoomStart',
    boxzoomend: 'onBoxZoomEnd',
    boxzoomcancel: 'onBoxZoomCancel',
    resize: 'onResize',
    load: 'onLoad',
    render: 'onRender',
    idle: 'onIdle',
    remove: 'onRemove',
    data: 'onData',
    styledata: 'onStyleData',
    sourcedata: 'onSourceData',
    error: 'onError'
};
var settingNames = [
    'minZoom',
    'maxZoom',
    'minPitch',
    'maxPitch',
    'maxBounds',
    'projection',
    'renderWorldCopies'
];
var handlerNames = [
    'scrollZoom',
    'boxZoom',
    'dragRotate',
    'dragPan',
    'keyboard',
    'doubleClickZoom',
    'touchZoomRotate',
    'touchPitch'
];
/**
 * A wrapper for mapbox-gl's Map class
 */
var Mapbox = /** @class */ (function () {
    function Mapbox(MapClass, props, container) {
        var _this = this;
        // mapboxgl.Map instance
        this._map = null;
        // Internal states
        this._internalUpdate = false;
        this._inRender = false;
        this._hoveredFeatures = null;
        this._deferredEvents = {
            move: false,
            zoom: false,
            pitch: false,
            rotate: false
        };
        this._onEvent = function (e) {
            // @ts-ignore
            var cb = _this.props[otherEvents[e.type]];
            if (cb) {
                cb(e);
            }
            else if (e.type === 'error') {
                console.error(e.error); // eslint-disable-line
            }
        };
        this._onPointerEvent = function (e) {
            if (e.type === 'mousemove' || e.type === 'mouseout') {
                _this._updateHover(e);
            }
            // @ts-ignore
            var cb = _this.props[pointerEvents[e.type]];
            if (cb) {
                if (_this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
                    e.features = _this._hoveredFeatures || _this._queryRenderedFeatures(e.point);
                }
                cb(e);
                delete e.features;
            }
        };
        this._onCameraEvent = function (e) {
            if (!_this._internalUpdate) {
                // @ts-ignore
                var cb = _this.props[cameraEvents[e.type]];
                if (cb) {
                    cb(e);
                }
            }
            if (e.type in _this._deferredEvents) {
                _this._deferredEvents[e.type] = false;
            }
        };
        this._MapClass = MapClass;
        this.props = props;
        this._initialize(container);
    }
    Object.defineProperty(Mapbox.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mapbox.prototype, "transform", {
        get: function () {
            return this._renderTransform;
        },
        enumerable: false,
        configurable: true
    });
    Mapbox.prototype.setProps = function (props) {
        var oldProps = this.props;
        this.props = props;
        var settingsChanged = this._updateSettings(props, oldProps);
        if (settingsChanged) {
            this._createShadowTransform(this._map);
        }
        var sizeChanged = this._updateSize(props);
        var viewStateChanged = this._updateViewState(props, true);
        this._updateStyle(props, oldProps);
        this._updateStyleComponents(props, oldProps);
        this._updateHandlers(props, oldProps);
        // If 1) view state has changed to match props and
        //    2) the props change is not triggered by map events,
        // it's driven by an external state change. Redraw immediately
        if (settingsChanged || sizeChanged || (viewStateChanged && !this._map.isMoving())) {
            this.redraw();
        }
    };
    Mapbox.reuse = function (props, container) {
        var that = Mapbox.savedMaps.pop();
        if (!that) {
            return null;
        }
        var map = that.map;
        // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
        // intoto the new container from the props.
        // Step 1: reparenting child nodes from old container to new container
        var oldContainer = map.getContainer();
        container.className = oldContainer.className;
        while (oldContainer.childNodes.length > 0) {
            container.appendChild(oldContainer.childNodes[0]);
        }
        // Step 2: replace the internal container with new container from the react component
        // @ts-ignore
        map._container = container;
        // With maplibre-gl as mapLib, map uses ResizeObserver to observe when its container resizes.
        // When reusing the saved map, we need to disconnect the observer and observe the new container.
        // Step 3: telling the ResizeObserver to disconnect and observe the new container
        // @ts-ignore
        var resizeObserver = map._resizeObserver;
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver.observe(container);
        }
        // Step 4: apply new props
        that.setProps(__assign(__assign({}, props), { styleDiffing: false }));
        map.resize();
        var initialViewState = props.initialViewState;
        if (initialViewState) {
            if (initialViewState.bounds) {
                map.fitBounds(initialViewState.bounds, __assign(__assign({}, initialViewState.fitBoundsOptions), { duration: 0 }));
            }
            else {
                that._updateViewState(initialViewState, false);
            }
        }
        // Simulate load event
        if (map.isStyleLoaded()) {
            map.fire('load');
        }
        else {
            map.once('styledata', function () { return map.fire('load'); });
        }
        // Force reload
        // @ts-ignore
        map._update();
        return that;
    };
    /* eslint-disable complexity,max-statements */
    Mapbox.prototype._initialize = function (container) {
        var _this = this;
        var props = this.props;
        var _a = props.mapStyle, mapStyle = _a === void 0 ? DEFAULT_STYLE : _a;
        var mapOptions = __assign(__assign(__assign({}, props), props.initialViewState), { accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null, container: container, style: (0, style_utils_1.normalizeStyle)(mapStyle) });
        var viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
        Object.assign(mapOptions, {
            center: [viewState.longitude || 0, viewState.latitude || 0],
            zoom: viewState.zoom || 0,
            pitch: viewState.pitch || 0,
            bearing: viewState.bearing || 0
        });
        if (props.gl) {
            // eslint-disable-next-line
            var getContext_1 = HTMLCanvasElement.prototype.getContext;
            // Hijack canvas.getContext to return our own WebGLContext
            // This will be called inside the mapboxgl.Map constructor
            // @ts-expect-error
            HTMLCanvasElement.prototype.getContext = function () {
                // Unhijack immediately
                HTMLCanvasElement.prototype.getContext = getContext_1;
                return props.gl;
            };
        }
        var map = new this._MapClass(mapOptions);
        // Props that are not part of constructor options
        if (viewState.padding) {
            map.setPadding(viewState.padding);
        }
        if (props.cursor) {
            map.getCanvas().style.cursor = props.cursor;
        }
        this._createShadowTransform(map);
        // Hack
        // Insert code into map's render cycle
        var renderMap = map._render;
        map._render = function (arg) {
            _this._inRender = true;
            renderMap.call(map, arg);
            _this._inRender = false;
        };
        var runRenderTaskQueue = map._renderTaskQueue.run;
        map._renderTaskQueue.run = function (arg) {
            runRenderTaskQueue.call(map._renderTaskQueue, arg);
            _this._onBeforeRepaint();
        };
        map.on('render', function () { return _this._onAfterRepaint(); });
        // Insert code into map's event pipeline
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var fireEvent = map.fire;
        map.fire = this._fireEvent.bind(this, fireEvent);
        // add listeners
        map.on('resize', function () {
            _this._renderTransform.resize(map.transform.width, map.transform.height);
        });
        map.on('styledata', function () {
            _this._updateStyleComponents(_this.props, {});
            // Projection can be set in stylesheet
            (0, transform_1.syncProjection)(map.transform, _this._renderTransform);
        });
        map.on('sourcedata', function () { return _this._updateStyleComponents(_this.props, {}); });
        for (var eventName in pointerEvents) {
            map.on(eventName, this._onPointerEvent);
        }
        for (var eventName in cameraEvents) {
            map.on(eventName, this._onCameraEvent);
        }
        for (var eventName in otherEvents) {
            map.on(eventName, this._onEvent);
        }
        this._map = map;
    };
    /* eslint-enable complexity,max-statements */
    Mapbox.prototype.recycle = function () {
        // Clean up unnecessary elements before storing for reuse.
        var container = this.map.getContainer();
        var children = container.querySelector('[mapboxgl-children]');
        children === null || children === void 0 ? void 0 : children.remove();
        Mapbox.savedMaps.push(this);
    };
    Mapbox.prototype.destroy = function () {
        this._map.remove();
    };
    // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
    // render cycle, which is managed by Mapbox's animation loop.
    // This removes the synchronization issue caused by requestAnimationFrame.
    Mapbox.prototype.redraw = function () {
        var map = this._map;
        // map._render will throw error if style does not exist
        // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
        //   /src/ui/map.js#L1834
        if (!this._inRender && map.style) {
            // cancel the scheduled update
            if (map._frame) {
                map._frame.cancel();
                map._frame = null;
            }
            // the order is important - render() may schedule another update
            map._render();
        }
    };
    Mapbox.prototype._createShadowTransform = function (map) {
        var renderTransform = (0, transform_1.cloneTransform)(map.transform);
        map.painter.transform = renderTransform;
        this._renderTransform = renderTransform;
    };
    /* Trigger map resize if size is controlled
       @param {object} nextProps
       @returns {bool} true if size has changed
     */
    Mapbox.prototype._updateSize = function (nextProps) {
        // Check if size is controlled
        var viewState = nextProps.viewState;
        if (viewState) {
            var map = this._map;
            if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
                map.resize();
                return true;
            }
        }
        return false;
    };
    // Adapted from map.jumpTo
    /* Update camera to match props
       @param {object} nextProps
       @param {bool} triggerEvents - should fire camera events
       @returns {bool} true if anything is changed
     */
    Mapbox.prototype._updateViewState = function (nextProps, triggerEvents) {
        if (this._internalUpdate) {
            return false;
        }
        var map = this._map;
        var tr = this._renderTransform;
        // Take a snapshot of the transform before mutation
        var zoom = tr.zoom, pitch = tr.pitch, bearing = tr.bearing;
        var isMoving = map.isMoving();
        if (isMoving) {
            // All movement of the camera is done relative to the sea level
            tr.cameraElevationReference = 'sea';
        }
        var changed = (0, transform_1.applyViewStateToTransform)(tr, __assign(__assign({}, (0, transform_1.transformToViewState)(map.transform)), nextProps));
        if (isMoving) {
            // Reset camera reference
            tr.cameraElevationReference = 'ground';
        }
        if (changed && triggerEvents) {
            var deferredEvents = this._deferredEvents;
            // Delay DOM control updates to the next render cycle
            deferredEvents.move = true;
            deferredEvents.zoom || (deferredEvents.zoom = zoom !== tr.zoom);
            deferredEvents.rotate || (deferredEvents.rotate = bearing !== tr.bearing);
            deferredEvents.pitch || (deferredEvents.pitch = pitch !== tr.pitch);
        }
        // Avoid manipulating the real transform when interaction/animation is ongoing
        // as it would interfere with Mapbox's handlers
        if (!isMoving) {
            (0, transform_1.applyViewStateToTransform)(map.transform, nextProps);
        }
        return changed;
    };
    /* Update camera constraints and projection settings to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    Mapbox.prototype._updateSettings = function (nextProps, currProps) {
        var e_1, _a;
        var map = this._map;
        var changed = false;
        try {
            for (var settingNames_1 = __values(settingNames), settingNames_1_1 = settingNames_1.next(); !settingNames_1_1.done; settingNames_1_1 = settingNames_1.next()) {
                var propName = settingNames_1_1.value;
                if (propName in nextProps && !(0, deep_equal_1.deepEqual)(nextProps[propName], currProps[propName])) {
                    changed = true;
                    var setter = map["set".concat(propName[0].toUpperCase()).concat(propName.slice(1))];
                    setter === null || setter === void 0 ? void 0 : setter.call(map, nextProps[propName]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (settingNames_1_1 && !settingNames_1_1.done && (_a = settingNames_1.return)) _a.call(settingNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return changed;
    };
    /* Update map style to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if style is changed
     */
    Mapbox.prototype._updateStyle = function (nextProps, currProps) {
        if (nextProps.cursor !== currProps.cursor) {
            this._map.getCanvas().style.cursor = nextProps.cursor || '';
        }
        if (nextProps.mapStyle !== currProps.mapStyle) {
            var _a = nextProps.mapStyle, mapStyle = _a === void 0 ? DEFAULT_STYLE : _a, _b = nextProps.styleDiffing, styleDiffing = _b === void 0 ? true : _b;
            var options = {
                diff: styleDiffing
            };
            if ('localIdeographFontFamily' in nextProps) {
                // @ts-ignore Mapbox specific prop
                options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
            }
            this._map.setStyle((0, style_utils_1.normalizeStyle)(mapStyle), options);
            return true;
        }
        return false;
    };
    /* Update fog, light and terrain to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    Mapbox.prototype._updateStyleComponents = function (nextProps, currProps) {
        var map = this._map;
        var changed = false;
        if (map.isStyleLoaded()) {
            if ('light' in nextProps && map.setLight && !(0, deep_equal_1.deepEqual)(nextProps.light, currProps.light)) {
                changed = true;
                map.setLight(nextProps.light);
            }
            if ('fog' in nextProps && map.setFog && !(0, deep_equal_1.deepEqual)(nextProps.fog, currProps.fog)) {
                changed = true;
                map.setFog(nextProps.fog);
            }
            if ('terrain' in nextProps &&
                map.setTerrain &&
                !(0, deep_equal_1.deepEqual)(nextProps.terrain, currProps.terrain)) {
                if (!nextProps.terrain || map.getSource(nextProps.terrain.source)) {
                    changed = true;
                    map.setTerrain(nextProps.terrain);
                }
            }
        }
        return changed;
    };
    /* Update interaction handlers to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    Mapbox.prototype._updateHandlers = function (nextProps, currProps) {
        var e_2, _a;
        var _b, _c;
        var map = this._map;
        var changed = false;
        try {
            for (var handlerNames_1 = __values(handlerNames), handlerNames_1_1 = handlerNames_1.next(); !handlerNames_1_1.done; handlerNames_1_1 = handlerNames_1.next()) {
                var propName = handlerNames_1_1.value;
                var newValue = (_b = nextProps[propName]) !== null && _b !== void 0 ? _b : true;
                var oldValue = (_c = currProps[propName]) !== null && _c !== void 0 ? _c : true;
                if (!(0, deep_equal_1.deepEqual)(newValue, oldValue)) {
                    changed = true;
                    if (newValue) {
                        map[propName].enable(newValue);
                    }
                    else {
                        map[propName].disable();
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (handlerNames_1_1 && !handlerNames_1_1.done && (_a = handlerNames_1.return)) _a.call(handlerNames_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return changed;
    };
    Mapbox.prototype._queryRenderedFeatures = function (point) {
        var map = this._map;
        var tr = map.transform;
        var _a = this.props.interactiveLayerIds, interactiveLayerIds = _a === void 0 ? [] : _a;
        try {
            map.transform = this._renderTransform;
            return map.queryRenderedFeatures(point, {
                layers: interactiveLayerIds.filter(map.getLayer.bind(map))
            });
        }
        catch (_b) {
            // May fail if style is not loaded
            return [];
        }
        finally {
            map.transform = tr;
        }
    };
    Mapbox.prototype._updateHover = function (e) {
        var _a;
        var props = this.props;
        var shouldTrackHoveredFeatures = props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);
        if (shouldTrackHoveredFeatures) {
            var eventType = e.type;
            var wasHovering = ((_a = this._hoveredFeatures) === null || _a === void 0 ? void 0 : _a.length) > 0;
            var features = this._queryRenderedFeatures(e.point);
            var isHovering = features.length > 0;
            if (!isHovering && wasHovering) {
                e.type = 'mouseleave';
                this._onPointerEvent(e);
            }
            this._hoveredFeatures = features;
            if (isHovering && !wasHovering) {
                e.type = 'mouseenter';
                this._onPointerEvent(e);
            }
            e.type = eventType;
        }
        else {
            this._hoveredFeatures = null;
        }
    };
    Mapbox.prototype._fireEvent = function (baseFire, event, properties) {
        var map = this._map;
        var tr = map.transform;
        var eventType = typeof event === 'string' ? event : event.type;
        if (eventType === 'move') {
            this._updateViewState(this.props, false);
        }
        if (eventType in cameraEvents) {
            if (typeof event === 'object') {
                event.viewState = (0, transform_1.transformToViewState)(tr);
            }
            if (this._map.isMoving()) {
                // Replace map.transform with ours during the callbacks
                map.transform = this._renderTransform;
                baseFire.call(map, event, properties);
                map.transform = tr;
                return map;
            }
        }
        baseFire.call(map, event, properties);
        return map;
    };
    // All camera manipulations are complete, ready to repaint
    Mapbox.prototype._onBeforeRepaint = function () {
        var _this = this;
        var map = this._map;
        // If there are camera changes driven by props, invoke camera events so that DOM controls are synced
        this._internalUpdate = true;
        for (var eventType in this._deferredEvents) {
            if (this._deferredEvents[eventType]) {
                map.fire(eventType);
            }
        }
        this._internalUpdate = false;
        var tr = this._map.transform;
        // Make sure camera matches the current props
        map.transform = this._renderTransform;
        this._onAfterRepaint = function () {
            // Mapbox transitions between non-mercator projection and mercator during render time
            // Copy it back to the other
            (0, transform_1.syncProjection)(_this._renderTransform, tr);
            // Restores camera state before render/load events are fired
            map.transform = tr;
        };
    };
    Mapbox.savedMaps = [];
    return Mapbox;
}());
exports.default = Mapbox;
/**
 * Access token can be provided via one of:
 *   mapboxAccessToken prop
 *   access_token query parameter
 *   MapboxAccessToken environment variable
 *   REACT_APP_MAPBOX_ACCESS_TOKEN environment variable
 * @returns access token
 */
function getAccessTokenFromEnv() {
    var accessToken = null;
    /* global location, process */
    if (typeof location !== 'undefined') {
        var match = /access_token=([^&\/]*)/.exec(location.search);
        accessToken = match && match[1];
    }
    // Note: This depends on bundler plugins (e.g. webpack) importing environment correctly
    try {
        accessToken = accessToken || process.env.MapboxAccessToken;
    }
    catch (_a) {
        // ignore
    }
    try {
        accessToken = accessToken || process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    }
    catch (_b) {
        // ignore
    }
    return accessToken;
}
//# sourceMappingURL=mapbox.js.map