import { Sequelize } from "sequelize-typescript";
import { DATABASE_URL } from "./util/secrets";

export const sequelize = new Sequelize({
    modelPaths: [__dirname + "/models"],
    url: DATABASE_URL,
});

export async function initDatabase() {
    await sequelize.sync({
        alter: true,
    });
}
