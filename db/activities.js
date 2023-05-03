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
  try{
    const { rows: [ activity ] } = await client.query(`
    SELECT *
    FROM activities
    WHERE name=$1;
    `, [name]);
    return activity;
  } catch (error) {
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, name, description }) {
  try {
    let updatedActivity;

    if (name) {
      const { rows: [activity] } = await client.query(`
        UPDATE activities
        SET name = $1
        WHERE id = $2
        RETURNING *;
      `, [name, id]);

      updatedActivity = activity;
    }

    if (description) {
      const { rows: [activity] } = await client.query(`
        UPDATE activities
        SET description = $1
        WHERE id = $2
        RETURNING *;
      `, [description, id]);

      updatedActivity = activity;
    }

    return updatedActivity;
  } catch (error) {
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
