const { formatItem } = require('../helper/format-item');

describe('formatItem', () => {
  it('should format an item with a positive change', () => {
    const item = {
      basic: { name: 'FTSE 100 Index' },
      quote: { change1DayPercent: 1.3554882540722024 },
    };

    const formattedItem = formatItem(item);

    expect(formattedItem).toEqual({
      name: 'FTSE 100',
      dailyChange: '1.36%',
      isNegative: false,
    });
  });

  it('should format an item with a negative change', () => {
    const item = {
      basic: { name: 'S&P 500 INDEX' },
      quote: { change1DayPercent: -0.9151554110464124 },
    };

    const formattedItem = formatItem(item);

    expect(formattedItem).toEqual({
      name: 'S&P 500',
      dailyChange: '-0.92%',
      isNegative: true,
    });
  });

  it('should format an item without a change', () => {
    const item = {
      basic: { name: 'Unknown Index' },
      quote: { change1DayPercent: 0 },
    };

    const formattedItem = formatItem(item);

    expect(formattedItem).toEqual({
      name: 'Unknown Index',
      dailyChange: '',
      isNegative: false,
    });
  });

  it('should handle an item without a mapped name', () => {
    const item = {
      basic: { name: 'Unmapped Index' },
      quote: { change1DayPercent: 0.5 },
    };

    const formattedItem = formatItem(item);

    expect(formattedItem).toEqual({
      name: 'Unmapped Index',
      dailyChange: '',
      isNegative: false,
    });
  });
});
