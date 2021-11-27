const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const server = http.createServer();
const PORT = process.env.PORT;

console.log('Starting API...');
const db = require('./src/db');

const getRouter = require('./get');
const postRouter = require('./post');
const putRouter = require('./put');
const deleteRouter = require('./delete');

server.on('request', (request, response) => {
  request.persons = db;
  
  switch (request.method) {
    case 'GET':
      getRouter(request, response);
      break;
    case 'POST':
      postRouter(request, response);
      break;
    case 'PUT':
      putRouter(request, response);
      break;
    case 'DELETE':
      deleteRouter(request, response);
      break;
    default:
      response.statusCode = 400;
      response.write('Not supported HTTP verb');
      response.end();
  }
});

server.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Listening requests on port: ${PORT}`);
  }
});