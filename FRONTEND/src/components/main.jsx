// THIS HOLDS OUR ROUTES AND USEEFFECT IN STATE

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import{ Routes, Route } from 'react-router-dom';
import { getMe } from '../api';
import { getAllRoutines } from '../api';
import { getAllActivities } from '../api';
import { LoginPage, Profile, AllRoutines, home, editRoutine, editActivity, searchBar, singleRoutineView, editRoutineActivity, createRoutine, createActivity, SendMessageView, registerUser } from '.';
