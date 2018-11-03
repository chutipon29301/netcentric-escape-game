import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { v1 } from "uuid";
import { JWTAuth } from "../../repositories/JWTAuth";
import { IRoomDetail, IRoomInfo } from "./RoomInterface";
import { RoomSocket } from "./RoomSocket";
import { RoomSocketArray } from "./RoomSocketArray";

export class Room {

    private sockets = new RoomSocketArray();
    private token = v1();
    private roomInfo: BehaviorSubject<IRoomInfo> = new BehaviorSubject({
        name: this.name,
        playerCount: this.sockets.length,
        token: this.token,
    });
    private roomDetail: BehaviorSubject<IRoomDetail> = new BehaviorSubject({
        name: this.name,
        owner: this.owner,
        player: [],
    });

    constructor(private name: string, private owner: string) { }

    public getToken(): string {
        return this.token;
    }

    public getRoomDetail(): Observable<IRoomDetail> {
        if (this.sockets.length === 0) {
            return of({
                name: this.name,
                owner: this.owner,
                player: [],
            });
        } else {
            return this.sockets.getInfo().pipe(
                map((player) => ({
                    name: this.name,
                    owner: this.owner,
                    player,
                })),
            );
        }
    }

    public getRoomInfo(): Observable<IRoomInfo> {
        return this.roomInfo;
    }

    public addPlayer(socket: RoomSocket) {
        this.sockets.push(socket);
        this.update();
    }

    public removePlayer(token: string) {
        this.sockets.removeAtIndex(this.sockets.findIndex((o) => JWTAuth.equal(o.getToken(), token)));
        this.update();
    }

    public closePlayerSocket() {
        this.sockets.forEach((o) => o.close());
    }

    private update() {
        this.roomInfo.next({
            name: this.name,
            playerCount: this.sockets.length,
            token: this.token,
        });
        this.getRoomDetail().subscribe((message) => this.roomDetail.next(message));
    }

}
