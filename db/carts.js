const { client } = require("./users");
async function attachProductsToUsers(users) {
  // no side effects
  const usersToReturn = [...users];
  const binds = users.map((_, index) => `$${index + 1}`).join(", ");
  const usersIds = users.map((routine) => routine.id);
  if (!usersIds?.length) return;
  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: products } = await client.query(
      `
        SELECT products.*, cart.id AS "cartId", cart."userId"
        FROM products
        JOIN cart ON cart."productId" = products.id
        WHERE cart."userId" IN (${binds});
      `,
      usersIds
    );
    // loop over the routines
    for (const user of usersToReturn) {
      // filter the activities to only include those that have this routineId
      const productsToAdd = products.filter(
        (product) => product.userId === user.id
      );
      // attach the activities to each single routine
      user.products = productsToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    throw error;
  }
}

async function addProductToUser({ userId, productId }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            INSERT INTO cart( "userId", "productId")
            VALUES($1, $2)
            RETURNING * ;
          `,
      [userId, productId]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  attachProductsToUsers,
  addProductToUser
};
