const globalSettings = [
    'baseApiUrl',
    'maxParallelImageRequests',
    'workerClass',
    'workerCount',
    'workerUrl'
];
export default function setGlobals(mapLib, props) {
    for (const key of globalSettings) {
        if (key in props) {
            mapLib[key] = props[key];
        }
    }
    const { RTLTextPlugin = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js' } = props;
    if (RTLTextPlugin &&
        mapLib.getRTLTextPluginStatus &&
        mapLib.getRTLTextPluginStatus() === 'unavailable') {
        mapLib.setRTLTextPlugin(RTLTextPlugin, (error) => {
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, true);
    }
}
//# sourceMappingURL=set-globals.js.map