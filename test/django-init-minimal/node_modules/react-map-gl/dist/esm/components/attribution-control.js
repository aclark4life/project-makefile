import { useEffect, memo } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
function AttributionControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.AttributionControl(props), {
        position: props.position
    });
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export default memo(AttributionControl);
//# sourceMappingURL=attribution-control.js.map