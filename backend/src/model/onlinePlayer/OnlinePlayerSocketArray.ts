import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { JWTAuth } from "../../repositories/JWTAuth";
import { SocketArray } from "../socket/SocketArray";
import { IOnlinePlayerInfo } from "./OnlinePlayerInterface";
import { OnlinePlayerSocket } from "./OnlinePlayerSocket";

export class OnlinePlayerSocketArray extends SocketArray<OnlinePlayerSocket> {

    private onlinePlayerInfo: BehaviorSubject<IOnlinePlayerInfo[]> = new BehaviorSubject([]);

    public addPlayer(player: OnlinePlayerSocket) {
        const index = this.findTokenIndex(player.getToken());
        if (index >= 0) {
            return;
        }
        this.push(player);
        this.update();
    }

    public removePlayer(token: string) {
        const index = this.findTokenIndex(token);
        this.removeAtIndex(index);
        this.update();
    }

    public getOnlinePlayerInfo(): Observable<IOnlinePlayerInfo[]> {
        return this.onlinePlayerInfo;
    }

    private findTokenIndex(token: string): number {
        return this.findIndex((o) => JWTAuth.equal(o.getToken(), token));
    }

    private update() {
        combineLatest(this.map((o) => o.getInfo())).subscribe(
            (value) => {
                this.onlinePlayerInfo.next(value);
            },
        );
    }
}
