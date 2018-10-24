import { forkJoin, of } from "rxjs";
import { flatMap } from "rxjs/operators";
import WebSocket from "ws";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { WaitingRoomMessage, WaitingRoomType } from "../../model/waitingRoom/WaitingRoomMessage";
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

    private webSocketServer = SocketGenerator.getInstance().createSocket("/waitingRoom");
    private sockets = new WaitingRoomSocketArray();

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket) => {
            const observableSocket = new Socket(socket);
            this.sockets.push(observableSocket);
        });
    }

    public listen(socket: Socket) {
        socket.data().pipe(
            flatMap((message) => {
                if (message.type === WaitingRoomType.register || message.type === WaitingRoomType.play) {
                    throw new Error("Wrong waitingRoom message type");
                }
                return forkJoin([
                    User.findUser(message.getToken()),
                    of(message.getToken()),
                ]);
            }),
        ).subscribe(
            ([player, token]) => {
                socket.registerWith(token);
                this.sockets.broadcast(new WaitingRoomMessage(
                    WaitingRoomType.update, {
                        name: player.nickname,
                        token,
                    },
                ));
            },
            (error) => this.sockets.delete(socket),
            () => this.sockets.delete(socket),
        );
    }
}
