import { beforeEach, describe, expect, test } from 'vitest';

import { Coordinates } from './Coordinates';
import { CoordRange } from './CoordRange';

describe('CoordRange', () => {
    let coordsNW: Coordinates;
    let coordsSE: Coordinates;
    let coordsNE: Coordinates;
    let coordsSW: Coordinates;
    let outerRange: CoordRange;
    let rangeTop: CoordRange;
    let rangeLeft: CoordRange;
    let rangeRight: CoordRange;
    let rangeBottom: CoordRange;

    beforeEach(() => {
        coordsNW = new Coordinates(0, 0);
        coordsSE = new Coordinates(4, 4);
        coordsNE = new Coordinates(0, 4);
        coordsSW = new Coordinates(4, 0);
        outerRange = new CoordRange(coordsNW, coordsSE);

        rangeTop = new CoordRange(coordsNW, coordsNE);
        rangeLeft = new CoordRange(coordsNW, coordsSW);
        rangeRight = new CoordRange(coordsNE, coordsSE);
        rangeBottom = new CoordRange(coordsSW, coordsSE);
    })

  

    test('forEachOrdered should iterate over all coordinates in the range in order', () => {
        const coords: Coordinates[] = [];
        rangeTop.forEachOrdered((coord) => coords.push(coord));
        expect(coords.length).toEqual(5);
        expect(coords[0].equals(coordsNW)).toBe(true);
        expect(coords[1].equals(coordsNE)).toBe(true);
        expect(coords[2].equals(coordsSW)).toBe(true);
        expect(coords[3].equals(coordsSE)).toBe(true);
        expect(coords[4].equals(coordsNW)).toBe(true);
    })

})
