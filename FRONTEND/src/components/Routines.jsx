import React, { useState } from "react";
import SingleRoutineView from "./SingleRoutineView";
import CreateRoutine from "./CreateRoutine";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { AddActivity } from "./AddActivity";
const Routines = ({ routinesList, isLoggedIn, currentUser }) => {
  const navigate = useNavigate();
  const [returnedRoutinesList, setReturnedRoutinesList] = useState([]);
  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/CreateRoutine");
    } else {
      window.alert("Please sign in to add a routine!");
    }
  };
  return (
    <>
      <SearchBar
        routinesList={routinesList}
        setReturnedRoutinesList={setReturnedRoutinesList}
      />
      <h2>Routines</h2>
      {isLoggedIn && <button onClick={handleClick}>Create New Routine</button>}
      {returnedRoutinesList.length ? (
        <div id="all-routines-container">
          {returnedRoutinesList.map((routine, index) => (
            <SingleRoutineView
              key={index}
              routine={routine}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          ))}
        </div>
      ) : (
        <div id="all-routines-container">
          {routinesList.map((routine, index) => (
            <SingleRoutineView
              key={index}
              routine={routine}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default Routines;
