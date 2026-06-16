import express, { type Application } from "express";
import EnrollmentRepository from "../config/repository/enrollment.repository.js";
import AppDataSource from "../config/db/DataSource.js";
import { Enrollment } from "../config/entities/enrollment.entity.js";
import EnrollmentService from "../config/services/enrollment.service.js";
import EnrollmentController from "../config/controllers/enrollment.controller.js";
const enrollmentRouter: Application = express();

const enrollmentRepository = new EnrollmentRepository(
  AppDataSource.getRepository(Enrollment),
);
const enrollmentService = new EnrollmentService(enrollmentRepository);
const enrollmentController = new EnrollmentController(enrollmentService);

enrollmentRouter
  .get("/enrollment", (req, res) =>
    enrollmentController.findEnrollments(req, res),
  )
  .get("/enrollment/:id", (req, res) =>
    enrollmentController.findEnrollment(req, res),
  )
  .post("/enrollment", (req, res) =>
    enrollmentController.enrollStudent(req, res),
  )
  .put("/enrollment/:id", (req, res) =>
    enrollmentController.editEnroll(req, res),
  )
  .delete("/enrollment/:id", (req, res) =>
    enrollmentController.deleteEnroll(req, res),
  );

export default enrollmentRouter;
