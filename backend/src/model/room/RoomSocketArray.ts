import { forkJoin, Observable } from "rxjs";
import { SocketArray } from "../socket/SocketArray";
import { IRoomSocketMessage } from "./RoomMessage";
import { RoomSocket } from "./RoomSocket";

export class RoomSocketArray extends SocketArray<RoomSocket> {

    public getInfo(): Observable<IRoomSocketMessage[]> {
        return forkJoin(this.map((o) => o.getPlayerInfo()));
    }
}
