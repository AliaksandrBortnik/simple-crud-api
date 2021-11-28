const { isValidId } = require('../utils/uuid-validator');

const server = require('../server');
const supertest = require('supertest');
const request = supertest(server);

describe('Scenario 1', function () {
  let generatedPersonId = 0;

  afterAll(done => {
    server.close(done);
  });

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