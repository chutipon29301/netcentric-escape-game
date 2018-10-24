import { createServer } from "http";
import app from "./app";
import { Sockets } from "./controllers/socket";
import { SocketGenerator } from "./model/socket/SocketGenerator";
import { initDatabase } from "./sequelize";
import logger from "./util/logger";

initDatabase().then((_) => {
    logger.info(`Database initialize`);
});

export const server = createServer(app);

server.listen(app.get("port"), () => {
    logger.info(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    logger.info("  Press CTRL-C to stop\n");
});

SocketGenerator.getInstance().setHttpServer(server);
Sockets.init();
