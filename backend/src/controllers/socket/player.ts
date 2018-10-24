import { Observable } from "rxjs";
import WebSocket from "ws";
import { IPlayerMessage } from "../../model/playerSocket/PlayerMessage";
import { PlayerSocket as Socket } from "../../model/playerSocket/PlayerSocket";
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
            User.list().subscribe(
                (players) => observableSocket.send(this.mapPlayerMessage(players)),
            );
        });
    }

    public updatePlayer(users: Observable<Player[]>) {
        users.subscribe(
            (players) => this.webSocketServer.clients.forEach((client) => client.send(this.mapPlayerMessage(players))),
        );
    }

    private mapPlayerMessage(players: Player[]): IPlayerMessage[] {
        return players.map((player) => {
            return {
                email: player.email,
                lose: player.lose,
                nickname: player.nickname,
                win: player.win,
            };
        });
    }
}
