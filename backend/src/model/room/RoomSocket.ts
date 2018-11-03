import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IRoomDetail, IRoomSocketInfo } from "./RoomInterface";

export class RoomSocket extends Socket<IRoomDetail, { isReady: boolean }> {

    private isReadySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(socket: WebSocket, private token: string, isReady = false) {
        super(socket);
        this.isReadySubject.next(isReady);
    }

    public getInfo(): Observable<IRoomSocketInfo> {
        return combineLatest(this.isReadySubject, Player.findWithToken(this.token)).pipe(
            map(([isReady, player]) => ({
                isReady,
                name: player.nickname,
                token: this.token,
            })),
        );
    }

    public setReady(isReady: boolean) {
        this.isReadySubject.next(isReady);
    }

    public getToken(): string {
        return this.token;
    }

}
