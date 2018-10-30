import { IncomingMessage } from "http";
import url from "url";
import WebSocket from "ws";
import { RoomArray } from "../../model/room/RoomArray";
import { IRoomArrayMessage, IRoomMessage } from "../../model/room/RoomMessage";
import { RoomSocket as Socket } from "../../model/room/RoomSocket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { JWTAuth } from "../../repositories/JWTAuth";

export class RoomSocket {

    public static getInstance(): RoomSocket {
        if (!this.instance) {
            this.instance = new RoomSocket();
        }
        return this.instance;
    }

    private static instance: RoomSocket;
    private webSocketServer = SocketGenerator.getInstance().createSocket("/room",
        (info: { origin: string; secure: boolean; req: IncomingMessage }) => {
            const { query: { token, player } } = url.parse(info.req.url, true);
            try {
                JWTAuth.decodeToken(player as string);
                if (token) {
                    return RoomArray.getInstance().checkValidToken(token as string);
                } else {
                    return false;
                }
            } catch (_) {
                return false;
            }
        });
    private webSocketServerListener = SocketGenerator.getInstance().createSocket("/roomListener");

    private constructor() { }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
            const { query: { player } } = url.parse(req.url, true);
            const room = RoomArray.getInstance().findRoomWithToken(player as string);
            const observableSocket = new Socket(socket, player as string);
            room.pushPlayer(observableSocket);
            room.addHook((message: IRoomMessage) => {
                observableSocket.send(message);
            });
            room.update();
            observableSocket.data().subscribe(
                (data) => observableSocket.setReady(data.isReady),
                (error) => room.removePlayer(player as string),
                () => room.removePlayer(player as string),
            );
        });
        RoomArray.getInstance().addHook((message: IRoomArrayMessage[]) => {
            this.webSocketServerListener.clients.forEach((o) => {
                if (o.readyState === WebSocket.OPEN) {
                    o.send(JSON.stringify(message));
                }
            });
        });
        this.webSocketServerListener.on("connection", (socket: WebSocket) => {
            RoomArray.getInstance().updateValue();
        });
    }

}
