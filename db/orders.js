const { client, updateCart } = require("./users");


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

async function removeProductFromOrder(number) {
  try {
    const {
      rows: [products],
    } = await client.query(`
    UPDATE orders 
    SET products = array_remove(products, $1)
    RETURNING *
      `,[number]);
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
        if(!isOpen){
        subtractInventory(e.id,(e.inventory-num))
        }
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

  async function getOrdersById(id) {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM orders
        WHERE id=${id} 
      `
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getOpenOrderById(id) {
    try {
      const { rows:[order] } = await client.query(
        `
        SELECT * FROM orders
        WHERE userId=${id} AND isOpen=true
      `
      );
      return order;
    } catch (error) {
      throw error;
    }
  }

  async function addProductToOrder(add, id, userId) {
    try {
      if(add){
      let that = await getOpenOrderById(userId)
      console.log(that)
      let products = JSON.stringify(that.products)
      let string
      if(that.products.length === 0){
       string = '{' + products.substring(1, products.length - 1) + `${id}}`
      } else{
        string = '{' + products.substring(1, products.length - 1) + `,${id}}`
      }
      const {rows:[price]} = await client.query(`
        SELECT * FROM products
        WHERE id=$1
      `,[id]);
      console.log(price)
      let newPrice = price.price + that.totalprice
      let wow = that.products.length + 1

       updateCart(userId, wow)
      

      const { rows } = await client.query(
        `
        UPDATE orders
        SET products=$1,
        totalprice=$2
        WHERE userId=$3 AND isOpen=true
      `,[string, newPrice, userId]
      );
      return rows;
    } else {
      let that = await getOpenOrderById(userId)
      console.log(that)
      let products1 = that.products
      let index = products1.indexOf(id)
      products1.splice(index,1)
      let products = JSON.stringify(products1)
      let string = '{' + products.substring(1, products.length - 1) + '}'
      const {rows:[price]} = await client.query(`
        SELECT * FROM products
        WHERE id=$1
      `,[id]);
      let newPrice = that.totalprice - price.price 
      let wow = products1.length 

       updateCart(userId, wow)
      

      const { rows } = await client.query(
        `
        UPDATE orders
        SET products=$1,
        totalprice=$2
        WHERE userId=$3 AND isOpen=true
      `,[string, newPrice, userId]
      );
      return rows;
    }
    } catch (error) {
      throw error;
    }
  }

  async function closeOrder(id, string) {
    try{
      let arr = []

      for(i=0;i<string.length;i++){
        if(string[i] !== "," && string[i] !== "(" && string[i] !== ")"){
        arr.push(parseInt(string[i]))
        }
      }

      const {rows} = await client.query(`
        SELECT * FROM products
        WHERE id IN ${string}
      `);

      rows.forEach((e)=>{
        let num = arr.filter((v) => (v === e.id)).length;
        subtractInventory(e.id,(e.inventory-num))
      })
      const {rows:[that]} = await client.query(
        `
        UPDATE orders
        SET
        isOpen = false
        WHERE userid=${id};
        `
      )
      return that;
    }catch (error){
      throw error;
    }
  }


  async function checkOut(reportFields){
    const {products} = reportFields;
    console.log("these are products going into checkout",products)
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query
      let arr = []
      let string1 = products.substring(1, products.length - 1)
      let string2 = '(' + string1 + ')'

      for(i=0;i<string1.length;i++){
        if(string1[i] !== ","){
        arr.push(parseInt(string1[i]))
        }
      }

      const {rows} = await client.query(`
        SELECT * FROM products
        WHERE id IN ${string2}
      `);

      return rows

    } catch(error){
      throw error
    }
  }

  module.exports = {
      createOrder,
      getAllOrders,
      getOrdersById,
      getOpenOrderById,
      addProductToOrder,
      closeOrder,
      removeProductFromOrder,
      checkOut
  }