import { IncomingMessage } from "http";
import { Socket } from "net";
import WebSocket, { VerifyClientCallbackAsync, VerifyClientCallbackSync } from "ws";

export class SocketHandler extends WebSocket.Server {

    constructor(private handlerPath: string, verifyClient?: VerifyClientCallbackSync | VerifyClientCallbackAsync) {
        super({ noServer: true, verifyClient });
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
