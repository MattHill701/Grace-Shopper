/ Connect to DB
const { Client } = require('pg');
const DB_NAME = 'change-this-name'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);
// database methods
async function createReport(reportFields) {
  // Get all of the fields from the passed in object
  const {username, password } = reportFields;
  try {
    // insert the correct fields into the reports table
    // remember to return the new row from the query
    const {
      rows: [ report ],
    } = await client.query(`
    INSERT INTO reports(username, password)
    VALUES ($1, $2)
    RETURNING *
    `,
    [ username, password ]
    );
    // return the new report
    return report;
  } catch (error) {
    throw error;
  }
}
// export
module.exports = {
  client,
  createReport
  // db methods
}