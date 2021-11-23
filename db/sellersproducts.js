const { client } = require("./users");
async function attachProductsToSellers(sellers) {
  // no side effects
  const sellersToReturn = [...sellers];
  const binds = sellers.map((_, index) => `$${index + 1}`).join(", ");
  const sellersIds = sellers.map((routine) => routine.id);
  if (!sellersIds?.length) return;
  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: products } = await client.query(
      `
        SELECT products.*, seller_products.id AS "seller_productsId", seller_products."sellerId"
        FROM products
        JOIN seller_products ON seller_products."productId" = products.id
        WHERE seller_products."sellerId" IN (${binds});
      `,
      usersIds
    );
    // loop over the routines
    for (const seller of sellersToReturn) {
      // filter the activities to only include those that have this routineId
      const productsToAdd = products.filter(
        (product) => product.sellerId === seller.id
      );
      // attach the activities to each single routine
      seller.products = productsToAdd;
    }
    return sellersToReturn;
  } catch (error) {
    throw error;
  }
}
async function addProductToSeller({ sellerId, productId }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
            INSERT INTO seller_products( "sellerId", "productId")
            VALUES($1, $2)
            RETURNING * ;
          `,
      [sellerId, productId]
    );
    return products;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  attachProductsToSellers,
  addProductToSeller
};