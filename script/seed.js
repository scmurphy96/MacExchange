const db = require('../server/db/db');
const BigMac = require('../server/models/bigMac');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  await BigMac.create({
    date: '2021-01-01',
    code: 'USA',
    name: 'America',
    price: 5.66,
  });
  console.log('seeding successful');
}

seed();
