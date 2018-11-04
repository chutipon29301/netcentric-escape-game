import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { PlayerType } from "../../type/playerType";
import { Socket } from "../socket/Socket";
import { Coordinate } from "./component/Coordinate";
import { IGamePlayerSummary, IGameResponse, IGameUpdate, IPlayerInfo } from "./GameInterface";

export class GameSocket extends Socket<IGameUpdate, IGameResponse> {

    private info: BehaviorSubject<IPlayerInfo> = new BehaviorSubject({
        coordinate: null,
        name: "",
        playerType: null,
        token: "",
    });

    constructor(socket: WebSocket, token: string) {
        super(socket);
        Player.findWithToken(token).subscribe(
            (player) => {
                this.info.next({
                    coordinate: this.info.getValue().coordinate,
                    name: player.nickname,
                    playerType: this.info.getValue().playerType,
                    token,
                });
            },
        );
    }

    public getInfo(): Observable<IPlayerInfo> {
        return this.info;
    }

    public getToken(): string {
        return this.info.getValue().token;
    }

    public setCoordinate(coordinate: Coordinate) {
        this.info.next({
            coordinate,
            name: this.info.getValue().name,
            playerType: this.info.getValue().playerType,
            token: this.info.getValue().token,
        });
    }

    public setPlayerType(playerType: PlayerType) {
        this.info.next({
            coordinate: this.info.getValue().coordinate,
            name: this.info.getValue().name,
            playerType,
            token: this.info.getValue().token,
        });
    }

    public getPlayerSummary(): Observable<IGamePlayerSummary> {
        return this.info.pipe(
            map(({ name, token }) => ({ name, token })),
        );
    }

    public getPLayerAction(): Observable<IGameResponse> {
        return this.data();
    }
}
