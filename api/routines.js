require('dotenv').config();

const express = require('express');
const routinesRouter = express.Router();
const {DuplicateRoutineActivityError} = require('../errors.js')
const {UnauthorizedError} = require('../errors.js')
const { createRoutine } = require("../db");
const {  getAllRoutines} = require("../db");

// GET /api/routines
routinesRouter.get('/',  async (req, res)=>{
    const routines = await  getAllRoutines();
  
    res.send(
       routines
    );
});
 
//POST /api/routines
routinesRouter.post('/', async (req, res, next) => {
const { goal, name} = req.body;
routineData = {};
try { 
    routineData.goal = goal
    routineData.name = name
    routineData.creatorId = req.user.id
    const routine = await createRoutine(routineData);
//     if (!user) { 
//          res.send({ 
//       error: "Cannot Create Routine" ,
//       message: UnauthorizedError(user),
//       name: 'NoRoutine', 
     
//     });
//   }
if(routineData) 
    res.send({
      routine
    }); 
        
   
   
  } catch (error) {
    next(error);
  }
});
// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
