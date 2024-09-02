/**
 * A collection of very fast approximations to common geodesic measurements. Useful for performance-sensitive code that measures things on a city scale.
 */
export default class CheapRuler {
    /**
     * Creates a ruler object from tile coordinates (y and z).
     *
     * @param {number} y
     * @param {number} z
     * @param {keyof typeof factors} [units='kilometers']
     * @returns {CheapRuler}
     * @example
     * const ruler = cheapRuler.fromTile(1567, 12);
     * //=ruler
     */
    static fromTile(y: number, z: number, units?: "kilometers" | "miles" | "nauticalmiles" | "meters" | "metres" | "yards" | "feet" | "inches" | undefined): CheapRuler;
    /**
     * Multipliers for converting between units.
     *
     * @example
     * // convert 50 meters to yards
     * 50 * CheapRuler.units.yards / CheapRuler.units.meters;
     */
    static get units(): {
        kilometers: number;
        miles: number;
        nauticalmiles: number;
        meters: number;
        metres: number;
        yards: number;
        feet: number;
        inches: number;
    };
    /**
     * Creates a ruler instance for very fast approximations to common geodesic measurements around a certain latitude.
     *
     * @param {number} lat latitude
     * @param {keyof typeof factors} [units='kilometers']
     * @example
     * const ruler = cheapRuler(35.05, 'miles');
     * //=ruler
     */
    constructor(lat: number, units?: "kilometers" | "miles" | "nauticalmiles" | "meters" | "metres" | "yards" | "feet" | "inches" | undefined);
    kx: number;
    ky: number;
    /**
     * Given two points of the form [longitude, latitude], returns the distance.
     *
     * @param {[number, number]} a point [longitude, latitude]
     * @param {[number, number]} b point [longitude, latitude]
     * @returns {number} distance
     * @example
     * const distance = ruler.distance([30.5, 50.5], [30.51, 50.49]);
     * //=distance
     */
    distance(a: [number, number], b: [number, number]): number;
    /**
     * Returns the bearing between two points in angles.
     *
     * @param {[number, number]} a point [longitude, latitude]
     * @param {[number, number]} b point [longitude, latitude]
     * @returns {number} bearing
     * @example
     * const bearing = ruler.bearing([30.5, 50.5], [30.51, 50.49]);
     * //=bearing
     */
    bearing(a: [number, number], b: [number, number]): number;
    /**
     * Returns a new point given distance and bearing from the starting point.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {number} dist distance
     * @param {number} bearing
     * @returns {[number, number]} point [longitude, latitude]
     * @example
     * const point = ruler.destination([30.5, 50.5], 0.1, 90);
     * //=point
     */
    destination(p: [number, number], dist: number, bearing: number): [number, number];
    /**
     * Returns a new point given easting and northing offsets (in ruler units) from the starting point.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {number} dx easting
     * @param {number} dy northing
     * @returns {[number, number]} point [longitude, latitude]
     * @example
     * const point = ruler.offset([30.5, 50.5], 10, 10);
     * //=point
     */
    offset(p: [number, number], dx: number, dy: number): [number, number];
    /**
     * Given a line (an array of points), returns the total line distance.
     *
     * @param {[number, number][]} points [longitude, latitude]
     * @returns {number} total line distance
     * @example
     * const length = ruler.lineDistance([
     *     [-67.031, 50.458], [-67.031, 50.534],
     *     [-66.929, 50.534], [-66.929, 50.458]
     * ]);
     * //=length
     */
    lineDistance(points: [number, number][]): number;
    /**
     * Given a polygon (an array of rings, where each ring is an array of points), returns the area.
     *
     * @param {[number, number][][]} polygon
     * @returns {number} area value in the specified units (square kilometers by default)
     * @example
     * const area = ruler.area([[
     *     [-67.031, 50.458], [-67.031, 50.534], [-66.929, 50.534],
     *     [-66.929, 50.458], [-67.031, 50.458]
     * ]]);
     * //=area
     */
    area(polygon: [number, number][][]): number;
    /**
     * Returns the point at a specified distance along the line.
     *
     * @param {[number, number][]} line
     * @param {number} dist distance
     * @returns {[number, number]} point [longitude, latitude]
     * @example
     * const point = ruler.along(line, 2.5);
     * //=point
     */
    along(line: [number, number][], dist: number): [number, number];
    /**
     * Returns the distance from a point `p` to a line segment `a` to `b`.
     *
     * @pointToSegmentDistance
     * @param {[number, number]} p point [longitude, latitude]
     * @param {[number, number]} a segment point 1 [longitude, latitude]
     * @param {[number, number]} b segment point 2 [longitude, latitude]
     * @returns {number} distance
     * @example
     * const distance = ruler.pointToSegmentDistance([-67.04, 50.5], [-67.05, 50.57], [-67.03, 50.54]);
     * //=distance
     */
    pointToSegmentDistance(p: [number, number], a: [number, number], b: [number, number]): number;
    /**
     * Returns an object of the form {point, index, t}, where point is closest point on the line
     * from the given point, index is the start index of the segment with the closest point,
     * and t is a parameter from 0 to 1 that indicates where the closest point is on that segment.
     *
     * @param {[number, number][]} line
     * @param {[number, number]} p point [longitude, latitude]
     * @returns {{point: [number, number], index: number, t: number}} {point, index, t}
     * @example
     * const point = ruler.pointOnLine(line, [-67.04, 50.5]).point;
     * //=point
     */
    pointOnLine(line: [number, number][], p: [number, number]): {
        point: [number, number];
        index: number;
        t: number;
    };
    /**
     * Returns a part of the given line between the start and the stop points (or their closest points on the line).
     *
     * @param {[number, number]} start point [longitude, latitude]
     * @param {[number, number]} stop point [longitude, latitude]
     * @param {[number, number][]} line
     * @returns {[number, number][]} line part of a line
     * @example
     * const line2 = ruler.lineSlice([-67.04, 50.5], [-67.05, 50.56], line1);
     * //=line2
     */
    lineSlice(start: [number, number], stop: [number, number], line: [number, number][]): [number, number][];
    /**
     * Returns a part of the given line between the start and the stop points indicated by distance along the line.
     *
     * @param {number} start start distance
     * @param {number} stop stop distance
     * @param {[number, number][]} line
     * @returns {[number, number][]} part of a line
     * @example
     * const line2 = ruler.lineSliceAlong(10, 20, line1);
     * //=line2
     */
    lineSliceAlong(start: number, stop: number, line: [number, number][]): [number, number][];
    /**
     * Given a point, returns a bounding box object ([w, s, e, n]) created from the given point buffered by a given distance.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {number} buffer
     * @returns {[number, number, number, number]} bbox ([w, s, e, n])
     * @example
     * const bbox = ruler.bufferPoint([30.5, 50.5], 0.01);
     * //=bbox
     */
    bufferPoint(p: [number, number], buffer: number): [number, number, number, number];
    /**
     * Given a bounding box, returns the box buffered by a given distance.
     *
     * @param {[number, number, number, number]} bbox ([w, s, e, n])
     * @param {number} buffer
     * @returns {[number, number, number, number]} bbox ([w, s, e, n])
     * @example
     * const bbox = ruler.bufferBBox([30.5, 50.5, 31, 51], 0.2);
     * //=bbox
     */
    bufferBBox(bbox: [number, number, number, number], buffer: number): [number, number, number, number];
    /**
     * Returns true if the given point is inside in the given bounding box, otherwise false.
     *
     * @param {[number, number]} p point [longitude, latitude]
     * @param {[number, number, number, number]} bbox ([w, s, e, n])
     * @returns {boolean}
     * @example
     * const inside = ruler.insideBBox([30.5, 50.5], [30, 50, 31, 51]);
     * //=inside
     */
    insideBBox(p: [number, number], bbox: [number, number, number, number]): boolean;
}
