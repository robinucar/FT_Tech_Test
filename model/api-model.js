require('dotenv').config();

/**
 * Custom error for fetch-related errors.
 * @const
 */
const { FetchError } = require('../error/errors');

/**
 * Function to format individual items.
 * @const
 */
const { formatItem } = require('../helper/format-item');

/**
 * ApiModel class to interact with an external API.
 */
class ApiModel {
  /**
   * Creates an instance of ApiModel.
   * @param {string} url - The URL of the API endpoint.
   * @param {Object} params - The parameters for the API request.
   * @example
   * const api = new ApiModel('https://api.example.com/data', { param1: 'value1' });
   * console.log(api.url); // 'https://api.example.com/data'
   * console.log(api.params); // { param1: 'value1' }
   */
  constructor(url, params) {
    this.url = url;
    this.params = params;
  }

  /**
   * Fetches data from the API.
   * @returns {Promise<Object>} The data returned from the API.
   * @throws {FetchError} If the network response is not successful.
   * @example
   * api.getData()
   *   .then(data => {
   *     console.log(data);
   *   })
   *   .catch(error => {
   *     console.error('Error fetching data:', error);
   *   });
   */
  async getData() {
    const requestParams = {
      symbols: this.params,
    };
    const url = new URL(this.url);
    url.search = new URLSearchParams(requestParams).toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new FetchError(
        'Network response was not successful: ' + response.statusText,
        response.status
      );
    }
    const result = await response.json();
    return result;
  }

  /**
   * Filters and formats the API data.
   * @param {Object} data - The data returned from the API.
   * @returns {Array} The formatted data items.
   * @example
   * api.getData()
   *   .then(data => {
   *     const formattedData = api.filterAndFormatData(data);
   *     console.log(formattedData);
   *   })
   *   .catch(error => {
   *     console.error('Error fetching data:', error);
   *   });
   */
  filterAndFormatData(data) {
    const items = data.data.items;
    return items.map(formatItem);
  }
}

module.exports = ApiModel;

/**
 * Example usage:
 *
 * const ApiModel = require('./path/to/ApiModel');
 *
 * const api = new ApiModel('https://api.example.com/data', { param1: 'value1' });
 *
 * api.getData()
 *   .then(data => {
 *     const formattedData = api.filterAndFormatData(data);
 *     console.log(formattedData);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching data:', error);
 *   });
 */
