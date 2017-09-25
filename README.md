### TikiBar-API
==================================

This will checkout a static version of the model repo. It will not
automatically receive updates if the model repo is updated. In order to update
the model submodule, it is necessary to run the following:

* From the top level directory in terminal, do
`git submodule update --recursive --remote`.

#### TikiBar REST API with ES6 and Express.


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
