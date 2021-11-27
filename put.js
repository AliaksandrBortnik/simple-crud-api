module.exports = (request, response) => {

  // get ID
  const id = 1;

  switch (request.url) {
    case '/person':
      response.statusCode = 204;
      request.persons[id] = request.body;
      response.write(JSON.stringify(request.persons[id]));
      response.end();
      break;
    default:
      response.statusCode = 404;
      response.write(`Route is not found: ${request.url}`);
      response.end();
  }
}