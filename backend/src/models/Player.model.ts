import { from, Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { AllowNull, Column, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IUserInfo } from "../model/user/UserInterface";
import { JWTAuth } from "../repositories/JWTAuth";

@Table
export default class Player extends Model<Player> {

    public static listPlayers(): Observable<IUserInfo[]> {
        return from(this.findAll()).pipe(
            map((players) =>
                players.map((player) => ({
                    email: player.email,
                    lose: player.lose,
                    nickname: player.nickname,
                    win: player.win,
                })),
            ),
        );
    }

    public static findWithToken(token: string): Observable<Player> {
        try {
            const email = JWTAuth.decodeToken(token);
            if (email) {
                return from(Player.findOne({ where: { email } }));
            } else {
                throw new Error("Player not found");
            }
        } catch (error) {
            throw error;
        }
    }

    public static win(token: string): Observable<Player> {
        return Player.findWithToken(token).pipe(
            flatMap((player) => {
                player.win += 1;
                return from(player.save());
            }),
        );
    }

    public static lose(token: string): Observable<Player> {
        return Player.findWithToken(token).pipe(
            flatMap((player) => {
                player.lose += 1;
                return from(player.save());
            }),
        );
    }

    public static resetScore(): Observable<number> {
        return from(Player.update({ win: 0, lose: 0 }, { where: {} })).pipe(
            map((response) => response[0]),
        );
    }

    public static getStat(token: string): Observable<number> {
        return Player.findWithToken(token).pipe(
            map((player) => player.win),
        );
    }

    @AllowNull(false)
    @PrimaryKey
    @Column
    public email: string;

    @AllowNull(false)
    @Column
    public password: string;

    @AllowNull(false)
    @Column
    public nickname: string;

    @Default(0)
    @Column
    public win: number;

    @Default(0)
    @Column
    public lose: number;

}
