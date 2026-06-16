import express, { type Application } from "express";
import StudentRepository from "../config/repository/student.repository.js";
import AppDataSource from "../config/db/DataSource.js";
import { Student } from "../config/entities/student.entity.js";
import StudentService from "../config/services/student.service.js";
import StudentController from "../config/controllers/student.controller.js";
const studentRouter: Application = express();

const studentRepository = new StudentRepository(
  AppDataSource.getRepository(Student),
);
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

studentRouter
  .get("/student", (req, res) => studentController.getStudents(req, res))
  .get("/student/:id", (req, res) => studentController.getStudent(req, res))
  .post("/student", (req, res) => studentController.createStudent(req, res))
  .put("/student/:id", (req, res) => studentController.editStudent(req, res))
  .delete("/student/:id", (req, res) =>
    studentController.deleteStudent(req, res),
  );

export default studentRouter;
