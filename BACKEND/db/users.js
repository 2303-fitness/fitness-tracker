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
    delete user.password
    
    return user;
  } catch (error){
    throw error;
  }
  
}

async function getUser({ username, password }) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users

    WHERE username=$1 
    `, [username]);
    if (user.password !== password) {
      return ; 
    } 
    delete user.password
    return user;
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
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [userName]);

    return user;
} catch (error) {
  throw error;
}
} 


module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
