const httpStatus = require('http-status');
const { Car } = require('../models');
const ApiError = require('../utils/ApiError');
const { parse } = require('fast-csv');

/**
 * Upload data for a provider
 * @param {Object} body
 * @param {List} files
 * @returns {Promise<Car>}
 */
const createProvider = async (body, files) => {
  if (files.length <= 0 || !body.name) {
    return;
  }
  const data = await readCSV(files[0].buffer);
  const allowedHeaders = ['uuid', 'vin', 'make', 'model', 'mileage', 'year', 'price', 'zip', 'create date', 'update date'];
  const result = [];
  for (let row in data) {
    const innerRow = {};
    for (const [key, value] of Object.entries(data[row])) {
      if (allowedHeaders.includes(key.toLowerCase())) {
        if (key.toLowerCase() == 'create date') {
          innerRow['create_date'] = new Date(value);
        } else if (key.toLowerCase() == 'update date') {
          innerRow['update_date'] = new Date(value);
        } else {
          innerRow[key.toLowerCase()] = value;
        }
      }
    }
    result.push(innerRow);
  }
  const car = await Car.create({
    provider_name: body.name,
    data: result,
  });

  return car;
};
/**
 * Read CSV data from buffer
 */
const readCSV = (file) => {
  return new Promise((resolve, reject) => {
    const data = [];
    let headers = [];
    const stream = parse({ headers: true })
      .on('error', (error) => reject(error))
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data));
    stream.write(file);
    stream.end();
  });
}

/**
 * Get all car data
 * @returns {Promise<Car>}
 */
const listCarProviders = async () => {
  return Car.find();
};


module.exports = {
  createProvider,
  listCarProviders,
};
