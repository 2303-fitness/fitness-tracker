/* eslint-disable no-useless-catch */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");
const {requireUser} = require("./utils");
const usersRouter = express.Router();
const { getAllRoutinesByUser } = require('../db');
const { getPublicRoutinesByUser } = require('../db');
const { getUserByUsername } = require('../db');
const { createUser } = require('../db');
const { UserTakenError} = require('../errors.js');
const { PasswordTooShortError } = require('../errors.js');
const { getUser } = require('../db');





usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    console.log("HHHHHHHHHHHH", _user);
    if (_user) {
      res.send({
        error:"error registering user",
        message: UserTakenError(username),
        name: 'UserExistsError',
      });
    } else if (password.length < 8) {
      return res.status(400).json({
       error: "Password needs to be 8 characters long!",
        message: PasswordTooShortError(),
        name: "Password too short!"
      });
    } else {
      const user = await createUser({
        username,
        password
      });

      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({ 
        message: "thank you for signing up",
        token,
        user
      });
    }
  } catch (error) {
    next(error)
  } 
});
// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUserByUsername(username); 
      const token = jwt.sign({id: user.id, username: user.username, passowrd: user.password}, process.env.JWT_SECRET);
      if (user && user.password == password) { 
       
        res.send({ 
          message: "you're logged in!", token, user
         });
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
});
// GET /api/users/me
usersRouter.get('/',requireUser, async (req, res) => {
  const users = await getUser();
  res.send({
    users
  });
});

// GET /api/users/:username/routines

module.exports = usersRouter;











































