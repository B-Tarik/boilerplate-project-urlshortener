function errorHandler(error, request, response, next) {
  return response.status(error.status || 404).json({
    error: error.message || 'invalid URL'
  });
}

module.exports = errorHandler;
