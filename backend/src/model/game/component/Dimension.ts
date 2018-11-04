import { Coordinate } from "./Coordinate";

export class Dimension {

    constructor(private x: number, private y: number) { }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getArea(): number {
        return this.x * this.y;
    }

    public isValidCoordinate(coordinate: Coordinate): boolean {
        return !(coordinate.getX() < 0 || coordinate.getX() >= this.x || coordinate.getY() < 0 || coordinate.getY() >= this.y);
    }

    public createEmptyArrayOfDimension(): boolean[][] {
        const result = [];
        for (let i = 0; i < this.x; i++) {
            const temp = [];
            for (let j = 0; j < this.y; j++) {
                temp.push(false);
            }
            result.push(temp);
        }
        return result;
    }
}
