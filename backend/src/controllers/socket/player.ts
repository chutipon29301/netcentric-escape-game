import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import WebSocket from "ws";
import { IPlayerMessage } from "../../model/player/PlayerMessage";
import { PlayerSocket as Socket } from "../../model/player/PlayerSocket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import Player from "../../models/Player.model";

export class PlayerSocket {
    public static getInstance(): PlayerSocket {
        if (!this.instance) {
            this.instance = new PlayerSocket();
        }
        return this.instance;
    }

    private static instance: PlayerSocket;

    private webSocketServer = SocketGenerator.getInstance().createSocket("/player");

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket) => {
            const observableSocket = new Socket(socket);
            Player.listPlayers().subscribe(
                (players) => observableSocket.send(players),
            );
        });
    }

    public updatePlayer(users: Observable<IPlayerMessage[]>): Observable<void> {
        return users.pipe(
            map((players) => this.webSocketServer.clients.forEach((client) => new Socket(client).send(players))),
        );
    }

}
