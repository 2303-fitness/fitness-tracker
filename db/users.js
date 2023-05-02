const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try{
    const { rows: [user] } = await client.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password]);
    return user;
  } catch (error){
    throw error;
  }
  
}

async function getUser({ username, password }) {
try {
  const { rows } = await client.query(`
  SELECT id, username, password
  FROM users
  `);

  return rows;
} catch (error) {
  throw error;
}
}

async function getUserById(userId) {
try {
  const { rows: [ user ] } = await client.query(`
  SELECT *
  FROM users
  WHERE id=${ userId }
  `);
if (user.length === 0) 
  return;

delete user.password;
console.log("WHERE IS THE USER!", user)
return user;
} catch (error) {
  throw error;
}
}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
