import { BehaviorSubject, forkJoin, Observable, of } from "rxjs";
import { JWTAuth } from "../../repositories/JWTAuth";
import { SocketArray } from "../socket/SocketArray";
import { OnlinePlayer } from "./OnlinePlayer";
import { IOnlinePlayerTeam } from "./OnlinePlayerTeam";

export class OnlinePlayerArray extends SocketArray<OnlinePlayer> {

    private behaviorSubject: BehaviorSubject<IOnlinePlayerTeam[]> = new BehaviorSubject([]);

    public popPlayer(token: string): OnlinePlayer {
        const index = this.findTokenIndex(token);
        const player = this[index];
        this.removeAtIndex(index);
        this.updatePlayerList();
        return player;
    }

    public pushPlayer(player: OnlinePlayer) {
        const index = this.findTokenIndex(player.token);
        if (index >= 0) {
            return;
        }
        this.push(player);
        this.updatePlayerList();
    }

    public updatePlayerList() {
        this.broadcast(this.getOnlinePlayerMessage());
    }

    public broadcast(message: Observable<IOnlinePlayerTeam[]>) {
        this.clearInactive();
        message.subscribe(
            (players) => this.behaviorSubject.next(players),
        );
    }

    public getSubject(): BehaviorSubject<IOnlinePlayerTeam[]> {
        return this.behaviorSubject;
    }

    private findTokenIndex(token: string): number {
        return this.findIndex((o) => JWTAuth.equal(o.token, token));
    }

    private getOnlinePlayerMessage(): Observable<IOnlinePlayerTeam[]> {
        if (this.length === 0) {
            return of([]);
        }
        return forkJoin(this.map((socket) => {
            return socket.getPlayerInfo();
        }));
    }
}
