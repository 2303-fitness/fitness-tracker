// import SearchBar from "./SearchBar";
import React from "react";
import SingleRoutineView from "./SingleRoutineView";
import { useState } from "react";
import CreateRoutine from "./CreateRoutine";
import { NavLink, useNavigate } from "react-router-dom";

const Routines = (props) => {
  const { routinesList, setRoutinesList, isLoggedIn, currentUser, token } =
    props;

  const navigate = useNavigate();

  const handleClick = (logged) => {
    // console.log("entering handle click for create post" , isLoggedIn);
    if (logged) {
      navigate("/CreateRoutine");
    } else {
      window.alert("Please sign in to add a routine!");
    }
  };
  console.log(routinesList);
  return (
    <>
      <h2> Routines</h2>
      <button
        onClick={() => {
          handleClick(isLoggedIn);
        }}
      >
        Create New Routine
      </button>
      {routinesList.length ? (
        <div id="all-routines-container">
          {routinesList.map((routines, index) => {
            console.log(routines);
            return (
              <div key={index}>
                <SingleRoutineView
                  routines={routines}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div id="all-routines-container">
          {routinesList.map((routines, index) => {
            return (
              <div key={index}>
                <SingleRoutineView
                  routines={routines}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Routines;
