let configError = null;
let objectError = null;
const getKeypath = require('keypather/get');
const setKeypath = require('keypather/set');

class Transform {
  static validate(config, object) {
    if (!Array.isArray(config)) {
      if (!configError) {
        configError = new Error('invalid config');
      }

      return configError;
    }

    if (typeof object !== 'object') {
      if (!objectError) {
        objectError = new Error('invalid object');
      }
      return objectError;
    }

    return null;
  }

  static isValidTransformRequest(transformation) {
    return Object.prototype.hasOwnProperty.call(transformation, 'from') &&
        Object.prototype.hasOwnProperty.call(transformation, 'to');
  }

  /**
   * perform transformation
   *
   *
   * @param {object} config [{ from: 'key', to: 'new.path', defaultValue: 'this was empty' }]
   * @param {object} object
   * @param {function} cb
   */
  static exec(config, object, cb) {
    const returnObject = {};
    const validationError = Transform.validate(config, object);

    if (validationError) {
      cb(validationError);
      return;
    }

    config.forEach((transformation) => {
      if (!Transform.isValidTransformRequest(transformation)) {
        return;
      }

      let value = getKeypath(object, transformation.from);

      if (!value && Object.prototype.hasOwnProperty.call(transformation, 'defaultValue')) {
        value = transformation.defaultValue;
      }

      setKeypath(returnObject, transformation.to, value);
    });

    cb(null, returnObject);
  }
}

module.exports = Transform;

