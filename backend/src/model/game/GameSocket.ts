import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap, map, take } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { PlayerType } from "../../type/playerType";
import { Socket } from "../socket/Socket";
import { Coordinate } from "./component/Coordinate";
import { IGamePlayerSummary, IGameResponse, IGameUpdate, IPlayerInfo } from "./GameInterface";

export class GameSocket extends Socket<IGameUpdate, IGameResponse> {

    private info: BehaviorSubject<IPlayerInfo>;
    private name: BehaviorSubject<string> = new BehaviorSubject("");

    constructor(socket: WebSocket, token: string) {
        super(socket);
        Player.findWithToken(token).subscribe(
            (name) => this.name.next(name.nickname),
        );
        this.info = new BehaviorSubject({
            coordinate: null,
            isWin: false,
            playerType: null,
            token,
        });
    }

    public getInfo(): Observable<IPlayerInfo & { name: string }> {
        return combineLatest(this.info, this.name).pipe(
            take(1),
            map(([info, name]) => ({ ...info, name })),
        );
    }

    public getToken(): string {
        return this.info.getValue().token;
    }

    public getCoordinate(): Coordinate {
        return this.info.getValue().coordinate;
    }

    public setCoordinate(coordinate: Coordinate) {
        this.update({ coordinate });
    }

    public getPlayerType(): PlayerType {
        return this.info.getValue().playerType;
    }

    public setPlayerType(playerType: PlayerType) {
        this.update({ playerType });
    }

    public getPlayerSummary(): Observable<IGamePlayerSummary> {
        return combineLatest(this.info, this.name).pipe(
            map(([{ token }, name]) => ({ name, token })),
        );
    }

    public getPLayerAction(): Observable<IGameResponse> {
        return this.data();
    }

    public getStaticName(): string {
        return this.name.getValue();
    }

    public getStaticPlayerType(): PlayerType {
        return this.info.getValue().playerType;
    }

    public win() {
        this.update({ isWin: true });
    }

    private update(value: Partial<IPlayerInfo>) {
        this.info.next({
            coordinate: value.coordinate || this.info.getValue().coordinate,
            isWin: value.isWin || this.info.getValue().isWin,
            playerType: value.playerType || this.info.getValue().playerType,
            token: value.token || this.info.getValue().token,
        });
    }
}
