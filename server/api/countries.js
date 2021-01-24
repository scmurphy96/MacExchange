const router = require('express').Router();
const BigMac = require('../models/bigMac');
module.exports = router;

// GET /api/countries
router.get('/', async (req, res, next) => {
  try {
    const countries = await BigMac.findAll();
    res.send(countries);
  } catch (err) {
    next(err);
  }
});
