import _ from "lodash";
import { BehaviorSubject, combineLatest, merge, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { JWTAuth } from "../../repositories/JWTAuth";
import { Coordinate } from "./component/Coordinate";
import { IGamePlayerSummary, IGameResponseDetail, IPlayerInfo } from "./GameInterface";
import { GameSocket } from "./GameSocket";

export class GameSocketArray {

    private array: BehaviorSubject<GameSocket[]> = new BehaviorSubject([]);

    public push(socket: GameSocket): GameSocketArray {
        this.array.next([...this.array.getValue(), socket]);
        return this;
    }

    public getInfo(): Observable<IPlayerInfo[]> {
        return this.array.pipe(
            flatMap((elements) => (elements.length === 0) ? of([]) : combineLatest(elements.map((o) => o.getInfo()))),
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

    public getPlayerSummary(): Observable<IGamePlayerSummary[]> {
        return this.array.pipe(
            flatMap((elements) => combineLatest(elements.map((o) => o.getPlayerSummary()))),
        );
    }

    public getPlayerAction(): Observable<IGameResponseDetail> {
        return this.array.pipe(
            flatMap((elements) => merge(elements.map((o) => combineLatest(of(o), o.getPLayerAction())))),
            flatMap((value) => value),
            map(([player, response]) => (
                {
                    direction: response.direction,
                    player,
                }
            )),
        );
    }

    public isOverlapOtherPlayer(player: GameSocket, coordinate: Coordinate): boolean {
        if (coordinate) {
            const overlapPlayer = this.array.getValue().find((o) => {
                if (o.getCoordinate()) {
                    return o.getCoordinate().equal(coordinate);
                } else {
                    return false;
                }
            });
            if (overlapPlayer) {
                return !JWTAuth.equal(player.getToken(), overlapPlayer.getToken());
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
