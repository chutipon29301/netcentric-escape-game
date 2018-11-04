import _ from "lodash";
import { BlockType } from "../../../type/blockType";
import { Block } from "./Block";
import { Coordinate } from "./Coordinate";
import { Dimension } from "./Dimension";
import { RandomGenerator } from "./RandomGenerator";

export class Map {

    private block: Block[] = [];
    private dimension: Dimension;

    constructor(x: number, y: number, private obstaclePercent: number) {
        this.dimension = new Dimension(x, y);
        this.generateMap();
    }

    public reset() {
        this.block = [];
        this.generateMap();
    }

    public clone(): Map {
        return Object.assign({}, this);
    }

    public generateMap() {
        const expectedNumberOfObstacle = Math.floor(this.dimension.getArea() * this.obstaclePercent);
        this.insertBlockWithType(BlockType.OBSTACLE, expectedNumberOfObstacle);
        this.insertBlockWithType(BlockType.TUNNEL);
    }

    public getDimension(): Dimension {
        return this.dimension;
    }

    public getBlock(): Block[] {
        return this.block;
    }

    public getWalkablePath(): boolean[][] {
        const obstacles = this.block.filter((o) => o.blockType === BlockType.OBSTACLE).map((o) => o.coordinate);
        const tunnel = this.block.find((o) => o.blockType === BlockType.TUNNEL).coordinate;
        const path = this.dimension.createEmptyArrayOfDimension();
        this.run(path, obstacles, tunnel);
        return path;
    }

    private insertBlockWithType(type: BlockType, numberOfBlock = 1) {
        let insertCount = 0;
        while (insertCount < numberOfBlock) {
            const randomCoordinate = RandomGenerator.coordinate(this.dimension.getX(), this.dimension.getY());
            if (!this.checkExistCoordinate(randomCoordinate)) {
                this.block.push(new Block(type, randomCoordinate));
                insertCount++;
            }
        }
    }

    private checkExistCoordinate(coordinate: Coordinate): boolean {
        return _.findIndex(this.block, (o) => o.coordinate.equal(coordinate)) !== -1;
    }

    private run(path: boolean[][], obstacles: Coordinate[], player: Coordinate) {
        const isValid = obstacles.findIndex((o) => o.equal(player)) !== -1;
        if (path[player.getX()][player.getY()]) { return; }
        if (!isValid) { return; }
        if (this.dimension.isValidCoordinate(player)) { return; }
        path[player.getX()][player.getY()] = true;
        this.run(path, obstacles, new Coordinate(player.getX() + 1, player.getY()));
        this.run(path, obstacles, new Coordinate(player.getX() - 1, player.getY()));
        this.run(path, obstacles, new Coordinate(player.getX(), player.getY() + 1));
        this.run(path, obstacles, new Coordinate(player.getX(), player.getY() - 1));
    }

}
