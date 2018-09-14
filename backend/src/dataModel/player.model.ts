import { Column, Model, Table } from "sequelize-typescript";

@Table
export default class Player extends Model<Player> {

    @Column({
        allowNull: false,
        primaryKey: true,
    })
    public email: string;

    @Column({
        allowNull: false,
    })
    public password: string;

    @Column({
        defaultValue: 0,
    })
    public win: number;

    @Column({
        defaultValue: 0,
    })
    public lose: number;

}
