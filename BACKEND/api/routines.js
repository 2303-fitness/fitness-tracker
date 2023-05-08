require('dotenv').config();

const express = require('express');
const routinesRouter = express.Router();
const {DuplicateRoutineActivityError} = require('../errors.js')
const {UnauthorizedUpdateError} = require('../errors.js')
const { UnauthorizedDeleteError} = require('../errors.js')
const { createRoutine } = require("../db");
const {  getAllRoutines} = require("../db");
const {requireUser} = require("./utils");

// GET /api/routines
routinesRouter.get('/',  async (req, res)=>{
    const routines = await  getAllRoutines();
  
    res.send(
       routines
    );
});
 
//POST /api/routines
routinesRouter.post('/', requireUser, async (req, res, next) => {
  const { goal, name } = req.body;
  const routineData = {
    goal,
    name,
    creatorId: req.user.id
  };
  try {
    const routine = await createRoutine(routineData);
    res.send({
      routine
    });
  } catch (error) {
    next(error);
  }
});


// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const { name, goal } = req.body;

  const updateFields = {};


  if (name) {
    updateFields.name = name;
  }

  if (goal) {
    updateFields.goal = goal;
  }

  try {
    const originalRoutine = await getRoutineById(routineId);

    if (originalRoutine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine(routineId, updateFields);
      res.send({ routine: updatedRoutine })
    } else {
      next({
        error: "Cannot Update this routine",
        name: 'UnauthorizedUserError',
        message: UnauthorizedUpdateError()
      })
    }
  } catch (error) {
    next(error);
  }
});
// DELETE /api/routines/:routineId

routinesRouter.delete('/:routineId', async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.routineId);

    if (routine && routine.creatorId === req.user.id) {
      const updatedRoutine = await destroyRoutine(routine.id, { isPublic: false });

      res.send({ routine: updatedRoutine });
    } else {
    
      next(routine ? { 
        error: "Cannot Delete Routine" ,
        message: UnauthorizedDeleteError(username),
         name: 'UnAuthDelete',
      } : {
        name: "RoutineNotFound",
        message: "That routine does not exist"
      });
    }

  } catch ({ name, message }) {
    next({ name, message })
  }
});

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
