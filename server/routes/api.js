const router = require('express').Router();
const BigMac = require('../models/bigMac');
const mongo = require('mongodb');
const url = require('../index');
const assert = require('assert');
const CONNECTION_URL = require('../index');

router.get('/', async (req, res, next) => {
  const resultArray = [];
  console.log('here');
  mongo.connect(CONNECTION_URL, (err, db) => {
    assert.equal(null, err);
    const cursor = db.collection('BigMacPrices').find();
    cursor.forEach(
      (doc, err) => {
        assert.equal(null, err);
        resultArray.push(doc);
      },
      () => {
        db.close();
        res.send(resultArray);
      }
    );
  });
});

module.exports = router;
