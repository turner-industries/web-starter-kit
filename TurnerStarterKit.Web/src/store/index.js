if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}

const root = require('./root.js');
module.exports.actions = root.actions;
module.exports.selectors = root.selectors;
