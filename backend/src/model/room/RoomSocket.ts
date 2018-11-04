import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IRoomDetail, IRoomSocketInfo } from "./RoomInterface";

export class RoomSocket extends Socket<IRoomDetail, { isReady: boolean }> {

    private token: BehaviorSubject<string> = new BehaviorSubject("");
    private isReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(socket: WebSocket, token: string, isReady = false) {
        super(socket);
        this.token.next(token);
        this.isReady.next(isReady);
    }

    public getInfo(): Observable<IRoomSocketInfo> {
        return combineLatest(this.isReady, this.token).pipe(
            flatMap(([isReady, token]) => combineLatest(of(isReady), of(token), Player.findWithToken(token))),
            map(([isReady, token, { nickname }]) => ({ isReady, name: nickname, token })),
        );
    }

    public setReady(isReady: boolean) {
        this.isReady.next(isReady);
    }

    public getToken(): string {
        return this.token.getValue();
    }

}
