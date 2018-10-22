import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../repositories/User";
import { IWaitingRoomUserMessage, WaitingRoomMessage } from "./WaitingRoomMessage";
import { WaitingRoomSocket } from "./WaitingRoomSocket";

export class WaitingRoomSocketArray extends Array<WaitingRoomSocket> {

    public broadcast(message: WaitingRoomMessage) {
        this.forEach((socket) => socket.send(message));
    }

    public listRegisteredUser(): Observable<IWaitingRoomUserMessage[]> {
        return forkJoin(this.map((socket) => {
            return forkJoin([
                User.findUser(socket.getToken()),
                socket.getToken(),
            ]);
        })).pipe(
            map((results) => {
                return results.map(([player, token]) => ({ name: player.nickname, token }));
            }),
        );
    }

    public pushSocket(socket: WaitingRoomSocket) {
        this.push(socket);
    }

    public deleteUserWith(token: string) {
        const index = this.findIndexOfUserWith(token);
        this.deleteAtIndex(index);
        return index;
    }

    public delete(socket: WaitingRoomSocket) {
        const index = this.indexOf(socket);
        this.deleteAtIndex(index);
        return index;
    }

    public findIndexOfUserWith(token: string) {
        return this.findIndex((waitingRoomSocket) => waitingRoomSocket.getToken() === token);
    }

    private deleteAtIndex(index: number) {
        if (index > -1) {
            this.splice(index, 1);
        }
        // this.listRegisteredUser().pipe(
        //     map((users) => users.map((user) => ({
        //         name: user.
        //     })))
        // )
    }
}
