import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { PlayerType } from "../../type/playerType";
import { Socket } from "../socket/Socket";
import { Coordinate } from "./component/Coordinate";
import { IGamePlayerSummary, IGameResponse, IGameUpdate, IPlayerInfo } from "./GameInterface";

export class GameSocket extends Socket<IGameUpdate, IGameResponse> {

    private info: BehaviorSubject<IPlayerInfo>;

    constructor(socket: WebSocket, token: string) {
        super(socket);
        this.info = new BehaviorSubject({
            coordinate: null,
            playerType: null,
            token,
        });
    }

    public getInfo(): Observable<IPlayerInfo & { name: string }> {
        return this.info.pipe(
            flatMap((info) => combineLatest(of(info), Player.findWithToken(info.token))),
            map(([info, {nickname}]) => ({ ...info, name: nickname })),
        );
    }

    public getToken(): string {
        return this.info.getValue().token;
    }

    public setCoordinate(coordinate: Coordinate) {
        this.update({ coordinate });
    }

    public setPlayerType(playerType: PlayerType) {
        this.update({ playerType });
    }

    public getPlayerSummary(): Observable<IGamePlayerSummary> {
        return this.info.pipe(
            flatMap((info) => combineLatest(of(info.token), Player.findWithToken(info.token))),
            map(([token, {nickname}]) => ({ name: nickname, token })),
        );
    }

    public getPLayerAction(): Observable<IGameResponse> {
        return this.data();
    }

    private update(value: Partial<IPlayerInfo>) {
        this.info.next({
            coordinate: value.coordinate || this.info.getValue().coordinate,
            playerType: value.playerType || this.info.getValue().playerType,
            token: value.token || this.info.getValue().token,
        });
    }
}
