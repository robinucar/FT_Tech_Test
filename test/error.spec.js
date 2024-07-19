const { FetchError, ValidationError, handleError } = require('../error/errors');

describe('FetchError', () => {
  it('should create a FetchError with a default status', () => {
    const error = new FetchError('Test fetch error');

    expect(error).toBeInstanceOf(FetchError);
    expect(error.message).toBe('Test fetch error');
    expect(error.status).toBe(500);
  });

  it('should create a FetchError with a non default status', () => {
    const error = new FetchError('Test fetch error', 404);

    expect(error).toBeInstanceOf(FetchError);
    expect(error.message).toBe('Test fetch error');
    expect(error.status).toBe(404);
  });
});

describe('ValidationError', () => {
  it('should create a ValidationError with a default status', () => {
    const error = new ValidationError('Test validation error');

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe('Test validation error');
    expect(error.status).toBe(400);
  });

  it('should create a ValidationError with a non default status', () => {
    const error = new ValidationError('Test validation error', 422);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe('Test validation error');
    expect(error.status).toBe(422);
  });
});

describe('handleError', () => {
  it('should handle an error and send a JSON response with the error message', () => {
    const res = {
      json: jest.fn(),
    };
    const error = new Error('Test error');

    handleError(error, res);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Test error',
    });
  });

  it('should handle a FetchError and send a JSON response with the error message', () => {
    const res = {
      json: jest.fn(),
    };
    const error = new FetchError('Test fetch error', 404);

    handleError(error, res);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Test fetch error',
    });
  });

  it('should handle a ValidationError and send a JSON response with the error message', () => {
    const res = {
      json: jest.fn(),
    };
    const error = new ValidationError('Test validation error', 422);

    handleError(error, res);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Test validation error',
    });
  });
});
