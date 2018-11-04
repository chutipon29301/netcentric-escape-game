import { IncomingMessage } from "http";
import { Subscription } from "rxjs";
import url from "url";
import WebSocket from "ws";
import { RoomArray } from "../../model/room/RoomArray";
import { IRoomDetail, IRoomInfo } from "../../model/room/RoomInterface";
import { RoomSocket as Socket } from "../../model/room/RoomSocket";
import { Socket as ObservableSocket } from "../../model/socket/Socket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { JWTAuth } from "../../repositories/JWTAuth";
import { OnlinePlayerSocket } from "./onlinePlayer";

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
                return RoomArray.getInstance().checkValidToken(token as string);
            } catch (_) {
                return false;
            }
        });
    private webSocketServerListener = SocketGenerator.getInstance().createSocket("/roomListener");
    private webSocketServerDetailListener = SocketGenerator.getInstance().createSocket("/roomDetailListener",
        (info: { origin: string; secure: boolean; req: IncomingMessage }) => {
            const { query: { token } } = url.parse(info.req.url, true);
            return RoomArray.getInstance().checkValidToken(token as string);
        });

    private constructor() { }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
            const { query: { token, player } } = url.parse(req.url, true);
            const room = RoomArray.getInstance().findRoomWithToken(token as string);
            OnlinePlayerSocket.getInstance().removeUserWithToken(player as string);
            const observableSocket = new Socket(socket, player as string);
            room.addPlayer(observableSocket);
            room.getRoomDetail().subscribe(
                (message) => observableSocket.send(message),
            );
            observableSocket.data().subscribe(
                (data) => observableSocket.setReady(data.isReady),
            );
        });

        this.webSocketServerListener.on("connection", (socket: WebSocket) => {
            const observableSocket = new ObservableSocket<IRoomInfo[], {}>(socket);
            RoomArray.getInstance().list().subscribe(
                (message) => observableSocket.send(message),
            );
        });

        this.webSocketServerDetailListener.on("connection", (socket: WebSocket, req: IncomingMessage) => {
            const { query: { token } } = url.parse(req.url, true);
            const room = RoomArray.getInstance().findRoomWithToken(token as string);
            const observableSocket = new ObservableSocket<IRoomDetail, {}>(socket);
            room.getRoomDetail().subscribe(
                (message) => observableSocket.send(message),
            );
        });
    }

}
