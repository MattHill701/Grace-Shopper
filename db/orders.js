const { client } = require("./users");


async function createOrder(reportFields) {
    // Get all of the fields from the passed in object
    const {userId, products } = reportFields;
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query
      const {
        rows: [ rows ],
      } = await client.query(`
      INSERT INTO orders(userId, products, totalPrice)
      VALUES ($1, $2, 5)
      RETURNING *
      `,
      [ userId,  products ]
      );
      // return the new report
      console.log(rows)
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getAllOrders() {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM orders
      `
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
      createOrder,
      getAllOrders
  }