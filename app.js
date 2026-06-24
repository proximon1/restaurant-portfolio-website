import { configDotenv } from "dotenv";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import pageRoutes from "./routes/pageRoutes.js";
import "./db.js";

configDotenv();

const app = express();
const port = process.env.APP_PORT;

app.set("view engine", "ejs");
app.set("layout", false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.static("public"));
app.use(expressLayouts);
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", pageRoutes);

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});