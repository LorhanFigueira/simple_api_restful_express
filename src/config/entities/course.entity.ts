import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string; // Minimo de 3 Letras
  @Column()
  category?: string;
  @Column()
  description?: string;
  @CreateDateColumn()
  createdAt!: Date;
}
