import * as React from 'react';
import { useState, useCallback, useMemo, useContext } from 'react';
import { MapContext } from './map';
export const MountedMapsContext = React.createContext(null);
export const MapProvider = props => {
    const [maps, setMaps] = useState({});
    const onMapMount = useCallback((map, id = 'default') => {
        setMaps(currMaps => {
            if (id === 'current') {
                throw new Error("'current' cannot be used as map id");
            }
            if (currMaps[id]) {
                throw new Error(`Multiple maps with the same id: ${id}`);
            }
            return { ...currMaps, [id]: map };
        });
    }, []);
    const onMapUnmount = useCallback((id = 'default') => {
        setMaps(currMaps => {
            if (currMaps[id]) {
                const nextMaps = { ...currMaps };
                delete nextMaps[id];
                return nextMaps;
            }
            return currMaps;
        });
    }, []);
    return (React.createElement(MountedMapsContext.Provider, { value: {
            maps,
            onMapMount,
            onMapUnmount
        } }, props.children));
};
export function useMap() {
    var _a;
    const maps = (_a = useContext(MountedMapsContext)) === null || _a === void 0 ? void 0 : _a.maps;
    const currentMap = useContext(MapContext);
    const mapsWithCurrent = useMemo(() => {
        return { ...maps, current: currentMap === null || currentMap === void 0 ? void 0 : currentMap.map };
    }, [maps, currentMap]);
    return mapsWithCurrent;
}
//# sourceMappingURL=use-map.js.map