const Person = require('../models/person.model');
const { getRequestPayload } = require('../utils/request-body-parser')

// Route: GET /person
async function getPersons(req, res) {
  try {
    const persons = await Person.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
}

// Route: GET /person/:id
async function getPerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!person) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    }
  } catch (error) {
    console.log(error);
  }
}

// Route: POST /person
async function addPerson(req, res) {
  try {
    const body = await getRequestPayload(req);

    if (!Person.isValidModel(body)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Invalid state of model. Check all required properties and their types');
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
    console.log(error);
  }
}

// Route: PUT /person/:id
async function updatePerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!person) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('Not found');
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
    console.log(error);
  }
}

// Route: DELETE /person/:id
async function removePerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if (!person) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('Not found');
    } else {
      await Person.remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPersons,
  getPerson,
  addPerson,
  updatePerson,
  removePerson
}