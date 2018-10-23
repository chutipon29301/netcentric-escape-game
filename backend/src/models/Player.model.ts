import { AllowNull, Column, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export default class Player extends Model<Player> {

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
