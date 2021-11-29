// code to build and initialize DB goes here
const {
  createSeller,
  getUserByUsername,
  createProduct,
  client,
  createUser,
  getAllUsers,
  getAllProducts,
  attachProductsToUsers,
  addProductToUser,
  addProductToSeller,
  getAllSellers
} = require("./index");

async function dropTables() {
  try {
    console.log("starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS seller_products;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS sellers;
    DROP TABLE IF EXISTS users;
    `);

    console.log("finished dropping tables");
  } catch (error) {
    console.log("error building tables");
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Starting to build tables");
    //convert into cents on price
    //add role onto users
    //create order table, need to save the products ppl buy 
    //inventory/ number of items left -- row on products
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER,
        category TEXT NOT NULL
      );
      CREATE TABLE sellers(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        description TEXT NOT NULL
      );
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id)
      );
      CREATE TABLE seller_products(
        id SERIAL PRIMARY KEY,
        "sellerId" INTEGER REFERENCES sellers(id),
        "productId" INTEGER REFERENCES products(id)
      );
    `);

    // build tables in correct order
    console.log("finished building tables");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Trying to create users...");
    const userOne = await createUser({
      username: "amber",
      password: "51isTheKey",
    });
    const userTwo = await createUser({
      username: "logan",
      password: "iLoveF4ri3s",
    });
    const userThree = await createUser({
      username: "matt",
      password: "kingwasright",
    });
    console.log("Success creating users!");
    return [userOne, userTwo, userThree];
  } catch (error) {
    console.error("Error while creating reports!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Trying to create Products...");
    const ProductOne = await createProduct({
      name: "cheese",
      description: "cheese",
      price: "25",
      category: "cheese",
    });
    const ProductTwo = await createProduct({
      name: "bread",
      description: "bread",
      price: "15",
      category: "bread",
    });
    const ProductThree = await createProduct({
      name: "human food",
      description: "human food",
      price: "100000",
      category: "human food",
    });
    console.log("Success creating Product!");
    return [ProductOne, ProductTwo, ProductThree];
  } catch (error) {
    console.error("Error while creating Products!");
    throw error;
  }
}

async function createInitialSellers() {
  try {
    console.log("Trying to create sellers...");
    const userOne = await createSeller({
      username: "Ed",
      password: "isthebest",
      description: "I sell great knowledge",
    });
    const userTwo = await createSeller({
      username: "Tanveer",
      password: "isthebest",
      description: "I also sell great knowledge",
    });
    const userThree = await createSeller({
      username: "Payton",
      password: "istheworst",
      description: "I sell bad products",
    });
    console.log("Success creating sellers!");
    return [userOne, userTwo, userThree];
  } catch (error) {
    console.error("Error while creating sellers!");
    throw error;
  }
}

async function createInitialCart() {
  try {
    console.log("trying to create cart");
    const [product1, product2, product3] = await getAllProducts();
    console.log("this is product 1", product1);
    const [userOne, userTwo, userThree] = await getAllUsers();

    const fakeCarts = [
      {
        userId: userOne.id,
        productId: product1.id,
      },
      {
        userId: userTwo.id,
        productId: product2.id,
      },
      {
        userId: userThree.id,
        productId: product3.id,
      },
    ];
    console.log("this is fake cart", fakeCarts);
    const realCart = await Promise.all(fakeCarts.map(addProductToUser));
    // console.log("this is real cart", realCart);
    // console.log("finished creating cart");
    return realCart;
  } catch (error) {
    throw error;
  }
}

async function createInitialSellerProducts(){
  try {
    console.log("trying to create seller products");
    const [product1, product2, product3] = await getAllProducts();
    // console.log("this is product 1", product1);
    const [sellerOne, sellerTwo, sellerThree] = await getAllSellers();

    const sellerProducts = [
      {
        userId: sellerOne.id,
        productId: product1.id,
      },
      {
        sellerId: sellerTwo.id,
        productId: product2.id,
      },
      {
        sellerId: sellerThree.id,
        productId: product3.id,
      },
    ];
    // console.log("this is fake cart", fakeCarts);
    const allSellerProducts = await Promise.all(sellerProducts.map(addProductToSeller));
    // console.log("this is real cart", realCart);
    console.log("finished creating seller products");
    return allSellerProducts;
  } catch (error) {
    throw error
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialSellers();
    await createInitialCart();
    await createInitialSellerProducts();
  } catch (error) {
    console.log("error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
