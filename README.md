# 📔 dash-database

[![build](https://github.com/dash-js/dash-db/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/dash-js/dash-db/actions/workflows/npm-publish.yml)
[![npm version](https://badge.fury.io/js/%40dash-js%2Fdash-db.svg)](https://badge.fury.io/js/%40dash-js%2Fdash-db)
![package version](https://img.shields.io/github/package-json/v/dash-js/dash-db)
![mit license](https://img.shields.io/github/license/dash-js/dash-db)

[ **local** | **flat-file** | **single-file** | **memory** ] management system

| database-type  | support-node | support-browser |
| -------------- | ------------ | --------------- |
| JDB            | ✔️           | ✔️              |
| SQLite3        | ✔️           | ✔️              |
| JSOF           | ✔️           | ✖️              |
| JSON           | ✔️           | ✔️              |
| YAML           | ✔️           | ✖️              |
| XML            | ✔️           | ✖️              |
| CSV            | ✔️           | ✖️              |
| YAML           | ✔️           | ✖️              |
| LocalStorage   | ✔️           | ✔️              |
| SessionStorage | ✔️           | ✔️              |
| Clipboard      | ✔️           | ✔️              |
| IndexedDB      | ✔️           | ✔️              |
| webSQL         | ✔️           | ✔️              |

### create connection

```javascript
import { DashDB, Database, createDatabase } from 'dash-db';

const options = {
    // one of 'sqlite' | *'jdb' | 'csv' | 'local' | 'session' | ...
    type: 'jdb',

    // if file exist, write/update, else create new
    // also we can use '::memory::' for store in memory
    database: './my-database-name.jdb',
};

// create connection with Database class
const db = new Database(options).db;

// create connection with DashDB class
const db = new DashDB(options).db;

// create connection with createDatabase function
const db = createDatabase(options);

// TIPS : we can export db function
export default db;

// OR use them
db('table-name');
```

### create table/collection model

-   define method

> NOTE : each table should have the uniquie field(e.g. `id` or `_id`)
> NOTE : uniquie field define with `PRIMARY_KEY` attribute
> TIPS : can default `id` attributes with `DataType.ID`

```javascript
import { DataType } from 'dash-db';
import db from './connection';

// TIPS: import schemaMeta then use without any boolean value
//  let { AUTO_INCREMENT } = schemaMeta;
//  that, automaticly, save schema alike `AUTO_INCREMENT: AUTO_INCREMENT`
//  what is `AUTO_INCREMENT` value? `true`
//  actually is, `AUTO_INCREMENT: true`

// define methods
let User = db('user').define({
    id: {
        type: DataType.INTEGER,
        AUTO_INCREMENT: true, // * READ ABOVE TIPS
        PRIMARY_KEY: true,
    },
    username: {
        type: DataType.STRING,
        length: { max: 255 },
    },
});
```

-   function

```javascript
const User = db('user').init();
// now you can use `User` as Model
// OR export
export default User;
```

-   createModel

```javascript
import { createModel } from 'dash-db';

const User = createModel('user', UserSchema);

export default User;
```

### Operations

#### INSERT INTO

-   inserting with model

```javascript
import User from './models/user.model.js';

// id field/column added automaticlly

// INSERT MANY ITEMS
User.insert({ username: 'john' }, { username: 'jim' });
User.insertMany([{ username: 'john' }, { username: 'jim' }]);

// INSERT SINGLE AT TIME
User.insertOne({ username: 'john' });
User.insertOne({ username: 'jim' });
```

-   inserting with connection function

```javascript
import db from './connection.js';

// INSERT MANY ITEMS
db('user').insert({ username: 'john' }, { username: 'jim' });
db('user').insertMany([{ username: 'john' }, { username: 'jim' }]);

// INSERT SINGLE AT TIME
db('user').insertOne({ username: 'john' });
db('user').insertOne({ username: 'jim' });
```

#### SELECT/FIND

```javascript
import User from './models/user.model.js';

// MongoDB: as same
// SQL : `SELECT username FROM user;`
User.find(['username']);

// SQL : `SELECT id, username as NameOfUser FROM user;`
User.findAll('id', ['username', 'NameOfUser']);

// NOTE : this method work with relations/refrences
// SQL : `SELECT id, username as NameOfUser FROM user;`
User.select(['id', 'row-id'], 'username');
```

### relation/refrence

-   in schema/define

```javascript
import { refrence } from 'dash-db';
import Author from './models/author.model.js';

const Book = db('book').define({
    id: {},
    author_id: {
        // 'author' | Author
        refrence: Author,
        field: 'id',
    },
    publisher_id: refrence('publisher').field('id'),
});

export default Book;
```

-   many refrence

```javascript
const ShopList = {
    ...,
    shopItems: {
        refrence: 'shop-items',
        which: { id: { eq: this.id } },
        field: 'id',
    },
    ...,
};
```

-   Array

```javascript
const Book = db('book').define({
    ...,
    author_id: {
        type: Types.ARRAY,
        length: { max: 2 },
        schema: {
            type: Types.REFRENCE
            from: 'author',
            field: 'id'
        }
    }
    ...,
});
```

-   usage

```javascript
Book.insert({
    // Authors with id 45 and 93
    author_id: [45, 93],
});
```
