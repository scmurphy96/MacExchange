const mongoose = require('mongoose');

const bigMacSchema = mongoose.Schema({
  countryCode: String,
  countryName: String,
  price: Number,
});

const BigMac = mongoose.model('BigMac', bigMacSchema);

module.exports = BigMac;
