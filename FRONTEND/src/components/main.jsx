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
  const [currentActivity, setCurrentActivity] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoutines, setUserRoutines] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [routinesList, setRoutinesList] = useState([]);
  const [selectedRoutines, setSelectedRoutines] = useState({});

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const fetchedRoutines = await getAllRoutines();
        const fetchedActivities = await getAllActivities();
        setActivitiesList(fetchedActivities);
        setRoutinesList(fetchedRoutines);
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
          setCurrentUser(fetchedUser.data.username);
          setUserRoutines(fetchedUser.data.routines);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <>
      <Header
        setCurrentUser={setCurrentUser}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route
          path="/home"
          element={<Home isLoggedIn={isLoggedIn} currentUser={currentUser} />}
        />

        <Route
          path="/routines"
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
          path="/activities"
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
          path="/singleRoutineView"
          element={
            <SingleRoutineView
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
              selectedRoutines={selectedRoutines}
              setSelectedRoutines={setSelectedRoutines}
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
          path="/profile"
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
              selectedRoutines={selectedRoutines}
              setSelectedRoutines={setSelectedRoutines}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Main;
