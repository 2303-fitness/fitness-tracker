const express = require('express');
const activitiesRouter = express.Router();
const {UnauthorizedUpdateError} = require('../errors.js')
const {UnauthorizedDeleteError} = require('../errors.js')
const {ActivityExistsError} = require('../errors.js')
const { createActivity} = require("../db");
const {  getAllActivities} = require("../db");
const {  getPublicRoutinesByActivity} = require("../db");
const { getActivityByName} = require("../db");
const {requireUser} = require("./utils");

// GET /api/activities
activitiesRouter.get('/',  async (req, res)=>{
    const activities = await  getAllActivities();
  
    res.send(
       activities
    );
});
 
// POST /api/activities
activitiesRouter.post('/', async (req, res, next) => {
    const { description, name} = req.body;
    const activityData = {};
    try { 
        activityData.description =description
        activityData.name = name
    
    const activity = await getActivityByName(name);
        /*both halves of this work but I cant fingure out how they work in tandem
        if you swap then the checks will switch.  believe it has to do with the line i commented out 26, im almost positive we nees to use that but cant get it running right*/
         if (name) { 
            res.send({
    error: "Cannot Create Activity" ,
    message: ActivityExistsError(name),
    name: 'DuplicateError', 
    
    });
      }
         const newActivity = await createActivity(activityData);
    if(activityData) 
        res.send(
          newActivity
        ); 
       
      } catch (error) {
        next(error);
      }
    });

// PATCH /api/activities/:activityId

activitiesRouter.patch('/:activityId', async (req, res, next) => {

  const { activityId } = req.params;
  const { count, duration } = req.body;

  const updateFields = {};


  if (count) {
    updateFields.count = count;
  }

  if (duration) {
    updateFields.duration = duration;
  }

  try {
    const originalActivity = await getActivityByIs(activityId);

    if (originalActivity.creatorId === req.user.id) {
      const updatedActivity= await updateRoutine(activityId, updateFields);
      res.send({ activity: updatedActivity })
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
// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines',  async (req, res)=>{
    const routinesList = await   getPublicRoutinesByActivity();
    //this needs to be a loop not a filter...according to tests
    
        if(activities.active){
  
    res.send(
       routinesList
    );
        }
});
 
module.exports = activitiesRouter;
