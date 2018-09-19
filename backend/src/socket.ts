import { Server } from "http";
import { Observable, of } from "rxjs";
import WebSocket, { ServerOptions } from "ws";

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

    public getSocket(): WebSocket.Server {
        return this.createSocket({ server: this.server });
    }

    public getSocketWithPath(path: string): WebSocket.Server {
        return this.createSocket({
            path,
            server: this.server,
        });
    }

    private createSocket(options?: ServerOptions, callback?: () => void): WebSocket.Server {
        return new WebSocket.Server(options);
    }
}
