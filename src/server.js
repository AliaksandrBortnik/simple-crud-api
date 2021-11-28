require('dotenv').config();

const http = require('http');
const server = http.createServer();
const PORT = process.env.PORT;

const PersonController = require('./controllers/person.controller');
const { notFound, notSupportedVerb } = require('./utils/response-helper');

const endsWithUuid = (url) => url.match(/\/person\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
const getId = (url) => url.split('/').pop();

server.on('request', (req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url.match(/^\/person$/)) {
        PersonController.getPersons(req, res);
      } else if (endsWithUuid(req.url)) {
        PersonController.getPerson(req, res, getId(req.url));
      } else {
        notFound(res);
      }
      break;
    case 'POST':
      if (req.url.match(/^\/person$/)) {
        PersonController.addPerson(req, res);
      } else {
        notFound(res);
      }
      break;
    case 'PUT':
      if (endsWithUuid(req.url)) {
        PersonController.updatePerson(req, res, getId(req.url));
      } else {
        notFound(res);
      }
      break;
    case 'DELETE':
      if (endsWithUuid(req.url)) {
        PersonController.removePerson(req, res, getId(req.url));
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