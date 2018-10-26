import { IncomingMessage } from "http";
import url from "url";
import WebSocket from "ws";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { WaitingRoomSocket as Socket } from "../../model/waitingRoom/WaitingRoomSocket";
import { WaitingRoomSocketArray } from "../../model/waitingRoom/WaitingRoomSocketArray";
import { User } from "../../repositories/User";

export class WaitingRoomSocket {

    public static getInstance(): WaitingRoomSocket {
        if (!this.instance) {
            this.instance = new WaitingRoomSocket();
        }
        return this.instance;
    }

    private static instance: WaitingRoomSocket;

    private socketArray = new WaitingRoomSocketArray();

    private webSocketServer = SocketGenerator.getInstance().createSocket("/waitingRoom", (info, cb) => {
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

    private webSocketServerListener = SocketGenerator.getInstance().createSocket("/waitingRoomListener");

    private constructor() { }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
            const { query: { token } } = url.parse(req.url, true);
            const observableSocket = new Socket(socket, token as string);
            this.socketArray.push(observableSocket);
            observableSocket.data().subscribe(
                // tslint:disable-next-line:no-empty
                () => { },
                (error) => {
                    this.updatePlayer();
                },
                () => {
                    this.updatePlayer();
                },
            );
            this.updatePlayer();
        });
        this.webSocketServerListener.on("connection", (socket: WebSocket) => {
            this.updatePlayer();
        });
    }

    public updatePlayer() {
        this.socketArray.listUser().subscribe(
            (player) => {
                this.webSocketServer.clients.forEach((client) => client.send(JSON.stringify(player)));
                this.webSocketServerListener.clients.forEach((client) => client.send(JSON.stringify(player)));
            },
        );
    }

    public removePlayerWithToken(token: string) {
        this.socketArray.removeUserWithToken(token);
        this.updatePlayer();
    }
}
