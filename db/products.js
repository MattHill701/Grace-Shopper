const { client } = require("./users");

async function createProduct(reportFields) {
    // Get all of the fields from the passed in object
    const {name, description, price, category } = reportFields;
    try {
      const {
        rows: [ product ],
      } = await client.query(`
      INSERT INTO products(name, description, price, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [ name, description, price, category ]
      );
      // return the new product
      return product;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    createProduct
  }