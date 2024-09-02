import type { PointLike } from '../types';
/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */
export declare function arePointsEqual(a?: PointLike, b?: PointLike): boolean;
/**
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */
export declare function deepEqual(a: any, b: any): boolean;
