const ApiModel = require('../model/api-model');
const { ValidationError, handleError } = require('../error/errors');
require('dotenv').config();

const getMarketData = async res => {
  try {
    const url = process.env.FT_MARKET_API_URL;
    const params = process.env.FT_MARKET_SYMBOLS;

    if (!url) {
      throw new ValidationError('API_URL is required');
    }

    if (!params) {
      throw new ValidationError('SYMBOLS are required');
    }

    const dataModel = new ApiModel(url, params);
    const data = await dataModel.getData();
    const formattedData = dataModel.filterAndFormatData(data);

    return { data: formattedData };
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  getMarketData,
};
