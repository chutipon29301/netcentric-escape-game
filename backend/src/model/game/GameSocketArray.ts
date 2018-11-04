import _ from "lodash";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { IPlayerInfo } from "./GameInterface";
import { GameSocket } from "./GameSocket";

export class GameSocketArray {

    private array: BehaviorSubject<GameSocket[]> = new BehaviorSubject([]);

    public push(socket: GameSocket): GameSocketArray {
        this.array.next([...this.array.getValue(), socket]);
        return this;
    }

    public getInfo(): Observable<IPlayerInfo[]> {
        return this.array.pipe(
            flatMap((elements) => combineLatest(elements.map((o) => o.getInfo()))),
        );
    }
    public findPlayer(token: string): GameSocket {
        return this.array.getValue().find((o) => o.getToken() === token);
    }

    public length(): Observable<number> {
        return this.array.pipe(
            map((elements) => elements.length),
        );
    }

    public staticLength(): number {
        return this.array.getValue().length;
    }

    public getStaticArray(): GameSocket[] {
        return this.array.getValue();
    }

    public shuffle() {
        this.array.next(_.shuffle(this.array.getValue()));
    }

}
