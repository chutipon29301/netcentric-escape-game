import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { JWTAuth } from "../../repositories/JWTAuth";
import { IRoomSocketInfo } from "./RoomInterface";
import { RoomSocket } from "./RoomSocket";

export class RoomSocketArray {

    private array: BehaviorSubject<RoomSocket[]> = new BehaviorSubject([]);

    public getInfo(): Observable<IRoomSocketInfo[]> {
        return this.array.pipe(
            flatMap((elements) => (elements.length === 0) ? of([]) : combineLatest(elements.map((o) => o.getInfo()))),
        );
    }

    public push(socket: RoomSocket): RoomSocketArray {
        const index = this.findCurrentPlayer(socket.getToken());
        this.removeAtIndex(index);
        this.array.next([...this.array.getValue(), socket]);
        return this;
    }

    public remove(token: string): RoomSocketArray {
        const index = this.findCurrentPlayer(token);
        this.removeAtIndex(index);
        return this;
    }

    public findCurrentPlayer(token: string): number {
        return this.array.getValue().findIndex((o) => JWTAuth.equal(o.getToken(), token));
    }

    public length(): Observable<number> {
        return this.array.pipe(
            map((value) => value.length),
        );
    }

    public closeSocket() {
        this.array.getValue().forEach((element) => element.close());
    }

    private removeAtIndex(index: number) {
        if (index !== -1) {
            this.array.getValue().splice(index, 1);
            this.array.next([...this.array.getValue()]);
        }
    }
}
