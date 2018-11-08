import { BehaviorSubject, combineLatest, interval, Observable, of } from "rxjs";
import { flatMap, map, take } from "rxjs/operators";
import { PlayerType } from "../../type/playerType";
import { Map } from "./component/Map";
import { IGameInfo, IGameSummary, IGameUpdate } from "./GameInterface";
import { GameSocket } from "./GameSocket";
import { GameSocketArray } from "./GameSocketArray";

export class Game {

    private info: BehaviorSubject<IGameInfo>;
    private timer: BehaviorSubject<number> = new BehaviorSubject(0);
    private interval = interval(1000);
    private isFirstRun = true;

    constructor(roomToken: string, numberOfPlayer: number, dimensionX = 5, dimensionY = 5, obstaclePercent = 0.2) {
        this.interval.subscribe(
            () => {
                if (this.timer.getValue() < 10) {
                    this.timer.next(this.timer.getValue() + 1);
                } else {
                    this.timer.next(0);
                    if (this.info.getValue().isGameRunning) {
                        this.nextPlayer();
                    }
                }
            },
        );
        this.resetTimer();
        this.info = new BehaviorSubject({
            backupMap: null,
            isGameRunning: false,
            map: new Map(dimensionX, dimensionY, obstaclePercent),
            numberOfPlayer,
            player: new GameSocketArray(),
            playerIndex: -1,
            roomToken,
        });
    }

    public addPlayer(player: GameSocket) {
        if (!this.info.getValue().isGameRunning && this.info.getValue().player.staticLength() < this.info.getValue().numberOfPlayer) {
            this.update({
                player: this.info.getValue().player.push(player),
            });
            if (this.info.getValue().player.staticLength() === this.info.getValue().numberOfPlayer) {
                setTimeout(() => {
                    this.shufflePlayer();
                    this.startGame();
                }, 2000);
            }
        }
    }

    public resetGame() {
        const oldMap = this.info.getValue().map;
        this.update({
            backupMap: null,
            isGameRunning: false,
            map: new Map(oldMap.getDimension().getX(), oldMap.getDimension().getY(), oldMap.getObstaclePercent()),
            playerIndex: -1,
        });
        this.info.getValue().player.resetCoordinate();
        this.startGame();
    }

    public regenerateMap() {
        this.info.getValue().map.generateMap();
        this.update({});
    }

    public getToken(): string {
        return this.info.getValue().roomToken;
    }

    public getGameInfo(): Observable<IGameUpdate> {
        return this.timer.pipe(
            flatMap((time) => combineLatest(of(time), this.info).pipe(take(1))),
            flatMap(([time, info]) => combineLatest(of({
                blocks: info.map.getBlock(),
                dimension: info.map.getDimension(),
                playerIndex: info.playerIndex,
                playersInfo: [],
                time,
            }), info.player.getInfo()).pipe(take(1))),
            map(([result, player]) => ({ ...result, playersInfo: player })),
        );
    }

    public getGameSummary(): Observable<IGameSummary> {
        return this.info.pipe(
            flatMap((info) => combineLatest(of(info), info.player.getPlayerSummary())),
            map(([info, player]) => ({
                isGameRunning: info.isGameRunning,
                maxPlayer: info.numberOfPlayer,
                player,
                playerIndex: info.playerIndex,
                roomToken: info.roomToken,
            })),
        );
    }

    public startGame() {
        if (this.info.getValue().player.staticLength() === this.info.getValue().numberOfPlayer) {
            this.resetTimer();
            this.nextPlayer();
            this.update({
                backupMap: this.info.getValue().map.clone(),
                isGameRunning: true,
            });
            this.info.getValue().player.getStaticArray()
                .forEach((element) => this.info.getValue().map.insertPlayer(element, this.info.getValue().player));
            if (this.isFirstRun) {
                this.isFirstRun = false;
                this.info.getValue().player.getPlayerAction().subscribe(
                    (response) => {
                        const moveSuccess = this.info.getValue().map.walk(response.player, response.direction, this.info.getValue().player);
                        if (moveSuccess) {
                            this.nextPlayer();
                        }
                    },
                );
            }
        }
    }

    public nextPlayer() {
        this.resetTimer();
        this.updatePlayerIndex((this.info.getValue().playerIndex + 1) % this.info.getValue().player.staticLength());
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
        });
    }

    private updatePlayerIndex(index: number) {
        this.info.next({
            backupMap: this.info.getValue().backupMap,
            isGameRunning: this.info.getValue().isGameRunning,
            map: this.info.getValue().map,
            numberOfPlayer: this.info.getValue().numberOfPlayer,
            player: this.info.getValue().player,
            playerIndex: index,
            roomToken: this.info.getValue().roomToken,
        });
    }

    private resetTimer() {
        this.timer.next(0);
    }

}
