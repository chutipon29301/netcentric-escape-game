import { BlockType } from "../type/blockType";
import { Coordinate } from "./Coordinate";

export class Block {

    constructor(public blockType: BlockType, public coordinate: Coordinate) { }

}
