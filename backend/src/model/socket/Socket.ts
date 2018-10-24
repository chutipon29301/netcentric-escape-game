import { Observable } from "rxjs";
import WebSocket from "ws";

export class Socket<Send, Receive> {

    constructor(private socket: WebSocket) { }

    public data(): Observable<Receive> {
        return new Observable<Receive>((observer) => {
            this.socket.on("message", (data: string) => {
                try {
                    observer.next(JSON.parse(data) as Receive);
                } catch (error) {
                    observer.error(error);
                }
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
        this.socket.send(JSON.stringify(data));
    }

    public close(code?: number, data?: string) {
        this.socket.close(code, data);
    }

}
