const Person = require('../models/person.model');
const { getRequestPayload } = require('../utils/request-body-parser');
const { isValidId } = require('../utils/uuid-validator');
const {
  OK,
  created,
  noContent,
  invalidIdFormat,
  notFound,
  internalError,
  missingRequiredProp
} = require('../services/response-writer');

// Route: GET /person
async function getPersons(req, res) {
  try {
    const persons = await Person.findAll();
    OK(res, JSON.stringify(persons));
  } catch (error) {
    internalError(res);
  }
}

// Route: GET /person/:id
async function getPerson(req, res, id) {
  try {
    if (!isValidId(id)) {
      invalidIdFormat(res);
      return;
    }

    const person = await Person.findById(id);

    if (!person) {
      notFound(res);
      return;
    }

    OK(res, JSON.stringify(person));
  } catch (error) {
    internalError(res);
  }
}

// Route: POST /person
async function addPerson(req, res) {
  try {
    const body = await getRequestPayload(req);

    if (!Person.isValidModel(body)) {
      missingRequiredProp(res);
      return;
    }

    const personData = {
      name: body.name,
      age: body.age,
      hobbies: body.hobbies
    };

    const person = await Person.add(personData);
    created(res, JSON.stringify(person));
  } catch (error) {
    internalError(res);
  }
}

// Route: PUT /person/:id
async function updatePerson(req, res, id) {
  try {
    if (!isValidId(id)) {
      invalidIdFormat(res);
      return;
    }

    const person = await Person.findById(id);

    if (!person) {
      notFound(res);
      return;
    }

    const body = await getRequestPayload(req);
    const personData = {
      name: body.name || person.name,
      age: body.age || person.age,
      hobbies: body.hobbies || person.hobbies
    };

    const updatedPerson = await Person.update(id, personData);
    OK(res, JSON.stringify(updatedPerson));
  } catch (error) {
    internalError(res);
  }
}

// Route: DELETE /person/:id
async function removePerson(req, res, id) {
  try {
    if (!isValidId(id)) {
      invalidIdFormat(res);
      return;
    }

    const person = await Person.findById(id);

    if (!person) {
      notFound(res);
      return;
    }

    await Person.remove(id);
    noContent(res);
  } catch (error) {
    internalError(res);
  }
}

module.exports = {
  getPersons,
  getPerson,
  addPerson,
  updatePerson,
  removePerson
}