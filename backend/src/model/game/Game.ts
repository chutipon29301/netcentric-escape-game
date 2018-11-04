import { BehaviorSubject, combineLatest, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { PlayerType } from "../../type/playerType";
import { Map } from "./component/Map";
import { IGameInfo, IGameUpdate } from "./GameInterface";
import { GameSocket } from "./GameSocket";
import { GameSocketArray } from "./GameSocketArray";

export class Game {

    private info: BehaviorSubject<IGameInfo>;
    private timer: Observable<number>;

    constructor(roomToken: string, numberOfPlayer: number, dimensionX = 5, dimensionY = 5, obstaclePercent = 0.2) {
        this.info = new BehaviorSubject({
            backupMap: null,
            isGameRunning: false,
            map: new Map(dimensionX, dimensionY, obstaclePercent),
            numberOfPlayer,
            player: new GameSocketArray(),
            playerIndex: 0,
            roomToken,
            turn: "",
        });
    }

    public addPlayer(player: GameSocket) {
        if (!this.info.getValue().isGameRunning && this.info.getValue().player.staticLength() === this.info.getValue().numberOfPlayer) {
            this.update({
                player: this.info.getValue().player.push(player),
            });
            if (this.info.getValue().player.staticLength() === this.info.getValue().numberOfPlayer) {
                setTimeout(() => {
                    this.startGame();
                }, 2000);
            }
        }
    }

    public resetGame() {
        this.timer = null;
        this.update({
            isGameRunning: false,
            map: this.info.getValue().backupMap,
        });
    }

    public regenerateMap() {
        this.info.getValue().map.generateMap();
    }

    public getUpdateInfo(): Observable<IGameUpdate> {
        return combineLatest(this.timer, this.info).pipe(
            map(([time, info]) => {
                return {
                    time,
                    turn: info.turn,
                };
            }),
        );
    }

    public getToken(): string {
        return this.info.getValue().roomToken;
    }

    private startGame() {
        if (this.info.getValue().isGameRunning) {
            this.resetTimer();
            this.info.getValue().player.shuffle();
            this.update({
                backupMap: this.info.getValue().map.clone(),
                isGameRunning: true,
            });
        }
    }

    private shufflePlayer() {
        this.info.getValue().player.shuffle();
        for (const [index, value] of this.info.getValue().player.getStaticArray().entries()) {
            value.setPlayerType((index === 0) ? PlayerType.WARDER : PlayerType.PRISONER);
        }
    }

    private update(value: Partial<IGameInfo>) {
        this.info.next({
            backupMap: value.backupMap || this.info.getValue().backupMap,
            isGameRunning: value.isGameRunning || this.info.getValue().isGameRunning,
            map: value.map || this.info.getValue().map,
            numberOfPlayer: value.numberOfPlayer || this.info.getValue().numberOfPlayer,
            player: value.player || this.info.getValue().player,
            playerIndex: value.playerIndex || this.info.getValue().playerIndex,
            roomToken: value.roomToken || this.info.getValue().roomToken,
            turn: value.turn || this.info.getValue().turn,
        });
    }

    private resetTimer() {
        this.timer = timer(1000, 1000);
    }

    private nextPlayer() {
        this.update({
            playerIndex: this.info.getValue().playerIndex + 1 % this.info.getValue().player.staticLength(),
        });
    }

}
