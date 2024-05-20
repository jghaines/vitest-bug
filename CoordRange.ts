import { Coordinates } from './Coordinates';

export class CoordRange {
    readonly first: Coordinates;
    readonly last: Coordinates;
    readonly min: Coordinates;
    readonly max: Coordinates;

    constructor(min: Coordinates, max: Coordinates) {
        this.first = this.min = min;
        this.last = this.max = max;

            // ensure min is closest to origin
            if (this.max.distanceToOrigin() < this.min.distanceToOrigin()) {
                [this.min, this.max] = [this.max, this.min]
            }
    }

    toJSON() {
        return {
            min: this.min.toJSON(),
            max: this.max.toJSON()
        };
    }

    count() {
        return (this.max.row - this.min.row + 1) * (this.max.col - this.min.col + 1);
    }

    equals(other: CoordRange) {
        return (this.min.equals(other.min) && this.max.equals(other.max));
    }

    forEach(callback: (coord: Coordinates, index: number) => void) {
        let index = 0;
        for (let row = this.min.row || 0; row <= this.max.row; ++row) {
            for (let col = this.min.col || 0; col <= this.max.col; ++col) {
                callback(new Coordinates(row, col), index++)
            }
        }
    }

    /**
     * Iterate through all the coordinates in order from first to last and execute the callabck
     * with the current coordinate and its index.
     * @param { (coord: Coordinates, index: number) => void } callback
     */
    forEachOrdered(callback: (coord: Coordinates, index: number) => void) {
    
        let rowIncrement = this.last.row !== this.first.row ? (this.last.row - this.first.row) / Math.abs(this.last.row - this.first.row) : 0;
        let colIncrement = this.last.col !== this.first.col ? (this.last.col - this.first.col) / Math.abs(this.last.col - this.first.col) : 0;
        let index = 0;
    
        for (let row = this.first.row; rowIncrement > 0 ? row <= this.last.row : row >= this.last.row; row += rowIncrement) {
            for (let col = this.first.col; colIncrement > 0 ? col <= this.last.col : col >= this.last.col; col += colIncrement) {
                callback(new Coordinates(row, col), index++)
            }
        }
    }
}
