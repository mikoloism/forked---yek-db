import { DashDB, Database } from './../index'; // js-dash-db
const db = new DashDB({
	// one of 'sqlite' | 'csv' | 'local' | 'session' | ...
	type: 'db.json',
	database: './dash-database.db.json',
});

let User = db('user').define({
	id: { type: 'int' },
	name: { type: 'string' },
});
let Shipping = db('shipment').define({
	id: {},
	customer: {
		refrence: 'users' || User,
		field: 'id',
	},
	address: refrence('users' || User).field('id'),
});

// INSERT
// way1
User.insert({}, {});
User.insertMany([{}, {}, {}]);
User.insertOne({});

// way2
db('user').insert({}, {});
db('user').insertMany([{}, {}, {}]);
db('user').insertOne({});

// SELECT/finds
User.find(...fields);
User.findAll('f-1', ['f-2', 'asField-2']);
User.select('field-1', ['field-2', 'asField']); // select with relation
() => ({
	id: 1,
	username: 'username',
	// refrence from shopList.id => new Refrence().table('table2' || Table2).field('id');
	// { refrence: 'table2' || Table2, field: 'id' }
	buys: {},
});
