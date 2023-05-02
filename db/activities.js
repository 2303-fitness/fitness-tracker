const { classImplements } = require('@babel/types');
const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [ activities ] } = await client.query(`
    INSERT INTO activities(name, description)
    VALUES($1, $2)
    RETURNING *;
    `, [name, description]);

    return activities;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
 try{
  const { rows } = await client.query(`
  SELECT *
  FROM activities;
`);
return rows;
 } catch (error) {
  throw error;
 }
}

async function getActivityById(id) {
  try{
    const { rows: [ activity ] } = await client.query(`
    SELECT *
    FROM activities
    WHERE id=$1;
    `, [id]);
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getActivityByName(name) {
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, name, description, fields }) {

    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1 }`).join(', ');

  try{
    if(setString.length > 0) {
      await client.query(`
      UPDATE activities
      SET ${ setString }
      WHERE  name=${ name } AND description=${ description}
      RETURNING *;
      `, Object.values(fields));
      return await getActivityById(id);
    }
  } catch (error){
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
