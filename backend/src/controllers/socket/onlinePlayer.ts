import { IncomingMessage } from "http";
import url from "url";
import WebSocket from "ws";
import { IOnlinePlayerInfo } from "../../model/onlinePlayer/OnlinePlayerInterface";
import { OnlinePlayerSocket as Socket } from "../../model/onlinePlayer/OnlinePlayerSocket";
import { OnlinePlayerSocketArray } from "../../model/onlinePlayer/OnlinePlayerSocketArray";
import { RoomArray } from "../../model/room/RoomArray";
import { Socket as ObservableSocket } from "../../model/socket/Socket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import Player from "../../models/Player.model";

export class OnlinePlayerSocket {

    public static getInstance(): OnlinePlayerSocket {
        if (!this.instance) {
            this.instance = new OnlinePlayerSocket();
        }
        return this.instance;
    }

    private static instance: OnlinePlayerSocket;
    private socketArray = new OnlinePlayerSocketArray();
    private webSocketServerListener = SocketGenerator.getInstance().createSocket("/onlinePlayerListener");
    private webSocketServer = SocketGenerator.getInstance().createSocket("/onlinePlayer", (info, cb) => {
        const { query: { token } } = url.parse(info.req.url, true);
        if (token) {
            Player.findWithToken(token as string).subscribe(
                (player) => cb(player !== null),
                () => cb(false),
            );
        } else {
            cb(false);
        }
    });

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
            const { query: { token } } = url.parse(req.url, true);
            const observableSocket = new Socket(socket, token as string);
            this.socketArray.addPlayer(observableSocket);
            RoomArray.getInstance().getRoomsInfo().subscribe(
                (message) => observableSocket.send(message),
            );
            observableSocket.data().subscribe(
                // tslint:disable-next-line:no-empty
                () => { },
                (_) => this.socketArray.removePlayer(token as string),
                () => this.socketArray.removePlayer(token as string),
            );
        });

        this.webSocketServerListener.on("connection", (socket: WebSocket) => {
            const observableSocket = new ObservableSocket<IOnlinePlayerInfo[], {}>(socket);
            this.socketArray.getOnlinePlayerInfo().subscribe(
                (message) => observableSocket.send(message),
            );
        });
    }

    public removeUserWithToken(token: string) {
        this.socketArray.removePlayer(token);
    }
}
