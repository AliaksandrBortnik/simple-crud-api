const Person = require('../models/person.model');
const { getRequestPayload } = require('../utils/request-body-parser')
const Wrapper = require('../utils/wrapper');

// Route: GET /person
async function getPersons(req, res) {
  try {
    const persons = await Person.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(Wrapper.error('Sorry, something went wrong.'));
  }
}

// Route: GET /person/:id
async function getPerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!person) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(Wrapper.message('Not found.'));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(Wrapper.error('Sorry, something went wrong.'));
  }
}

// Route: POST /person
async function addPerson(req, res) {
  try {
    const body = await getRequestPayload(req);

    if (!Person.isValidModel(body)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(Wrapper.message('Invalid state of model. Check all required properties and their types.'));
      return;
    }

    const personData = {
      name: body.name,
      age: body.age,
      hobbies: body.hobbies
    };

    const person = await Person.add(personData);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(person));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(Wrapper.error('Sorry, something went wrong.'));
  }
}

// Route: PUT /person/:id
async function updatePerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!person) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(Wrapper.message('Not found.'));
    } else {
      const body = await getRequestPayload(req);

      const personData = {
        name: body.name,
        age: body.age,
        hobbies: body.hobbies
      };

      const person = await Person.update(id, personData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(Wrapper.error('Sorry, something went wrong.'));
  }
}

// Route: DELETE /person/:id
async function removePerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!person) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(Wrapper.message('Not found.'));
    } else {
      await Person.remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(Wrapper.error('Sorry, something went wrong.'));
  }
}

module.exports = {
  getPersons,
  getPerson,
  addPerson,
  updatePerson,
  removePerson
}