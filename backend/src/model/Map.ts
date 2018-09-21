import _ from "lodash";
import { BlockType } from "../type/blockType";
import { Block } from "./Block";
import { Coordinate } from "./Coordinate";
import { RandomGenerator } from "./RandomGenerator";

export class Map {

    private block: Block[] = [];

    constructor(private x: number, private y: number, obstaclePercent: number) {
        const expectedNumberOfObstacle = Math.floor(x * y * obstaclePercent);
        this.insertBlockWithType(BlockType.OBSTACLE, expectedNumberOfObstacle);
        this.insertBlockWithType(BlockType.TUNNEL);
    }

    private insertBlockWithType(type: BlockType, numberOfBlock= 1) {
        let insertCount = 0;
        while (insertCount < numberOfBlock) {
            const randomCoordinate = RandomGenerator.coordinate(this.x, this.y);
            if (this.checkExistCoordinate(randomCoordinate)) {
                this.block.push(new Block(type, randomCoordinate));
                insertCount++;
            }
        }
    }

    private checkExistCoordinate(coordinate: Coordinate): boolean {
        return _.findIndex(this.block, (o) => o.coordinate.equal(coordinate)) === -1;
    }

}
