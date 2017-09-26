### TikiBar-API
==================================


#### TikiBar REST API with ES6 and Express.
- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Automatically expose Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).
- Unit Testing with [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chail)

Getting Started
---------------

```sh
# Install dependencies
npm install

# Start local development live-reload server port 3203:
npm run localdev

# Requests made in the form http://localhost:3203/localdev/v1/endpoint

# To build ES6 code
npm run build-dev

```
