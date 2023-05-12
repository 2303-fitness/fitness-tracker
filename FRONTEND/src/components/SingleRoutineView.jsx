
import React from "react";
import { useNavigate } from "react-router-dom";
const SingleRoutineView = ({ routine, isLoggedIn, currentUser, setSelectedRoutine }) => {
  const navigate = useNavigate;
  return (
    <div className="single-routine">
      <h3>{routine.name}</h3>
      <p>Description: {routine.goal}</p>
      <p>Creator: {routine.creatorName}</p>
      {isLoggedIn && currentUser === routine.creatorId ? (
        <>
          <button onClick={() => setSelectedRoutine(routine)}>Edit</button>
          <button>Delete</button>
        </>
      ) : (
        <button  onClick={() => {
          navigate("/EditRoutine");
       }}>Edit</button>
      )}
    </div>
  );
};

export default SingleRoutineView;