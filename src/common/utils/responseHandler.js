function successResponse(res, data = null, message = 'Success') {
  return res.status(200).json({
    success: true,
    message,
    data
  });
}

function errorResponse(res, message = 'Error', status = 500, data = null) {
  return res.status(status).json({
    success: false,
    message,
    data
  });
}

module.exports = {
  successResponse,
  errorResponse
};

