import { IncomingMessage } from "http";
import { Socket } from "net";
import WebSocket from "ws";

export class SocketHandler extends WebSocket.Server {

    constructor(private handlerPath: string) {
        super({ noServer: true });
    }

    public getPath(): string {
        return this.handlerPath;
    }

    public customHandleUpgrade(request: IncomingMessage, socket: Socket, head: Buffer) {
        this.handleUpgrade(request, socket, head, (ws) => {
            this.emit("connection", ws, request);
        });
    }

}
