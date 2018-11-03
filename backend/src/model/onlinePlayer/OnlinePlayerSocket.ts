import { BehaviorSubject, Observable } from "rxjs";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IOnlinePlayerInfo } from "./OnlinePlayerInterface";

export class OnlinePlayerSocket extends Socket<IOnlinePlayerInfo[], {}> {

    private info: BehaviorSubject<IOnlinePlayerInfo> = new BehaviorSubject({
        name: "",
        token: this.token,
    });

    constructor(socket: WebSocket, private token: string) {
        super(socket);
        Player.findWithToken(token).subscribe(
            (player) => {
                this.info.next({
                    name: player.nickname,
                    token,
                });
            },
        );
    }

    public getInfo(): Observable<IOnlinePlayerInfo> {
        return this.info;
    }

    public getToken(): string {
        return this.token;
    }
}
