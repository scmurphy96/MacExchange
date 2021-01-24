const router = require('express').Router();
// const BigMac = require('../models/bigMac');
// const mongo = require('mongodb');
// const url = require('../index');
// const assert = require('assert');
// const CONNECTION_URL = require('../index');

router.use('/countries', require('./countries'));

// router.get('/', async (req, res, next) => {
//   const resultArray = [];
//   console.log('here');
//   mongo.connect(CONNECTION_URL, (err, db) => {
//     assert.equal(null, err);
//     const cursor = db.collection('BigMacPrices').find();
//     cursor.forEach(
//       (doc, err) => {
//         assert.equal(null, err);
//         resultArray.push(doc);
//       },
//       () => {
//         db.close();
//         res.send(resultArray);
//       }
//     );
//   });
// });

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
