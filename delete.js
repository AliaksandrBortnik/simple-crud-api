module.exports = (request, response) => {
  switch (request.url) {
    default:
      response.statusCode = 404;
      response.write(`Route is not found: ${request.url}`);
      response.end();
  }
}