import { RoomSocketArray } from "./RoomSocketArray";

export interface IRoomSocketInfo {
    name: string;
    token: string;
    isReady: boolean;
}

export interface IRoomDetail {
    name: string;
    owner: string;
    player: IRoomSocketInfo[];
    moveToGameToken: string;
}

export interface IRoomInfo {
    name: string;
    token: string;
    playerCount: number;
}

export interface IRoom {
    name: string;
    owner: string;
    player: RoomSocketArray;
    token: string;
    shouldRedirectToGame: boolean;
}
