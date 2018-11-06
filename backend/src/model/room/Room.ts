import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { v1 } from "uuid";
import { IRoom, IRoomDetail, IRoomInfo } from "./RoomInterface";
import { RoomSocket } from "./RoomSocket";
import { RoomSocketArray } from "./RoomSocketArray";

export class Room {

    private room: BehaviorSubject<IRoom>;

    constructor(name: string, owner: string) {
        this.room = new BehaviorSubject({
            name,
            owner,
            player: new RoomSocketArray(),
            shouldRedirectToGame: false,
            token: v1(),
        });
    }

    public getToken(): string {
        return this.room.getValue().token;
    }

    public getRoomDetail(): Observable<IRoomDetail> {
        return this.room.pipe(
            flatMap((info) => combineLatest(of(info), info.player.getInfo())),
            map(([{ name, owner, token, shouldRedirectToGame }, player]) =>
                ({ name, owner, moveToGameToken: (shouldRedirectToGame) ? token : "", player })),
        );
    }

    public getRoomInfo(): Observable<IRoomInfo> {
        return this.room.pipe(
            flatMap((info) => combineLatest(of(info.name), of(info.token), info.player.length())),
            map(([name, token, playerCount]) => ({ name, token, playerCount })),
        );
    }

    public addPlayer(socket: RoomSocket) {
        this.update({
            player: this.room.getValue().player.push(socket),
        });
    }

    public removePlayer(token: string) {
        this.update({
            player: this.room.getValue().player.remove(token),
        });
    }

    public closePlayerSocket() {
        this.room.getValue().player.closeSocket();
    }

    public gameCreated() {
        this.update({ shouldRedirectToGame: true });
    }

    private update(value: Partial<IRoom>) {
        this.room.next({
            name: value.name || this.room.getValue().name,
            owner: value.owner || this.room.getValue().owner,
            player: value.player || this.room.getValue().player,
            shouldRedirectToGame: value.shouldRedirectToGame || this.room.getValue().shouldRedirectToGame,
            token: value.token || this.room.getValue().token,
        });
    }
}
