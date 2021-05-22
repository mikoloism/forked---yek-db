import { Database, createDatabase } from './database/db.js';
import { Model } from './database/model.js';
import { refrence } from './database/refrence.js';
import DataType from './database/data-types.js';

const DashDB = Database;

export { DashDB, Database, createDatabase, refrence, Model, DataType };
