import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import WebSocket from "ws";
import Player from "../../models/Player.model";
import { Socket } from "../socket/Socket";
import { IOnlinePlayerTeam } from "./OnlinePlayerTeam";

export class OnlinePlayer extends Socket<IOnlinePlayerTeam[], {}> {

    constructor(socket: WebSocket, public token: string) {
        super(socket);
    }

    public getPlayerInfo(): Observable<IOnlinePlayerTeam> {
        return Player.findWithToken(this.token).pipe(
            map((player) => {
                return {
                    name: player.nickname,
                    token: this.token,
                };
            }),
        );
    }

}
