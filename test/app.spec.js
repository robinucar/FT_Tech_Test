const request = require('supertest');
const subject = require('../app');

const dataController = require('../controller/data-controller');
const { formatItem } = require('../helper/format-item');

describe('Testing the server', () => {
  it('can run the express server and return a 200', async () => {
    const response = await request(subject).get('/');
    expect(response.statusCode).toBe(200);
  });
});
// add your own tests here

jest.mock('../controller/data-controller');
jest.mock('../error/errors');

describe('GET /handlebars', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render handlebars template with displayData', async () => {
    const mockRawData = [
      {
        basic: { name: 'FTSE 100 Index' },
        quote: { change1DayPercent: 1.3554882540722024 },
      },
      {
        basic: { name: 'S&P 500 INDEX' },
        quote: { change1DayPercent: -0.9151554110464124 },
      },
    ];
    const mockData = mockRawData.map(formatItem);
    dataController.getMarketData.mockResolvedValue({ data: mockData });

    const res = await request(subject).get('/handlebars');

    expect(dataController.getMarketData).toHaveBeenCalled();
    expect(res.status).toBe(200);

    expect(res.text).toContain('FTSE 100');
    expect(res.text).toContain('S&amp;P 500');
    expect(res.text).toContain('1.36%');
    expect(res.text).toContain('-0.92%');
  });
});
