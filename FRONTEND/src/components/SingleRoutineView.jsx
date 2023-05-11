import React from "react";
import { useNavigate } from "react-router-dom";

const SingleRoutineView = (props) => {
  const [isLoggedin, currentUser, routinesList, setSelectedRoutines] = props;
  const navigate = useNavigate;
  const checkCreatorId = (currUser, creatorId) => {
    return currUser === creatorId;
  };
  return (
    <div className="single-routine">
      <h2>{routine.name}</h2>
      <p>Creator Name: {routine.creatorName}</p>
      <p>Goal: {routine.goal}</p>
      <p>Activities: {routine.activities}</p>

      {isLoggedin ? (
        checkCreatorId(currentUser, routine.creatorId) ? (
          <button
            onClick={() => {
              setSelectedRoutines(routine);
              navigate("/EditRoutine");
            }}
          >
            {" "}
            Edit
          </button>
        ) : (
          <button
            onClick={() => {
              setSelectedRoutines(routine);
              navigate("/CreateActivity");
            }}
          >
            {" "}
            Add Activity
          </button>
        )
      ) : (
        <>
          {" "}
          <br></br>
        </>
      )}
    </div>
  );
};

export default SingleRoutineView;
