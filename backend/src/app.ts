import { json } from "body-parser";
import express, { urlencoded } from "express";
import expressValidator from "express-validator";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";
import { router } from "./controllers/router";
import logger from "./util/logger";

const app = express();

// Set running port form environment
app.set("port", 3000);

// Set view engine to pug
// app.set("views", join(__dirname, "../views"));
// app.set("view engine", "pug");

// Static file
app.use(express.static(join(__dirname, "../public")));
app.use("/debug", express.static(join(__dirname, "../debug")));

// Middleware for secure server
app.use(helmet());

// Decode middleware body from client
app.use(json());
app.use(urlencoded({ extended: true }));

// Middleware used to validate request
app.use(expressValidator());

// Logger for express
app.use(
    morgan("dev", {
        stream: {
            write(text: string) {
                logger.info(text);
            },
        },
    }),
);

app.use((req, res, next) => {
    // Allow access from other domain
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, authorization",
    );
    next();
});

app.use(router);

export default app;
