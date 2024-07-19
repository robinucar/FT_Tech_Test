/**
 * Custom error class for fetch-related issues.
 * @extends Error
 */
class FetchError extends Error {
  /**
   * Creates an instance of FetchError.
   * @param {string} message - The error message.
   * @param {number} [status=500] - The HTTP status code (default is 500).
   * @example
   * try {
   *   throw new FetchError('Failed to fetch data', 404);
   * } catch (error) {
   *   console.error(error.name); // FetchError
   *   console.error(error.message); // Failed to fetch data
   *   console.error(error.status); // 404
   * }
   */
  constructor(message, status) {
    super(message);
    this.name = 'FetchError';
    this.status = status || 500;
  }
}

/**
 * Custom error class for validation issues.
 * @extends Error
 */
class ValidationError extends Error {
  /**
   * Creates an instance of ValidationError.
   * @param {string} message - The error message.
   * @param {number} [status=400] - The HTTP status code (default is 400).
   * @example
   * try {
   *   throw new ValidationError('Invalid input data');
   * } catch (error) {
   *   console.error(error.name); // ValidationError
   *   console.error(error.message); // Invalid input data
   *   console.error(error.status); // 400
   * }
   */
  constructor(message, status = 400) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}

/**
 * Handles errors by sending a JSON response with the error message.
 * @param {Error} error - The error to handle.
 * @param {Object} res - The response object.
 * @example
 * const express = require('express');
 * const app = express();
 *
 * app.get('/', (req, res) => {
 *   try {
 *     throw new ValidationError('This is a validation error');
 *   } catch (error) {
 *     handleError(error, res);
 *   }
 * });
 *
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 */
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

/**
 * Example usage:
 *
 * const { FetchError, ValidationError, handleError } = require('./path/to/errors');
 *
 * try {
 *   throw new FetchError('Failed to fetch data', 404);
 * } catch (error) {
 *   console.error(error.name); // FetchError
 *   console.error(error.message); // Failed to fetch data
 *   console.error(error.status); // 404
 * }
 *
 * try {
 *   throw new ValidationError('Invalid input data');
 * } catch (error) {
 *   console.error(error.name); // ValidationError
 *   console.error(error.message); // Invalid input data
 *   console.error(error.status); // 400
 * }
 *
 * const express = require('express');
 * const app = express();
 *
 * app.get('/', (req, res) => {
 *   try {
 *     throw new ValidationError('This is a validation error');
 *   } catch (error) {
 *     handleError(error, res);
 *   }
 * });
 *
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 */
