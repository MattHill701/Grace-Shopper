// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');


async function dropTables(){

try {
  console.log("starting to drop tables")




  console.log("finished dropping tables")
} catch (error) {
  throw error
}


}


async function buildTables() {
  try {
    console.log("Starting to build tables")
    client.connect();
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
    `)
    

    // build tables in correct order
    console.log("finished building tables")
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(rebuildDB)
  .catch(console.error)
  .finally(() => client.end());