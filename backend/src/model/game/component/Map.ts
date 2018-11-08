import _ from "lodash";
import { BlockType } from "../../../type/blockType";
import { Direction } from "../../../type/direction";
import { PlayerType } from "../../../type/playerType";
import { GameSocket } from "../GameSocket";
import { GameSocketArray } from "../GameSocketArray";
import { Block } from "./Block";
import { Coordinate } from "./Coordinate";
import { Dimension } from "./Dimension";
import { RandomGenerator } from "./RandomGenerator";

export class Map {

    private block: Block[] = [];
    private dimension: Dimension;
    private walkablePath: boolean[][];

    constructor(x: number, y: number, private obstaclePercent: number) {
        this.dimension = new Dimension(x, y);
        this.generateMap();
        this.walkablePath = this.getWalkablePath();
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

    public getTunnel(): Block {
        return this.block.filter((o) => o.blockType === BlockType.TUNNEL)[0];
    }

    public walk(player: GameSocket, direction: Direction, players: GameSocketArray): boolean {
        const newCoordinate = player.getCoordinate().move(direction);
        if (this.isValidPath(newCoordinate)) {
            if (player.getPlayerType() === PlayerType.PRISONER) {
                player.setCoordinate(newCoordinate);
                if (this.getTunnel().coordinate.equal(newCoordinate)) {
                    player.win();
                }
                if (players.isOverlapOtherPlayer(player, newCoordinate)) {
                    players.getStaticArray()[0].win();
                }
                return true;
            } else {
                if (!this.getTunnel().coordinate.equal(newCoordinate)) {
                    const isOverlap = players.isOverlapOtherPlayer(player, newCoordinate);
                    player.setCoordinate(newCoordinate);
                    if (isOverlap) {
                        player.win();
                    }
                    return true;
                }
            }
        }
        return false;
    }

    public insertPlayer(player: GameSocket, allPlayers: GameSocketArray) {
        let canInsert = false;
        while (!canInsert) {
            const randomCoordinate = RandomGenerator.coordinate(this.dimension.getX() - 1, this.dimension.getY() - 1);
            if (this.walkablePath[randomCoordinate.getX()][randomCoordinate.getY()]) {
                if (!allPlayers.isOverlapOtherPlayer(player, randomCoordinate) && !this.getTunnel().coordinate.equal(randomCoordinate)) {
                    player.setCoordinate(randomCoordinate);
                    canInsert = true;
                }
            }
        }
    }

    private insertBlockWithType(type: BlockType, numberOfBlock = 1) {
        let insertCount = 0;
        while (insertCount < numberOfBlock) {
            const randomCoordinate = RandomGenerator.coordinate(this.dimension.getX() - 1, this.dimension.getY() - 1);
            if (!this.checkExistCoordinate(randomCoordinate)) {
                this.block.push(new Block(type, randomCoordinate));
                insertCount++;
            }
        }
    }

    private checkExistCoordinate(coordinate: Coordinate): boolean {
        return _.findIndex(this.block, (o) => o.coordinate.equal(coordinate)) !== -1;
    }

    private getWalkablePath(): boolean[][] {
        const obstacles = this.block.filter((o) => o.blockType === BlockType.OBSTACLE).map((o) => o.coordinate);
        const tunnel = this.block.find((o) => o.blockType === BlockType.TUNNEL).coordinate;
        const path = this.dimension.createEmptyArrayOfDimension();
        this.run(path, obstacles, tunnel);
        return path;
    }

    private run(path: boolean[][], obstacles: Coordinate[], player: Coordinate) {
        if (!this.dimension.isValidCoordinate(player)) { return; }
        const isValid = obstacles.findIndex((o) => o.equal(player)) === -1;
        if (!isValid) { return; }
        if (path[player.getX()][player.getY()]) { return; }
        path[player.getX()][player.getY()] = true;
        this.run(path, obstacles, new Coordinate(player.getX() + 1, player.getY()));
        this.run(path, obstacles, new Coordinate(player.getX() - 1, player.getY()));
        this.run(path, obstacles, new Coordinate(player.getX(), player.getY() + 1));
        this.run(path, obstacles, new Coordinate(player.getX(), player.getY() - 1));
    }

    private isValidPath(coordinate: Coordinate): boolean {
        return this.dimension.isValidCoordinate(coordinate) && this.walkablePath[coordinate.getX()][coordinate.getY()];
    }

}
