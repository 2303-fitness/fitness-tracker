const express = require('express');
const routineActivitiesRouter = express.Router();
const {UnauthorizedError} = require('../errors.js')
const { updateRoutineActivity } = require('../db');
const {getRoutineActivitiesByRoutine} = require('../db');
const {getAllRoutinesByUser} = require('../db');
const {getActivityById} = require('../db');

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch('/:routineActivityId',  async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { count, duration, } = req.body;
    
    const routine = await getAllRoutinesByUser(username);
    res.send(
        routine
    )
    const activity = await getActivityById();
    res.send(
        activity
    )
  
    const updateFields = {};
  
    if (count) {
      updateFields.count = count;
    }
  
    if (duration) {
      updateFields.duration = duration;
    }
  
    try {
      const routineActivity = await getRoutineActivitiesByRoutine(routine);
  res.send({
    routineActivity
  })
      if (routine.creatorId === req.user.id) {
        const updatedRoutineActivity = await updateRoutineActivity(routineActivityId, updateFields);
        res.send({ routineActivity: updatedRoutineActivity })
      } else {
        res.send({
            error: "Cannot Update Routine",
          message: UnauthorizedError(creatorId),
          name: 'UnauthorizedUserError'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
// DELETE /api/routine_activities/:routineActivityId

module.exports = routineActivitiesRouter;
