const message = (msg) => `{ "message": "${msg}" }`;
const error = (msg) => `{ "error": "${msg}" }`;

module.exports = {
  message,
  error
}