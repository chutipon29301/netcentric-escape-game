import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { v1 } from "uuid";
import { IRoom, IRoomDetail, IRoomInfo } from "./RoomInterface";
import { RoomSocket } from "./RoomSocket";
import { RoomSocketArray } from "./RoomSocketArray";

export class Room {

    private room: BehaviorSubject<IRoom>;

    constructor(name: string, owner: string) {
        this.room.next({
            name,
            owner,
            player: new RoomSocketArray(),
            token: v1(),
        });
    }

    public getToken(): string {
        return this.room.getValue().token;
    }

    public getRoomDetail(): Observable<IRoomDetail> {
        return this.room.pipe(
            flatMap((info) => combineLatest(of(info.name), of(info.owner), info.player.getInfo())),
            map(([name, owner, player]) => ({ name, owner, player })),
        );
    }

    public getRoomInfo(): Observable<IRoomInfo> {
        return this.room.pipe(
            flatMap((info) => combineLatest(of(info.name), of(info.token), info.player.length())),
            map(([name, token, playerCount]) => ({ name, token, playerCount })),
        );
    }

    public addPlayer(socket: RoomSocket) {
        this.room.next({
            name: this.room.getValue().name,
            owner: this.room.getValue().owner,
            player: this.room.getValue().player.push(socket),
            token: this.room.getValue().token,
        });
    }

    public removePlayer(token: string) {
        this.room.next({
            name: this.room.getValue().name,
            owner: this.room.getValue().owner,
            player: this.room.getValue().player.remove(token),
            token: this.room.getValue().token,
        });
    }

    public closePlayerSocket() {
        this.room.getValue().player.closeSocket();
    }

}
