const runner = require('./runner');
const google = require('./google');

module.exports = {
  ...runner,
  handlers: {
    ...google,
  },
};
