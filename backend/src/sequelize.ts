import { Sequelize } from "sequelize-typescript";
import Player from "./dataModel/player.model";
import { DATABASE_URL } from "./util/secrets";

export const sequelize = new Sequelize(DATABASE_URL);
sequelize.options.logging = false;

export async function initDatabase() {

    sequelize.addModels([
        Player,
    ]);

    await sequelize.sync();

}
