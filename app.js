import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
/** import router */
import eraporRouter from "./router/e-raporRouter.js";

/** set-up */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

/** middleware */
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", eraporRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
