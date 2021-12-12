const { validate } = require('uuid')

module.exports.isValidId = id => validate(id);