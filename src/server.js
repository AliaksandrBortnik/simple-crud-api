const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const server = http.createServer();
const PORT = process.env.PORT;

const { getPersons, getPerson, removePerson, updatePerson, addPerson } = require('./controllers/person.controller');

const endsWithUuid = (url) => url.match(/\/person\/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
const getIdFromUrl = (url) => url.split('/').pop();

server.on('request', (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url.match(/^\/person$/)) {
        getPersons(req, res);
      } else if (endsWithUuid(req.url)) {
        const id = getIdFromUrl(req.url);
        getPerson(req, res, id);
      }
    } else if (req.method === 'POST' && req.url.match(/^\/person$/)) {
      addPerson(req, res);
    } else if (req.method === 'PUT' && endsWithUuid(req.url)) {
      const id = getIdFromUrl(req.url);
      updatePerson(req, res, id);
    } else if (req.method === 'DELETE' && endsWithUuid(req.url)) {
      const id = getIdFromUrl(req.url);
      removePerson(req, res, id);
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end('Not supported HTTP verb');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end('Sorry, something went wrong');
  }
});

server.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});


// TODO: Requests to non-existing endpoints (e.g. /some-non/existing/resource) should be handled. Return 404 status
// {
//   message: "Resource that you requested doesn't exist"
// }


// TODO: Internal server errors should be handled and processed correctly. Return 500 status
// Something went wrong

// TODO: if invalid ID passed for GET, show 400 and message
// Invalid data in request

// TODO: support path /person

// TODO: GET /person or /person/${personId} should return all persons or person with corresponding personId

// TODO: POST /person is used to create record about new person and store it in database
// 201 status Created

// TODO: PUT /person/${personId} is used to update record about existing person

// TODO: DELETE /person/${personId} is used to delete record about existing person from database
// Response 204 status, empty body




