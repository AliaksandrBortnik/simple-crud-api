const { isValidId } = require('../utils/uuid-validator');

const server = require('../server');
const supertest = require('supertest');
const request = supertest(server);

describe('Scenarios', () => {
  afterAll(done => {
    server.close(done);
  });

  describe('Scenario 1 - Cross check basic', () => {
    let generatedPersonId = 0;

    it('should have empty DB', async () => {
      const response = await request.get('/person')
        .expect(200);

      expect(response.body).toMatchObject([]);
    });

    it('should add a new person to empty DB', async () => {
      const person = {
        name: 'Jest',
        age: 5,
        hobbies: ['Testing']
      };

      const response = await request.post('/person')
        .send(person)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(isValidId(response.body.id)).toBe(true);
      expect(response.body).toMatchObject(person);
      generatedPersonId = response.body.id;
    });

    it('should get the person using Id', async () => {
      const person = {
        id : generatedPersonId,
        name: 'Jest',
        age: 5,
        hobbies: ['Testing']
      };

      const response = await request
        .get(`/person/${generatedPersonId}`)
        .expect(200);

      expect(response.body).toMatchObject(person);
    });

    it('should update person by Id', async () => {
      const person = {
        name: 'Supertest',
        age: 2,
        hobbies: ['Debugging', 'Jest', 'Testing']
      };

      const response = await request
        .put(`/person/${generatedPersonId}`)
        .send(person)
        .expect(200);

      expect(response.body.id).toBe(generatedPersonId);
      expect(response.body).toMatchObject(person);
    });

    it('should delete the person in DB', async () => {
      await request.delete(`/person/${generatedPersonId}`)
        .expect(204);
    });

    it('should find nothing by Id', async () => {
      await request.get(`/person/${generatedPersonId}`)
        .expect(404);
    });
  });

  describe('Scenario 2 - Unable to trick rules around', () => {
    it('should not be able to add invalid person model', async () => {
      const person = {
        name: 'Hacker',
        salary: 1000000
      };

      await request.post('/person')
        .send(person)
        .expect(400);
    });

    it('should not be able to provide partial model for POST', async () => {
      const person = {
        name: 'Jest',
        age: 5
      };

      await request.post('/person')
        .send(person)
        .expect(400);
    });

    // PUT must provide the full model of required props, not like PATCH which makes partial update
    it('should not be able to provide partial model for PUT', async () => {
      const validPerson = {
        name: 'Hellen',
        age: 45,
        hobbies: ['Drawing']
      };

      const addResponse = await request.post('/person')
        .send(validPerson)
        .expect(201);

      expect(addResponse.body).toBeDefined();
      expect(addResponse.body.id).toBeDefined();

      const receivedNewId = addResponse.body.id;

      // No required hobbies property
      const invalidPerson = {
        name: 'Jest',
        age: 5
      };

      await request.put(`/person/${receivedNewId}`)
        .send(invalidPerson)
        .expect(400);
    });

    it('should not be able to accept invalid JSON as body', async () => {
      await request.post('/person')
        .send("not JSON")
        .expect(500);
    });
  });

  describe('Scenario 3 - Сhange itself', () => {
    let generatedPersonId = 0;

    it('should add person with "Programming" hobbie', async () => {
      const person = {
        name: 'John',
        age: 30,
        hobbies: ['Programming']
      };

      const response = await request.post('/person')
        .send(person)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(isValidId(response.body.id)).toBe(true);
      expect(response.body).toMatchObject(person);
      generatedPersonId = response.body.id;
    });

    it('should keep ID and name, but add one more hobbie and change age', async () => {
      const person = {
        name: 'John',
        age: 77,
        hobbies: ['Programming', 'Running']
      };

      const response = await request
        .put(`/person/${generatedPersonId}`)
        .send(person)
        .expect(200);

      expect(response.body.hobbies.length).toBe(2);
      expect(response.body.hobbies).toMatchObject(['Programming', 'Running']);
      expect(response.body.name).toBe('John');
      expect(response.body.age).toBe(77);
      expect(response.body.id).toBe(generatedPersonId);
    });

    it('should not allow to change a name with not "string" type', async () => {
      const person = {
        name: 'John',
        age: 'invalid',
        hobbies: ['Programming', 'Running']
      };

      await request
        .put(`/person/${generatedPersonId}`)
        .send(person)
        .expect(400);
    });

    it('should not allow to change hobbies with not "Array of strings" type', async () => {
      const person = {
        name: 'John',
        age: 'invalid',
        hobbies: 'hey'
      };

      await request
        .put(`/person/${generatedPersonId}`)
        .send(person)
        .expect(400);
    });

    it('should not allow to change a age with not "number" type', async () => {
      const person = {
        name: 991,
        age: 77,
        hobbies: ['Programming', 'Running']
      };

      await request
        .put(`/person/${generatedPersonId}`)
        .send(person)
        .expect(400);
    });

    it('make sure the person was not touched at all', async () => {
      const person = {
        id: generatedPersonId,
        name: 'John',
        age: 77,
        hobbies: ['Programming', 'Running']
      };

      const response = await request
        .get(`/person/${generatedPersonId}`)
        .expect(200);

      expect(response.body).toMatchObject(person);
    });
  });
});