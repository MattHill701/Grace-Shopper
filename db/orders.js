const { client } = require("./users");


async function createOrder(reportFields) {
    // Get all of the fields from the passed in object
    const {userId, products } = reportFields;
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query

      let string2 = '(' + products.substring(1, products.length - 1) + ')'
      let totalPrice = 0

      const {rows} = await client.query(`
        SELECT price FROM products
        WHERE id IN ${string2}
      `);

      rows.forEach((e)=>{
        totalPrice = totalPrice + e.price
      })

      const {
        rows: [ order ],
      } = await client.query(`
      INSERT INTO orders(userId, products, totalPrice)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [ userId,  products, totalPrice]
      );

      console.log(order)
      return order;
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