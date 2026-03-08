import { configDotenv } from "dotenv";
import express from "express";
import pageRoutes from "./routes/pageRoutes.js";
import pg from "pg";

configDotenv();

const app = express();
const port = process.env.APP_PORT;

app.use(express.static("public"));
app.use("/", pageRoutes);

export const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

try {
    db.connect();
    console.log(`The database is running on https://localhost:${db.port}`);
} catch (error) {
    console.log("Something went wrong!", error.stack);
}

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});