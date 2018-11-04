import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import { Game } from "./Game";
import { IGameSummary } from "./GameInterface";

export class GameArray {

    public static getInstance(): GameArray {
        if (!this.instance) {
            this.instance = new GameArray();
        }
        return this.instance;
    }

    private static instance: GameArray;
    private array: BehaviorSubject<Game[]> = new BehaviorSubject([]);

    public push(game: Game) {
        this.array.next([...this.array.getValue(), game]);
    }

    public removeGameWithToken(token: string) {
        const index = this.findGameIndex(token);
        this.array.next([...this.array.getValue().splice(index, 1)]);
    }

    public checkGameExist(token: string): boolean {
        return this.findGameIndex(token) !== -1;
    }

    public getGameWithToken(token: string): Game {
        return this.array.getValue()[this.findGameIndex(token)];
    }

    public getGameSummary(): Observable<IGameSummary[]> {
        return this.array.pipe(
            flatMap((elements) => combineLatest(elements.map((o) => o.getGameSummary()))),
        );
    }

    private findGameIndex(token: string): number {
        return this.array.getValue().findIndex((o) => o.getToken() === token);
    }
}
