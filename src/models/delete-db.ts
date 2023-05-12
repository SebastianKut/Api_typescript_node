import * as env from 'dotenv';
const envVariable = env.config();
import 'reflect-metadata'; //this is needed for TypeORM so it works properly
import { AppDataSource } from '../data-source';
import { Lesson } from './lesson';
import { Course } from './course';

const deleteDb = async () => {
  await AppDataSource.initialize();
  console.log('Database connection ready');

  // Because lessons are linked to Courses we have to delete lessons first
  await AppDataSource.getRepository(Lesson).delete({}); //passing empty object will make delete all records
  await AppDataSource.getRepository(Course).delete({});
};

deleteDb()
  .then(() => {
    console.log('Finished deleting Database');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error deleting Database', err);
  });
