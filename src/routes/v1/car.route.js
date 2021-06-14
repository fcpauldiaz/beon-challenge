const express = require('express');
const carController = require('../../controllers/car.controller');
const validate = require('../../middlewares/validate');
const carValidation = require('../../validations/car.validation');

const router = express.Router();

router
  .route('/provider')
  .post(validate(carValidation.createCarData), carController.createCarProvider);

router
  .route('/provider')
  .get(carController.listCars);

module.exports = router;
