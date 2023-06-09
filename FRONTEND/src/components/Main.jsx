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
  SingleActivityView,
  EditRoutineActivity,
  CreateRoutine,
  CreateActivity,
  RegisterUser,
  Routines,
  Activities,
  AddActivity,
} from "./Index";

const Main = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentActivity, setCurrentActivity] = useState({});
  const [currentRoutine, setCurrentRoutine] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoutines, setUserRoutines] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [routinesList, setRoutinesList] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState({});

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
          setCurrentUser(fetchedUser);
          if (fetchedUser.routines) {
            setUserRoutines(fetchedUser.routines);
          } else {
            setUserRoutines([]);
          }
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
          element={
            <Home isLoggedIn={isLoggedIn} currentUser={currentUser.username} />
          }
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
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
            />
          }
        />
        <Route
          path="/EditRoutine"
          element={
            <EditRoutine
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
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
          path="/AddActivity"
          element={
            <AddActivity
              routinesList={routinesList}
              setRoutinesList={setRoutinesList}
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
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
          path="/CreateRoutine"
          element={
            <CreateRoutine
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
          path="/CreateActivity"
          element={
            <CreateActivity
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
          path="/SingleActivityView"
          element={
            <SingleActivityView
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
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
              setSelectedRoutine={setSelectedRoutine}
              selectedRoutine={selectedRoutine}
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
