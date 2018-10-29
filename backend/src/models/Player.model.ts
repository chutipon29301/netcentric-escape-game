import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AllowNull, Column, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IPlayerMessage } from "../model/player/PlayerMessage";
import { JWTAuth } from "../repositories/JWTAuth";

@Table
export default class Player extends Model<Player> {

    public static listPlayers(): Observable<IPlayerMessage[]> {
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
