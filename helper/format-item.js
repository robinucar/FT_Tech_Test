/**
 * Mapping of original item names to their formatted names.
 * @const {Object}
 */
const nameMapping = {
  'FTSE 100 Index': 'FTSE 100',
  'S&P 500 INDEX': 'S&P 500',
  'Euro/US Dollar FX Spot Rate': 'Euro/Dollar',
  'UK Pound Sterling/US Dollar FX Spot Rate': 'Pound/Dollar',
  'ICE Brent Crude Oil Front Month': 'Brent Crude Oil',
};

/**
 * Formats an item with a mapped name and calculates daily change percentage.
 * @param {Object} item - The item to format.
 * @param {Object} item.basic - Basic information of the item.
 * @param {string} item.basic.name - The original name of the item.
 * @param {Object} item.quote - Quote information of the item.
 * @param {number} item.quote.change1DayPercent - The daily change percentage.
 * @returns {Object} The formatted item with name, daily change, and negativity flag.
 * @example
 * const { formatItem } = require('./path/to/format-item');
 *
 * const item = {
 *   basic: { name: 'FTSE 100 Index' },
 *   quote: { change1DayPercent: 1.23 }
 * };
 *
 * const formattedItem = formatItem(item);
 * console.log(formattedItem);
 */
const formatItem = item => {
  const name = nameMapping[item.basic.name] || item.basic.name;
  let dailyChange = '';
  let isNegative = false;

  if (nameMapping[item.basic.name]) {
    dailyChange = `${item.quote.change1DayPercent.toFixed(2)}%`;
    isNegative = item.quote.change1DayPercent < 0;
  }

  return { name, dailyChange, isNegative };
};

module.exports = {
  formatItem,
};
