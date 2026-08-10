class CustomError extends Error {
  constructor(code, message, status) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.status = status;
  }
}

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.status ? err.message : 'An unexpected error occurred.';

  res.status(status).json({
    error: {
      code,
      message,
      status,
    },
  });
};

module.exports = { CustomError, errorHandler };