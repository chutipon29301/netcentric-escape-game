import { combineLatest, Observable } from "rxjs";
import { JWTAuth } from "../../repositories/JWTAuth";
import { SocketArray } from "../socket/SocketArray";
import { IRoomSocketInfo } from "./RoomInterface";
import { RoomSocket } from "./RoomSocket";

export class RoomSocketArray extends SocketArray<RoomSocket> {

    public getInfo(): Observable<IRoomSocketInfo[]> {
        return combineLatest(this.map((o) => o.getInfo()));
    }

    public push(socket: RoomSocket): number {
        const index = this.findCurrentPlayer(socket.getToken());
        if (index !== -1) { this.removeAtIndex(index); }
        return super.push(socket);
    }

    public findCurrentPlayer(token: string): number {
        return this.findIndex((o) => JWTAuth.equal(o.getToken(), token));
    }
}
