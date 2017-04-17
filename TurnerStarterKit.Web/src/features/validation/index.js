import validate from 'validate.js';
import upperFirst from 'lodash/upperFirst';

const serverFormat = errors =>
  errors.map(validationError => ({
    propertyName: upperFirst(validationError.attribute),
    errorMessage: validationError.error,
  }));

const objectMap = errors =>
  errors.reduce((acc, validationError) => {
    acc[validationError.attribute] = acc[validationError.attribute] || [];
    acc[validationError.attribute].push(validationError.error);
    return acc;
  }, {});

export const length = (minimum, maximum) => ({
  length: {minimum, maximum},
});

validate.formatters.serverFormat = serverFormat;
validate.formatters.objectMap = objectMap;
validate.validators.presence.message = 'should not be empty.';

export default validate;
