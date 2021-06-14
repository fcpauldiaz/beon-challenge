const Joi = require('joi');

const createCarData = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createCarData,
};
