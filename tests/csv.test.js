const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../src/app');
const mongoose = require('mongoose');
const config = require('../src/config/config');

const setupTestDB = () => {
  beforeAll(async () => {
    const data = await config();
    await mongoose.connect(data.mongoose.url, data.mongoose.options);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

setupTestDB();

describe('Car routes', () => {
  describe('POST /v1/car/provider', () => {
    test('should return 201 when uploading a CSV and return data', async () => {
      const res = await request(app)
        .post('/v1/car/provider')
        .field('name', 'Provider BEON')
        .attach('file', `${__dirname}/../data.csv`)
        .expect(httpStatus.CREATED);
      expect(res.body).toHaveProperty('provider_name');
      expect(res.body).toHaveProperty('data');
    });
    test('should return 400 when without a name', async () => {
      await request(app)
        .post('/v1/car/provider')
        .attach('file', `${__dirname}/../data.csv`)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 without a file', async () => {
      await request(app)
      .post('/v1/car/provider')
      .field('name', 'Provider BEON')
      .expect(httpStatus.BAD_REQUEST);
    });
  });
});
