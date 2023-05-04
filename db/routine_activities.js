const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) { 
  try {

   
  const {rows: [routineActivities]} = await client.query(`
  INSERT INTO routine_activities ("routineId", "activityId", count, duration)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `, [routineId, activityId, count, duration]);
  return routineActivities;
} catch (error) {
  console.error("error addActivityToRoutine", error)
  throw error;
}}

async function getRoutineActivityById(id) {
  try {
    const { rows: [ routineActivity ]  } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE id=$1;
    `, [id]);

    if (!routineActivity) {
      throw {
        name: "RoutineActivity not found",
        message: "Could not find an activity with that Id"
      };
    } return routineActivity;
} catch (error) {
  throw error;
}
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: { routineActivity }  } = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE id=$1;
    `, [id]);

    if (routineId !== routine.id) {
      throw {
        name: "RoutineActivity not found",
        message: "Could not find an activity with that Routine Id"
      };
    } return routineActivity;
} catch (error) {
  throw error;
}
}

async function updateRoutineActivity({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
    return;
  }

  try {
    const {rows: [routineActivity] } = await client.query(`
      UPDATE routine_activities
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try{
    
    const {rows: [routineActivity] } = await client.query(`
    DELETE FROM routine_activities
  WHERE id = $1
  RETURNING *;
    `, [id]);
     
    
    return routineActivity;
  } catch (error){
    console.log("error deleting routine activity", error)
    throw error
  }
}


  
  async function canEditRoutineActivity(routineActivityId, userId) {
    try {
      const { rows: [routineActivity] } = await client.query(
        `SELECT "creatorId"
        FROM routine_activities
        WHERE routineActivityId = $1;
      `, [routineActivityId]);
      return routineActivity.userId === userId;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
