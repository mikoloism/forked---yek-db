import files from '../utils/files';
import byter from '../utils/byter';
import Table from './table.js';

const DATABASE = {
	database: {
		type: '$DB_TYPE',
		name: '$DB_NAME',
		path: '$DB_PATH',
		version: '$DB_VERSION',
	},
	tables: {},
	schema: {},
	records: {},
};

const db_stream = (database) => {
	let file = files(database);
	return {
		write(data) {
			file.write(byter(data).encode());
			return file;
		},
		read() {
			let encoded = file.read();
			let decoded = byter(encoded).decode();
			return { encoded, decoded };
		},
		file,
	};
};

const connect = ({ type = 'jdb', path, name }) => {
	let db = db_stream(path);
	if (!db.file.isExists()) db.write(DATABASE);
	let { encoded: db_encoded, decoded: db_decoded } = db.read();
	return {
		db_name: name,
		db_type: type,
		db_path: `./.temp.${type}`,
		database: { db_encoded, db_decoded },
		db_file: db.file,
		stream: db,
	};
};

class Database {
	constructor({ type = 'jdb', path, name }) {
		let {
			db_name,
			db_path,
			db_type,
			database: { db_encoded, db_decoded },
			db_file,
			stream,
		} = connect({ type, path, name });

		this.stream = stream;

		this.meta = {};
		this.meta.type = db_type;
		this.meta.name = db_name;
		this.meta.path = db_path;
		this.meta.file = db_file;

		this.context = {
			tables: {},
			schema: {},
			records: {},
			...db_decoded,
		};

		this.db = this.db.bind(this);
	}

	fix() {
		this.context.database.name = this.meta.name;
		this.context.database.path = this.meta.path;
		this.context.type = this.meta.type;
		// if (!this.file.isExists()) {
		// 	this.file.write(byter(DATABASE).encode());
		// }
		// let EncodedDatabase = this.file.read();
		// let database = byter(EncodedDatabase).decode();
		// if (Object(database).hasOwnProperty('database')) return database;
		// this.file.write(byter(DATABASE).encode());
		// return byter(this.file.read());
	}

	db(TableName) {
		let self = this;
		return new Table(TableName, self);
	}
}

export { Database };
export function createDatabase(options) {
	const db = new Database(options).db;
}
