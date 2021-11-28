const Wrapper = require('../utils/wrapper');

const OK = (res, content = '') => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(content);
}

const created = (res, content = '') => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(content);
}

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

const invalidIdFormat = res => {
  res.writeHead(400, { 'Content-Type': 'application/json' })
  res.end(Wrapper.message('Invalid format of ID. It must be UUID.'));
}

const missingRequiredProp = res => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(Wrapper.message('Invalid state of model. Check all required properties and their types.'));
}

const noContent = res => {
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end();
}

module.exports = {
  OK,
  created,
  notFound,
  notSupportedVerb,
  internalError,
  invalidIdFormat,
  missingRequiredProp,
  noContent
}