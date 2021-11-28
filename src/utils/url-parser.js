const endsWithId = (url) => url.match(/\/person\/[^\/]+$/i);
const getId = (url) => url.split('/').pop();

module.exports = {
  endsWithId,
  getId
}