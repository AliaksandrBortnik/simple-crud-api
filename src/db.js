/*
  Persons are stored as objects that have following properties:
  id — unique identifier (string, uuid) generated on server side
  name — person's name (string, required)
  age — person's age (number, required)
  hobbies — person's hobbies (['a', 'b', 'c'] or [], required)
*/
module.exports = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'Bob',
    age: 27,
    hobbies: [
      'programming',
      'nodejs'
    ]
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    name: 'Martin',
    age: 22,
    hobbies: []
  }
];


// import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
//
// const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'