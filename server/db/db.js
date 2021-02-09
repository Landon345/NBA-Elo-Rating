const { Client } = require("pg");
const db = new Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});
execute();
async function execute() {
  await connect();
}
async function connect() {
  try {
    await db.connect();
    console.log(`Connected`);
    // console.log(db);
  } catch (e) {
    console.error(`connection failed ${e}`);
  }
}

module.exports = db;
