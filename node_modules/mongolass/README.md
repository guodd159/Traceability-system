## Mongolass

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Elegant MongoDB driver for Node.js.

## Installation

```
$ npm i mongolass --save
```

## Introduction

Just like mongoose:

```
'use strict';

const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/test');// const mongolass = new Mongolass('mongodb://localhost:27017/test');

const User = mongolass.model('User');

User
  .find()
  .select({ name: 1, age: 1 })
  .sort({ name: -1 })
  .exec()
  .then(console.log)
  .catch(console.error);
```

or use optional schema:

```
'use strict';

const Mongolass = require('mongolass');
const Schema = Mongolass.Schema;
const mongolass = new Mongolass('mongodb://localhost:27017/test');

const UserSchema = new Schema('UserSchema', {
  name: { type: 'string' },
  age: { type: 'number' }
});
const User = mongolass.model('User', UserSchema);

/*
equal to:
const User = mongolass.model('User', {
  name: { type: 'string' },
  age: { type: 'number' }
});
will create inner schema named `UserSchema`.
 */

User
  .insertOne({ name: 'nswbmw', age: 'wrong age' })
  .exec()
  .then(console.log)
  .catch(function (e) {
    console.error(e);
    console.error(e.stack);
  });
/*
{ [Error: ($.age: "wrong age") ✖ (type: number)]
  validator: 'type',
  actual: 'wrong age',
  expected: { type: 'number' },
  path: '$.age',
  schema: 'UserSchema',
  model: 'User',
  plugin: 'MongolassSchema',
  type: 'beforeInsertOne',
  args: [] }
Error
    at Model.insertOne (/Users/nswbmw/Desktop/mongolass-demo/node_modules/mongolass/lib/query.js:107:16)
    at Object.<anonymous> (/Users/nswbmw/Desktop/mongolass-demo/app.js:23:4)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:974:3
 */
```

ObjectId schema:

```
'use strict';

const Mongolass = require('mongolass');
const Schema = Mongolass.Schema;
const mongolass = new Mongolass('mongodb://localhost:27017/test');

const Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId },
});

Post.insertOne({ author: '111111111111111111111111' })
  .then(function () {
    return Post.find({ author: '111111111111111111111111' });
  })
  .then(console.log);
/*
[ { _id: 57caed24ecda6ffb15962591,
    author: 111111111111111111111111 } ]
 */
```

<!-- ## Why i hate Mongoose -->
<!-- ## Why i don't like node-mongodb-native -->
## What about Mongolass

Mongolass retains the api of [node-mongodb-native](https://github.com/mongodb/node-mongodb-native), and draws useful features of mongoose. Compared with node-mongodb-native, Mongolass has following three features:

1. Elegant connection. eg:

    **mongodb**

    ```
    MongoClient.connect(..., function(err, db) {
      db.listCollections()
    })
    ```
    **Mongolass**

    ```
    mongolass.connect(...)
    mongolass.listCollections()
    ```

2. Optional schema, used for validating and formatting parameters before query or update.
3. Awesome plugin system. eg: `beforeInsert`, `afterFind` and so on. You can define custom plugins.
4. Detailed error information.

## Schema

see [another-json-schema](https://github.com/nswbmw/another-json-schema).

## Built-in plugins

Mongolass has some built-in plugins, only for `find` and `findOne`.

- [limit](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [sort](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [fields(alias: select)](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [skip](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [hint](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [populate]()
- [explain](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [snapshot](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [timeout](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [tailable](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [tailableRetryInterval](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [numberOfRetries](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [awaitdata](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [oplogReplay](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [exhaust](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [batchSize](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [returnKey](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [maxScan](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [min](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [max](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [showDiskLoc](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [comment](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [raw](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [readPreference](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [partial](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)
- [maxTimeMS](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne)

#### Register plugin

```
mongolass.plugin(pluginName, hooks);// register global plugin
User.plugin(pluginName, hooks);// register model plugin
```

examples:

```
User.plugin('mw2', {
  beforeInsert: function (...args) {
  },
  afterFind: function* (result, ...args) {
    console.log(result, args);
    ...
  }
});

mongolass.plugin('mw1', {
  beforeFind: function (...args) {
    console.log(ctx._op);
    console.log(ctx._args);
    console.log(args);
    ...
  }
});

yield User.find().mw1().mw2().exec()// equal: yield User.find().mw1().mw2()
User.find().mw2().mw1().exec().then(...).catch(...)
User.find().mw1().mw2().exec(function (err, res) {
  console.log(err, res)
})
```

**NOTE**: Different order of calling plugins will output different results.

see [mongolass-plugin-populate](https://github.com/mongolass/mongolass-plugin-populate).

## Test

```
$ npm test (coverage 100%)
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/mongolass.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mongolass
[travis-image]: https://img.shields.io/travis/mongolass/mongolass.svg?style=flat-square
[travis-url]: https://travis-ci.org/mongolass/mongolass
[david-image]: http://img.shields.io/david/mongolass/mongolass.svg?style=flat-square
[david-url]: https://david-dm.org/mongolass/mongolass
[license-image]: http://img.shields.io/npm/l/mongolass.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/mongolass.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/mongolass
