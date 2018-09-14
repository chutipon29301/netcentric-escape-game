import dotenv from "dotenv";

dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const prod = ENVIRONMENT === "production"; // Anything else is treated as "development"
export const DATABASE_URL = process.env.DATABASE_URL;
