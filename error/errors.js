class FetchError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'FetchError';
    this.status = status || 500;
  }
}

class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}

const handleError = (error, res) => {
  res.json({
    error: error.message,
  });
};

module.exports = {
  FetchError,
  ValidationError,
  handleError,
};
