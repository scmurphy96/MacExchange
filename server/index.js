const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

require('../secrets.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan);

app.use('/api', require('./routes/api'));

app.use(express.static(path.join(__dirname, '../public')));

const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.y0ngj.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

async function dbSync() {
  try {
    await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (err) {
    console.log(err.message);
  }
}

dbSync();

mongoose.set('useFindAndModify', false);

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = CONNECTION_URL;
