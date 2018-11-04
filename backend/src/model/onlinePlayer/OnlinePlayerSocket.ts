import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IOnlinePlayerInfo } from "./OnlinePlayerInterface";

export class OnlinePlayerSocket extends Socket<IOnlinePlayerInfo[], {}> {

    private token: BehaviorSubject<string> = new BehaviorSubject("");

    constructor(socket: WebSocket, token: string) {
        super(socket);
        this.token.next(token);
    }

    public getInfo(): Observable<IOnlinePlayerInfo> {
        return this.token.pipe(
            flatMap((token) => combineLatest(of(token), Player.findWithToken(token))),
            map(([token, { nickname }]) => ({ name: nickname, token })),
        );
    }

    public getToken(): string {
        return this.token.getValue();
    }
}
