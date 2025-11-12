import 'reflect-metadata';
import { DataSource } from 'typeorm';
import typeOrmConfig from './database.orm';

export const AppDataSource = new DataSource(typeOrmConfig);