import { Observable } from "rxjs";
import { Server } from "ws";
import { ISocket, SocketGenerator } from "../../socket";

export class WaitingRoomSocket {

    public static getInstance(): WaitingRoomSocket {
        if (!this.instance) {
            this.instance = new WaitingRoomSocket();
        }
        return this.instance;
    }

    private static instance: WaitingRoomSocket;

    private webSocketServer: Server;
    private socketObservable: Observable<ISocket>;

    private constructor() {
        this.socketObservable = SocketGenerator.getInstance().getSocketWithPath("/waitingRoom");
    }

    public init() {
        this.socketObservable.subscribe(
            (socketInstance) => {
                this.webSocketServer = socketInstance.webSocketServer;
                SocketGenerator.getInstance().setSocketResolver(socketInstance.socket, {
                    handler: (data) => {
                        socketInstance.socket.send(`${data} receive hello`);
                    },
                    key: "message",
                });
            },
        );
    }

    public broadcast() {
        this.webSocketServer.clients.forEach((socket) => {
            socket.send("Hello");
        });
    }

}
