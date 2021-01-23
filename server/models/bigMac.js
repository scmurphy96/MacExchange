const Sequelize = require('sequelize');
const db = require('../db/db');

const BigMac = db.define('bigmac', {
  date: {
    type: Sequelize.DATEONLY,
  },
  code: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
});

// const mongoose = require('mongoose');

// const bigMacSchema = mongoose.Schema({
//   countryCode: String,
//   countryName: String,
//   price: Number,
// });

// const BigMac = mongoose.model('BigMac', bigMacSchema);

module.exports = BigMac;
