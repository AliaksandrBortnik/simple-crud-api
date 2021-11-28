const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const requiredProps = {
  name: 'string',
  age: 'number',
  hobbies: 'Array'
};

function isValidModel(model) {
  const existingFields = Object.keys(model);

  return Object.entries(requiredProps)
    .every(([field, type]) =>
      existingFields.includes(field) && checkType(model[field], type));
}

function checkType(value, expectedType) {
  return expectedType === 'Array' ?
    Array.isArray(value) : typeof value === expectedType
}


function findAll() {
  return new Promise((resolve, _) => {
    resolve(db.persons);
  });
}

function findById(id) {
  return new Promise((resolve, _) => {
    const person = db.persons.find(p => p.id === id);
    resolve(person);
  });
}

function add(personData) {
  return new Promise((resolve, _) => {
    const person = { id: uuidv4(), ...personData };
    db.persons.push(person);
    resolve(person);
  });
}

function update(id, personData) {
  return new Promise((resolve, _) => {
    const personIndex = db.persons.findIndex(p => p.id === id);
    db.persons[personIndex] = { id, ...personData };
    resolve(db.persons[personIndex]);
  });
}

function remove(id) {
  return new Promise((resolve, _) => {
    db.persons = db.persons.filter(p => p.id !== id);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
  isValidModel
};