// THIS HOLDS OUR ROUTES AND USEEFFECT IN STATE
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import { getMe } from "../api";
import { getAllRoutines } from "../api";
import { getAllActivities } from "../api";
import {
  LoginPage,
  Profile,
  Home,
  EditRoutine,
  EditActivity,
  SearchBar,
  SingleRoutineView,
  EditRoutineActivity,
  CreateRoutine,
  CreateActivity,
  RegisterUser,
  Routines,
  Activities,
} from "./Index";

const Main = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentActivity, setCurrentActivity] = useState({});
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoutines, setUserRoutines] = useState({});
  const [activitiesList, setActivitiesList] = useState([]);
  const [routinesList, setRoutinesList] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        let routines = await getAllRoutines();
        setRoutinesList(routines);
        let activities = await getAllActivities();
        setActivitiesList(activities);

        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const fetchedUser = await getMe(token);
          setCurrentUser(fetchedUser.user);
          setUserRoutines(fetchedUser.user.routines);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div id="main">
      <Header
        setCurrentUser={setCurrentUser}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route
          path="/Home"
          element={<Home isLoggedIn={isLoggedIn} currentUser={currentUser} />}
        />
        <Route
          path="/RegisterUser"
          element={
            <RegisterUser
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/LoginPage"
          element={
            <LoginPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/Routines"
          element={
            <Routines
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
              currrentUser={currentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
            />
          }
        />
        <Route
          path="/Activities"
          element={
            <Activities
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
            />
          }
        />
        <Route
          path="/SingleRoutineView"
          element={
            <SingleRoutineView
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
              userRoutines={userRoutines}
              setUserRoutines={setUserRoutines}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
            />
          }
        />

        <Route
          path="/Profile"
          element={
            <Profile
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentActivity={currentActivity}
              setCurrentActivity={setCurrentActivity}
              currentRoutine={currentRoutine}
              setCurrentRoutine={setCurrentRoutine}
              userRoutines={userRoutines}
              setUserRoutines={setUserRoutines}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
