const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) { 
  try {
    const { rows: [routine_activity] } = await client.query(`
      INSERT INTO routine_activity ("routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [routineId, activityId, count, duration]);
    
    return routine_activity;
  } catch (error) {
    throw error;
  }
  
}


async function getRoutineActivityById(id) {
  try {
    const { rows: [ routine ]  } = await client.query(`
      SELECT *
      FROM routines
      WHERE id=$1;
    `, [id]);

    if (!routine) {
      throw {
        name: "RoutineActivity not found",
        message: "Could not find an activity with that Id"
      };
    } return routine;
} catch (error) {
  throw error;
}
}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
