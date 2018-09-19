import WebSocket, { Server } from "ws";
import { Socket } from "../../model/Socket";
import { SocketGenerator } from "../../socket";

export class WaitingRoomSocket {

    public static getInstance(): WaitingRoomSocket {
        if (!this.instance) {
            this.instance = new WaitingRoomSocket();
        }
        return this.instance;
    }

    private static instance: WaitingRoomSocket;

    private webSocketServer: Server;

    private constructor() {
        this.webSocketServer = SocketGenerator.getInstance().getSocketWithPath("/waitingRoom");
    }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket) => {
            const observableSocket = new Socket<string, string>(socket);
        });
    }

}
