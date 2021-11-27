# NodeJS HTTP API

1. Before you start running the app, install all dependencies `npm install`.
2. To start in development mode, use `npm run start:dev`.
3. If you want to turn on the production mode, `npm run start:prod`. Webpack will take some time to make a fresh production bundle and then the app will be ready to handle incoming requests.
4. In case you would like to test, start the app using #2 or #3, and then open NEW terminal and run the `npm run test`. 
It is a vital thing due to having a running app and, in parallel, to test the app.

### Supported CRUD operations:

#### Persons
- GET /person (returns list of all items)
- GET /person/:id (returns item with matching id)
- POST /person (creates a new item, returns item or confirmation)
- PUT /person/:id (updates item with matching ID)
- DELETE /person/:id (deletes item with matching ID)