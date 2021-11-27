module.exports = (request, response) => {
  switch (request.url) {
    case "/person":
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(request.persons));
      response.end();
      break;
    default:
      response.statusCode = 404;
      response.write(`Route is not found: ${request.url}`);
      response.end();
  }
}