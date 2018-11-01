import { IncomingMessage } from "http";
import url from "url";
import WebSocket from "ws";
import { OnlinePlayer as Socket } from "../../model/onlinePlayer/OnlinePlayer";
import { OnlinePlayerArray } from "../../model/onlinePlayer/OnlinePlayerArray";
import { IOnlinePlayerTeam } from "../../model/onlinePlayer/OnlinePlayerTeam";
import { RoomArray } from "../../model/room/RoomArray";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { User } from "../../repositories/User";

export class OnlinePlayerSocket {

    public static getInstance(): OnlinePlayerSocket {
        if (!this.instance) {
            this.instance = new OnlinePlayerSocket();
        }
        return this.instance;
    }

    private static instance: OnlinePlayerSocket;
    private socketArray = new OnlinePlayerArray();
    private webSocketServerListener = SocketGenerator.getInstance().createSocket("/onlinePlayerListener");
    private webSocketServer = SocketGenerator.getInstance().createSocket("/onlinePlayer", (info, cb) => {
        const { query: { token } } = url.parse(info.req.url, true);
        if (token) {
            User.findUser(token as string).subscribe(
                (player) => {
                    if (player === null) {
                        cb(false);
                    } else {
                        cb(true);
                    }
                },
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
            this.socketArray.pushPlayer(observableSocket);
            observableSocket.data().subscribe(
                // tslint:disable-next-line:no-empty
                () => { },
                (error) => this.socketArray.popPlayer(token as string),
                () => this.socketArray.popPlayer(token as string),
            );
            RoomArray.getInstance().getSubject().subscribe(
                (message) => observableSocket.send(message),
            );
        });
        // RoomArray.getInstance().addHook((message: IRoomArrayMessage[]) => {
        //     this.webSocketServer.clients.forEach((o) => {
        //         if (o.readyState === WebSocket.OPEN) {
        //             o.send(JSON.stringify(message));
        //         }
        //     });
        // });

        this.webSocketServerListener.on("connection", (socket: WebSocket) => {
            this.socketArray.updatePlayerList();
        });
        this.socketArray.addHook((message: IOnlinePlayerTeam[]) => {
            this.webSocketServerListener.clients.forEach((o) => {
                if (o.readyState === WebSocket.OPEN) {
                    o.send(JSON.stringify(message));
                }
            });
        });
    }

    public removeUserWithToken(token: string) {
        this.socketArray.popPlayer(token);
    }
}
