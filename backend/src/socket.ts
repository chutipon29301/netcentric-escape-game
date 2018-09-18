import { Server } from "http";
import { Observable } from "rxjs";
import WebSocket, { ServerOptions } from "ws";
import { ISocketHandler } from "./type/socket";

export interface ISocket {
    webSocketServer: WebSocket.Server;
    socket: WebSocket;
    error?: Error;
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

    public getSocket(): Observable<ISocket> {
        return this.createSocket({ server: this.server });
    }

    public getSocketWithPath(path: string): Observable<ISocket> {
        return this.createSocket({
            path,
            server: this.server,
        });
    }

    public setSocketResolver(socket: WebSocket, ...params: [ISocketHandler]) {
        for (const param of params) {
            socket.on(param.key, (data: any) => {
                param.handler(data);
            });
        }
    }

    private createSocket(options?: ServerOptions, callback?: () => void): Observable<ISocket> {
        return new Observable((observer) => {
            const webSocketServer = new WebSocket.Server(options);
            webSocketServer.on("connection", (socket: WebSocket) => {
                observer.next({
                    socket, webSocketServer,
                });
            });
            webSocketServer.on("error", (socket: WebSocket, error: Error) => {
                observer.error({
                    error, socket, webSocketServer,
                });
            });
        });
    }
}
