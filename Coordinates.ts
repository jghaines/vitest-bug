export class Coordinates {

    readonly row: number;
    readonly col: number;

    constructor(_row: number, _col: number) {

        this.row = _row;
        this.col = _col;
    }

    static toCoordinates(obj: any): Coordinates {
        let c = this.toOptionalCoordinates(obj);
        if (c) {
            return c;
        }
        throw new Error(`Expected Coordinates or { row: number, col: number }`);
    }

    static toOptionalCoordinates(obj: any): Coordinates | null {
        if (!obj) {
            return null;
        } else if (obj instanceof Coordinates) {
            return obj;
        } else if ('row' in obj && 'col' in obj) {
            return new Coordinates(obj.row, obj.col)
        } else {
            return null
        }
    }

    toJSON(): { row: number, col: number } {
        return {
            row: this.row,
            col: this.col
        };
    }

    getIncrement(rowIncrement: number, colIncrement: number): Coordinates {
        return new Coordinates(this.row + rowIncrement, this.col + colIncrement);
    }

    equals(other: Coordinates | null): boolean {
        if (!other) {
            return false;
        }
        return (this.row === other.row && this.col === other.col);
    }

    distanceTo(other: Coordinates): number {
        return Math.sqrt(
            Math.pow(this.row - other.row, 2) +
            Math.pow(this.col - other.col, 2));
    }

    distanceToOrigin(): number {
        return this.distanceTo(new Coordinates(0, 0));
    }
}
