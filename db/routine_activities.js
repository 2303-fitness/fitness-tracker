const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) { 
  try {

    console.log("BLAH BLAH BLAH BLAH BLAH");
   
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
