
const { Client } = require('pg');
const DB_NAME = 'grace_shopper'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);
// database methods


async function createUser(reportFields) {
  // Get all of the fields from the passed in object
  const {username, password } = reportFields;
  try {
    // insert the correct fields into the reports table
    // remember to return the new row from the query
    const {
      rows: [ users ],
    } = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *
    `,
    [ username, password ]
    );
    // return the new report
    return users;
  } catch (error) {
    throw error;
  }
}








// export
module.exports = {
  client,
  createUser
}