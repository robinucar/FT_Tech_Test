const nameMapping = {
  'FTSE 100 Index': 'FTSE 100',
  'S&P 500 INDEX': 'S&P 500',
  'Euro/US Dollar FX Spot Rate': 'Euro/Dollar',
  'UK Pound Sterling/US Dollar FX Spot Rate': 'Pound/Dollar',
  'ICE Brent Crude Oil Front Month': 'Brent Crude Oil',
};

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
