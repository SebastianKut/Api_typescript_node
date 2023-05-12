import * as env from 'dotenv';
const envVariable = env.config();
import 'reflect-metadata'; //this is needed for TypeORM so it works properly
import { COURSES } from './db-data';
import { AppDataSource } from '../data-source';
import { Course } from './course';
import { DeepPartial } from 'typeorm';
import { Lesson } from './lesson';

const populateDb = async () => {
  await AppDataSource.initialize();
  console.log('Database connection ready');

  const coursesData = Object.values(COURSES) as DeepPartial<Course>[]; //This means its array of type Course that doesnt have to contain all properties of that object. DeepPartial comes from typeORM and its just an improve version of Partial

  // We need repository as we use data mapper pattern which means that Course model doesnt have any methods of interacting with DB and for that data repository is needed
  const courseRepository = AppDataSource.getRepository(Course);
  const lessonRepository = AppDataSource.getRepository(Lesson);

  for (let singleCourseData of coursesData) {
    console.log(`Inserting course ${singleCourseData.title}`);

    const course = courseRepository.create(singleCourseData);

    await courseRepository.save(course);

    for (let singleLessonData of singleCourseData.lessons) {
      console.log(`Inserting lesson ${singleLessonData.title}`);

      const lesson = lessonRepository.create(singleLessonData);

      // This is whats pointing lesson to the right course givin lesson correct forein key
      lesson.course = course;

      await lessonRepository.save(lesson);
    }
  }

  const totalCourses = await courseRepository.createQueryBuilder().getCount();
  const totalLessons = await lessonRepository.createQueryBuilder().getCount();

  console.log(
    `Data inserted - courses: ${totalCourses}, lessons: ${totalLessons}`
  );
};

populateDb()
  .then(() => {
    console.log('Finished populating Database');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error populating Database', err);
  });
