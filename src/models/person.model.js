const db = require('../db');
const { v4: uuidv4 } = require('uuid');

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
    const personIndex = db.persons.findIndex(p => p.id === id);
    db.persons.splice(personIndex, 1);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove
};