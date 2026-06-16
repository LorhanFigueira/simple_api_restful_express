import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./student.entity.js";
import { Course } from "./course.entity.js";

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;
  @ManyToOne(() => Student, {onDelete:  'CASCADE'})
  @JoinColumn({ name: "studentId" })
  student!: Student;
  @ManyToOne(() => Course)
  @JoinColumn({ name: "courseId" })
  course!: Course;
  @CreateDateColumn()
  createdAt!: Date;

}
