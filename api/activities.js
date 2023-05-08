const express = require('express');
const activitiesRouter = express.Router();
const {UnauthorizedError} = require('../errors.js')
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

// PATCH /api/activities/:activityId

// GET /api/activities/:activityId/routines
activitiesRouter.get('/',  async (req, res)=>{
    const routinesList = await   getPublicRoutinesByActivity();
    //this needs to be a loop not a filter...according to tests
    const routines = routinesList.filter(routines=>{
        if(activities.active){
            return true;
        }else{
            return false;
        }
    })
  
    res.send(
       routinesList
    );
});
 
module.exports = activitiesRouter;
