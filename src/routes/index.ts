import express from "express";
import healthRouter from "./health.route.js";
import studentRouter from "./student.route.js";
import enrollmentRouter from "./enrollment.route.js";
import courseRouter from "./course.route.js";

const Router = (app: express.Router) => {
  app.use("/", healthRouter);
  app.use("/", studentRouter);
  app.use("/", enrollmentRouter);
  app.use("/", courseRouter);
};

export default Router;
