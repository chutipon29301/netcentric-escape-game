import { Direction } from "../../../type/direction";

export class Coordinate {

    constructor(private x: number, private y: number) { }

    public equal(that: Coordinate): boolean {
        return this.x === that.x && this.y === that.y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public move(direction: Direction): Coordinate {
        switch (direction) {
            case Direction.left:
                return this.left();
            case Direction.right:
                return this.right();
            case Direction.up:
                return this.up();
            case Direction.down:
                return this.down();
        }
    }

    public left(): Coordinate {
        return new Coordinate(this.x, this.y - 1);
    }

    public right(): Coordinate {
        return new Coordinate(this.x, this.y + 1);
    }

    public up(): Coordinate {
        return new Coordinate(this.x - 1, this.y);
    }

    public down(): Coordinate {
        return new Coordinate(this.x + 1, this.y);
    }

}
