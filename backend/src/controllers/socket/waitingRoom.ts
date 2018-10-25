import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import WebSocket from "ws";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { IWaitingRoomUserMessage, WaitingRoomMessage, WaitingRoomType } from "../../model/waitingRoom/WaitingRoomMessage";
import { WaitingRoomSocket as Socket } from "../../model/waitingRoom/WaitingRoomSocket";
import { WaitingRoomSocketArray } from "../../model/waitingRoom/WaitingRoomSocketArray";

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

    private constructor() { }

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket) => {
            const observableSocket = new Socket(socket);
            this.listen(observableSocket);
            this.sockets.pushSocket(observableSocket);
        });
    }

    public listen(socket: Socket) {
        socket.data().pipe(
            flatMap((message) => {
                message = new WaitingRoomMessage(message.type, message.value);
                if (message.type !== WaitingRoomType.register.toString() && message.type !== WaitingRoomType.play.toString()) {
                    throw new Error("Wrong waitingRoom message type");
                }
                if (message.type === WaitingRoomType.register) {
                    socket.registerWith(message.getToken());
                }
                return this.sockets.broadcastRegisterUser();
            }),
        ).subscribe(
            // tslint:disable-next-line:no-empty
            () => { },
            (error) => {
                this.sockets.delete(socket);
            },
            () => this.sockets.delete(socket),
        );
    }

    public remove(token: string) {
        this.sockets.deleteUserWith(token);
    }

    public listActiveSocket(): Observable<IWaitingRoomUserMessage[]> {
        return this.sockets.listRegisteredUser();
    }

    public addUpdateHook(hook: (message: WaitingRoomMessage) => void) {
        this.sockets.addUpdateHook(hook);
    }
}
