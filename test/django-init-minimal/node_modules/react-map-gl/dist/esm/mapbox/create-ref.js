/** These methods may break the react binding if called directly */
const skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
export default function createRef(mapInstance) {
    if (!mapInstance) {
        return null;
    }
    const map = mapInstance.map;
    const result = {
        getMap: () => map,
        // Overwrite getters to use our shadow transform
        getCenter: () => mapInstance.transform.center,
        getZoom: () => mapInstance.transform.zoom,
        getBearing: () => mapInstance.transform.bearing,
        getPitch: () => mapInstance.transform.pitch,
        getPadding: () => mapInstance.transform.padding,
        getBounds: () => mapInstance.transform.getBounds(),
        project: (lnglat) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.project(lnglat);
            map.transform = tr;
            return result;
        },
        unproject: (point) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.unproject(point);
            map.transform = tr;
            return result;
        },
        // options diverge between mapbox and maplibre
        queryTerrainElevation: (lnglat, options) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.queryTerrainElevation(lnglat, options);
            map.transform = tr;
            return result;
        },
        queryRenderedFeatures: (geometry, options) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.queryRenderedFeatures(geometry, options);
            map.transform = tr;
            return result;
        }
    };
    for (const key of getMethodNames(map)) {
        // @ts-expect-error
        if (!(key in result) && !skipMethods.includes(key)) {
            result[key] = map[key].bind(map);
        }
    }
    return result;
}
function getMethodNames(obj) {
    const result = new Set();
    let proto = obj;
    while (proto) {
        for (const key of Object.getOwnPropertyNames(proto)) {
            if (key[0] !== '_' &&
                typeof obj[key] === 'function' &&
                key !== 'fire' &&
                key !== 'setEventedParent') {
                result.add(key);
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
}
//# sourceMappingURL=create-ref.js.map