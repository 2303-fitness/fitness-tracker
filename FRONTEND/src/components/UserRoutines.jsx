import React from "react";
import SingleRoutineView from "./SingleRoutineView";
import { useNavigate } from "react-router-dom";

const UserRoutines = ({ routine, currentUser, creatorId, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <>
      {currentUser === routine.creatorId.username ? (
        <div className="single-routine">
          <h3>{routine.name}</h3>
          <p>Description: {routine.goal}</p>
          <p>Creator: {routine.creatorName}</p>
          {isLoggedIn && currentUser === routine.creatorId.username ? (
            <>
              <button onClick={() => setSelectedRoutine(routine)}>Edit</button>
              <button>Delete</button>
            </>
          ) : (
            <button onClick={() => navigate("/EditRoutine")}>Edit</button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default UserRoutines;
