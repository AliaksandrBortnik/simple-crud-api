# NodeJS HTTP API

1. Before you start running the app, install all dependencies `npm install`.
2. To start in development mode, use `npm run start:dev`.
3. If you want to turn on the production mode, `npm run start:prod`. Webpack will take some time to make a fresh production bundle and then the app will be ready to handle incoming requests.
4. In case you would like to test, run the `npm run test`.

### Supported CRUD operations:

*JFYI*: PUT makes the full entity update, not partial like PATCH. So, if you use PUT, you must provide all required properties.

#### Persons
- GET /person (returns list of all items)
- GET /person/:id (returns item with matching id)
- POST /person (creates a new item, returns item with a generated ID)
- PUT /person/:id (updates item with matching ID)
- DELETE /person/:id (deletes item with matching ID)