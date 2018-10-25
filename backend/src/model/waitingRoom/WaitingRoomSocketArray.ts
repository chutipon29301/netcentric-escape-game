import { forkJoin, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../repositories/User";
import { IWaitingRoomUserMessage, WaitingRoomMessage, WaitingRoomType } from "./WaitingRoomMessage";
import { WaitingRoomSocket } from "./WaitingRoomSocket";

export class WaitingRoomSocketArray extends Array<WaitingRoomSocket> {

    private updateHook: Array<(message: WaitingRoomMessage) => void> = [];

    public broadcast(message: WaitingRoomMessage) {
        this.forEach((socket) => socket.send(message));
    }

    public listRegisteredUser(): Observable<IWaitingRoomUserMessage[]> {
        if (this.length === 0) {
            return of([]);
        }
        return forkJoin(this.map((socket) => {
            return forkJoin([
                User.findUser(socket.getToken()),
                of(socket.getToken()),
            ]);
        })).pipe(
            map((results) => {
                return results.filter(([player]) => {
                    return player;
                }).map(([player, token]) => ({ name: player.nickname, token }));
            }),
        );
    }

    public broadcastRegisterUser(): Observable<void> {
        return this.listRegisteredUser().pipe(
            map((users) => {
                const message = new WaitingRoomMessage(WaitingRoomType.update, users);
                this.broadcast(message);
                this.updateHook.forEach((hook) => hook(message));
            }),
        );
    }

    public pushSocket(socket: WaitingRoomSocket) {
        this.push(socket);
        this.broadcastRegisterUser().subscribe();
    }

    public deleteUserWith(token: string) {
        const index = this.findIndexOfUserWith(token);
        this.deleteAtIndex(index);
        return index;
    }

    public delete(socket: WaitingRoomSocket) {
        const index = this.indexOf(socket);
        this.deleteAtIndex(index);
        socket.close();
        return index;
    }

    public findIndexOfUserWith(token: string) {
        return this.findIndex((waitingRoomSocket) => waitingRoomSocket.getToken() === token);
    }

    public addUpdateHook(hook: (message: WaitingRoomMessage) => void) {
        this.updateHook.push(hook);
    }

    private deleteAtIndex(index: number) {
        this[index].close();
        if (index > -1) {
            this.splice(index, 1);
        }
        this.broadcastRegisterUser().subscribe();
    }
}
