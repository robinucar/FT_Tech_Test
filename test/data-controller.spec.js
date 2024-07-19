const fs = require('fs');
const path = require('path');
const { getMarketData } = require('../controller/data-controller');
const ApiModel = require('../model/api-model');
const { ValidationError } = require('../error/errors');

jest.mock('../model/api-model');
jest.mock('../error/errors', () => ({
  ValidationError: jest.fn(),
  handleError: jest.fn(),
}));

describe('getMarketData', () => {
  let res;
  let mockGetData;
  let mockFilterAndFormatData;
  let securitiesResponse;

  beforeAll(() => {
    const responsePath = path.join(
      __dirname,
      './fixtures/securities-response.json'
    );
    securitiesResponse = JSON.parse(fs.readFileSync(responsePath, 'utf8'));
  });

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockGetData = jest.fn();
    mockFilterAndFormatData = jest.fn();

    ApiModel.mockImplementation(() => ({
      getData: mockGetData,
      filterAndFormatData: mockFilterAndFormatData,
    }));

    process.env.FT_MARKET_API_URL = 'http://mockurl.com';
    process.env.FT_MARKET_SYMBOLS = 'MOCK_SYMBOL';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw ValidationError if API_URL is not provided', async () => {
    delete process.env.FT_MARKET_API_URL;

    await getMarketData(res);

    expect(ValidationError).toHaveBeenCalledWith('API_URL is required');
    expect(require('../error/errors').handleError).toHaveBeenCalled();
  });

  'should throw ValidationError if SYMBOLS are not provided',
    async () => {
      delete process.env.FT_MARKET_SYMBOLS;

      await getMarketData(res);

      expect(ValidationError).toHaveBeenCalledWith('SYMBOLS are required');
      expect(require('../error/errors').handleError).toHaveBeenCalled();
    };

  it('should return formatted market data successfully', async () => {
    mockGetData.mockResolvedValue(securitiesResponse);
    mockFilterAndFormatData.mockReturnValue(securitiesResponse.data.items);

    const result = await getMarketData(res);

    expect(result).toEqual({ data: securitiesResponse.data.items });
  });

  it('should handle error when ApiModel throws an error', async () => {
    const mockError = new Error('Something went wrong');
    mockGetData.mockRejectedValue(mockError);

    await getMarketData(res);

    expect(require('../error/errors').handleError).toHaveBeenCalledWith(
      mockError,
      res
    );
  });
});
