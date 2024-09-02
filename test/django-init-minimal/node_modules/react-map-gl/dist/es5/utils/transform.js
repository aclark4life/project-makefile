"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyViewStateToTransform = exports.transformToViewState = exports.syncProjection = exports.cloneTransform = void 0;
var deep_equal_1 = require("./deep-equal");
/**
 * Make a copy of a transform
 * @param tr
 */
function cloneTransform(tr) {
    var newTransform = tr.clone();
    // Work around mapbox bug - this value is not assigned in clone(), only in resize()
    newTransform.pixelsToGLUnits = tr.pixelsToGLUnits;
    return newTransform;
}
exports.cloneTransform = cloneTransform;
/**
 * Copy projection from one transform to another. This only applies to mapbox-gl transforms
 * @param src the transform to copy projection settings from
 * @param dest to transform to copy projection settings to
 */
function syncProjection(src, dest) {
    if (!src.getProjection) {
        return;
    }
    var srcProjection = src.getProjection();
    var destProjection = dest.getProjection();
    if (!(0, deep_equal_1.deepEqual)(srcProjection, destProjection)) {
        dest.setProjection(srcProjection);
    }
}
exports.syncProjection = syncProjection;
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
exports.transformToViewState = transformToViewState;
/* eslint-disable complexity */
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
function applyViewStateToTransform(tr, props) {
    var v = props.viewState || props;
    var changed = false;
    if ('longitude' in v && 'latitude' in v) {
        var center = tr.center;
        // @ts-ignore
        tr.center = new center.constructor(v.longitude, v.latitude);
        changed = changed || center !== tr.center;
    }
    if ('zoom' in v) {
        var zoom = tr.zoom;
        tr.zoom = v.zoom;
        changed = changed || zoom !== tr.zoom;
    }
    if ('bearing' in v) {
        var bearing = tr.bearing;
        tr.bearing = v.bearing;
        changed = changed || bearing !== tr.bearing;
    }
    if ('pitch' in v) {
        var pitch = tr.pitch;
        tr.pitch = v.pitch;
        changed = changed || pitch !== tr.pitch;
    }
    if (v.padding && !tr.isPaddingEqual(v.padding)) {
        changed = true;
        tr.padding = v.padding;
    }
    return changed;
}
exports.applyViewStateToTransform = applyViewStateToTransform;
//# sourceMappingURL=transform.js.map