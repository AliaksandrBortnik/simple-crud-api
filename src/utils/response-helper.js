const Wrapper = require("./wrapper");

const notFound = res => {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(Wrapper.message('Resource does not exist.'));
}

const notSupportedVerb = res => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(Wrapper.message('Not supported HTTP verb.'));
}

const internalError = res => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(Wrapper.error('Sorry, something went wrong.'));
}

module.exports = {
  notFound,
  notSupportedVerb,
  internalError
}