import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
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

    public getGameWithToken(token: string): Game | null {
        const index = this.findGameIndex(token);
        return (index === -1) ? null : this.array.getValue()[index];
    }

    public getGameSummary(): Observable<IGameSummary[]> {
        return this.array.pipe(
            flatMap((elements) => (elements.length === 0) ? of([]) : combineLatest(elements.map((o) => o.getGameSummary()))),
        );
    }

    public remove(token: string) {
        const index = this.findGameIndex(token);
        this.removeAtIndex(index);
    }

    private findGameIndex(token: string): number {
        return this.array.getValue().findIndex((o) => o.getToken() === token);
    }

    private removeAtIndex(index: number) {
        if (index !== -1) {
            this.array.getValue().splice(index, 1);
            this.array.next([...this.array.getValue()]);
        }
    }
}
