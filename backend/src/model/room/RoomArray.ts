import _ from "lodash";
import { BehaviorSubject } from "rxjs";
import { Room } from "./Room";
import { IRoomArrayMessage } from "./RoomMessage";

export class RoomArray extends Array<Room> {

    public static getInstance(): RoomArray {
        if (!this.instance) {
            this.instance = new RoomArray();
        }
        return this.instance;
    }

    private static instance: RoomArray;

    private hooks: Array<(message: IRoomArrayMessage[]) => void> = [];
    private behaviorSubject: BehaviorSubject<IRoomArrayMessage[]> = new BehaviorSubject([]);

    public push(room: Room) {
        const index = super.push(room);
        this.updateValue();
        return index;
    }

    public remove(roomToken: string) {
        const index = this.findIndex((o) => o.getToken() === roomToken);
        this[index].closePlayerSocket();
        _.remove(this, (o) => o.getToken() === roomToken);
        this.updateValue();
    }

    public list(): IRoomArrayMessage[] {
        return this.map((room) => (room.getRoomInfo()));
    }

    public checkValidToken(token: string): boolean {
        return this.findIndex((o) => o.getToken() === token) !== -1;
    }

    public addHook(hook: (message: IRoomArrayMessage[]) => void) {
        this.hooks.push(hook);
    }

    public getSubject(): BehaviorSubject<IRoomArrayMessage[]> {
        return this.behaviorSubject;
    }

    public updateValue() {
        const message = this.list();
        this.behaviorSubject.next(message);
        this.hooks.forEach((hook) => hook(message));
    }

    public findRoomWithToken(token: string): Room {
        return this[this.findIndex((o) => o.getToken() === token)];
    }
}
