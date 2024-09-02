import type { CustomLayerInterface, ILayer } from '../types';
declare type OptionalId<T> = T extends {
    id: string;
} ? Omit<T, 'id'> & {
    id?: string;
} : T;
declare type OptionalSource<T> = T extends {
    source: string;
} ? Omit<T, 'source'> & {
    source?: string;
} : T;
export declare type LayerProps<LayerT> = OptionalSource<OptionalId<LayerT>> & {
    /** If set, the layer will be inserted before the specified layer */
    beforeId?: string;
};
declare function Layer<LayerT extends ILayer>(props: LayerProps<LayerT | CustomLayerInterface>): any;
export default Layer;
