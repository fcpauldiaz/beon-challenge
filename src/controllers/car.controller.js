const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { carService } = require('../services');

const createCarProvider = catchAsync(async (req, res) => {
  const provider = await carService.createProvider(req.body, req.files);
  res.status(httpStatus.CREATED).send(provider);
});

const listCars = catchAsync(async (req, res) => {
  const data = await carService.listCarProviders();
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Providers not found');
  }
  res.send(data);
});


module.exports = {
  createCarProvider,
  listCars,
};
