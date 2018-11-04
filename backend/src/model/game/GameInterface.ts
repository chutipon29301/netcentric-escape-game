import { Direction } from "../../type/direction";
import { PlayerType } from "../../type/playerType";
import { Coordinate } from "./component/Coordinate";
import { Map } from "./component/Map";
import { GameSocketArray } from "./GameSocketArray";

export interface IGameUpdate {
    time: number;
    playersInfo: IPlayerInfo[];
}

export interface IGameResponse {
    direction: Direction;
}

export interface IPlayerInfo {
    coordinate: Coordinate;
    playerType: PlayerType;
    token: string;
    name: string;
}

export interface IGameInfo {
    map: Map;
    backupMap: Map;
    isGameRunning: boolean;
    roomToken: string;
    numberOfPlayer: number;
    player: GameSocketArray;
    playerIndex: number;
}

export interface IGameSummary {
    isGameRunning: boolean;
    roomToken: string;
    player: IGamePlayerSummary[];
    playerIndex: number;
    maxPlayer: number;
}

export interface IGamePlayerSummary {
    name: string;
    token: string;
}
