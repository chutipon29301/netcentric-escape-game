import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap } from "rxjs/operators";
import { Room } from "./Room";
import { IRoomInfo } from "./RoomInterface";

export class RoomArray {

    public static getInstance(): RoomArray {
        if (!this.instance) {
            this.instance = new RoomArray();
        }
        return this.instance;
    }

    private static instance: RoomArray;

    private array: BehaviorSubject<Room[]> = new BehaviorSubject([]);

    public push(room: Room) {
        this.array.next([...this.array.getValue(), room]);
    }

    public remove(roomToken: string) {
        const index = this.findIndexOfToken(roomToken);
        if (index !== -1) {
            this.array.getValue()[index].closePlayerSocket();
            this.removeAtIndex(index);
        }
    }

    public list(): Observable<IRoomInfo[]> {
        return this.array.pipe(
            flatMap((elements) => (elements.length === 0) ? of([]) : combineLatest(elements.map((o) => o.getRoomInfo()))),
        );
    }

    public checkValidToken(token: string): boolean {
        return this.findIndexOfToken(token) !== -1;
    }

    public findRoomWithToken(token: string): Room {
        return this.array.getValue()[this.findIndexOfToken(token)];
    }

    private findIndexOfToken(token: string) {
        return this.array.getValue().findIndex((o) => o.getToken() === token);
    }

    private removeAtIndex(index: number) {
        if (index !== -1) {
            this.array.getValue().splice(index, 1);
            this.array.next([...this.array.getValue()]);
        }
    }
}
