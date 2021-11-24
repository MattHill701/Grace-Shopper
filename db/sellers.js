
const { client } = require("./users");


async function createSeller(reportFields) {
    // Get all of the fields from the passed in object
    const {username, password, description } = reportFields;
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query
      const {
        rows: [ sellers ],
      } = await client.query(`
      INSERT INTO sellers(username, password, description)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [ username, password, description ]
      );
      // return the new report
      return sellers;
    } catch (error) {
      throw error;
    }
  }

  async function getAllSellers() {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM sellers
      `
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
      createSeller,
      getAllSellers
  }
  
  