import { DataSource } from 'typeorm';
import './env.config';
import { typeOrmConfig } from './typeorm.config';

export default new DataSource(typeOrmConfig);
