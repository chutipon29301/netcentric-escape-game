import { IncomingMessage, Server } from "http";
import WebSocket from "ws";

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
        return new WebSocket.Server({ server: this.server });
    }

    public getSocketWithPath(path: string): WebSocket.Server {
        return new WebSocket.Server({
            path,
            server: this.server,
        });
    }

    public getVerifySocket(): WebSocket.Server {
        return new WebSocket.Server({
            server: this.server,
            verifyClient: this.verifyClient,
        });
    }

    public getVerifySocketWithPath(path: string): WebSocket.Server {
        return new WebSocket.Server({
            path,
            server: this.server,
            verifyClient: this.verifyClient,
        });
    }

    private verifyClient(
        info: { origin: string; secure: boolean; req: IncomingMessage },
    ): boolean {
        return info.origin === process.env.ALLOW_ORIGIN;
    }
}
