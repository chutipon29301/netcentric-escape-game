import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { v1 } from "uuid";
import { IRoomArrayMessage, IRoomMessage } from "./RoomMessage";
import { RoomSocket } from "./RoomSocket";
import { RoomSocketArray } from "./RoomSocketArray";

export class Room {

    private sockets = new RoomSocketArray();
    private token: string;
    private behaviorSubject: BehaviorSubject<IRoomMessage> = new BehaviorSubject({
        name: this.name,
        owner: this.owner,
        player: [],
    });

    constructor(private name: string, private owner: string) {
        this.token = v1();
    }

    public pushPlayer(socket: RoomSocket) {
        this.sockets.push(socket);
        this.update();
    }

    public popPlayer(): RoomSocket {
        const roomSocket = this.sockets.pop();
        this.update();
        return roomSocket;
    }

    public removePlayer(token: string) {
        this.sockets.removeAtIndex(this.sockets.findIndex((o) => o.getToken() === token));
        this.update();
    }

    public getSubject(): BehaviorSubject<IRoomMessage> {
        return this.behaviorSubject;
    }

    public getToken(): string {
        return this.token;
    }

    public getRoomInfo(): IRoomArrayMessage {
        return {
            name: this.name,
            playerCount: this.sockets.length,
            token: this.token,
        };
    }

    public getRoomDetail(): Observable<IRoomMessage> {
        return this.sockets.getInfo().pipe(
            map((player) => ({
                name: this.name,
                owner: this.owner,
                player,
            })),
        );
    }

    public closePlayerSocket() {
        this.sockets.forEach((o) => o.close());
    }

    public update() {
        this.getRoomDetail().subscribe(
            (message) => this.behaviorSubject.next(message),
        );
    }
}
