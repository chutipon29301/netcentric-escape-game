import { Observable } from "rxjs";
import WebSocket from "ws";

export class Socket<Send, Receive> {

    constructor(private socket: WebSocket) { }

    public data(): Observable<Receive> {
        return new Observable<Receive>((observer) => {
            this.socket.on("message", (data: Receive) => {
                observer.next(data);
            });
            this.socket.on("close", (_) => {
                observer.complete();
            });
            this.socket.on("error", (_: WebSocket, error: Error) => {
                observer.error(error);
            });
        });
    }

    public send(data: Send) {
        this.socket.send(data);
    }
}
