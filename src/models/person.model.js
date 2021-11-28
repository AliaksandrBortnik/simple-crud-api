const requiredProps = {
  name: 'string',
  age: 'number',
  hobbies: 'Array' // supports only array of strings
};

function hasAllRequiredProps(model) {
  const existingFields = Object.keys(model);
  return Object.keys(requiredProps)
    .every(field => existingFields.includes(field));
}

function hasValidPropTypes(model) {
  return Object.entries(model)
    .every(([field, value]) => checkType(value, requiredProps[field]));
}

function checkType(value, expectedType) {
  return expectedType === 'Array' ?
    Array.isArray(value) && value.every(item => typeof item === 'string')
    : typeof value === expectedType
}

module.exports = {
  hasAllRequiredProps,
  hasValidPropTypes
};