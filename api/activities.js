const express = require('express');
const activitiesRouter = express.Router();
const {UnauthorizedError} = require('../errors.js')
const {ActivityExistsError} = require('../errors.js')
const { createActivity} = require("../db");
const {  getAllActivities} = require("../db");
const {  getPublicRoutinesByActivity} = require("../db");

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
    
    // const activities = await getActivityByName(name);
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
