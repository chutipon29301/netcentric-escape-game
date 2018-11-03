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
        console.log(roomToken);
        const index = this.findIndex((o) => o.getToken() === roomToken);
        console.log(index);
        if (index > -1) {
            this[index].closePlayerSocket();
            console.log(this.length);
            // this.splice(index, 1);
            _.remove(this, (o) => o.getToken() === roomToken);
            console.log(this.length);
            this.update();
        }
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
        console.log(this.length);
        combineLatest(this.map((o) => o.getRoomInfo())).subscribe(
            (value) => {
                console.log(value);
                this.roomsInfo.next(value);
            },
        );
    }
}
