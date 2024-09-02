'use strict';

exports.supported = isSupported;
exports.notSupportedReason = notSupportedReason;

/**
 * Test whether the current browser supports Mapbox GL JS
 * @param {Object} options
 * @param {boolean} [options.failIfMajorPerformanceCaveat=false] Return `false`
 *   if the performance of Mapbox GL JS would be dramatically worse than
 *   expected (i.e. a software renderer is would be used)
 * @return {boolean}
 */
function isSupported(options) {
    return !notSupportedReason(options);
}

function notSupportedReason(options) {
    if (!isBrowser()) return 'not a browser';
    if (!isWorkerSupported()) return 'insufficient worker support';
    if (!isCanvasGetImageDataSupported()) return 'insufficient Canvas/getImageData support';
    if (!isWebGLSupportedCached(options && options.failIfMajorPerformanceCaveat)) return 'insufficient WebGL2 support';
    if (!isNotIE()) return 'insufficient ECMAScript 6 support';
}

function isBrowser() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isWorkerSupported() {
    if (!('Worker' in window && 'Blob' in window && 'URL' in window)) {
        return false;
    }

    var blob = new Blob([''], { type: 'text/javascript' });
    var workerURL = URL.createObjectURL(blob);
    var supported;
    var worker;

    try {
        worker = new Worker(workerURL);
        supported = true;
    } catch (e) {
        supported = false;
    }

    if (worker) {
        worker.terminate();
    }
    URL.revokeObjectURL(workerURL);

    return supported;
}

// Some browsers or browser extensions block access to canvas data to prevent fingerprinting.
// Mapbox GL uses this API to load sprites and images in general.
function isCanvasGetImageDataSupported() {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    var context = canvas.getContext('2d');
    if (!context) {
        return false;
    }
    var imageData = context.getImageData(0, 0, 1, 1);
    return imageData && imageData.width === canvas.width;
}

var isWebGLSupportedCache = {};
function isWebGLSupportedCached(failIfMajorPerformanceCaveat) {

    if (isWebGLSupportedCache[failIfMajorPerformanceCaveat] === undefined) {
        isWebGLSupportedCache[failIfMajorPerformanceCaveat] = isWebGLSupported(failIfMajorPerformanceCaveat);
    }

    return isWebGLSupportedCache[failIfMajorPerformanceCaveat];
}

isSupported.webGLContextAttributes = {
    antialias: false,
    alpha: true,
    stencil: true,
    depth: true
};

function getWebGLContext(failIfMajorPerformanceCaveat) {
    var canvas = document.createElement('canvas');

    var attributes = Object.create(isSupported.webGLContextAttributes);
    attributes.failIfMajorPerformanceCaveat = failIfMajorPerformanceCaveat;

    return canvas.getContext('webgl2', attributes);
}

function isWebGLSupported(failIfMajorPerformanceCaveat) {
    var gl = getWebGLContext(failIfMajorPerformanceCaveat);
    if (!gl) {
        return false;
    }

    // Try compiling a shader and get its compile status. Some browsers like Brave block this API
    // to prevent fingerprinting. Unfortunately, this also means that Mapbox GL won't work.
    var shader;
    try {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } catch (e) {
        // some older browsers throw an exception that `createShader` is not defined
        // so handle this separately from the case where browsers block `createShader`
        // for security reasons
        return false;
    }

    if (!shader || gl.isContextLost()) {
        return false;
    }
    gl.shaderSource(shader, 'void main() {}');
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true;
}

function isNotIE() {
    return !document.documentMode;
}
