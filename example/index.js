const { Database, DataType } = require('./../build/index');

// 1. create connection
const db = new Database({
	type: 'jdb',
	path: './blog.jdb',
	name: 'db_blog',
}).db;

// 2. create models/collection/tables
const Post = db('post');
