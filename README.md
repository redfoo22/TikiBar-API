### TikiBar-API
==================================

This will checkout a static version of the model repo. It will not
automatically receive updates if the model repo is updated. In order to update
the model submodule, it is necessary to run the following:

* From the top level directory in terminal, do
`git submodule update --recursive --remote`.

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

# Start local development live-reload server port 3003:
npm run localdev

# Requests made in the form http://localhost:3003/localdev/v1/endpoint

# To build ES6 code
npm run build-dev

```

#### Other startup scripts are for running with pm2 on the live server.

* /dev (request form https://api.devslopes.com/dev/v1/endpoint)
* /staging (request form https://api.devslopes.com/staging/v1/endpoint)
* /production (request form https://api.devslopes.com/v1/endpoint)
