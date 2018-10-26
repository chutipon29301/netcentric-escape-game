import _ from "lodash";
import { forkJoin, Observable, of } from "rxjs";
import { IWaitingRoomUserMessage } from "./WaitingRoomMessage";
import { WaitingRoomSocket } from "./WaitingRoomSocket";

export class WaitingRoomSocketArray extends Array<WaitingRoomSocket> {

    public clearInactive() {
        _.remove(this, (o) => !o.isAlive());
    }

    public listUser(): Observable<IWaitingRoomUserMessage[]> {
        this.clearInactive();
        if (this.length === 0) {
            return of([]);
        }
        return forkJoin(this.map((o) => o.getPlayerInfo()));
    }

    public removeUserWithToken(token: string) {
        _.remove(this, (o) => o.getToken() === token);
    }

    public removeUserWithTokens(tokens: string[]) {
        _.remove(this, (o) => tokens.findIndex((token) => token === o.getToken()) > 0);
    }

}
