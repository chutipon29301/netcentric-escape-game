import _ from "lodash";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { Room } from "./Room";
import { IRoomInfo } from "./RoomInterface";

export class RoomArray extends Array<Room> {

    public static getInstance(): RoomArray {
        if (!this.instance) {
            this.instance = new RoomArray();
        }
        return this.instance;
    }

    private static instance: RoomArray;

    private roomsInfo: BehaviorSubject<IRoomInfo[]> = new BehaviorSubject([]);

    public push(room: Room) {
        const index = super.push(room);
        this.update();
        return index;
    }

    public remove(roomToken: string) {
        const index = this.findIndex((o) => o.getToken() === roomToken);
        if (index > -1) {
            this[index].closePlayerSocket();
            _.remove(this, (o) => o.getToken() === roomToken);
        }
        this.update();
    }

    public getRoomsInfo(): Observable<IRoomInfo[]> {
        return this.roomsInfo;
    }

    public list(): Observable<IRoomInfo[]> {
        return combineLatest(this.map((room) => (room.getRoomInfo())));
    }

    public checkValidToken(token: string): boolean {
        return this.findIndex((o) => o.getToken() === token) !== -1;
    }

    public findRoomWithToken(token: string): Room {
        return this[this.findIndex((o) => o.getToken() === token)];
    }

    private update() {
        if (this.length === 0) {
            this.roomsInfo.next([]);
        } else {
            combineLatest(this.map((o) => o.getRoomInfo())).subscribe(
                (value) => this.roomsInfo.next(value),
            );
        }
    }
}
