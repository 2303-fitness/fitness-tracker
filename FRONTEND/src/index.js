/*
1. need a Home Page that shows login, search bar, register, logout, public routines, profile buttons on the nav - Home
2. need a login page - loginPage
3. need a register page  to create user - registerUser
4. need to edit routines - editRoutine
5. need to edit activities - editActivity
6. need to edit routine_activities -editRoutineActivities
7. need to search, should filter through the routines and bring it back by name or user? - should there be a search bar on routines and activities that searches just routines and just activities? 
8. profile page - this should contain all of the routines created by this user
9. need a public routines page that displays all routines
10. need an avtivities page that shows all activities, should be able to edit any activity if logged in view any logged in or not
11. Where do we add activities to the routines? Should there be a button on the routines page for each routine that says " add activity" that routes to create activity page? 
12. be able to view a single routine and its activities routines page should be a preview of what this is. you should also be able to route to here from profile when you click view routine on your own page. 
13
14
15
16
17
18
19
20 main holds the routes for all of these to work - main
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main.jsx';
import Header from './components/Header.jsx';

createRoot(document.querySelector('#root')).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
