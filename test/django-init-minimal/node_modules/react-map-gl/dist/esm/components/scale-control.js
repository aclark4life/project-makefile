import { useEffect, useRef, memo } from 'react';
import { applyReactStyle } from '../utils/apply-react-style';
import useControl from './use-control';
function ScaleControl(props) {
    const ctrl = useControl(({ mapLib }) => new mapLib.ScaleControl(props), {
        position: props.position
    });
    const propsRef = useRef(props);
    const prevProps = propsRef.current;
    propsRef.current = props;
    const { style } = props;
    if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
        ctrl.options.maxWidth = props.maxWidth;
    }
    if (props.unit !== undefined && props.unit !== prevProps.unit) {
        ctrl.setUnit(props.unit);
    }
    useEffect(() => {
        applyReactStyle(ctrl._container, style);
    }, [style]);
    return null;
}
export default memo(ScaleControl);
//# sourceMappingURL=scale-control.js.map