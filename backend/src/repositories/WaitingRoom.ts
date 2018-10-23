import _ from "lodash";
import { Observable } from "rxjs";
import { first, flatMap, map } from "rxjs/operators";
import { Socket } from "../model/Socket";
import Player from "../models/Player.model";
import { IWaitingRoomRequest, IWaitingRoomResponse, IWaitingRoomUser } from "../type/waitingRoom";
import { User } from "./User";

export class WaitingRoom {

    public static getInstance(): WaitingRoom {
        if (!this.instance) {
            this.instance = new WaitingRoom();
        }
        return this.instance;
    }

    private static instance: WaitingRoom;

    private queue: WaitingUser[] = [];

    private constructor() { }

    public push(
        socket: Socket<IWaitingRoomResponse, IWaitingRoomRequest>,
    ) {
        WaitingUser.getWaitingUser(socket).pipe(
            first(),
        ).subscribe(
            (user) => {
                if (user) {
                    user.getObservableData().subscribe(
                        // tslint:disable-next-line:no-empty
                        () => { },
                        () => {
                            this.broadcast(`${user.getNickname()} disconnected.`);
                            _.remove(this.queue, user);
                        },
                        () => {
                            this.broadcast(`${user.getNickname()} left the game.`);
                            _.remove(this.queue, user);
                        },
                    );
                    this.queue.push(user);
                }
            },
        );
    }

    public broadcast(msg: string) {
        for (const user of this.queue) {
            user.send(msg);
        }
    }

    public getAllUser(): IWaitingRoomUser[] {
        return this.queue.map((user) => {
            return {
                nickname: user.getNickname(),
                token: user.getNickname(),
            };
        });
    }

}

class WaitingUser {

    public static getWaitingUser(socket: Socket<IWaitingRoomResponse, IWaitingRoomRequest>): Observable<WaitingUser | null> {
        let token: string;
        return socket.data().pipe(
            first(),
            flatMap((data) => {
                token = data.token;
                return User.findUser(data.token);
            }),
            map((user) => new WaitingUser(user, socket, token)),
        );
    }

    constructor(private player: Player, private socket: Socket<IWaitingRoomResponse, IWaitingRoomRequest>, private token: string) { }

    public getObservableData(): Observable<IWaitingRoomRequest> {
        return this.socket.data();
    }

    public getToken(): string {
        return this.token;
    }

    public send(message: string) {
        this.socket.send({
            message,
            users: WaitingRoom.getInstance().getAllUser(),
        });
    }

    public getNickname(): string {
        return this.player.nickname;
    }
}
