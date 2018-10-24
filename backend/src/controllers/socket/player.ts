import { Observable } from "rxjs";
import WebSocket from "ws";
import { IPlayerMessage } from "../../model/player/PlayerMessage";
import { PlayerSocket as Socket } from "../../model/player/PlayerSocket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import Player from "../../models/Player.model";
import { User } from "../../repositories/User";

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

    public updatePlayer(users: Observable<IPlayerMessage[]>) {
        users.subscribe(
            (players) => this.webSocketServer.clients.forEach((client) => client.send(players)),
        );
    }

}
