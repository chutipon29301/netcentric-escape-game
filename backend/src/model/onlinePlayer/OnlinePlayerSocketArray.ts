import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { flatMap } from "rxjs/operators";
import { JWTAuth } from "../../repositories/JWTAuth";
import { IOnlinePlayerInfo } from "./OnlinePlayerInterface";
import { OnlinePlayerSocket } from "./OnlinePlayerSocket";

export class OnlinePlayerSocketArray {

    private array: BehaviorSubject<OnlinePlayerSocket[]> = new BehaviorSubject([]);

    public addPlayer(player: OnlinePlayerSocket) {
        const index = this.findTokenIndex(player.getToken());
        this.removeAtIndex(index);
        this.array.next([...this.array.getValue(), player]);
    }

    public removePlayer(token: string) {
        const index = this.findTokenIndex(token);
        this.removeAtIndex(index);
    }

    public getOnlinePlayerInfo(): Observable<IOnlinePlayerInfo[]> {
        return this.array.pipe(
            flatMap((elements) => (elements.length === 0) ? of([]) : combineLatest((elements.map((o) => o.getInfo())))),
        );
    }

    private findTokenIndex(token: string): number {
        return this.array.getValue().findIndex((o) => JWTAuth.equal(o.getToken(), token));
    }

    private removeAtIndex(index: number) {
        if (index !== -1) {
            this.array.getValue().splice(index, 1);
            this.array.next([...this.array.getValue()]);
        }
    }
}
