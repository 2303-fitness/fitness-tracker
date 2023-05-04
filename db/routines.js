const client = require("./client");
const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require('./users');

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [ routine ] } = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `, [creatorId, isPublic,name , goal]);

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try{
    const { rows: [ routine ] } = await client.query(`
    SELECT *
    FROM routines
    WHERE id=$1;
    `, [id]);
    return routine;
  } catch (error) {
    throw error;
  }
}


async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users ON routines."creatorId" = users.id;
    `);

    return routines;
  } catch (error) {
    throw error;
  }
  
}


async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines
    JOIN users ON routines."creatorId" = users.id;
    `);

    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT DISTINCT ON (routines.id)
    routines.*, users.username AS "creatorName", routine_activities.duration,
    routine_activities.count, routine_activities.id AS "routineActivityId"
  FROM routines
  JOIN users ON users.id = routines."creatorId"
  JOIN routine_activities ON routine_activities."routineId" = routines.id
  WHERE routines."isPublic" = true
    `);


    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error("Error getting public routines", error);
    throw error;
  }}


async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT DISTINCT ON (routines.id)
    routines.*, users.username AS "creatorName"
  FROM routines
  JOIN users ON users.id = routines."creatorId"
  JOIN routine_activities ON routine_activities."routineId" = routines.id
    `);


    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
  //   const { rows: routines } = await client.query(`
  //   SELECT DISTINCT ON (routines.id)
  //   routines.*, users.username AS "creatorName"
  // FROM routines
  // JOIN users ON users.id = routines."creatorId"
  // JOIN routine_activities ON routine_activities."routineId" = routines.id
  // WHERE routines."isPublic" = true, 
  //   `);


  //   return await attachActivitiesToRoutines(routines);

  const user = await getUserByUsername(username);
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id 
    WHERE "creatorId" = $1
    AND "isPublic" = true
    `, [user.id]);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error("Error getting public routines", error);
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT DISTINCT ON (routines.id)
    routines.*, users.username AS "creatorName", routine_activities.duration,
    routine_activities.count, routine_activities.id AS "routineActivityId"
  FROM routines
  JOIN users ON users.id = routines."creatorId"
  JOIN routine_activities ON routine_activities."routineId" = routines.id
  WHERE routines."isPublic" = true
    `);


    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    console.error("Error getting public routines", error);
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const {rows: [routine] } = await client.query(`
      UPDATE routines
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try{
    const {rows: [routine] } = await client.query(`
    DELETE
    FROM routines
    WHERE id=$1
    `, [id]);
   
    return routine;
  } catch (error){
    throw error
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
