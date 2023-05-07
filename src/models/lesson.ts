import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from './course';

@Entity({
  name: 'LESSONS',
})
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  seqNo: number;

  @ManyToOne(() => Course, (course) => course.lessons) //takes 2 functions as arguments, first returns model of the relationship, second returns property linked to self on the other entity
  @JoinColumn({
    name: 'courseId', //specifies foreignId - this will be the column in the database
  })
  course: Course; // this property will return courseId i believe lessonInstace.course => courseId

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
