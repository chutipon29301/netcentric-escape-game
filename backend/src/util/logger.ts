import { createLogger, format, transports } from "winston";
import { prod } from "./secrets";

const logger = createLogger({
    transports: [
        new (transports.Console)({
            format: format.simple(),
            level: prod ? "error" : "debug",
        }),
    ],
});

if (!prod) {
    logger.debug("Logging initialized at debug level");
}

export default logger;
