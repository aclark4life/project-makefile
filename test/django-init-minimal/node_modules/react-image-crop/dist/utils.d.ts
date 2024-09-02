import { PixelCrop, PercentCrop, Crop, Ords } from './types';

export declare const defaultCrop: PixelCrop;
export declare const clamp: (num: number, min: number, max: number) => number;
export declare const cls: (...args: unknown[]) => string;
export declare const areCropsEqual: (cropA: Partial<Crop>, cropB: Partial<Crop>) => boolean;
export declare function makeAspectCrop(crop: Pick<PercentCrop, 'unit'> & Partial<Omit<PercentCrop, 'unit'>>, aspect: number, containerWidth: number, containerHeight: number): PercentCrop;
export declare function makeAspectCrop(crop: Pick<PixelCrop, 'unit'> & Partial<Omit<PixelCrop, 'unit'>>, aspect: number, containerWidth: number, containerHeight: number): PixelCrop;
export declare function centerCrop(crop: Pick<PercentCrop, 'unit'> & Partial<Omit<PercentCrop, 'unit'>>, containerWidth: number, containerHeight: number): PercentCrop;
export declare function centerCrop(crop: Pick<PixelCrop, 'unit'> & Partial<Omit<PixelCrop, 'unit'>>, containerWidth: number, containerHeight: number): PixelCrop;
export declare function convertToPercentCrop(crop: Partial<Crop>, containerWidth: number, containerHeight: number): PercentCrop;
export declare function convertToPixelCrop(crop: Partial<Crop>, containerWidth: number, containerHeight: number): PixelCrop;
export declare function containCrop(pixelCrop: PixelCrop, aspect: number, ord: Ords, containerWidth: number, containerHeight: number, minWidth?: number, minHeight?: number, maxWidth?: number, maxHeight?: number): {
    unit: "px";
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function nudgeCrop(pixelCrop: PixelCrop, key: string, offset: number, ord: Ords): {
    unit: "px";
    x: number;
    y: number;
    width: number;
    height: number;
};
