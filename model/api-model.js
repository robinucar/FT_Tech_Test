require('dotenv').config();


const { FetchError } = require('../error/errors');


const { formatItem } = require('../helper/format-item');


class ApiModel {
  
  constructor(url, params) {
    this.url = url;
    this.params = params;
  }

  
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

  
  filterAndFormatData(data) {
    const items = data.data.items;
    return items.map(formatItem);
  }
}

module.exports = ApiModel;


