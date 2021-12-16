
const { client } = require("./users");

async function createAdmin() {
  // Get all of the fields from the passed in object
  try {
    // insert the correct fields into the reports table
    // remember to return the new row from the query
    const {
      rows: [admin]
    } = await client.query(`
    INSERT INTO admin(username, password, pin, canDoAnything)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `,["administrator", "password", 1111, true]
    );
    // return the new report
    // console.log(admin)
    return admin;
  } catch (error) {
    throw error;
  }
}

async function verifyAdmin(username, password) {
  try {
    const { rows:[admin] } = await client.query(
      `
      SELECT * FROM admin
    `
    );

    if(admin.username === username && admin.password === password){
      return true
    } else {
      return false
    }
  } catch (error) {
    throw error;
  }
}


async function createSeller(reportFields) {
    // Get all of the fields from the passed in object
    const {username, password, description, products } = reportFields;
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query
      const {
        rows: [ sellers ],
      } = await client.query(`
      INSERT INTO sellers(username, password, description, products, canSell)
      VALUES ($1, $2, $3, $4, true)
      RETURNING *
      `,
      [ username, password, description, products ]
      );
      // return the new report
      // console.log(sellers)
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

  async function getSellerByUsername(username) {
    try {
      const { rows:[seller] } = await client.query(
        `
        SELECT * FROM sellers 
        WHERE username=$1
      `,
        [username]
      );
  
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async function getSellerById(id) {
    try {
      const { rows:[seller] } = await client.query(
        `
        SELECT * FROM sellers 
        WHERE id=$1
      `,
        [id]
      );
  
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async function addProductToSeller(productId, sellerId) {

    let that = await getSellerById(sellerId)
    let products = JSON.stringify(that.products)
    let string = '{' + products.substring(1, products.length - 1) + `,${productId}}`

    try {
      const { rows:[seller] } = await client.query(
        `
        UPDATE sellers
        SET products=$1
        WHERE id=$2
      `,
        [string, sellerId]
      );
  
      return seller;
    } catch (error) {
      throw error;
    }
  }


  async function removeProductFromSeller(number) {
    try {
      const {
        rows: [products],
      } = await client.query(`
      UPDATE sellers 
      SET products = array_remove(products, $1)
      RETURNING *
        `,[number]);
      return products;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
      createSeller,
      getAllSellers,
      createAdmin,
      getSellerByUsername,
      verifyAdmin,
      getSellerById,
      addProductToSeller,
      removeProductFromSeller
  }
  
  