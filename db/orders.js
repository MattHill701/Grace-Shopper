const { client } = require("./users");


async function subtractInventory(id, number) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      UPDATE products
      SET
      inventory = ${number}
      WHERE id=${id};
      `);
    return products;
  } catch (error) {
    throw error;
  }
}


async function createOrder(reportFields) {
    // Get all of the fields from the passed in object
    const {userId, products, isOpen } = reportFields;
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query
      let arr = []
      let string1 = products.substring(1, products.length - 1)
      let string2 = '(' + string1 + ')'
      let totalPrice = 0

      for(i=0;i<string1.length;i++){
        if(string1[i] !== ","){
        arr.push(parseInt(string1[i]))
        }
      }

      const {rows} = await client.query(`
        SELECT * FROM products
        WHERE id IN ${string2}
      `);

      rows.forEach((e)=>{
        let num = arr.filter((v) => (v === e.id)).length;
        subtractInventory(e.id,(e.inventory-num))
        totalPrice = totalPrice + (e.price*num)
      })

      const {
        rows: [ order ],
      } = await client.query(`
      INSERT INTO orders(userId, products, totalPrice, isOpen)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [ userId,  products, totalPrice, isOpen]
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