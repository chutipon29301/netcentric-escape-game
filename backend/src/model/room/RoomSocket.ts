import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IRoomSocketMessage } from "./RoomMessage";

export class RoomSocket extends Socket<{}, {}> {

    constructor(socket: WebSocket, private token: string, private isReady = false) {
        super(socket);
    }

    public getPlayerInfo(): Observable<IRoomSocketMessage> {
        return Player.findWithToken(this.token).pipe(
            map((player) => ({
                isReady: this.isReady,
                name: player.nickname,
                token: this.token,
            })),
        );
    }

}
