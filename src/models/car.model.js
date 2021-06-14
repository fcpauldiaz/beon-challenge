const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const carSchema = mongoose.Schema({
  provider_name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  data: [
    {
      uuid: { type: String },
      vin: { type: String },
      make: { type: String },
      model: { type: String },
      mileage: { type: Number },
      year: { type: Number },
      price: { type: Number },
      zip: { type: Number },
      create_date: { type: Date },
      update_date: { type: Date },
    },
  ],
});

// add plugin that converts mongoose to json
carSchema.plugin(toJSON);

/**
 * @typedef Car
 */
const Car = mongoose.model('Routine', carSchema);

module.exports = Car;
