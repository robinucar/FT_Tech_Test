const ApiModel = require('../model/api-model');
const { FetchError } = require('../error/errors');
const { formatItem } = require('../helper/format-item');
const fs = require('fs');
const path = require('path');

global.fetch = require('jest-fetch-mock');

jest.mock('../helper/format-item');

describe('ApiModel', () => {
  const url = 'https://ft.com/api';
  const params = 'EUR,USD';

  let dataModel;
  let mockResponse;

  beforeEach(() => {
    fetch.resetMocks();
    dataModel = new ApiModel(url, params);
    const responsePath = path.join(
      __dirname,
      './fixtures/securities-response.json'
    );
    mockResponse = JSON.parse(fs.readFileSync(responsePath, 'utf8'));
  });

  describe('constructor', () => {
    it('should set url and params properties', () => {
      expect(dataModel.url).toBe(url);
      expect(dataModel.params).toBe(params);
    });
  });

  describe('getData', () => {
    it('should get market data successfully', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockResponse));

      const data = await dataModel.getData();

      const encodedParams = encodeURIComponent(params);
      expect(fetch).toHaveBeenCalledWith(`${url}?symbols=${encodedParams}`);
      expect(data).toEqual(mockResponse);
    });

    it('should throw FetchError if the response not succeed', async () => {
      fetch.mockResponseOnce(JSON.stringify({}), {
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(dataModel.getData()).rejects.toThrow(FetchError);
    });
  });

  describe('filterAndFormatData', () => {
    it('should filter and format market data correctly', () => {
      const items = mockResponse.data.items;
      formatItem.mockImplementation(item => `formatted_${item.basic.symbol}`);

      const formattedData = dataModel.filterAndFormatData(mockResponse);

      expect(formattedData).toEqual(
        items.map(item => `formatted_${item.basic.symbol}`)
      );
      expect(formatItem).toHaveBeenCalledTimes(items.length);
    });
  });
});
