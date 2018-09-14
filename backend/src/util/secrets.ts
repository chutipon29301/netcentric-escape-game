import dotenv from "dotenv";
import { existsSync } from "fs";
import logger from "./logger";

if (!existsSync(".env")) {
    logger.info(".env file not found. Create one using .env.example");
}

dotenv.config();

if (!process.env.NODE_ENV) {
    logger.info("Node environment not found, use \"dev\" environment as default");
}

export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const prod = ENVIRONMENT === "production"; // Anything else is treated as "dev"
