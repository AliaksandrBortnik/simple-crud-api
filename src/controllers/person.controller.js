const PersonRepo = require('../repositories/person.repository');
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
  invalidRequiredProp
} = require('../services/response-writer');

// Route: GET /person
async function getAll(req, res) {
  try {
    const persons = await PersonRepo.findAll();
    OK(res, JSON.stringify(persons));
  } catch (error) {
    internalError(res);
  }
}

// Route: GET /person/:id
async function get(req, res, id) {
  try {
    if (!isValidId(id)) {
      invalidIdFormat(res);
      return;
    }

    const person = await PersonRepo.findById(id);

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
async function add(req, res) {
  try {
    const body = await getRequestPayload(req);

    if (!Person.hasAllRequiredProps(body) ||
        !Person.hasValidPropTypes(body)
    ) {
      invalidRequiredProp(res);
      return;
    }

    const personData = {
      name: body.name,
      age: body.age,
      hobbies: body.hobbies
    };

    const person = await PersonRepo.add(personData);
    created(res, JSON.stringify(person));
  } catch (error) {
    internalError(res);
  }
}

// Route: PUT /person/:id
async function update(req, res, id) {
  try {
    if (!isValidId(id)) {
      invalidIdFormat(res);
      return;
    }

    const person = await PersonRepo.findById(id);

    if (!person) {
      notFound(res);
      return;
    }

    const body = await getRequestPayload(req);

    if (!Person.hasAllRequiredProps(body) ||
        !Person.hasValidPropTypes(body)
    ) {
      invalidRequiredProp(res);
      return;
    }

    const personData = {
      name: body.name,
      age: body.age,
      hobbies: body.hobbies
    };

    const updatedPerson = await PersonRepo.update(id, personData);
    OK(res, JSON.stringify(updatedPerson));
  } catch (error) {
    internalError(res);
  }
}

// Route: DELETE /person/:id
async function remove(req, res, id) {
  try {
    if (!isValidId(id)) {
      invalidIdFormat(res);
      return;
    }

    const person = await PersonRepo.findById(id);

    if (!person) {
      notFound(res);
      return;
    }

    await PersonRepo.remove(id);
    noContent(res);
  } catch (error) {
    internalError(res);
  }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
}