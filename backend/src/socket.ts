import { IncomingMessage, Server } from "http";
import WebSocket, { ServerOptions } from "ws";

interface IInfo {
    origin: string;
    req: IncomingMessage;
    secure: boolean;
}

export class SocketGenerator {
    public static getInstance(): SocketGenerator {
        if (!this.instance) {
            this.instance = new SocketGenerator();
        }
        return this.instance;
    }

    private static instance: SocketGenerator;

    private server: Server;

    private constructor() { }

    public setServer(server: Server) {
        this.server = server;
    }

    // public getSocket(): WebSocket.Server {
    //     return this.createSocket({ server: this.server });
    // }

    public getSocketWithPath(path: string, verifyClient?: (info: IInfo) => boolean): WebSocket.Server {
        return this.createSocket({
            // path,
            // server: this.server,
            noServer: true,
            verifyClient,
        });
    }

    private createSocket(options?: ServerOptions, callback?: () => void): WebSocket.Server {
        return new WebSocket.Server(options, callback);
    }
}
