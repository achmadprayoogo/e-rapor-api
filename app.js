import express, { application } from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

/** import router */
// import userRouter from "./routers/userRouter.js";
// import adminRouter from "./routers/adminRouter.js";
import studentRouter from "./routers/studentRouter.js";
import academicYearRouter from "./routers/academicYearRouter.js";
import quarterAcademicYearRouter from "./routers/quarterAcademicYearRouter.js";
import gradeClassRouter from "./routers/gradeClassRouter.js";
import classNameRouter from "./routers/classNameRouter.js";
import classMemberRouter from "./routers/classMemberRouter.js";
import subjectRouter from "./routers/subjectRouter.js";
import studentStatusRouter from "./routers/studentStatusRouter.js";
import scoreRouter from "./routers/scoreRouter.js";
import errorHandler from "./Errors/errorHandler.js";

/** set-up */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

/** middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/", userRouter);
// app.use("/", adminRouter);
app.use("/", studentRouter);
app.use("/", academicYearRouter);
app.use("/", quarterAcademicYearRouter);
app.use("/", gradeClassRouter);
app.use("/", classNameRouter);
app.use("/", classMemberRouter);
app.use("/", subjectRouter);
app.use("/", studentStatusRouter);
app.use("/", scoreRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
