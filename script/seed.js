const db = require('../server/db/db');
const BigMac = require('../server/models/bigMac');
const csv = require('csvtojson');
const csvdata = 'bigMacData.csv';

async function convert() {
  const jsonObj = await csv().fromFile(csvdata);
  return jsonObj;
}

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  const data = await convert();

  await BigMac.bulkCreate(data);
  console.log('seeding successful');
}

seed();
