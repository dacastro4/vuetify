/**
 * @param {String} value
 * @param {Function|Object|Array} allowed
 * @param {Boolean} defaultAllowed
 * @returns {Boolean}
 */
export default (function (value, allowed) {
  var defaultAllowed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (Array.isArray(allowed)) {
    return allowed.indexOf(value) > -1;
  }

  if (allowed instanceof Function) {
    return allowed(value);
  }

  if (allowed instanceof Object) {
    var min = allowed.min;
    var max = allowed.max;
    return (!min || min <= value) && (!max || max >= value);
  }

  return defaultAllowed;
});