import { DataSource } from 'typeorm';
import { getConfig } from '../config/databse';

const datasource = new DataSource(getConfig());

datasource.initialize();

export default datasource;