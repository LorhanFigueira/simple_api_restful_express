import express, { type Application } from "express";
import CourseRepository from "../config/repository/course.repository.js";
import AppDataSource from "../config/db/DataSource.js";
import { Course } from "../config/entities/course.entity.js";
import CourseService from "../config/services/course.service.js";
import CourseController from "../config/controllers/course.controller.js";
const courseRouter: Application = express();

const courseRepository = new CourseRepository(
  AppDataSource.getRepository(Course),
);
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

courseRouter
  .get("/course", (req, res) => courseController.getCourses(req, res))
  .get("/course/:id", (req, res) => courseController.getCourse(req, res))
  .post("/course", (req, res) => courseController.createCourse(req, res))
  .put("/course/:id", (req, res) => courseController.editCourse(req, res))
  .delete("/course/:id", (req, res) => courseController.deleteCourse(req, res));

export default courseRouter;
