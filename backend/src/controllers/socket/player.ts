import WebSocket from "ws";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { User } from "../../model/user/User";
import { UserSocket as Socket } from "../../model/user/UserSocket";

export class PlayerSocket {
    public static getInstance(): PlayerSocket {
        if (!this.instance) {
            this.instance = new PlayerSocket();
        }
        return this.instance;
    }

    private static instance: PlayerSocket;

    private webSocketServer = SocketGenerator.getInstance().createSocket("/player");

    private constructor() { }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket) => {
            const observableSocket = new Socket(socket);
            User.getUserList().subscribe((players) => observableSocket.send(players));
        });
    }

}
