import { BehaviorSubject, combineLatest, Observable, of, timer } from "rxjs";
import { flatMap, map, take } from "rxjs/operators";
import { PlayerType } from "../../type/playerType";
import { Map } from "./component/Map";
import { IGameInfo, IGameSummary, IGameUpdate } from "./GameInterface";
import { GameSocket } from "./GameSocket";
import { GameSocketArray } from "./GameSocketArray";

export class Game {

    private info: BehaviorSubject<IGameInfo>;
    private timer: Observable<number>;

    constructor(roomToken: string, numberOfPlayer: number, dimensionX = 5, dimensionY = 5, obstaclePercent = 0.2) {
        this.resetTimer();
        this.info = new BehaviorSubject({
            backupMap: null,
            isGameRunning: false,
            map: new Map(dimensionX, dimensionY, obstaclePercent),
            numberOfPlayer,
            player: new GameSocketArray(),
            playerIndex: 0,
            roomToken,
        });
    }

    public addPlayer(player: GameSocket) {
        if (!this.info.getValue().isGameRunning && this.info.getValue().player.staticLength() < this.info.getValue().numberOfPlayer) {
            this.update({
                player: this.info.getValue().player.push(player),
            });
            if (this.info.getValue().player.staticLength() === this.info.getValue().numberOfPlayer) {
                // setTimeout(() => {
                //     this.shufflePlayer();
                //     this.startGame();
                // }, 2000);
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
        this.update({});
    }

    public getToken(): string {
        return this.info.getValue().roomToken;
    }

    public getGameInfo(): Observable<IGameUpdate> {
        // return combineLatest(this.timer, this.info.getValue().player.getInfo(), this.info).pipe(
        //     map(([time, playersInfo, info]) => ({
        //         blocks: this.info.getValue().map.getBlock(),
        //         playerIndex: info.playerIndex,
        //         playersInfo,
        //         time,
        //     })),
        // );
        // return combineLatest(this.timer, this.info).pipe(
        //     map(([time, info]) => ({
        //         blocks: info.map.getBlock(),
        //         dimension: info.map.getDimension(),
        //         playerIndex: info.playerIndex,
        //         playersInfo: [],
        //         time,
        //     })),
        // );
        return this.timer.pipe(
            flatMap((time) => combineLatest(of(time), this.info).pipe(take(1))),
            map(([time, info]) => ({
                blocks: info.map.getBlock(),
                dimension: info.map.getDimension(),
                playerIndex: info.playerIndex,
                playersInfo: [],
                time,
            })),
            // map((time) => ({
            //     blocks: this.info.getValue().map.getBlock(),
            //     dimension: this.info.getValue().map.getDimension(),
            //     playerIndex: this.info.getValue().playerIndex,
            //     playersInfo: [],
            //     time,
            // })),
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
        if (!this.info.getValue().isGameRunning && this.info.getValue().player.staticLength() === this.info.getValue().numberOfPlayer) {
            this.resetTimer();
            this.info.getValue().player.shuffle();
            this.update({
                backupMap: this.info.getValue().map.clone(),
                isGameRunning: true,
            });
            const playerAction = this.info.pipe(
                flatMap((info) => info.player.getPlayerAction()),
            ).subscribe(
                (responses) => {
                    // responses.
                },
            );
        }
    }

    public nextPlayer() {
        this.resetTimer();
        this.update({
            playerIndex: this.info.getValue().playerIndex + 1 % this.info.getValue().player.staticLength(),
        });
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

    private resetTimer() {
        this.timer = timer(1000, 1000);
        this.timer.subscribe(
            (value) => {
                if (value > 10) {
                    this.nextPlayer();
                }
            },
        );
    }

}
