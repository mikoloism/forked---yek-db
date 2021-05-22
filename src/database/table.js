class Table {
	constructor(table, db) {
		this.dbContext = db.context;
		this.dbStream = db.stream;
		this.self = this.use(table);
	}

	dbStore() {
		return this.dbStream.write(this.dbContext);
	}

	/**
	 * table.use
	 * @param {Table | string} table-name
	 * @returns TableObject
	 */
	use(value) {
		if (value instanceof Table) return this;
		if (!Object(this.dbContext.tables).hasOwnProperty(value)) {
			this.dbContext.tables[value] = {};
			this.dbContext.schema[value] = {};
			this.dbContext.records[value] = [];
			this.name = value;
		}
		this.context = {
			meta: this.dbContext.tables[value],
			schema: this.dbContext.schema[value],
			records: this.dbContext.records[value],
		};
		this.records = this.context.records;
		this.schema = this.context.schema;
		this.meta = this.context.meta;
		return this;
	}

	/**
	 * @param {dash-schema} schema
	 */
	define(schema) {
		this.dbContext.schema[this.name] = schema;
		this.dbStore();
		return this;
	}

	/**
	 * @param  {Schema[]} values
	 * @returns self
	 */
	insert(...values) {
		this.context.records.push(...values);
		this.dbStore();
		return this;
	}

	/**
	 * @param {Array<Schema>} values
	 * @returns self
	 */
	insertMany(values) {
		return this.insert(...values);
	}

	/**
	 * @param {Schema} value
	 * @returns self
	 */
	insertOne(value) {
		return this.insert(value);
	}

	find([...fields]) {
		return this.context.records.map((rec) => rec[fields[0]]);
	}
	findLast([...fields]) {}
	findFirst([...fields]) {}
	findAll(...fields) {
		return this.context.records;
	}
	select(...fields) {
		return this.context.records;
		// return CHAIN_SELECT: {from, where}
	}
}

export default Table;
