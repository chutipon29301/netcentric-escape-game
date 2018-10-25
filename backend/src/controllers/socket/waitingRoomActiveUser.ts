import WebSocket from "ws";
import { Socket } from "../../model/socket/Socket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { WaitingRoomMessage, WaitingRoomType } from "../../model/waitingRoom/WaitingRoomMessage";
import { WaitingRoomSocket } from "./waitingRoom";

export class WaitingRoomActiveUserSocket {

    public static getInstance(): WaitingRoomActiveUserSocket {
        if (!this.instance) {
            this.instance = new WaitingRoomActiveUserSocket();
        }
        return this.instance;
    }

    private static instance: WaitingRoomActiveUserSocket;
    private webSocketServer = SocketGenerator.getInstance().createSocket("/waitingRoomActiveUser");

    private constructor() { }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket) => {
            const observableSocket = new Socket(socket);
            WaitingRoomSocket.getInstance().listActiveSocket().subscribe(
                (users) => {
                    const message = new WaitingRoomMessage(WaitingRoomType.update, users);
                    observableSocket.send(message);
                },
            );
            WaitingRoomSocket.getInstance().addUpdateHook(observableSocket.send);
        });
    }
}
