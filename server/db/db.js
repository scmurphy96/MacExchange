const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/macexchange', {
  logging: false,
});

module.exports = db;
