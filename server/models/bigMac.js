const mongoose = require('mongoose');

const bigMacSchema = mongoose.Schema({
  date: Date,
  countryCode: String,
  countryName: String,
  price: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const BigMac = mongoose.model('BigMac', bigMacSchema);

module.exports = BigMac;
