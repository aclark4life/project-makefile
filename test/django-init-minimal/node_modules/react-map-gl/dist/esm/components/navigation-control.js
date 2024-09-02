import { useEffect, memo } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
function NavigationControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.NavigationControl(props), {
        position: props.position
    });
    useEffect(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
export default memo(NavigationControl);
//# sourceMappingURL=navigation-control.js.map