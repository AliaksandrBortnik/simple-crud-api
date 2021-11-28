require('dotenv').config();

const PersonController = require('./controllers/person.controller');
const { notFound, notSupportedVerb } = require('./services/response-writer');
const { getId, endsWithId } = require('./utils/url-parser');

const http = require('http');
const server = http.createServer();
const PORT = process.env.PORT;

server.on('request', (req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url.match(/^\/person$/)) {
        PersonController.getAll(req, res);
      } else if (endsWithId(req.url)) {
        PersonController.get(req, res, getId(req.url));
      } else {
        notFound(res);
      }
      break;
    case 'POST':
      if (req.url.match(/^\/person$/)) {
        PersonController.add(req, res);
      } else {
        notFound(res);
      }
      break;
    case 'PUT':
      if (endsWithId(req.url)) {
        PersonController.update(req, res, getId(req.url));
      } else {
        notFound(res);
      }
      break;
    case 'DELETE':
      if (endsWithId(req.url)) {
        PersonController.remove(req, res, getId(req.url));
      } else {
        notFound(res);
      }
      break;
    default:
      notSupportedVerb(res);
  }
});

server.listen(PORT, err => {
  if (!err) console.log(`Server is running on port: ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 3000);
  }
})

process.on('uncaughtException', (error) => {
  if (error) {
    // Log an error and exit gracefully
    console.error(`Error: faced unexpected issue.\n${error.message}`);
    process.exit(1);
  }
});

module.exports = server;