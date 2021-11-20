const { client } = require("./users");

async function createProduct(reportFields) {
  // Get all of the fields from the passed in object
  const { name, description, price, category } = reportFields;
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, description, price, category]
    );
    // return the new product
    return product;
  } catch (error) {
    throw error;
  }
}
// used in loop when showing all products. only owner/seller should be able to delete.
async function deleteProduct(productId) {}

async function getProductsByName(name) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      SELECT * FROM products
      WHERE name=${name};
      `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
    SELECT * FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductsByName,
  getAllProducts
};
