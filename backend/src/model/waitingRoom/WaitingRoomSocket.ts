import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IWaitingRoomUserMessage } from "./WaitingRoomMessage";

export class WaitingRoomSocket extends Socket<IWaitingRoomUserMessage[], {}> {

    constructor(socket: WebSocket, private token: string) {
        super(socket);
    }

    public getToken(): string {
        return this.token;
    }

    public getPlayer(): Observable<Player> {
        return Player.findWithToken(this.token);
    }

    public getPlayerInfo(): Observable<IWaitingRoomUserMessage> {
        return this.getPlayer().pipe(
            map((result) => ({
                name: result.nickname,
                token: this.token,
            })),
        );
    }

}
