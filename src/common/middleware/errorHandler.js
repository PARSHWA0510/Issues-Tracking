const { errorResponse } = require('../utils/responseHandler');

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, message, status);
}

module.exports = {
  errorHandler
};

