import { BehaviorSubject, from, Observable, ObservableInput, SchedulerLike } from "rxjs";
import { map } from "rxjs/operators";
import Player from "../../models/Player.model";
import { Crypto } from "../../repositories/Crypto";
import { IFullToken, JWTAuth } from "../../repositories/JWTAuth";
import { IUserInfo } from "./UserInterface";

export class User {

    public static addUser(
        nickname: string,
        email: string,
        password: string,
    ): Observable<Player> {
        const player = new Player({
            email, nickname, password: Crypto.encrypt(password),
        });
        return this.notifySocketFrom(player.save());
    }

    public static deleteUser(
        email: string,
    ): Observable<number> {
        return this.notifySocketFrom(Player.destroy({ where: { email } }));
    }

    public static login(
        email: string,
        password: string,
    ): Observable<IFullToken> {
        return from(Player.findOne({ where: { email } })).pipe(
            map((player) => {
                if (player) {
                    if (Crypto.equals(player.password, password)) {
                        return JWTAuth.getAllToken(email);
                    } else {
                        throw new Error("Email and password does not match");
                    }
                } else {
                    throw new Error(`Cannot find user with email: ${email}`);
                }
            }),
        );
    }

    public static getScore(token: string): Observable<number> {
        return Player.getStat(token);
    }

    public static getUserList(): Observable<IUserInfo[]> {
        Player.listPlayers().subscribe((players) => this.userList.next(players));
        return this.userList;
    }

    public static resetScore(): Observable<number> {
        return Player.resetScore();
    }

    private static userList: BehaviorSubject<IUserInfo[]> = new BehaviorSubject([]);

    private static notifySocketFrom<T>(input: ObservableInput<T>, scheduler?: SchedulerLike): Observable<T> {
        return from(input, scheduler).pipe(
            map((result) => {
                Player.listPlayers().subscribe((players) => {
                    this.userList.next(players);
                });
                return result;
            }),
        );
    }
}
