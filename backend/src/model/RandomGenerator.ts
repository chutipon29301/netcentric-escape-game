import { Coordinate } from "./Coordinate";

export class RandomGenerator {

    public static interval(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static coordinate(
        maxX: number,
        maxY: number,
        minX = 0,
        minY = 0,
    ): Coordinate {
        return new Coordinate(this.interval(minX, maxX), this.interval(minY, maxY));
    }

}
