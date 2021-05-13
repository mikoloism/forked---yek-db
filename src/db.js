import json from './utils/json';
import initalize from './utils/initalize-db';

class Database {
	constructor({ type = 'jobdb', database = './db-directory' }) {
		this.type = type;
		this.databasePath = database;
		this.database = json(this.databasePath);
	}
}

export { Database };
