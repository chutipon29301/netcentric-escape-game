import { Server } from "http";
import url from "url";
import { SocketHandler } from "./SocketHandler";
import { SocketHandlerArray } from "./SocketHandlerArray";

export class SocketGenerator {
    public static getInstance(): SocketGenerator {
        if (!this.instance) {
            this.instance = new SocketGenerator();
        }
        return this.instance;
    }

    private static instance: SocketGenerator;

    private server: Server;
    private sockets = new SocketHandlerArray();

    private constructor() { }

    public setHttpServer(server: Server) {
        this.server = server;
        this.server.on("upgrade", (request, socket, head) => {
            const pathname = url.parse(request.url).pathname;
            this.sockets.handleUpgrade(pathname, request, socket, head);
        });
    }

    public createSocket(path: string) {
        const socket = new SocketHandler(path);
        this.sockets.push(socket);
        return socket;
    }

}
