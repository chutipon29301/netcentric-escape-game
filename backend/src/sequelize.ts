import { Sequelize } from "sequelize-typescript";
import { DATABASE_URL } from "./util/secrets";

export const sequelize = new Sequelize({
    logging: false,
    modelPaths: [__dirname + "/models"],
    pool: {
        acquire: 40000,
        evict: 20000,
        idle: 20000,
        max: 5,
        min: 0,
    },
    url: DATABASE_URL,
});

export async function initDatabase() {
    await sequelize.sync({
        alter: true,
    });
}
