import type { ISource, CustomSource } from '../types';
export declare type SourceProps<SourceT> = (SourceT | CustomSource) & {
    id?: string;
    children?: any;
};
declare function Source<SourceT extends ISource>(props: SourceProps<SourceT>): any;
export default Source;
