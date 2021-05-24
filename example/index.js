const { Database, DataType, refrence } = require('@dash-js/dash-db/index');

// 1. create connection
const db = new Database({
	type: 'jdb',
	path: './blog.jdb',
	name: 'db_blog',
}).db;

// 2. create models/collection/tables

const User = db('user').define({
	id: DataTypes.ID,
	username: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, primaryKey: true },
	name: {
		type: DataTypes.OBJECT,
		props: {
			'last-name': { type: DataTypes.STRING },
			'first-name': { type: DataTypes.STRING },
		},
	},
	'join-at': {
		type: DataTypes.DATE.YEAR.FULL,
		default: new Date().getFullYear(),
	},
});

// DEPRECATED => `extends`
const Author = db('author')
	.extends(User || 'user')
	.define({
		'user-type': {
			type: DataTypes.ENUM(['admin', 'author', 'contributor', 'reader']),
			defualt: 'author',
		},
	});

// instead use
const Author = db('author').define({
	...User.context.schema,
	'user-type': {
		type: DataTypes.ENUM(['admin', 'author', 'contributor', 'reader']),
		default: 1,
	},
});

const Post = db('post').define({
	id: { type: DataType.INTEGER, AUTO_INCREMENT: true, PRIMARY_KEY: true },
	title: { type: DataType.STRING },
	isPublished: { type: DataType.BOOL, defualt: false },
	date: {
		type: DataType.OBJECT,
		props: {
			'edited-at': { type: DataType.TIMEDATE },
			'published-at': { type: DataType.TIMEDATE },
		},
	},
	'author-id': {
		type: DataType.INTEGER,
		refrence: refrence(Author || 'author').field('id'),
	},
});

const ForDrop = db('for-drop').define({
	id: { type: DataType.ID },
	date: { type: DataType.Date, defualt: MetaData.date.current },
});

// 3. insert into
let created_user = User.insert({
	name: { 'last-name': 'Doe', 'first-name': 'John' },
	username: 'j-deo',
	email: 'j-deo@gmail.com',
});

let created_author = db('author').insert({
	'user-type': 'author',
	name: { 'last-name': 'Doe', 'first-name': 'Magi' },
	usename: 'magi1234',
	email: 'magi1234@gmail.com',
});

// 4. drop collection/table/entity

// Async/Await
await db('for-drop').drop();
// Promise
db('for-drop')
	.drop()
	.then(() => log('droped'))
	.catch((err) => {
		throw err;
	});

await ForDrop.drop();
