# restful-mongoose [![NPM Version](http://img.shields.io/npm/v/restful-mongoose.svg?style=flat)](https://npmjs.com/package/restful-mongoose)

> Expose Mongoose models as RESTful Express resources.


## Installation

Available on [npm](https://npmjs.com/package/restful-mongoose):

```sh
npm install restful-mongoose
```


## Usage

```js
import restfulMongoose from 'restful-mongoose';

// any mongoose Model:
import Foo from '../models/foo';

// create and export a Router, mount it anywhere via .use()
export default restfulMongoose('foo', Foo);
```
