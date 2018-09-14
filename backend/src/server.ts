import { createServer } from "http";
import app from "./app";
import { Sockets } from "./controllers/socket";
import { SocketGenerator } from "./socket";
import logger from "./util/logger";

export const server = createServer(app);

server.listen(app.get("port"), () => {
    logger.info(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    logger.info("  Press CTRL-C to stop\n");
});

SocketGenerator.getInstance().setServer(server);
Sockets.getInstance().init();
