import { configDotenv } from "dotenv";
import express from "express";
import pageRoutes from "./routes/pageRoutes.js";
import "./db.js";
import session from "express-session";

configDotenv();

const app = express();
const port = process.env.APP_PORT;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // prod: true (https)
  }
}));

app.use("/", pageRoutes);

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});